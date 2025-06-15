
import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { MainContent } from '@/components/MainContent';

const IntranetLanding = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar 
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 px-6 py-4 relative z-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedCategory ? 'Department Tools' : 'Dashboard'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedCategory ? 'Access your department resources' : 'Welcome to your workspace'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  Internal Access
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <MainContent 
            selectedCategory={selectedCategory} 
            onCategorySelect={setSelectedCategory}
          />

          {/* Footer */}
          <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 px-6 py-4 relative z-20">
            <div className="text-center text-sm text-gray-500">
              Need help? Contact IT Support at{' '}
              <a href="mailto:support@telecom.com" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                support@telecom.com
              </a>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default IntranetLanding;
