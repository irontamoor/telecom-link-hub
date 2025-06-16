
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
      <Sidebar className="border-r border-slate-200 bg-white">
        <SidebarContent>
          <div className="p-6 space-y-4">
            <div className="animate-pulse space-y-3">
              <div className="h-12 w-12 bg-slate-200 rounded-xl"></div>
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
    <Sidebar className="border-r border-slate-200 bg-white shadow-sm">
      <SidebarHeader className="p-6 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
              {data.companyLogo.includes('placeholder') ? (
                <Building2 className="h-6 w-6 text-white" />
              ) : (
                <img
                  src={data.companyLogo}
                  alt={`${data.companyName} Logo`}
                  className="w-6 h-6 rounded-md object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-slate-900 truncate">
              {data.companyName}
            </h2>
            <p className="text-sm text-slate-500">Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        {/* Home Navigation */}
        {data.navigation.showHomeButton && (
          <SidebarGroup className="mb-6">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleHomeClick}
                    isActive={!selectedCategory}
                    className={`
                      w-full h-12 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02]
                      ${!selectedCategory 
                        ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600' 
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }
                    `}
                  >
                    <div className={`
                      flex-shrink-0 p-2 rounded-lg
                      ${!selectedCategory 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-500 text-white'
                      }
                    `}>
                      <DynamicIcon name={data.navigation.homeButtonIcon} className="h-4 w-4" />
                    </div>
                    
                    <span className="font-medium text-sm ml-3">
                      {data.navigation.homeButtonText}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
            Departments
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
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
                          w-full h-14 px-4 rounded-xl transition-all duration-200 hover:scale-[1.01]
                          ${isSelected 
                            ? 'bg-blue-500 text-white shadow-md' 
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }
                        `}
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          <div className={`
                            flex-shrink-0 p-2.5 rounded-lg mr-3
                            ${isSelected 
                              ? 'bg-white/20 text-white' 
                              : `${category.color} text-white`
                            }
                          `}>
                            <DynamicIcon name={category.icon} className="h-4 w-4" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {category.title}
                            </div>
                            <div className={`text-xs mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                              {category.links.length} tools
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategory(category.id);
                            }}
                            className={`p-1.5 rounded-md transition-all duration-200 ${
                              isSelected ? 'text-white hover:bg-white/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {isExpanded ? 
                              <ChevronDown className="h-4 w-4" /> : 
                              <ChevronRight className="h-4 w-4" />
                            }
                          </button>
                        </div>
                      </SidebarMenuButton>

                      {/* Sub-links */}
                      {isExpanded && (
                        <div className="ml-6 mt-2 space-y-1 border-l-2 border-slate-200 pl-4">
                          {category.links.map((link, index) => (
                            <button
                              key={index}
                              onClick={() => handleLinkClick(link.url)}
                              className="w-full text-left p-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 flex items-center space-x-3"
                            >
                              <div className="w-2 h-2 bg-slate-300 rounded-full flex-shrink-0"></div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{link.title}</div>
                                {link.description && (
                                  <div className="text-xs text-slate-500 truncate mt-0.5">
                                    {link.description}
                                  </div>
                                )}
                              </div>
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

      <SidebarFooter className="p-4 border-t border-slate-100">
        <SystemMonitoring config={data.systemMonitoring} />
      </SidebarFooter>
    </Sidebar>
  );
}
