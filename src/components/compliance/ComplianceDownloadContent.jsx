import React from 'react';

const YES_NO = (v) => (v ? 'Yes' : 'No');

function Field({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      <span style={{ color: 'white', fontSize: '14px' }}>
        {value === null || value === undefined || value === '' ? '—' : String(value)}
      </span>
    </div>
  );
}

function SectionTitle({ step, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', marginTop: '8px' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px',
        background: 'rgba(43, 193, 150, 0.15)',
        color: '#2bc196', fontSize: '14px', fontWeight: '700',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {step}
      </div>
      <h3 style={{ color: '#2bc196', fontSize: '18px', fontWeight: '600', margin: 0 }}>{title}</h3>
    </div>
  );
}

function Card({ children }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '24px'
    }}>
      {children}
    </div>
  );
}

function ComplianceAnswer({ question, value, detail }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '12px',
      padding: '12px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)'
    }}>
      <div style={{
        width: '24px', height: '24px', borderRadius: '50%',
        flexShrink: 0, marginTop: '2px',
        background: value ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)',
        color: value ? '#f87171' : '#4ade80',
        fontSize: '12px', fontWeight: '700',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {value ? '!' : '✓'}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.5', margin: '0 0 4px 0' }}>{question}</p>
        {value && detail && (
          <p style={{
            color: 'rgba(250,204,21,0.7)', fontSize: '12px', margin: 0,
            background: 'rgba(245,158,11,0.05)', padding: '8px', borderRadius: '6px'
          }}>
            {detail}
          </p>
        )}
      </div>
      <span style={{
        flexShrink: 0, fontSize: '12px', fontWeight: '600',
        padding: '4px 10px', borderRadius: '9999px',
        background: value ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)',
        color: value ? '#f87171' : '#4ade80'
      }}>
        {YES_NO(value)}
      </span>
    </div>
  );
}

