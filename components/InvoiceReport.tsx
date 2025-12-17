
import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Search, 
  Printer, 
  CheckCircle2,
  Clock,
  RefreshCw,
  FileSpreadsheet,
  X,
  CreditCard,
  DollarSign,
  ChevronDown
} from 'lucide-react';

const INVOICES = [
  { id: 'TRX-2312-001', invoiceNo: '0012567', serial: 'C23TA', date: '2023-12-10', customer: 'Công ty TNHH Hưng Thịnh', taxCode: '0312345678', type: 'Thu ngay', amount: 15000000, vat: 1500000, total: 16500000, currency: 'VND', status: 'Đã phát hành', paymentMethod: 'Tiền mặt' },
  { id: 'TRX-2312-002', invoiceNo: '0012568', serial: 'C23TA', date: '2023-12-10', customer: 'Công ty Thép Hòa Phát', taxCode: '0101234567', type: 'Thu sau', amount: 45000000, vat: 4500000, total: 49500000, currency: 'VND', status: 'Đã phát hành', paymentMethod: 'Chuyển khoản' },
];

export const InvoiceReport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">
      {/* HEADER TITLE & ACTIONS */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
        <div>
           <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <FileText className="text-blue-600" size={24} /> Báo Cáo Phát Hành Hóa Đơn
           </h2>
           <p className="text-sm text-slate-500 mt-1">Quản lý danh sách hóa đơn điện tử đã phát hành</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
           <button className="flex items-center gap-2 px-3 py-2 bg-white border border-orange-300 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors text-sm shadow-sm">
              <RefreshCw size={16} /> Nạp dữ liệu
           </button>
           <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm shadow-sm">
              <Printer size={16} /> In Báo Cáo
           </button>
           <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-sm transition-colors text-sm">
              <FileSpreadsheet size={16} /> Xuất Excel
           </button>
        </div>
      </div>

      {/* FILTER SECTION (Simplified) */}
      <div className="px-6 py-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <Calendar size={12}/> Kỳ báo cáo
                    </label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-2">
                        <input type="date" className="bg-transparent text-sm text-slate-700 outline-none w-full cursor-pointer" />
                    </div>
                </div>
                {/* Other filters... */}
            </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 px-6 pb-6 flex flex-col overflow-hidden">
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="px-6 py-4 border-b border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="text-sm text-slate-600">
                  <span className="font-bold text-[#0F172A]">{INVOICES.length}</span> hóa đơn phù hợp
               </div>
               <div className="relative w-full md:w-auto">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Tìm tên KH, số hóa đơn..." 
                    className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-full md:w-72 bg-white transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
            </div>

            <div className="flex-1 overflow-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#F8FAFC] text-slate-600 font-bold border-b border-slate-200 text-xs uppercase sticky top-0 z-10 shadow-sm">
                     <tr>
                        <th className="px-6 py-3">Số Hóa Đơn</th>
                        <th className="px-6 py-3">Ngày HĐ</th>
                        <th className="px-6 py-3">Khách Hàng</th>
                        <th className="px-6 py-3 text-center">HTTT</th>
                        <th className="px-6 py-3 text-right">Tổng Cộng</th>
                        <th className="px-6 py-3 text-center">Trạng Thái</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {INVOICES.map((inv) => (
                        <tr key={inv.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="px-6 py-4 font-bold text-blue-600">{inv.invoiceNo}</td>
                            <td className="px-6 py-4 text-slate-600">{inv.date}</td>
                            <td className="px-6 py-4 font-bold text-slate-800">{inv.customer}</td>
                            <td className="px-6 py-4 text-center">
                                <span className={`px-2 py-1 text-xs font-bold rounded border ${inv.type === 'Thu ngay' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                    {inv.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-[#0F172A]">{inv.total.toLocaleString()}</td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-green-600">
                                    <CheckCircle2 size={14}/> {inv.status}
                                </div>
                            </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};
