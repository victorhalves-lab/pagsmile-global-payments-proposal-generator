import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export async function downloadComplianceAsPDF(data, containerId = 'compliance-download-content') {
  const element = document.getElementById(containerId);
  if (!element) {
    toast.error('Element not found');
    return;
  }

  const toastId = toast.loading('Generating PDF...');

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

    const pdfWidth = 595.28;
    const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

    const pdf = new jsPDF({
      orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
      unit: 'pt',
      format: [pdfWidth, pdfHeight]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    const safeName = (data.legal_business_name || 'compliance').replace(/\s+/g, '-');
    pdf.save(`compliance-${safeName}-${new Date().toISOString().split('T')[0]}.pdf`);

    toast.success('PDF downloaded successfully!');
  } catch (error) {
    toast.dismiss(toastId);
    toast.error('Error generating PDF');
    console.error(error);
  }
}