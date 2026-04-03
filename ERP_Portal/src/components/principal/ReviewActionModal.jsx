import React, { useState } from 'react';

const ReviewActionModal = ({ isOpen, onClose, onSubmit, status }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const getTitle = () => {
    switch (status) {
      case 'REJECTED': return 'Reject Application';
      case 'NEEDS_UPDATE': return 'Request Correction';
      default: return 'Review Application';
    }
  };

  const getButtonColor = () => {
    switch (status) {
      case 'REJECTED': return 'bg-red-600 hover:bg-red-700';
      case 'NEEDS_UPDATE': return 'bg-orange-600 hover:bg-orange-700';
      default: return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  const handleConfirm = async () => {
    if (status === 'REJECTED' || status === 'NEEDS_UPDATE') {
      if (!message.trim()) {
        alert('Please provide a reason or instruction.');
        return;
      }
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(message);
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900">{getTitle()}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            {status === 'REJECTED' 
              ? 'Are you sure you want to reject this application? This action will notify the student.' 
              : 'Specify exactly what needs to be changed in the application. This will be sent as an email to the student.'}
          </p>
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder={status === 'REJECTED' ? "Reason for rejection..." : "Instructions for student (e.g., 'Please re-upload your 10th marksheet with a clearer scan.')"}
          />
        </div>
        
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className={`px-6 py-2 text-sm font-bold text-white rounded-lg shadow-sm transition-all flex items-center gap-2 ${getButtonColor()} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Confirm {status === 'REJECTED' ? 'Rejection' : 'Request'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewActionModal;
