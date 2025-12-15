
import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  ChevronDown,
  CheckCircle2,
  Clock,
  RefreshCw,
  FileSpreadsheet,
  X,
  CreditCard,
  DollarSign
} from 'lucide-react';

// --- MOCK DATA ---

const INVOICES = [
  { id: 'TRX-2312-001', invoiceNo: '0012567', serial: 'C23TA', date: '2023-12-10', customer: 'Công ty TNHH Hưng Thịnh', taxCode: '0312345678', type: 'Thu ngay', amount: 15000000, vat: 1500000, total: 16500000, currency: 'VND', status: 'Đã phát hành', paymentMethod: 'Tiền mặt' },
  { id: 'TRX-2312-002', invoiceNo: '0012568', serial: 'C23TA', date: '2023-12-10', customer: 'Công ty Thép Hòa Phát', taxCode: '0101234567', type: 'Thu sau', amount: 45000000, vat: 4500000, total: 49500000, currency: 'VND', status: 'Đã phát hành', paymentMethod: 'Chuyển khoản' },
  { id: 'TRX-2312-003', invoiceNo: '0012569', serial: 'C23TA', date: '2023-12-11', customer: 'Đại lý Hàng Hải Vosa', taxCode: '0300987654', type: 'Thu sau', amount: 22000000, vat: 2200000, total: 24200000, currency: 'VND', status: 'Chờ ký số', paymentMethod: 'Chuyển khoản' },
  { id: 'TRX-2312-004', invoiceNo: '0012570', serial: 'C23TA', date: '2023-12-11', customer: 'Logistics Vina', taxCode: '0322222222', type: 'Thu ngay', amount: 5000000, vat: 500000, total: 5500000, currency: 'VND', status: 'Đã phát hành', paymentMethod: 'E-Banking' },
  { id: 'TRX-2312-005', invoiceNo: '0012571', serial: 'C23TA', date: '2023-12-12', customer: 'Xi Măng Hà Tiên', taxCode: '0333333333', type: 'Thu sau', amount: 120000000, vat: 12000000, total: 132000000, currency: 'VND', status: 'Đã phát hành', paymentMethod: 'Chuyển khoản' },
  { id: 'TRX-2312-006', invoiceNo: '0012572', serial: 'C23TA', date: '2023-12-12', customer: 'Global Shipping Line', taxCode: '0399998888', type: 'Thu ngay', amount: 2000, vat: 0, total: 2000, currency: 'USD', status: 'Đã phát hành', paymentMethod: 'Chuyển khoản' },
  { id: 'TRX-2312-007', invoiceNo: '0012573', serial: 'C23TA', date: '2023-12-13', customer: 'Công ty TNHH ABC', taxCode: '0344444444', type: 'Thu ngay', amount: 8500000, vat: 850000, total: 9350000, currency: 'VND', status: 'Đã phát hành', paymentMethod: 'Thẻ tín dụng' },
  { id: 'TRX-2312-008', invoiceNo: '0012574', serial: 'C23TA', date: '2023-12-13', customer: 'Tập đoàn Than Khoáng Sản', taxCode: '0105555555', type: 'Thu sau', amount: 250000000, vat: 25000000, total: 275000000, currency: 'VND', status: 'Đã phát hành', paymentMethod: 'Chuyển khoản' },
  { id: 'TRX-2312-009', invoiceNo: '0012575', serial: 'C23TA', date: '2023-12-14', customer: 'Maersk Line Vietnam', taxCode: '0301112233', type: 'Thu sau', amount: 5000, vat: 0, total: 5000, currency: 'USD', status: 'Đã phát hành', paymentMethod: 'Chuyển khoản' },
  { id: 'TRX-2312-010', invoiceNo: '0012576', serial: 'C23TA', date: '2023-12-14', customer: 'Thép Pomina', taxCode: '0301112233', type: 'Thu sau', amount: 88000000, vat: 8800000, total: 96800000, currency: 'VND', status: 'Đã phát hành', paymentMethod: 'Chuyển khoản' },
];

