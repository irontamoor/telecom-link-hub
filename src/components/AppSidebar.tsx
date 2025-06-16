
import { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Building2, ChevronRight, ChevronDown } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';
import { SystemMonitoring } from './SystemMonitoring';

interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  backgroundImage: string;
  links: Array<{
    title: string;
    url: string;
    description: string;
  }>;
}

interface IntranetData {
  companyName: string;
  companyLogo: string;
  navigation: {
    showHomeButton: boolean;
    homeButtonText: string;
    homeButtonIcon: string;
  };
  systemMonitoring: {
    enabled: boolean;
    zabbixUrl: string;
    refreshInterval: number;
    displayName: string;
    fallbackStatus: string;
  };
  categories: Category[];
}

interface AppSidebarProps {
  onCategorySelect: (categoryId: string) => void;
  selectedCategory: string;
}

export function AppSidebar({ onCategorySelect, selectedCategory }: AppSidebarProps) {
  const [data, setData] = useState<IntranetData | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/src/data/links.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error loading links data:', error);
      }
    };

    loadData();
  }, []);

  if (!data) {
    return (
      <Sidebar className="border-r border-slate-200/50 bg-white/95 backdrop-blur-md">
        <SidebarContent>
          <div className="p-6 space-y-4">
            <div className="animate-pulse space-y-3">
              <div className="h-12 w-12 bg-slate-200 rounded-2xl"></div>
              <div className="h-5 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  const handleHomeClick = () => {
    onCategorySelect('');
    setExpandedCategories(new Set());
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Sidebar className="border-r border-slate-200/50 bg-white/95 backdrop-blur-md shadow-xl">
      <SidebarHeader className="p-6 border-b border-slate-100/50">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity shadow-lg"></div>
            <div className="relative bg-white/90 p-3 rounded-2xl backdrop-blur-sm">
              {data.companyLogo.includes('placeholder') ? (
                <Building2 className="h-7 w-7 text-blue-600" />
              ) : (
                <img
                  src={data.companyLogo}
                  alt={`${data.companyName} Logo`}
                  className="w-7 h-7 rounded-lg object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900 truncate bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
              {data.companyName}
            </h2>
            <p className="text-sm text-slate-500 font-medium">Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-2">
        {/* Home Navigation */}
        {data.navigation.showHomeButton && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleHomeClick}
                    isActive={!selectedCategory}
                    className={`
                      group relative flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]
                      ${!selectedCategory 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/50 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className={`
                      flex-shrink-0 p-2.5 rounded-lg transition-all duration-300
                      ${!selectedCategory 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-500 text-white group-hover:scale-110'
                      }
                    `}>
                      <DynamicIcon name={data.navigation.homeButtonIcon} className="h-5 w-5" />
                    </div>
                    
                    <span className={`font-semibold text-sm ${!selectedCategory ? 'text-white' : 'text-slate-900'}`}>
                      {data.navigation.homeButtonText}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-4 mb-2">
            Departments
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {data.categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                const isExpanded = expandedCategories.has(category.id);
                
                return (
                  <SidebarMenuItem key={category.id}>
                    <div className="space-y-1">
                      {/* Main Category Button */}
                      <SidebarMenuButton
                        onClick={() => onCategorySelect(category.id)}
                        isActive={isSelected}
                        className={`
                          group relative flex items-center space-x-3 p-3.5 rounded-xl transition-all duration-300 hover:scale-[1.01]
                          ${isSelected 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/50 hover:border-slate-300'
                          }
                        `}
                      >
                        <div className={`
                          flex-shrink-0 p-2 rounded-lg transition-all duration-300
                          ${isSelected 
                            ? 'bg-white/20 text-white' 
                            : `${category.color} text-white group-hover:scale-110`
                          }
                        `}>
                          <DynamicIcon name={category.icon} className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <span className={`font-semibold text-sm truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {category.title}
                          </span>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className={`text-xs font-medium ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                              {category.links.length} tools
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategory(category.id);
                          }}
                          className={`p-1 rounded-md transition-all duration-200 ${
                            isSelected ? 'text-white hover:bg-white/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {isExpanded ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </button>
                      </SidebarMenuButton>

                      {/* Sub-links */}
                      {isExpanded && (
                        <div className="ml-4 space-y-1 border-l-2 border-slate-200 pl-4">
                          {category.links.map((link, index) => (
                            <button
                              key={index}
                              onClick={() => handleLinkClick(link.url)}
                              className="w-full text-left p-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 flex items-center space-x-2 group"
                            >
                              <div className="w-2 h-2 bg-slate-300 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                              <span className="truncate">{link.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-100/50">
        <SystemMonitoring config={data.systemMonitoring} />
      </SidebarFooter>
    </Sidebar>
  );
}
