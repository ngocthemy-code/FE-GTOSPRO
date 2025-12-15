import React, { useState } from 'react';
import { Search, Container, Ship, FileText, ArrowRight } from 'lucide-react';
import { TabType, ShipmentData } from '../types';
import { MOCK_SHIPMENTS } from '../constants';

interface SearchLookupProps {
  onSearchComplete: (results: ShipmentData[]) => void;
}

export const SearchLookup: React.FC<SearchLookupProps> = ({ onSearchComplete }) => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.PINCODE);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ShipmentData[] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const filtered = MOCK_SHIPMENTS.filter(item => {
      const term = searchTerm.toLowerCase();
      if (activeTab === TabType.PINCODE) return item.pincode.toLowerCase().includes(term);
      if (activeTab === TabType.BILL) return item.billOfLading.toLowerCase().includes(term);
      if (activeTab === TabType.BOOKING) return item.booking.toLowerCase().includes(term);
      return false;
    });

    setResults(filtered);
    onSearchComplete(filtered);
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case TabType.PINCODE: return "Nhập số Pincode hạ bãi...";
      case TabType.BILL: return "Nhập số vận đơn (Bill of Lading)...";
      case TabType.BOOKING: return "Nhập số Booking...";
      default: return "Nhập thông tin tìm kiếm...";
    }
  };

  return (
    <div className="flex flex-col items-center pt-16 h-full bg-[#F5F7FA] relative overflow-hidden font-sans">
      
      {/* Abstract Logistics Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Decorative Circles */}
            <circle cx="10%" cy="20%" r="200" fill="#3b82f6" fillOpacity="0.03" />
            <circle cx="90%" cy="80%" r="300" fill="#2563eb" fillOpacity="0.03" />
        </svg>
      </div>

      <div className="w-full max-w-4xl px-4 z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-700">
                <Ship size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F1B3D] mb-3 tracking-tight">
                Tra cứu thông tin
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Hệ thống quản lý khai thác hàng rời GTOS. Nhập mã Pincode, vận đơn hoặc booking để tra cứu trạng thái thời gian thực.
            </p>
        </div>

        {/* Search Card */}
        <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 md:p-10 border border-slate-100">
            
            {/* Pill Tabs */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex bg-[#F1F5F9] p-1.5 rounded-full">
                    {[
                        { type: TabType.PINCODE, label: 'Pincode' },
                        { type: TabType.BILL, label: 'Vận đơn' },
                        { type: TabType.BOOKING, label: 'Booking' }
                    ].map((tab) => (
                        <button
                            key={tab.type}
                            onClick={() => { setActiveTab(tab.type); setResults(null); setSearchTerm(''); }}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 min-w-[100px]
                                ${activeTab === tab.type 
                                    ? 'bg-[#2F80ED] text-white shadow-md shadow-blue-500/30' 
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Input Area */}
            <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
                <div className="relative group">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={getPlaceholder()}
                        className="w-full pl-6 pr-32 py-4 rounded-xl border border-slate-200 bg-slate-50 text-[#0F1B3D] placeholder:text-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:bg-white transition-all shadow-inner"
                    />
                    <div className="absolute right-2 top-1.5 bottom-1.5">
                        <button 
                            type="submit"
                            className="h-full px-6 bg-[#2F80ED] hover:bg-[#1A73E8] text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Search size={18} />
                            <span className="hidden sm:inline">Tìm kiếm</span>
                        </button>
                    </div>
                </div>
            </form>

            {/* Quick Helper Links (Optional) */}
            <div className="mt-6 flex justify-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Container size={14} /> Tra cứu Container</span>
                <span className="flex items-center gap-1.5"><FileText size={14} /> Hướng dẫn sử dụng</span>
            </div>
        </div>

        {/* Results Area */}
        {results && (
          <div className="w-full mt-8 animate-fade-in-up">
            {results.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-[#F8FAFC] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-[#0F1B3D] font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                    <Search size={16} className="text-blue-500"/> Kết quả tìm kiếm
                  </h3>
                  <span className="text-xs font-medium text-slate-500">{results.length} kết quả</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Pincode</th>
                        <th className="px-6 py-4 font-semibold">Vận Đơn (BL)</th>
                        <th className="px-6 py-4 font-semibold">Tàu</th>
                        <th className="px-6 py-4 font-semibold">Hàng Hóa</th>
                        <th className="px-6 py-4 font-semibold">Trạng Thái</th>
                        <th className="px-6 py-4 font-semibold text-right">Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((item) => (
                        <tr key={item.id} className="bg-white border-b border-gray-50 hover:bg-blue-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-[#2F80ED]">{item.pincode}</td>
                          <td className="px-6 py-4 text-slate-800">{item.billOfLading}</td>
                          <td className="px-6 py-4 flex items-center gap-2">
                             <Ship size={14} className="text-slate-400" />
                             {item.vesselName}
                          </td>
                          <td className="px-6 py-4">{item.commodity}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border
                              ${item.status === 'In Yard' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                              ${item.status === 'Discharged' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                              ${item.status === 'Gate Out' ? 'bg-slate-100 text-slate-700 border-slate-200' : ''}
                            `}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100">
                                <ArrowRight size={18} />
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} className="text-slate-300" />
                </div>
                <h3 className="text-slate-800 font-medium mb-1">Không tìm thấy dữ liệu</h3>
                <p className="text-slate-500 text-sm">Vui lòng kiểm tra lại thông tin tìm kiếm.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer Text */}
      <div className="absolute bottom-6 text-center w-full z-10">
        <p className="text-slate-400 text-xs font-medium">© 2024 Tan Cang Saigon. Powered by GTOS Technology.</p>
      </div>
    </div>
  );
};