export const InvoiceReport: React.FC = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTaxCode, setFilterTaxCode] = useState('');
  const [filterPaymentType, setFilterPaymentType] = useState('ALL'); // ALL, THU_NGAY, THU_SAU
  const [filterCurrency, setFilterCurrency] = useState('ALL'); // ALL, VND, USD
  const [fromDate, setFromDate] = useState('2023-12-01');
  const [toDate, setToDate] = useState('2023-12-31');

  const filteredInvoices = INVOICES.filter(inv => {
    // 1. Text Search (Invoice No, Customer, ID)
    const matchesSearch = inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.invoiceNo.includes(searchTerm);
    
    // 2. Tax Code Filter
    const matchesTax = filterTaxCode ? inv.taxCode.includes(filterTaxCode) : true;

    // 3. Payment Type Filter (HTTT)
    const matchesPaymentType = filterPaymentType === 'ALL' || 
                               (filterPaymentType === 'THU_NGAY' && inv.type === 'Thu ngay') || 
                               (filterPaymentType === 'THU_SAU' && inv.type === 'Thu sau');

    // 4. Currency Filter
    const matchesCurrency = filterCurrency === 'ALL' || inv.currency === filterCurrency;

    return matchesSearch && matchesTax && matchesPaymentType && matchesCurrency;
  });

  const handlePrint = () => {
    window.print();
  };

  // Helper to clear filters
  const clearFilters = () => {
      setSearchTerm('');
      setFilterTaxCode('');
      setFilterPaymentType('ALL');
      setFilterCurrency('ALL');
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">
      
      {/* HEADER TITLE & ACTIONS */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
        <div>
           <h2 className="text-xl font-bold text-[#0F1B3D] flex items-center gap-2">
              <FileText className="text-blue-600" size={24} /> Báo Cáo Phát Hành Hóa Đơn
           </h2>
           <p className="text-sm text-gray-500 mt-1">Quản lý danh sách hóa đơn điện tử đã phát hành</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
           <button 
              onClick={() => {}}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-orange-300 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors text-sm shadow-sm"
           >
              <RefreshCw size={16} /> Nạp dữ liệu
           </button>

           <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm"
           >
              <Printer size={16} /> In Báo Cáo
           </button>
           <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-md transition-colors text-sm">
              <FileSpreadsheet size={16} /> Xuất Excel
           </button>
        </div>
      </div>

      {/* FILTER SECTION (New Requirement) */}
      <div className="px-6 py-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Date Range */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <Calendar size={12}/> Kỳ báo cáo
                    </label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 group focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                        <input 
                            type="date" 
                            className="bg-transparent text-sm text-gray-700 outline-none w-full px-2 cursor-pointer" 
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                        <span className="text-gray-400 px-1">-</span>
                        <input 
                            type="date" 
                            className="bg-transparent text-sm text-gray-700 outline-none w-full px-2 cursor-pointer" 
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tax Code */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <CreditCard size={12}/> Mã số thuế
                    </label>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Nhập MST..."
                            className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                            value={filterTaxCode}
                            onChange={(e) => setFilterTaxCode(e.target.value)}
                        />
                        {filterTaxCode && (
                            <button onClick={() => setFilterTaxCode('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* HTTT (Payment Type) */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 size={12}/> HTTT (Thu Ngay/Sau)
                    </label>
                    <div className="relative">
                        <select 
                            className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 cursor-pointer appearance-none text-gray-700 font-medium"
                            value={filterPaymentType}
                            onChange={(e) => setFilterPaymentType(e.target.value)}
                        >
                            <option value="ALL">Tất cả hình thức</option>
                            <option value="THU_NGAY">Thu Ngay</option>
                            <option value="THU_SAU">Thu Sau</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                    </div>
                </div>

                {/* Currency */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <DollarSign size={12}/> Loại tiền
                    </label>
                    <div className="relative">
                        <select 
                            className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 cursor-pointer appearance-none text-gray-700 font-medium"
                            value={filterCurrency}
                            onChange={(e) => setFilterCurrency(e.target.value)}
                        >
                            <option value="ALL">Tất cả loại tiền</option>
                            <option value="VND">VND</option>
                            <option value="USD">USD</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                    </div>
                </div>

            </div>
        </div>
      </div>

      {/* MAIN CONTENT - TABLE ONLY */}
      <div className="flex-1 px-6 pb-6 flex flex-col overflow-hidden">
         
         {/* TABLE CONTAINER */}
         <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1">
            
            {/* Table Toolbar */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
               
               <div className="text-sm text-gray-600">
                  <span className="font-bold text-[#0F1B3D]">{filteredInvoices.length}</span> hóa đơn phù hợp
                  {(filterPaymentType !== 'ALL' || filterCurrency !== 'ALL' || filterTaxCode) && (
                      <button onClick={clearFilters} className="ml-3 text-xs text-red-500 hover:underline">Xóa bộ lọc</button>
                  )}
               </div>

               {/* Search */}
               <div className="relative w-full md:w-auto">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Tìm tên KH, số hóa đơn..." 
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-full md:w-72 bg-white transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
            </div>

            {/* Table Grid */}
            <div className="flex-1 overflow-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#EBF1F8] text-[#0F1B3D] font-bold border-b border-gray-100 text-xs uppercase sticky top-0 z-10 shadow-sm">
                     <tr>
                        <th className="px-6 py-3">Mã Giao Dịch</th>
                        <th className="px-6 py-3">Số Hóa Đơn</th>
                        <th className="px-6 py-3">Ngày HĐ</th>
                        <th className="px-6 py-3">Khách Hàng / Mã Số Thuế</th>
                        <th className="px-6 py-3 text-center">HTTT</th>
                        <th className="px-6 py-3 text-center">Tiền Tệ</th>
                        <th className="px-6 py-3 text-right">Tiền Hàng</th>
                        <th className="px-6 py-3 text-right">VAT (10%)</th>
                        <th className="px-6 py-3 text-right">Tổng Cộng</th>
                        <th className="px-6 py-3 text-center">PT Thanh Toán</th>
                        <th className="px-6 py-3 text-center">Trạng Thái</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {filteredInvoices.length > 0 ? (
                        filteredInvoices.map((inv) => (
                            <tr key={inv.id} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="px-6 py-4 text-gray-500 font-medium">{inv.id}</td>
                                <td className="px-6 py-4 font-bold text-blue-600">
                                    {inv.invoiceNo}
                                    <span className="block text-xs text-gray-400 font-normal">{inv.serial}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{inv.date}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-800">{inv.customer}</div>
                                    <div className="text-xs text-gray-400">{inv.taxCode || 'Khách lẻ'}</div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {inv.type === 'Thu ngay' ? (
                                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded border border-emerald-100">Thu ngay</span>
                                    ) : (
                                        <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded border border-amber-100">Thu sau</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center text-xs font-bold text-gray-600">
                                    {inv.currency}
                                </td>
                                <td className="px-6 py-4 text-right text-gray-600">{inv.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right text-gray-600">{inv.vat.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right font-bold text-[#0F1B3D]">{inv.total.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center text-xs text-gray-500">{inv.paymentMethod}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className={`flex items-center justify-center gap-1.5 text-xs font-medium 
                                        ${inv.status === 'Đã phát hành' ? 'text-green-600' : 'text-orange-500'}`}>
                                        {inv.status === 'Đã phát hành' ? <CheckCircle2 size={14}/> : <Clock size={14}/>}
                                        {inv.status}
                                    </div>
                                </td>
                            </tr>
                        ))
                     ) : (
                        <tr>
                            <td colSpan={11} className="px-6 py-12 text-center text-gray-500">
                                <div className="flex flex-col items-center justify-center">
                                    <FileText size={48} className="text-gray-200 mb-2" />
                                    <p>Không tìm thấy hóa đơn nào phù hợp với bộ lọc.</p>
                                    <button onClick={clearFilters} className="mt-2 text-blue-600 font-medium hover:underline text-sm">Xóa bộ lọc</button>
                                </div>
                            </td>
                        </tr>
                     )}
                  </tbody>
                  {/* Footer Total */}
                  <tfoot className="bg-gray-50 border-t border-gray-200 font-bold text-sm text-gray-700 sticky bottom-0 z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                      <tr>
                          <td colSpan={6} className="px-6 py-4 text-right uppercase">Tổng cộng trang này (VND):</td>
                          <td className="px-6 py-4 text-right">
                              {filteredInvoices.filter(i => i.currency === 'VND').reduce((a, b) => a + b.amount, 0).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                              {filteredInvoices.filter(i => i.currency === 'VND').reduce((a, b) => a + b.vat, 0).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right text-blue-700">
                              {filteredInvoices.filter(i => i.currency === 'VND').reduce((a, b) => a + b.total, 0).toLocaleString()}
                          </td>
                          <td colSpan={2}></td>
                      </tr>
                  </tfoot>
               </table>
            </div>
         </div>

      </div>
    </div>
  );
};
