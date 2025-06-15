
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
import { Building2 } from 'lucide-react';
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
      <Sidebar className="border-r border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <SidebarContent>
          <div className="p-6 text-center">
            <div className="animate-pulse">
              <div className="h-10 w-10 bg-slate-200 rounded-xl mb-3 mx-auto"></div>
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  const handleHomeClick = () => {
    onCategorySelect('');
  };

  return (
    <Sidebar className="border-r border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-lg">
      <SidebarHeader className="p-6 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-20 blur-sm"></div>
            <div className="relative bg-white p-2 rounded-xl shadow-md border border-slate-200">
              {data.companyLogo.includes('placeholder') ? (
                <Building2 className="h-6 w-6 text-blue-600" />
              ) : (
                <img
                  src={data.companyLogo}
                  alt={`${data.companyName} Logo`}
                  className="w-6 h-6 rounded-lg object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-slate-900 truncate">{data.companyName}</h2>
            <p className="text-sm text-slate-500 font-medium">Intranet Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Home Navigation */}
        {data.navigation.showHomeButton && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="mb-4">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleHomeClick}
                    isActive={!selectedCategory}
                    className={`
                      group relative flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ease-out hover:scale-[1.02]
                      ${!selectedCategory 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm hover:shadow-md border border-slate-100'
                      }
                    `}
                  >
                    <div className={`
                      flex-shrink-0 p-3 rounded-lg transition-all duration-200
                      ${!selectedCategory 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-500 text-white group-hover:scale-110'
                      }
                    `}>
                      <DynamicIcon name={data.navigation.homeButtonIcon} className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className={`font-semibold text-sm ${!selectedCategory ? 'text-white' : 'text-slate-900'}`}>
                        {data.navigation.homeButtonText}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-3 mb-2">
            Departments
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {data.categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                
                return (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton
                      onClick={() => onCategorySelect(category.id)}
                      isActive={isSelected}
                      className={`
                        group relative flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ease-out hover:scale-[1.02]
                        ${isSelected 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                          : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm hover:shadow-md border border-slate-100'
                        }
                      `}
                    >
                      <div className={`
                        flex-shrink-0 p-3 rounded-lg transition-all duration-200
                        ${isSelected 
                          ? 'bg-white/20 text-white' 
                          : `${category.color} text-white group-hover:scale-110`
                        }
                      `}>
                        <DynamicIcon name={category.icon} className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold text-sm truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {category.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-medium ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                            {category.links.length} tools
                          </span>
                          <div className={`h-1 w-1 rounded-full ${isSelected ? 'bg-blue-200' : 'bg-slate-300'}`}></div>
                          <span className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                            Ready
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SystemMonitoring config={data.systemMonitoring} />
      </SidebarFooter>
    </Sidebar>
  );
}
