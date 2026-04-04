import React from "react";

const FeesPayment = ({ data, setData, files, setFiles, onFinalSubmit, onBack, saving }) => {
  const inputStyle =
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm transition";
  const labelStyle =
    "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <form onSubmit={onFinalSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm overflow-hidden relative">
        {/* <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-lg animate-pulse">
           Live Payment Gateway
        </div> */}

        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
            6
          </span>
          Registration Fees & Receipt
        </h3>

        {/* <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100 flex flex-col md:flex-row justify-between items-center gap-4">
           <div>
             <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Total Payable Amount</p>
             <p className="text-4xl font-black text-blue-900">₹ 2,500.00</p>
             <p className="text-[10px] text-blue-400 mt-1 font-medium">Inclusive of all taxes and processing fees</p>
           </div>
           <div className="bg-white px-6 py-4 rounded-lg border border-blue-200 shadow-sm text-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Status</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-green-200">
                 Payment Successful
              </span>
           </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelStyle}>Transaction Date</label>
            <input
              name="transactionDate"
              type="text"
              required
              className={inputStyle}
              value={data.transactionDate || ""}
              onChange={handleChange}
              placeholder="12-02-2026 11:55 am"
            />
          </div>
          <div>
            <label className={labelStyle}>Payment ID</label>
            <input
              name="paymentId"
              type="text"
              required
              className={inputStyle}
              value={data.paymentId || ""}
              onChange={handleChange}
              placeholder="cpayment_52300"
            />
          </div>
          <div>
            <label className={labelStyle}>Transaction ID</label>
            <input
              name="transactionId"
              type="text"
              required
              className={inputStyle}
              value={data.transactionId || ""}
              onChange={handleChange}
              placeholder="114205858636"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className={labelStyle}>
            Upload Fees Receipt <span className="text-red-500">*</span>
          </label>

          <div className="mt-2">
            <input
              type="file"
              name="feesReceipt"
              required={!data.documents?.feesReceipt && !files?.feesReceipt}
              accept="image/*,application/pdf"
              className={inputStyle}
              onChange={(e) => setFiles({ ...files, feesReceipt: e.target.files[0] })}
            />
          </div>
        </div>

        <div className="mt-10 p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex gap-4 items-start">
          <svg
            className="w-6 h-6 text-yellow-600 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="text-xs text-yellow-800 leading-relaxed">
            Please ensure the payment details match your bank receipt. Any
            discrepancy might lead to the rejection of your application. If your
            payment failed but amount was deducted, please wait for 24 hours
            before trying again.
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 font-bold hover:text-gray-900 transition flex items-center gap-2"
        >
          &larr; Back
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-red-600 text-white px-10 py-3 rounded-lg font-black uppercase tracking-wider hover:bg-red-700 transition shadow-lg shadow-red-200"
        >
          {saving ? "Processing..." : "CONFIRM & FINAL SUBMIT"}
        </button>
      </div>
    </form>
  );
};

export default FeesPayment;
