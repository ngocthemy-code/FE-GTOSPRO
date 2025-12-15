import React from 'react';
import { 
  FileText, 
  ClipboardList, 
  Truck, 
  Anchor, 
  Database, 
  Loader2, 
  Warehouse, 
  Container, 
  Pin,
  ChevronRight,
  Layers,
  Box,
  ArrowRight
} from 'lucide-react';

// --- Types ---
export interface ProcessItem {
  id: string;
  label: string;
  icon: React.ElementType;
  isDeveloping?: boolean;
}

interface ProcessGroup {
  title: string;
  color: string; // Changed from colorClass to a simple color key
  items: ProcessItem[];
}

interface ProcessSection {
  sectionTitle?: string;
  icon?: React.ElementType;
  groups: ProcessGroup[];
}

// --- Color Palette System ---
const COLOR_STYLES: Record<string, { bg: string, text: string, iconBg: string, icon: string, border: string }> = {
  red: { bg: 'bg-red-50', text: 'text-red-700', iconBg: 'bg-red-100', icon: 'text-red-600', border: 'border-red-100' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', iconBg: 'bg-indigo-100', icon: 'text-indigo-600', border: 'border-indigo-100' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', iconBg: 'bg-blue-100', icon: 'text-blue-600', border: 'border-blue-100' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', iconBg: 'bg-orange-100', icon: 'text-orange-600', border: 'border-orange-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', iconBg: 'bg-emerald-100', icon: 'text-emerald-600', border: 'border-emerald-100' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', iconBg: 'bg-sky-100', icon: 'text-sky-600', border: 'border-sky-100' },
  lime: { bg: 'bg-lime-50', text: 'text-lime-800', iconBg: 'bg-lime-100', icon: 'text-lime-700', border: 'border-lime-100' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', iconBg: 'bg-yellow-100', icon: 'text-yellow-600', border: 'border-yellow-100' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-700', iconBg: 'bg-slate-100', icon: 'text-slate-600', border: 'border-slate-200' },
};

// --- Configuration Data ---

const IMPORT_CONFIG: ProcessSection[] = [
  {
    groups: [
      {
        title: 'Tàu - Bãi',
        color: 'red',
        items: [
          { id: 'manifest-input', label: 'Nhập liệu Manifest', icon: FileText },
          { id: 'delivery-order', label: 'Lệnh giao hàng (D/O)', icon: ClipboardList },
        ]
      },
      {
        title: 'Tàu - Xe',
        color: 'indigo',
        items: [
          { id: 'manifest-input-truck', label: 'Nhập liệu Manifest', icon: FileText },
          { id: 'delivery-order-truck', label: 'Lệnh giao hàng', icon: ClipboardList },
          { id: 'update-order', label: 'Cập nhật thông tin lệnh', icon: ClipboardList },
          { id: 'transport-plan', label: 'Kế hoạch phương tiện', icon: Truck },
        ]
      },
      {
        title: 'Tàu - Sà lan',
        color: 'blue',
        items: [
          { id: 'manifest-input-barge', label: 'Nhập liệu Manifest', icon: FileText },
          { id: 'delivery-order-barge', label: 'Lệnh giao hàng', icon: ClipboardList },
          { id: 'update-order-barge', label: 'Cập nhật lệnh', icon: ClipboardList },
          { id: 'transport-plan-barge', label: 'Kế hoạch phương tiện', icon: Anchor },
        ]
      },
      {
        title: 'Tàu - Xe - Sà lan',
        color: 'orange',
        items: [
          { id: 'dev-1', label: 'Đang bảo trì...', icon: Loader2, isDeveloping: true },
        ]
      },
      {
        title: 'Sà lan - Bãi',
        color: 'emerald',
        items: [
          { id: 'dev-2', label: 'Đang bảo trì...', icon: Loader2, isDeveloping: true },
        ]
      },
      {
        title: 'Sà lan - Xe',
        color: 'emerald',
        items: [
          { id: 'manifest-input-barge-truck', label: 'Nhập liệu Manifest', icon: FileText },
          { id: 'delivery-order-barge-truck', label: 'Lệnh giao hàng', icon: ClipboardList },
          { id: 'update-order-barge-truck', label: 'Cập nhật lệnh', icon: ClipboardList },
          { id: 'transport-plan-barge-truck', label: 'Kế hoạch phương tiện', icon: Truck },
        ]
      },
      {
        title: 'Sà lan - Sà lan',
        color: 'slate',
        items: [
          { id: 'dev-3', label: 'Đang bảo trì...', icon: Loader2, isDeveloping: true },
        ]
      }
    ]
  }
];

