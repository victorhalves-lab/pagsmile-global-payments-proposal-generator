import JSZip from 'jszip';
import { toast } from 'sonner';

function sanitizeName(name) {
  return (name || 'document').replace(/[^a-zA-Z0-9-_ ]/g, '').trim().replace(/\s+/g, '_') || 'document';
}

function getExtFromUrl(url) {
  try {
    const u = new URL(url);
    const pathname = u.pathname;
    const last = pathname.split('/').pop() || '';
    const m = last.match(/\.([a-zA-Z0-9]{2,4})$/);
    return m ? m[1].toLowerCase() : '';
  } catch {
    return '';
  }
}

function getExtFromContentType(contentType) {
  if (!contentType) return '';
  const map = {
    'application/pdf': 'pdf',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'text/plain': 'txt',
    'text/csv': 'csv',
  };
  return map[contentType.split(';')[0].trim().toLowerCase()] || '';
}

export async function downloadComplianceDocsAsZip(docs, opts = {}) {
  const { zipName = 'compliance-documents', toastLabel = 'documents' } = opts;

  if (!docs || docs.length === 0) {
    toast.error('No documents to download');
    return;
  }

  const toastId = toast.loading(`Preparing ${toastLabel}...`);

  try {
    const zip = new JSZip();
    const usedNames = new Set();

    const results = await Promise.allSettled(
      docs.map(async (doc) => {
        const res = await fetch(doc.url, { mode: 'cors' });
        if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
        const blob = await res.blob();
        return { doc, blob, contentType: res.headers.get('content-type') };
      })
    );

    let successCount = 0;
    let failCount = 0;

    results.forEach((r) => {
      if (r.status !== 'fulfilled') {
        failCount++;
        return;
      }
      const { doc, blob, contentType } = r.value;
      let ext = getExtFromUrl(doc.url) || getExtFromContentType(contentType);
      const base = sanitizeName(doc.label);
      let name = ext ? `${base}.${ext}` : base;

      // Avoid duplicate filenames
      if (usedNames.has(name.toLowerCase())) {
        let i = 1;
        const stem = ext ? base : name;
        while (usedNames.has(`${stem}_${i}${ext ? '.' + ext : ''}`.toLowerCase())) i++;
        name = ext ? `${base}_${i}.${ext}` : `${base}_${i}`;
      }
      usedNames.add(name.toLowerCase());
      zip.file(name, blob);
      successCount++;
    });

    if (successCount === 0) {
      toast.dismiss(toastId);
      toast.error('Could not download any documents. Check your connection and try again.');
      return;
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${zipName}-${new Date().toISOString().split('T')[0]}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.dismiss(toastId);
    if (failCount > 0) {
      toast.warning(`${successCount} downloaded, ${failCount} failed`);
    } else {
      toast.success('ZIP downloaded successfully!');
    }
  } catch (error) {
    toast.dismiss(toastId);
    toast.error('Error generating ZIP');
    console.error(error);
  }
}