
import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  Download, 
  Printer, 
  Filter, 
  ChevronDown, 
  X,
  Calendar,
  Ship,
  FileSpreadsheet
} from 'lucide-react';

// --- MOCK DATA BASED ON IMAGE ---
const IO_DATA = [
  { 
    id: 1, 
    bill: '', 
    owner: '', 
    plan: 'NHẬP BÃI', 
    stevedore: 'TAU - DAU BAI', 
    cargo: 'Cáp cuộn', 
    unit: '', 
    qty: 28, 
    weight: 27.814, 
    volume: '', 
    completedAt: '10/12/2025 14:51:25', 
    berthCrane: 'CT01', 
    yardCrane: '', 
    team: '', 
    pol: '', 
    pod: '', 
    fpod: '', 
    customs: 'Đã thanh lý', 
    type: '', 
    note: 'Lem dơ' 
  },
  { 
    id: 2, 
    bill: '0912-01', 
    owner: '', 
    plan: 'GIAO THẲNG', 
    stevedore: 'TAU - SALAN', 
    cargo: 'Băng nóng', 
    unit: '', 
    qty: 22, 
    weight: 28.600, 
    volume: '', 
    completedAt: '12/12/2025 12:43:23', 
    berthCrane: '', 
    yardCrane: '', 
    team: '', 
    pol: '', 
    pod: '', 
    fpod: '', 
    customs: 'Đã thanh lý', 
    type: '', 
    note: 'Lem dơ' 
  },
  { 
    id: 3, 
    bill: '0912-01', 
    owner: '', 
    plan: 'GIAO THẲNG', 
    stevedore: 'TAU - SALAN', 
    cargo: 'Băng nóng', 
    unit: '', 
    qty: 15, 
    weight: 19.500, 
    volume: '10/12/2025 15:03:41', 
    completedAt: '10/12/2025 15:03:41', 
    berthCrane: 'CT01', 
    yardCrane: '', 
    team: '', 
    pol: '', 
    pod: '', 
    fpod: '', 
    customs: 'Đã thanh lý', 
    type: '', 
    note: 'Cong cấn mép' 
  },
  { 
    id: 4, 
    bill: '0912-02', 
    owner: '', 
    plan: 'GIAO THẲNG', 
    stevedore: 'TAU - SALAN', 
    cargo: 'Cáp cuộn', 
    unit: '', 
    qty: 10, 
    weight: 5.015, 
    volume: '', 
    completedAt: '11/12/2025 15:51:43', 
    berthCrane: '', 
    yardCrane: '', 
    team: '', 
    pol: '', 
    pod: '', 
    fpod: '', 
    customs: 'Đã thanh lý', 
    type: '', 
    note: 'Dính dầu' 
  },
];

