import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export async function downloadProposalAsPNG(proposal, containerId = 'proposal-download-content') {
  const element = document.getElementById(containerId);
  if (!element) {
    toast.error('Elemento não encontrado');
    return;
  }
  
  const toastId = toast.loading('Gerando imagem...');
  
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#002443',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    
    toast.dismiss(toastId);
    
    const link = document.createElement('a');
    link.download = `proposta-${proposal.client_name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    toast.success('Imagem baixada com sucesso!');
  } catch (error) {
    toast.dismiss(toastId);
    toast.error('Erro ao gerar imagem');
    console.error(error);
  }
}

export async function downloadProposalAsPDF(proposal, containerId = 'proposal-download-content') {
  const element = document.getElementById(containerId);
  if (!element) {
    toast.error('Elemento não encontrado');
    return;
  }
  
  const toastId = toast.loading('Gerando PDF...');
  
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#002443',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    
    toast.dismiss(toastId);
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // A4 dimensions in points (595.28 x 841.89)
    const pdfWidth = 595.28;
    const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
    
    const pdf = new jsPDF({
      orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
      unit: 'pt',
      format: [pdfWidth, pdfHeight]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`proposta-${proposal.client_name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast.success('PDF baixado com sucesso!');
  } catch (error) {
    toast.dismiss(toastId);
    toast.error('Erro ao gerar PDF');
    console.error(error);
  }
}