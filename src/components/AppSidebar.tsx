
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
} from '@/components/ui/sidebar';
import { Monitor, Headphones, Users, Calculator } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  image: string;
  links: Array<{
    title: string;
    url: string;
    description: string;
  }>;
}

interface IntranetData {
  companyName: string;
  companyLogo: string;
  categories: Category[];
}

const iconMap = {
  Monitor,
  Headphones,
  Users,
  Calculator,
};

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
      <Sidebar>
        <SidebarContent>
          <div className="p-4 text-center text-gray-500">Loading...</div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={data.companyLogo}
            alt={`${data.companyName} Logo`}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-900">{data.companyName}</h2>
            <p className="text-sm text-gray-500">Intranet Portal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
            Departments
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.categories.map((category) => {
                const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Monitor;
                
                return (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton
                      onClick={() => onCategorySelect(category.id)}
                      isActive={selectedCategory === category.id}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50"
                    >
                      <div className={`p-2 rounded-lg ${category.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-gray-900">{category.title}</span>
                        <p className="text-xs text-gray-500">{category.links.length} tools</p>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