export default function ComplianceDownloadContent({ data }) {
  if (!data) return null;

  const fmtCurrency = (v) => (v ? `US$ ${Number(v).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—');
  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—');

  return (
    <div
      id="compliance-download-content"
      style={{
        width: '900px',
        padding: '40px',
        background: 'linear-gradient(135deg, #002443 0%, #001a30 100%)',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: 'white'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png"
          alt="Pagsmile"
          style={{ height: '40px', marginBottom: '16px' }}
        />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 14px',
          background: 'rgba(43,193,150,0.1)',
          border: '1px solid rgba(43,193,150,0.3)',
          borderRadius: '9999px',
          marginBottom: '12px'
        }}>
          <span style={{ color: '#2bc196', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            KYC / Compliance
          </span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2bc196', margin: '0 0 8px 0' }}>
          Compliance Questionnaire
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', margin: 0 }}>
          Submitted by <span style={{ color: '#5cf7cf', fontWeight: '500' }}>{data.legal_business_name || '—'}</span>
        </p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '8px' }}>
          Submitted on {fmtDate(data.created_date)}
        </p>
      </div>

      {/* 1. Company Information */}
      <SectionTitle step="1" title="Company Information" />
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Field label="Applying For" value={data.applying_for} />
          <Field label="Payment Direction" value={data.payment_direction} />
          <Field label="Legal Business Name" value={data.legal_business_name} />
          <Field label="Trade Name (DBA)" value={data.trade_name_dba} />
          <Field label="Registered Country" value={data.registered_country} />
          <Field label="Company Type" value={data.company_type} />
          <Field label="Registered Address" value={data.registered_business_address} />
          <Field label="Physical Office Address" value={data.physical_office_address} />
          <Field label="Business Nature" value={data.business_nature} />
          <Field label="Corporate Website" value={data.corporate_website} />
          <Field label="Onboarding Product URL" value={data.onboarding_product_url} />
          <Field label="Regulatory Licenses" value={data.regulatory_licenses} />
          <Field label="Estimated Monthly Volume (USD)" value={fmtCurrency(data.estimated_monthly_volume_usd)} />
          <Field label="Estimated Avg. Transaction (USD)" value={fmtCurrency(data.estimated_avg_transaction_usd)} />
          <Field label="Countries of Operation" value={data.countries_of_operation} />
          <Field label="Years in Business" value={data.years_in_business ? `${data.years_in_business} years` : '—'} />
          <Field label="Tax Registration Number" value={data.tax_registration_number} />
        </div>
      </Card>

      {/* 2. UBOs */}
      <SectionTitle step="2" title="Ultimate Beneficial Owners (UBOs)" />
      {data.ubos?.length > 0 ? (
        <Card>
          {data.ubos.map((u, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px', padding: '12px', marginBottom: '8px'
            }}>
              <p style={{ color: '#2bc196', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                UBO #{i + 1}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Field label="Name" value={u.name} />
                <Field label="Nationality" value={u.nationality} />
                <Field label="Address" value={u.address} />
                <Field label="Ownership %" value={u.ownership_percentage ? `${u.ownership_percentage}%` : '—'} />
              </div>
            </div>
          ))}
        </Card>
      ) : (
        <Card><p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', margin: 0 }}>No UBOs informed</p></Card>
      )}

      {/* 3. Directors */}
      <SectionTitle step="3" title="Directors" />
      {data.directors_same_as_ubos ? (
        <Card>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontStyle: 'italic', margin: 0 }}>
            Directors are the same as the UBOs listed above.
          </p>
        </Card>
      ) : data.directors?.length > 0 ? (
        <Card>
          {data.directors.map((d, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px', padding: '12px', marginBottom: '8px'
            }}>
              <p style={{ color: '#2bc196', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                Director #{i + 1}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Field label="Job Title" value={d.job_title} />
                <Field label="Name" value={`${d.first_name || ''} ${d.last_name || ''}`.trim()} />
              </div>
            </div>
          ))}
        </Card>
      ) : (
        <Card><p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', margin: 0 }}>No directors informed</p></Card>
      )}

      {/* 4. Mandatory Contacts */}
      <SectionTitle step="4" title="Mandatory Contacts" />
      <Card>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px' }}>
            <p style={{ color: '#2bc196', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Accounting Contact</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <Field label="Name" value={data.accounting_contact_name} />
              <Field label="Email" value={data.accounting_contact_email} />
              <Field label="Invoice Address" value={data.accounting_invoice_address} />
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px' }}>
            <p style={{ color: '#2bc196', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Support Contact</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <Field label="Name" value={data.support_contact_name} />
              <Field label="Email" value={data.support_contact_email} />
              <Field label="Phone" value={data.support_contact_phone} />
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px' }}>
            <p style={{ color: '#2bc196', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Compliance & Disputes Contact</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Name" value={data.compliance_contact_name} />
              <Field label="Email" value={data.compliance_contact_email} />
            </div>
          </div>
        </div>
      </Card>

      {/* 5. Application: Regions & Payment Methods */}
      <SectionTitle step="5" title="Application" />
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Application Regions</p>
          {data.application_regions?.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {data.application_regions.map((r, i) => (
                <span key={i} style={{
                  padding: '4px 10px', borderRadius: '6px', fontSize: '12px',
                  background: 'rgba(43,193,150,0.1)', color: '#2bc196',
                  border: '1px solid rgba(43,193,150,0.2)'
                }}>{r}</span>
              ))}
            </div>
          ) : <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>—</span>}
        </div>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>Payment Methods</p>
          {data.payment_methods?.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {data.payment_methods.map((m, i) => (
                <span key={i} style={{
                  padding: '4px 10px', borderRadius: '6px', fontSize: '12px',
                  background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>{m}</span>
              ))}
            </div>
          ) : <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>—</span>}
        </div>
      </Card>

      {/* 6. Compliance Questions */}
      <SectionTitle step="6" title="Compliance Questions" />
      <Card>
        <ComplianceAnswer question="Is the merchant, its directors, UBOs, or any related party on any sanctions list?" value={data.q_sanctions_list} detail={data.q_sanctions_list_detail} />
        <ComplianceAnswer question="Is the merchant, its directors, or UBOs a Politically Exposed Person (PEP)?" value={data.q_pep} detail={data.q_pep_detail} />
        <ComplianceAnswer question="Does the merchant operate in, or have dealings with, any sanctioned country?" value={data.q_sanctioned_country} detail={data.q_sanctioned_country_detail} />
        <ComplianceAnswer question="Is any UBO or director of the merchant a national of, or resident in, a sanctioned country?" value={data.q_sanctioned_ownership} detail={data.q_sanctioned_ownership_detail} />
        <ComplianceAnswer question="Has the merchant, its directors, or UBOs had any previous dealings with Pagsmile?" value={data.q_pagsmile_dealings} detail={data.q_pagsmile_dealings_detail} />
        <ComplianceAnswer question="Is the merchant involved in any value exchange, virtual asset, or money transmission activity?" value={data.q_value_exchange} detail={data.q_value_exchange_detail} />
      </Card>

      {/* 7. Certification */}
      <SectionTitle step="7" title="Certification" />
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Field label="Certifier Name" value={data.certifier_name} />
          <Field label="Job Title" value={data.certifier_job_title} />
          <Field label="Email" value={data.certifier_email} />
          <Field label="Certification Date" value={fmtDate(data.certification_date)} />
        </div>
      </Card>

      {/* Footer */}
      <div style={{ textAlign: 'center', paddingTop: '24px', marginTop: '16px', borderTop: '1px solid rgba(43,193,150,0.2)' }}>
        <p style={{ color: 'rgba(43,193,150,0.4)', fontSize: '12px', margin: 0 }}>
          Pagsmile Limited • www.pagsmile.com
        </p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: '4px' }}>
          Confidential — Compliance Questionnaire
        </p>
      </div>
    </div>
  );
}