export const VesselIOReport: React.FC = () => {
  const [reportType, setReportType] = useState<'import' | 'export'>('import');
  const [searchTerm, setSearchTerm] = useState('');

  const handleExportExcel = () => {
    // 1. Prepare Header (Fixed Spelling)
    const header = [
      'STT', 
      'Số vận đơn/Booking', 
      'Chủ hàng', 
      'Phương án', 
      'Phương án xếp dỡ', 
      'Hàng hóa', 
      'ĐVT', 
      'Số lượng', 
      'Trọng lượng', 
      'Thể tích', 
      'Ngày hoàn tất', 
      'Cầu bờ', 
      'Cầu bãi', 
      'Tổ đội công nhân', 
      'POL', 
      'POD', 
      'FPOD', 
      'Tình trạng HQ', 
      'Loại hình', 
      'Ghi chú'
    ];

    // 2. Prepare Rows
    const rows = IO_DATA.map((item, index) => [
      index + 1,
      item.bill,
      item.owner,
      item.plan,
      item.stevedore,
      item.cargo,
      item.unit,
      item.qty,
      item.weight,
      item.volume,
      item.completedAt,
      item.berthCrane,
      item.yardCrane,
      item.team,
      item.pol,
      item.pod,
      item.fpod,
      item.customs,
      item.type,
      item.note
    ]);

    // 3. Convert to CSV
    const csvContent = [
      header.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");
    
    // 4. Download
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `BaoCaoNhapXuatTau_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA] p-6">
      
      {/* 1. HEADER TITLE & ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
           <h2 className="text-2xl font-bold text-[#0F1B3D] uppercase tracking-tight">Báo Cáo Nhập Xuất Tàu</h2>
           <p className="text-sm text-gray-500">Quản lý và thống kê sản lượng xếp dỡ theo tàu</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-orange-300 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors shadow-sm text-sm">
              <RefreshCw size={16} /> Nạp dữ liệu
           </button>
           <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm"
           >
              <Printer size={16} /> In báo cáo
           </button>
           <button 
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-green-600 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors shadow-sm text-sm"
           >
              <FileSpreadsheet size={16} /> Xuất Excel
           </button>
        </div>
      </div>

      {/* 2. FILTER SECTION */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            
            {/* Row 1: Import */}
            <div className="flex items-start gap-4 p-3 bg-blue-50/30 rounded-lg border border-blue-50">
                <div className="flex items-center gap-2 shrink-0 pt-2">
                    <input 
                        type="radio" 
                        id="radio-import" 
                        name="reportType" 
                        checked={reportType === 'import'} 
                        onChange={() => setReportType('import')}
                        className="w-4 h-4 text-blue-600 cursor-pointer accent-blue-600"
                    />
                    <label htmlFor="radio-import" className="font-bold text-[#0F1B3D] cursor-pointer select-none">Nhập tàu</label>
                </div>
                
                <div className="flex-1 grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-2">
                        <label className="w-24 text-gray-500 text-xs font-bold">Thông tin tàu</label>
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                defaultValue="BIEN DONG STAR | 0912N | 0912X | 09/12/2025"
                                className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded text-sm text-gray-700 focus:border-blue-500 outline-none transition-all bg-white"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <Search size={14} className="text-orange-400 cursor-pointer"/>
                                <X size={14} className="text-gray-300 cursor-pointer hover:text-red-500"/>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <label className="w-24 text-gray-500 text-xs font-bold">Chủ hàng</label>
                            <input 
                                type="text" 
                                placeholder="Chủ hàng"
                                className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm text-gray-700 focus:border-blue-500 outline-none bg-white"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="w-20 text-gray-500 text-xs font-bold text-right">Cầu bờ</label>
                            <div className="flex-1 relative">
                                <select className="w-full px-3 py-2 border border-gray-200 rounded text-sm text-gray-700 focus:border-blue-500 outline-none appearance-none bg-white cursor-pointer">
                                    <option>Chọn cầu bờ</option>
                                    <option>B1</option>
                                    <option>B2</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Export */}
            <div className="flex items-start gap-4 p-3 bg-orange-50/30 rounded-lg border border-orange-50">
                <div className="flex items-center gap-2 shrink-0 pt-2">
                    <input 
                        type="radio" 
                        id="radio-export" 
                        name="reportType" 
                        checked={reportType === 'export'} 
                        onChange={() => setReportType('export')}
                        className="w-4 h-4 text-blue-600 cursor-pointer accent-blue-600"
                    />
                    <label htmlFor="radio-export" className="font-bold text-[#0F1B3D] cursor-pointer select-none">Xuất tàu</label>
                </div>
                
                <div className="flex-1 grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-2">
                        <label className="w-24 text-gray-500 text-xs font-bold">ETA/ETD</label>
                        <div className="flex-1 grid grid-cols-2 gap-2">
                             <input type="text" defaultValue="ETA" className="px-3 py-2 border border-gray-200 rounded text-sm text-gray-700 bg-gray-50" readOnly />
                             <input type="text" defaultValue="09/12/2025 10:08:00" className="px-3 py-2 border border-gray-200 rounded text-sm text-gray-700 focus:border-blue-500 outline-none bg-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <label className="w-24 text-gray-500 text-xs font-bold">Tổ đội</label>
                            <div className="flex-1 relative">
                                <select className="w-full px-3 py-2 border border-gray-200 rounded text-sm text-gray-700 focus:border-blue-500 outline-none appearance-none bg-white cursor-pointer">
                                    <option>Chọn tổ đội</option>
                                    <option>Tổ 1</option>
                                    <option>Tổ 2</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="w-20 text-gray-500 text-xs font-bold text-right">Cầu bãi</label>
                            <div className="flex-1 relative">
                                <select className="w-full px-3 py-2 border border-gray-200 rounded text-sm text-gray-700 focus:border-blue-500 outline-none appearance-none bg-white cursor-pointer">
                                    <option>Chọn cầu bãi</option>
                                    <option>Bãi A</option>
                                    <option>Bãi B</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

         </div>
      </div>

      {/* 3. TOOLBAR */}
      <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-sm font-medium text-gray-600">Tìm:</span>
              <div className="relative flex-1">
                  <input 
                    type="text" 
                    className="w-full pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:border-blue-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
          </div>
          <div className="text-sm text-gray-600">
              Số dòng: <span className="font-bold">{IO_DATA.length}</span>
          </div>
      </div>

      {/* 4. DATA TABLE (SCROLLABLE) */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                  <thead className="bg-[#EBF1F8] text-[#0F1B3D] font-bold uppercase sticky top-0 z-10 shadow-sm">
                      <tr>
                          <th className="px-3 py-3 border-b border-gray-300 text-center min-w-[50px]">STT</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[120px]">Số vận đơn/Booking</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[100px]">Chủ hàng</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[100px]">Phương án</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[120px]">Phương án xếp dỡ</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[100px]">Hàng hóa</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[60px]">ĐVT</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[80px] text-right">Số lượng</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[80px] text-right">Trọng lượng</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[80px] text-right">Thể tích</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[140px]">Ngày hoàn tất</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[80px]">Cầu bờ</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[80px]">Cầu bãi</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[120px]">Tổ đội công nhân</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[60px]">POL</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[60px]">POD</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[60px]">FPOD</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[100px]">Tình trạng HQ</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[80px]">Loại hình</th>
                          <th className="px-3 py-3 border-b border-gray-300 min-w-[150px]">Ghi chú</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {IO_DATA.map((row, index) => (
                          <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                              <td className="px-3 py-2 text-center text-gray-500 border-r border-gray-100">{index + 1}</td>
                              <td className="px-3 py-2 font-medium text-gray-800 border-r border-gray-100">{row.bill}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.owner}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.plan}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.stevedore}</td>
                              <td className="px-3 py-2 font-medium text-gray-800 border-r border-gray-100">{row.cargo}</td>
                              <td className="px-3 py-2 text-center text-gray-600 border-r border-gray-100">{row.unit}</td>
                              <td className="px-3 py-2 text-right text-gray-800 border-r border-gray-100">{row.qty}</td>
                              <td className="px-3 py-2 text-right font-medium text-blue-700 border-r border-gray-100">{row.weight.toLocaleString()}</td>
                              <td className="px-3 py-2 text-right text-gray-600 border-r border-gray-100">{row.volume}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.completedAt}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.berthCrane}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.yardCrane}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.team}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.pol}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.pod}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.fpod}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.customs}</td>
                              <td className="px-3 py-2 text-gray-600 border-r border-gray-100">{row.type}</td>
                              <td className="px-3 py-2 text-gray-500 italic">{row.note}</td>
                          </tr>
                      ))}
                      {/* Empty rows to fill space if needed, visual improvement */}
                      <tr>
                          <td colSpan={20} className="h-full"></td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>

    </div>
  );
};
