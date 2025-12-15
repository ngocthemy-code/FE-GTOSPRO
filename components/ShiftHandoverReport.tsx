
import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  Download, 
  Calendar, 
  Filter,
  Ship,
  ChevronDown,
  X
} from 'lucide-react';

// --- MOCK DATA ---
const HANDOVER_DATA = [
  { id: 1, truck: '29C-123.45', mooc: '29R-001', customer: 'Nhiệt điện Thái Bình', cargo: 'Than đá', qty: 32500, note: 'Hàng ẩm' },
  { id: 2, truck: '15C-888.99', mooc: '15R-222', customer: 'Hòa Phát Steel', cargo: 'Quặng sắt', qty: 31200, note: '' },
  { id: 3, truck: '51D-456.78', mooc: '51R-333', customer: 'Xi măng Vicem', cargo: 'Thạch cao', qty: 33100, note: '' },
  { id: 4, truck: '29H-999.88', mooc: '29R-444', customer: 'Nhiệt điện Thái Bình', cargo: 'Than đá', qty: 30500, note: 'Tạm dừng 15p' },
  { id: 5, truck: '14C-111.22', mooc: '14R-555', customer: 'Vận tải Biển Đông', cargo: 'Dăm gỗ', qty: 15400, note: '' },
  { id: 6, truck: '16H-333.44', mooc: '16R-666', customer: 'Hòa Phát Steel', cargo: 'Quặng sắt', qty: 32000, note: '' },
  { id: 7, truck: '29C-555.66', mooc: '29R-777', customer: 'Nhiệt điện Thái Bình', cargo: 'Than đá', qty: 31800, note: '' },
  { id: 8, truck: '29C-777.88', mooc: '29R-888', customer: 'Xi măng Vicem', cargo: 'Clinker', qty: 28900, note: 'Bụi nhiều' },
];

