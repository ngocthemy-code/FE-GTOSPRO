
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SearchLookup } from './components/SearchLookup';
import { Dashboard } from './components/Dashboard';
import { AIChat } from './components/AIChat';
import { CategoryManager } from './components/CategoryManager';
import { YardMapDesigner } from './components/YardMapDesigner';
import { ProcessMenu } from './components/ProcessMenu';
import { ProcessDetail } from './components/ProcessDetail';
import { SystemAdmin } from './components/SystemAdmin'; 
import { OperationPlan } from './components/OperationPlan';
import { InventoryReport } from './components/InventoryReport'; 
import { WeighingStation } from './components/WeighingStation'; 
import { VesselIOReport } from './components/VesselIOReport'; 
import { InvoiceReport } from './components/InvoiceReport'; 
import { ShiftHandoverReport } from './components/ShiftHandoverReport'; // Added Import
import { ShipmentData, MenuItem, SubMenuItem } from './types';
import { MENU_ITEMS, CATEGORY_CONFIG } from './constants';
import { 
  ChevronDown, 
  Landmark, 
  Truck, 
  UserCheck, 
  LayoutGrid, 
  Bell,
  HelpCircle,
  Search,
  Link
} from 'lucide-react';

const App: React.FC = () => {
  const [activeMenuId, setActiveMenuId] = useState<string>('rpt-shift-handover'); // Changed default for demo
  const [currentSearchResults, setCurrentSearchResults] = useState<ShipmentData[] | null>(null);
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  
  // New state for detailed process screen navigation
  // Initialize from URL param if present to support "Open in New Tab"
  const [activeProcessDetail, setActiveProcessDetail] = useState<{id: string, label: string} | null>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const viewParam = searchParams.get('view');
    
    if (viewParam && viewParam.startsWith('field-')) {
        let label = '';
        switch(viewParam) {
          case 'field-gate': label = 'CỔNG - KIỂM SOÁT RA VÀO'; break;
          case 'field-truck': label = 'ĐIỀU HÀNH XE ĐẦU KÉO'; break;
          case 'field-tally': label = 'TALLY - KIỂM ĐẾM TẠI TÀU'; break;
          case 'field-yard': label = 'QUẢN LÝ KHO BÃI (HIỆN TRƯỜNG)'; break;
        }
        return { id: viewParam, label };
    }
    return null;
  });

  // When changing main menu items, reset the detailed view
  const handleMenuSelect = (id: string) => {
    setActiveMenuId(id);
    setActiveProcessDetail(null);
    setIsLinkMenuOpen(false);
  };

  const handleProcessNavigate = (id: string, label: string) => {
    setActiveProcessDetail({ id, label });
    setIsLinkMenuOpen(false);
  };

  // Handle Field Operation Navigation (Open in New Tab)
  const openInNewTab = (key: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', key);
    window.open(url.toString(), '_blank');
    setIsLinkMenuOpen(false);
  };

  // Recursive helper to find the path to the active item
  const findPath = (items: (MenuItem | SubMenuItem)[], targetId: string): string | null => {
    for (const item of items) {
      if (item.id === targetId) {
        return item.label;
      }
      if (item.submenu) {
        const childLabel = findPath(item.submenu, targetId);
        if (childLabel) {
          return `${item.label} / ${childLabel}`;
        }
      }
    }
    return null;
  };

  const getActiveLabel = () => {
    const menuLabel = findPath(MENU_ITEMS, activeMenuId) || 'DASHBOARDS';
    if (activeProcessDetail) {
      return `${menuLabel} / ${activeProcessDetail.label}`;
    }
    return menuLabel;
  };

  const renderContent = () => {
    // Priority: Detailed Process Screen
    if (activeProcessDetail) {
      return <ProcessDetail id={activeProcessDetail.id} title={activeProcessDetail.label} />;
    }

    // Admin System Routing
    if (['admin-groups', 'admin-users', 'admin-permissions'].includes(activeMenuId)) {
        return <SystemAdmin viewId={activeMenuId} />;
    }

    // Operation Plan Routing
    if (['plan-yard', 'plan-vessel-def', 'plan-berth-ops', 'plan-eqp-unified', 'plan-voyage'].includes(activeMenuId)) {
        return <OperationPlan viewId={activeMenuId} />;
    }

    switch (activeMenuId) {
      case 'dashboard':
        return <Dashboard />;
      case 'others': 
      case 'report':
        return <SearchLookup onSearchComplete={setCurrentSearchResults} />;
      case 'rpt-inventory': 
        return <InventoryReport />;
      case 'rpt-vessel-io': 
        return <VesselIOReport />;
      case 'rpt-invoice-issue':
        return <InvoiceReport />;
      case 'rpt-shift-handover': // Added Shift Handover Case
        return <ShiftHandoverReport />;
      case 'proc-weighing': 
        return <WeighingStation />;
      case 'port-map':
        return <YardMapDesigner />;
      // --- Process Menus ---
      case 'proc-import':
        return <ProcessMenu type="import" onNavigate={handleProcessNavigate} />;
      case 'proc-yard':
        return <ProcessMenu type="yard" onNavigate={handleProcessNavigate} />;
      case 'proc-export':
        return <ProcessMenu type="export" onNavigate={handleProcessNavigate} />;
      default:
        // Generic Category Config
        if (CATEGORY_CONFIG[activeMenuId]) {
          return <CategoryManager config={CATEGORY_CONFIG[activeMenuId]} />;
        }

        // Fallbacks
        if (['plan', 'process', 'category', 'admin', 'cat-system', 'cat-port', 'cat-ops'].includes(activeMenuId) || activeMenuId.startsWith('plan-')) {
           return (
             <div className="flex items-center justify-center h-full text-slate-400 flex-col bg-[#F5F7FB]">
               <div className="text-4xl mb-4 font-light text-slate-300">Work In Progress</div>
               <p className="text-slate-500">Vui lòng chọn một danh mục cụ thể từ menu bên trái.</p>
             </div>
           );
        }
        return <SearchLookup onSearchComplete={setCurrentSearchResults} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#F5F7FB] overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar activeId={activeMenuId} onSelect={handleMenuSelect} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header - White, minimal, 68px height (taller for modern look) */}
        <header className="h-[68px] bg-white border-b border-gray-200/60 flex items-center justify-between px-8 z-20 flex-shrink-0">
          
          {/* Left: Breadcrumbs / Title */}
          <div className="flex items-center flex-1 gap-3">
             <div className="flex flex-col">
                <div className="flex items-center text-xs text-slate-400 gap-1 font-semibold uppercase tracking-wider mb-0.5">
                    <span>Hệ Thống GTOS</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-[#3B82F6]">{activeProcessDetail ? 'Quy trình' : 'Danh mục'}</span>
                </div>
                <h2 className="text-[#0F172A] font-bold text-lg leading-tight truncate max-w-xl">
                    {getActiveLabel()}
                </h2>
             </div>
          </div>

          {/* Right: Actions & Page Links */}
          <div className="flex items-center gap-5">
             <div className="relative">
                <button 
                    onClick={() => setIsLinkMenuOpen(!isLinkMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-slate-600 rounded-lg hover:bg-gray-50 hover:text-[#3B82F6] transition-colors shadow-sm font-bold text-xs uppercase tracking-wide group"
                >
                    <Link size={14} className="group-hover:text-[#3B82F6]" />
                    <span>Liên kết trang</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isLinkMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLinkMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 animate-fade-in-up">
                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Chức năng hiện trường</span>
                        </div>
                        
                        <button 
                            onClick={() => openInNewTab('field-gate')}
                            className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Landmark size={16} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-700 group-hover:text-blue-700">CỔNG</div>
                                <div className="text-[10px] text-slate-400">Kiểm soát ra vào</div>
                            </div>
                        </button>

                        <button 
                            onClick={() => openInNewTab('field-truck')}
                            className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                <Truck size={16} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-700 group-hover:text-orange-700">XE ĐẦU KÉO</div>
                                <div className="text-[10px] text-slate-400">Điều phối phương tiện</div>
                            </div>
                        </button>

                        <button 
                            onClick={() => openInNewTab('field-tally')}
                            className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <UserCheck size={16} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-700 group-hover:text-emerald-700">TALLY</div>
                                <div className="text-[10px] text-slate-400">Kiểm nhận tàu</div>
                            </div>
                        </button>

                        <button 
                            onClick={() => openInNewTab('field-yard')}
                            className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <LayoutGrid size={16} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-700">KHO / BÃI</div>
                                <div className="text-[10px] text-slate-400">Quản lý vị trí</div>
                            </div>
                        </button>
                    </div>
                )}
             </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto bg-[#F5F7FB] relative">
          {renderContent()}
        </div>

        {/* Click outside overlay for dropdown */}
        {isLinkMenuOpen && (
          <div className="fixed inset-0 z-10" onClick={() => setIsLinkMenuOpen(false)}></div>
        )}
      </main>

      {/* Floating AI Assistant */}
      <AIChat currentContextData={currentSearchResults} />
    </div>
  );
};

export default App;
