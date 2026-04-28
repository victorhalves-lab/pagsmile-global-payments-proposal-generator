import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { action, token, data } = body;

    if (!token) {
      return Response.json({ error: 'Token is required' }, { status: 400 });
    }

    // Use service role to bypass auth — token acts as the auth mechanism
    const proposals = await base44.asServiceRole.entities.Proposal.filter({ public_link_token: token });

    if (!proposals || proposals.length === 0) {
      return Response.json({ error: 'Proposal not found' }, { status: 404 });
    }

    const proposal = proposals[0];

    if (action === 'get') {
      return Response.json({ proposal });
    }

    if (action === 'respond') {
      const allowedStatuses = ['accepted', 'rejected', 'counter_proposal'];
      if (!data?.status || !allowedStatuses.includes(data.status)) {
        return Response.json({ error: 'Invalid status' }, { status: 400 });
      }

      // Don't allow changing an already responded proposal
      if (['accepted', 'rejected', 'counter_proposal'].includes(proposal.status)) {
        return Response.json({ error: 'Proposal already responded' }, { status: 400 });
      }

      // Build update data — only allow specific fields
      const updateData = { status: data.status };

      if (data.status === 'counter_proposal') {
        updateData.counter_proposal_rate = parseFloat(data.counter_proposal_rate) || 0;
        updateData.counter_proposal_fixed_fee = parseFloat(data.counter_proposal_fixed_fee) || 0;
        updateData.counter_proposal_settlement_days = data.counter_proposal_settlement_days || '';
        updateData.counter_proposal_notes = data.counter_proposal_notes || '';
      }

      await base44.asServiceRole.entities.Proposal.update(proposal.id, updateData);

      // Update linked questionnaire pipeline status
      if (proposal.questionnaire_id) {
        const pipelineMap = {
          accepted: 'proposal_accepted',
          rejected: 'proposal_lost',
          counter_proposal: 'counter_proposal'
        };
        await base44.asServiceRole.entities.Questionnaire.update(proposal.questionnaire_id, {
          pipeline_status: pipelineMap[data.status]
        });
      }

      return Response.json({ success: true });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});