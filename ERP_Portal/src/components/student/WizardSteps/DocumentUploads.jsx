import React from 'react';
import { Button } from '../../ui/Button';

const DocumentUploads = ({ data, files, setFiles, onNext, onBack }) => {
  const labelStyle = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2";
  const fileInputStyle = "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 italic transition cursor-pointer border border-gray-200 rounded-lg p-2";
  
  const handleFileChange = (e, field) => {
    if (e.target.files[0]) {
      setFiles({ ...files, [field]: e.target.files[0] });
    }
  };
  

  // Preview modal state
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewSrc, setPreviewSrc] = React.useState(null);
  const [previewType, setPreviewType] = React.useState(null); // 'image' | 'pdf'
  const objectUrlRef = React.useRef(null);

  const openPreview = (fileOrUrl) => {
    // fileOrUrl can be a File object or an existing URL string
    if (!fileOrUrl) return;
    // If it's a File, create object URL
    if (fileOrUrl instanceof File) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      const url = URL.createObjectURL(fileOrUrl);
      objectUrlRef.current = url;
      setPreviewSrc(url);
      const type = fileOrUrl.type || '';
      setPreviewType(type.includes('pdf') ? 'pdf' : type.startsWith('image') ? 'image' : 'image');
    } else if (typeof fileOrUrl === 'string') {
      // simple heuristic from url: check extension
      const lower = fileOrUrl.toLowerCase();
      setPreviewSrc(fileOrUrl);
      if (lower.endsWith('.pdf')) setPreviewType('pdf');
      else setPreviewType('image');
    }
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewSrc(null);
    setPreviewType(null);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  React.useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const uploadFields = [
    { id: 'photo', label: 'Passport Size Photo', accept: 'image/*', required: !data.media?.photo },
    { id: 'signature', label: 'Student Signature', accept: 'image/*', required: !data.media?.signature },
    { id: 'tenthMarkSheet', label: '10th Marksheet (PDF/JPG)', accept: '.jpg,.jpeg,.png,.pdf', required: !data.documents?.tenthMarkSheet },
    { id: 'twelfthMarkSheet', label: '12th Marksheet (PDF/JPG)', accept: '.jpg,.jpeg,.png,.pdf', required: !data.documents?.twelfthMarkSheet },
    { id: 'migrationCertificate', label: 'Migration Certificate (PDF/JPG)', accept: '.jpg,.jpeg,.png,.pdf', required: !data.documents?.migrationCertificate },
    { id: 'idProof', label: 'ID Proof (Aadhar/Passport)', accept: '.jpg,.jpeg,.png,.pdf', required: !data.documents?.idProof },
    { id: 'rankCard', label: 'Admission/DCECE Rank Card', accept: '.jpg,.jpeg,.png,.pdf', required: !data.documents?.rankCard },
    { id: 'casteCertificate', label: 'Caste Certificate (If applicable)', accept: '.jpg,.jpeg,.png,.pdf', required: false },
  ];
  
  return (
    <>
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">5</span>
          Document Uploads & Media
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {uploadFields.map((field) => (
            <div key={field.id} className="relative group">
              <label className={labelStyle}>{field.label} {field.required && <span className="text-red-500">*</span>}</label>
              <input 
                type="file" 
                accept={field.accept} 
                // required={field.required}
                className={fileInputStyle}
                onChange={(e) => handleFileChange(e, field.id)}
              />
              {(files[field.id] || (field.id === 'photo' ? data.media?.photo : field.id === 'signature' ? data.media?.signature : data.documents?.[field.id])) && (
                <div className="mt-1 flex items-center gap-3">
                  <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {files[field.id] ? files[field.id].name : 'Document Uploaded'}
                  </span>

                  {/* Preview button */}
                  <button
                    type="button"
                    onClick={() => {
                      const current = files[field.id];
                      if (current) openPreview(current);
                      else {
                        // fallback to existing URL from data
                        const existing = field.id === 'photo' ? data.media?.photo : field.id === 'signature' ? data.media?.signature : data.documents?.[field.id];
                        if (existing) openPreview(existing);
                      }
                    }}
                    className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                  >
                    Preview
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-[10px] text-gray-400 font-medium uppercase tracking-widest italic">
          Max file size: 2MB per document. Supported formats: JPG, PNG, PDF.
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="text-gray-600 font-bold hover:text-gray-900 transition flex items-center gap-2">
           &larr; Back
        </button>
        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          Save & Continue &rarr;
        </button>
      </div>
  </form>
    {/* Preview Modal */}
    {previewOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-auto rounded-lg shadow-lg relative">
          <div className="flex items-center justify-between p-4 border-b">
            <h4 className="font-bold">Document Preview</h4>
            <button onClick={closePreview} className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md">Close</button>
          </div>
          <div className="p-4 flex items-center justify-center">
            {previewType === 'pdf' ? (
              // Use embed/object for PDFs; width/height constrained
              <object data={previewSrc} type="application/pdf" width="100%" height="600">
                <p className="text-sm text-gray-600">PDF preview not available. <a href={previewSrc} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open in new tab</a></p>
              </object>
            ) : (
              // image preview
              <img src={previewSrc} alt="preview" className="max-h-[70vh] object-contain" />
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default DocumentUploads;