const YARD_CONFIG: ProcessSection[] = [
  {
    sectionTitle: 'Giao nhận Hàng hóa',
    icon: Box,
    groups: [
      {
        title: 'Hạ tập kết',
        color: 'red',
        items: [
          { id: 'yard-plan-truck', label: 'Kế hoạch hạ xe', icon: Truck },
          { id: 'yard-plan-barge', label: 'Kế hoạch hạ sà lan', icon: Anchor },
        ]
      },
      {
        title: 'Giao hàng - Xe',
        color: 'indigo',
        items: [
          { id: 'yard-split-import', label: 'Phân chia hàng nhập', icon: FileText },
          { id: 'yard-delivery-order', label: 'Lệnh giao hàng', icon: ClipboardList },
          { id: 'yard-export-truck', label: 'Kế hoạch xuất xe', icon: Truck },
          { id: 'yard-gate', label: 'Cổng (Gate Check)', icon: Container },
          { id: 'yard-warehouse', label: 'Quản lý Kho/Bãi', icon: Warehouse },
        ]
      },
      {
        title: 'Giao hàng - Sà lan',
        color: 'sky',
        items: [
          { id: 'yard-split-import-barge', label: 'Phân chia hàng nhập', icon: FileText },
          { id: 'yard-delivery-order-barge', label: 'Lệnh giao hàng', icon: ClipboardList },
          { id: 'yard-export-barge', label: 'Kế hoạch xuất sà lan', icon: Anchor },
          { id: 'yard-warehouse-barge', label: 'Quản lý Kho/Bãi', icon: Warehouse },
          { id: 'yard-tally', label: 'Tally (Kiểm đếm)', icon: ClipboardList },
        ]
      }
    ]
  },
  {
    sectionTitle: 'Đảo chuyển & Điều hành',
    icon: Layers, 
    groups: [
      {
        title: 'Đảo chuyển nội bộ',
        color: 'lime',
        items: [
          { id: 'yard-move-unassigned', label: 'Đảo chuyển (Chưa phân)', icon: Truck },
          { id: 'yard-move-assigned', label: 'Đảo chuyển (Đã phân)', icon: Truck },
          { id: 'yard-move-warehouse', label: 'Cập nhật vị trí kho', icon: Warehouse },
        ]
      },
      {
        title: 'Giám sát điều hành',
        color: 'yellow', 
        items: [
          { id: 'yard-monitor', label: 'Giám sát công việc', icon: Database },
        ]
      }
    ]
  }
];

const EXPORT_CONFIG: ProcessSection[] = [
  {
    groups: [
      {
        title: 'Cổng - Tàu',
        color: 'orange',
        items: [
          { id: 'exp-manifest', label: 'Nhập liệu Manifest', icon: FileText },
          { id: 'exp-plan-vessel', label: 'Kế hoạch tập kết tàu', icon: Truck },
          { id: 'exp-gate', label: 'Cổng (Gate Check)', icon: Container },
          { id: 'exp-tally', label: 'Tally (Kiểm đếm)', icon: ClipboardList },
        ]
      },
      {
        title: 'Bãi - Tàu',
        color: 'blue',
        items: [
          { id: 'exp-manifest-yard', label: 'Nhập liệu Manifest', icon: FileText },
          { id: 'exp-split', label: 'Phân chia hàng xuất', icon: Warehouse },
          { id: 'exp-warehouse', label: 'Quản lý Kho/Bãi', icon: Warehouse },
          { id: 'exp-tally-yard', label: 'Tally (Kiểm đếm)', icon: ClipboardList },
        ]
      },
      {
        title: 'Sà lan - Tàu',
        color: 'slate',
        items: [
          { id: 'exp-dev-1', label: 'Đang bảo trì...', icon: Loader2, isDeveloping: true },
        ]
      },
      {
        title: 'Cổng - Sà lan',
        color: 'emerald',
        items: [
          { id: 'exp-manifest-barge', label: 'Nhập liệu Manifest', icon: FileText },
          { id: 'exp-plan-barge', label: 'Kế hoạch tập kết sà lan', icon: Anchor },
          { id: 'exp-gate-barge', label: 'Cổng (Gate Check)', icon: Container },
          { id: 'exp-tally-barge', label: 'Tally (Kiểm đếm)', icon: ClipboardList },
        ]
      },
      {
        title: 'Bãi - Sà lan',
        color: 'indigo',
        items: [
          { id: 'exp-dev-2', label: 'Đang bảo trì...', icon: Loader2, isDeveloping: true },
        ]
      },
      {
        title: 'Sà lan - Sà lan',
        color: 'red',
        items: [
          { id: 'exp-dev-3', label: 'Đang bảo trì...', icon: Loader2, isDeveloping: true },
        ]
      }
    ]
  }
];