export const ShiftHandoverReport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('2025-12-15 00:00:00');
  const [toDate, setToDate] = useState('2025-12-15 23:59:59');

  const filteredData = HANDOVER_DATA.filter(item => 
    item.truck.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportExcel = () => {
    // 1. Prepare Data for CSV
    const header = ['STT', 'So Xe', 'So Mooc', 'Chu Hang', 'Loai Hang', 'So Luong', 'Ghi Chu'];
    const rows = filteredData.map((item, index) => [
      index + 1,
      item.truck,
      item.mooc,
      item.customer,
      item.cargo,
      item.qty,
      item.note
    ]);

    // 2. Convert to CSV string
    const csvContent = [
      header.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");
    
    // 3. Create Blob with BOM for Unicode support
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 4. Trigger Download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `BaoCaoGiaoCa_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA] p-6">
      
      {/* 1. HEADER & ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
           <h2 className="text-2xl font-bold text-[#0F1B3D] uppercase tracking-tight">Báo Cáo Giao Ca</h2>
           <p className="text-sm text-gray-500">Quản lý danh sách bàn giao công việc trong ca</p>
        </div>
        <div className="flex gap-2">
           <button 
              className="flex items-center gap-2 px-4 py-2 bg-white border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 font-medium transition-colors text-sm shadow-sm"
              onClick={() => {}}
           >
              <RefreshCw size={16} /> Nạp dữ liệu
           </button>
           <button 
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-green-600 text-green-700 rounded-lg hover:bg-green-50 font-medium transition-colors text-sm shadow-sm"
           >
              <Download size={16} /> Xuất báo cáo
           </button>
        </div>
      </div>

      {/* 2. FILTER SECTION */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
            
            {/* Row 1 */}
            <div className="lg:col-span-2">
               <label className="block text-xs font-bold text-gray-500 mb-1.5">Thông tin tàu</label>
               <div className="relative">
                  <input 
                    type="text" 
                    defaultValue="BIEN DONG STAR | 0912N | 0912X | 09/12/2025"
                    className="w-full pl-3 pr-16 py-2 border border-gray-200 rounded text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Search size={14} className="text-orange-400 cursor-pointer" />
                      <X size={14} className="text-gray-300 cursor-pointer hover:text-red-500" />
                  </div>
               </div>
            </div>

            <div>
               <label className="block text-xs font-bold text-gray-500 mb-1.5">Hàng hóa</label>
               <div className="relative">
                  <select className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded text-sm text-gray-700 outline-none focus:border-blue-500 bg-white appearance-none cursor-pointer">
                      <option>Tất cả</option>
                      <option>Than đá</option>
                      <option>Quặng sắt</option>
                      <option>Thạch cao</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-gray-500 mb-1.5">Phương án</label>
                   <div className="relative">
                      <select className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded text-sm text-gray-700 outline-none focus:border-blue-500 bg-white appearance-none cursor-pointer">
                          <option>Tất cả</option>
                          <option>Nhập tàu</option>
                          <option>Xuất tàu</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-500 mb-1.5">Máng / Tổ</label>
                   <div className="relative">
                      <select className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded text-sm text-gray-700 outline-none focus:border-blue-500 bg-white appearance-none cursor-pointer">
                          <option>Tất cả</option>
                          <option>Tổ 1</option>
                          <option>Tổ 2</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="lg:col-span-2 flex items-center gap-4">
                <div className="flex-1">
                   <label className="block text-xs font-bold text-gray-500 mb-1.5">Từ ngày</label>
                   <div className="relative">
                      <input 
                        type="text" 
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded text-sm text-gray-700 outline-none focus:border-blue-500"
                      />
                   </div>
                </div>
                <span className="text-gray-400 mt-6">~</span>
                <div className="flex-1">
                   <label className="block text-xs font-bold text-gray-500 mb-1.5">Đến ngày</label>
                   <div className="relative">
                      <input 
                        type="text" 
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded text-sm text-gray-700 outline-none focus:border-blue-500"
                      />
                   </div>
                </div>
            </div>

         </div>
      </div>

      {/* 3. TOOLBAR & SEARCH */}
      <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-sm font-medium text-gray-600">Tìm:</span>
              <div className="relative flex-1">
                  <input 
                    type="text" 
                    className="w-full pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm outline-none focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
          </div>
          <div className="text-sm text-gray-600">
              Số dòng: <span className="font-bold">{filteredData.length}</span>
          </div>
      </div>

      {/* 4. DATA TABLE */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-[#EBF1F8] text-[#0F1B3D] sticky top-0 z-10 font-bold uppercase text-xs">
                      <tr>
                          <th className="px-4 py-3 border-b border-gray-200 w-16 text-center">STT</th>
                          <th className="px-4 py-3 border-b border-gray-200 w-32">Số xe</th>
                          <th className="px-4 py-3 border-b border-gray-200 w-32">Số mooc</th>
                          <th className="px-4 py-3 border-b border-gray-200">Chủ hàng</th>
                          <th className="px-4 py-3 border-b border-gray-200">Loại hàng</th>
                          <th className="px-4 py-3 border-b border-gray-200 text-right">Số lượng</th>
                          <th className="px-4 py-3 border-b border-gray-200">Ghi chú</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {filteredData.length > 0 ? (
                          filteredData.map((row, index) => (
                              <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                                  <td className="px-4 py-2.5 text-center text-gray-500">{index + 1}</td>
                                  <td className="px-4 py-2.5 font-bold text-gray-800">{row.truck}</td>
                                  <td className="px-4 py-2.5 text-gray-600">{row.mooc}</td>
                                  <td className="px-4 py-2.5 text-gray-700">{row.customer}</td>
                                  <td className="px-4 py-2.5 text-gray-700">{row.cargo}</td>
                                  <td className="px-4 py-2.5 text-right font-medium text-blue-700">{row.qty.toLocaleString()}</td>
                                  <td className="px-4 py-2.5 text-gray-500 italic text-xs">{row.note}</td>
                              </tr>
                          ))
                      ) : (
                          <tr>
                              <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                                  ----------- Không có dữ liệu hiển thị -----------
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>

    </div>
  );
};
