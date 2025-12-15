
import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { ChevronDown, ChevronRight, Container, ChevronLeft } from 'lucide-react';
import { MenuItem, SubMenuItem } from '../types';

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect }) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['category', 'cat-system']);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isItemActiveOrChildActive = (item: MenuItem | SubMenuItem): boolean => {
    if (item.id === activeId) return true;
    if (item.submenu) {
      return item.submenu.some(sub => isItemActiveOrChildActive(sub));
    }
    return false;
  };

  const renderSubMenu = (items: SubMenuItem[], level: number = 2) => {
    if (isCollapsed) return null;
    return (
      <div className="py-1 space-y-1 relative">
        {/* Connector Line */}
        <div className="absolute left-[26px] top-0 bottom-0 w-px bg-slate-200"></div>
        <ul className="list-none">
          {items.map((sub) => {
            const hasChildren = !!sub.submenu && sub.submenu.length > 0;
            const isExpanded = expandedIds.includes(sub.id);
            const isActive = activeId === sub.id;
            const isChildActive = hasChildren && sub.submenu?.some(child => isItemActiveOrChildActive(child));
            
            const paddingLeft = level === 2 ? 'pl-11' : 'pl-14';

            return (
              <li key={sub.id}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasChildren) {
                      toggleExpand(sub.id);
                    } else {
                      onSelect(sub.id);
                    }
                  }}
                  className={`relative w-full flex items-center justify-between ${paddingLeft} pr-4 py-2 text-sm transition-all duration-200 group rounded-r-lg mr-2 font-medium
                    ${(isActive || (isChildActive && !isExpanded))
                      ? 'text-[#3B82F6] bg-blue-50/80' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 z-10">
                    {/* Icon or Dot indicator */}
                    {sub.icon ? (
                      <sub.icon size={18} className={`flex-shrink-0 transition-colors ${isActive ? 'text-[#3B82F6]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    ) : (
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors flex-shrink-0 ${isActive ? 'bg-[#3B82F6] ring-2 ring-blue-100' : 'bg-slate-300 group-hover:bg-slate-400'}`}></div>
                    )}
                    <span className="truncate">{sub.label}</span>
                  </div>
                  {hasChildren && (
                    <div className="text-slate-400 group-hover:text-slate-600">
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                  )}
                  
                  {/* Active Indicator Line */}
                  {(isActive) && (
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-[#3B82F6] rounded-r-full"></div>
                  )}
                </button>
                
                {hasChildren && isExpanded && sub.submenu && (
                  renderSubMenu(sub.submenu, level + 1)
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-80'} bg-white flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 transition-all duration-300 ease-in-out border-r border-slate-200 z-30 relative group/sidebar`}
    >
      {/* Floating Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-9 z-50 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-[#3B82F6] hover:border-[#3B82F6] shadow-sm transition-all duration-300 focus:outline-none ${isCollapsed ? 'rotate-180' : ''}`}
        title={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
      >
        <ChevronLeft size={14} />
      </button>

      {/* Header / Logo Area */}
      <div className="h-[68px] flex items-center px-5 bg-white border-b border-slate-100 flex-shrink-0 overflow-hidden">
        <div className={`flex items-center gap-3 w-full ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-tr from-[#3B82F6] to-[#60A5FA] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 flex-shrink-0">
            <Container size={22} strokeWidth={2} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col animate-fade-in overflow-hidden whitespace-nowrap">
                <h1 className="font-extrabold text-xl tracking-tight leading-tight text-[#0F172A]">GTOS<span className="text-[#3B82F6]">PRO</span></h1>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Port Logistics</span>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar px-3 space-y-1">
        {MENU_ITEMS.map((item, index) => {
          const hasSubmenu = !!item.submenu;
          const isExpanded = expandedIds.includes(item.id);
          const isChildActive = isItemActiveOrChildActive(item);
          const isActive = activeId === item.id || (isChildActive && !isExpanded);
          
          return (
            <React.Fragment key={item.id}>
              {/* Removed duplicate group labels per user request */}
              
              <div className="list-none"> {/* Changed from li to div to avoid invalid HTML nesting inside div container */}
                <button
                  onClick={() => {
                    if (isCollapsed) {
                        setIsCollapsed(false);
                        setTimeout(() => {
                             if (hasSubmenu) toggleExpand(item.id);
                             else onSelect(item.id);
                        }, 50);
                    } else {
                        if (hasSubmenu) toggleExpand(item.id);
                        else onSelect(item.id);
                    }
                  }}
                  className={`relative w-full flex items-center justify-between px-3 py-3 rounded-xl text-base font-bold transition-all duration-200 group mb-1
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#EFF6FF] to-[#F5F9FF] text-[#3B82F6] shadow-sm ring-1 ring-blue-100' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                  title={isCollapsed ? item.label : ''}
                >
                  <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
                    <item.icon size={22} strokeWidth={isActive ? 2 : 1.5} className={`${isActive ? 'text-[#3B82F6]' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`} />
                    {!isCollapsed && <span className="tracking-tight">{item.label}</span>}
                  </div>
                  {!isCollapsed && hasSubmenu && (
                    <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown size={16} className={isActive ? 'text-[#3B82F6]' : 'text-slate-400'} />
                    </div>
                  )}
                </button>

                {/* Level 2 Container */}
                {hasSubmenu && isExpanded && item.submenu && (
                  renderSubMenu(item.submenu, 2)
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer Profile */}
      <div className="p-4 bg-white border-t border-slate-100">
        <button 
            className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors"
        >
            {isCollapsed ? (
                <div className="w-9 h-9 rounded-full bg-[#EFF6FF] border border-blue-100 flex items-center justify-center text-xs font-bold text-[#3B82F6]">
                    AD
                </div>
            ) : (
                <div className="flex items-center gap-3 w-full px-2">
                    <div className="w-9 h-9 rounded-full bg-[#EFF6FF] border border-blue-100 flex items-center justify-center text-xs font-bold text-[#3B82F6]">
                        AD
                    </div>
                    <div className="text-left overflow-hidden flex-1">
                        <p className="text-xs font-bold text-slate-700 truncate">Administrator</p>
                        <p className="text-[10px] text-slate-400 truncate">System Admin</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                </div>
            )}
        </button>
      </div>
    </div>
  );
};