interface ProcessMenuProps {
  type: 'import' | 'yard' | 'export';
  onNavigate: (id: string, label: string) => void;
}

export const ProcessMenu: React.FC<ProcessMenuProps> = ({ type, onNavigate }) => {
  let data: ProcessSection[] = [];
  
  switch (type) {
    case 'import': data = IMPORT_CONFIG; break;
    case 'yard': data = YARD_CONFIG; break;
    case 'export': data = EXPORT_CONFIG; break;
    default: data = [];
  }

  return (
    <div className="p-8 h-full overflow-y-auto bg-[#F5F7FB] font-sans">
      {data.map((section, sIdx) => (
        <div key={sIdx} className="mb-12 last:mb-0">
          {section.sectionTitle && (
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white rounded-lg shadow-sm text-[#3B82F6] border border-blue-100">
                 {section.icon ? <section.icon size={20} /> : <Layers size={20} />}
              </div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">{section.sectionTitle}</h2>
              <div className="h-px bg-slate-200 flex-1 ml-4 opacity-70"></div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {section.groups.map((group, gIdx) => {
              const styles = COLOR_STYLES[group.color] || COLOR_STYLES.slate;
              
              return (
                <div 
                  key={gIdx} 
                  className="bg-white rounded-[20px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group/card"
                >
                  {/* Subtle Header */}
                  <div className={`px-6 py-5 border-b ${styles.border} ${styles.bg} flex items-center justify-between`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.iconBg} ${styles.icon} shadow-sm`}>
                        <Layers size={20} strokeWidth={2.5} />
                      </div>
                      <h3 className={`text-lg font-bold ${styles.text} tracking-tight`}>
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col gap-2 bg-white">
                    {group.items.map((item, iIdx) => (
                      <button 
                        key={iIdx}
                        onClick={() => onNavigate(item.id, item.label)}
                        disabled={item.isDeveloping}
                        className={`group/item relative w-full text-left p-3.5 flex items-center gap-4 rounded-xl transition-all duration-200 border border-transparent
                          ${item.isDeveloping 
                            ? 'text-slate-400 cursor-default bg-slate-50 border-dashed border-slate-200' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F172A] hover:border-slate-100 hover:shadow-sm'
                          }
                        `}
                      >
                        <div className={`
                          relative z-10 transition-colors duration-200
                          ${item.isDeveloping ? 'text-slate-300' : 'text-slate-400 group-hover/item:text-[#3B82F6]'}
                        `}>
                          <item.icon size={20} strokeWidth={1.5} className={item.isDeveloping ? 'animate-pulse' : ''} />
                        </div>
                        
                        <span className="font-medium text-[14px] flex-1 truncate relative z-10">
                          {item.label}
                        </span>

                        {!item.isDeveloping && (
                          <div className="opacity-0 group-hover/item:opacity-100 transition-all duration-200 transform translate-x-2 group-hover/item:translate-x-0 text-[#3B82F6]">
                            <ArrowRight size={16} />
                          </div>
                        )}
                        
                        {/* Hover Decoration */}
                        {!item.isDeveloping && (
                           <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#3B82F6] rounded-r-full transition-all duration-200 group-hover/item:h-8 opacity-0 group-hover/item:opacity-100"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
