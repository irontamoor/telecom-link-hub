
import { ArrowLeft, Book, Settings, Zap, Palette, Link, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const HowToUse = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Documentation
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Title */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Use This System</h1>
              <p className="text-gray-600 mt-1">Complete guide to customizing your intranet portal</p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a href="#overview" className="text-blue-600 hover:text-blue-800 transition-colors">• System Overview</a>
              <a href="#configuration" className="text-blue-600 hover:text-blue-800 transition-colors">• Configuration File</a>
              <a href="#branding" className="text-blue-600 hover:text-blue-800 transition-colors">• Company Branding</a>
              <a href="#links" className="text-blue-600 hover:text-blue-800 transition-colors">• Managing Links</a>
              <a href="#icons" className="text-blue-600 hover:text-blue-800 transition-colors">• Using Icons</a>
              <a href="#monitoring" className="text-blue-600 hover:text-blue-800 transition-colors">• System Monitoring</a>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Overview Section */}
            <section id="overview">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  This intranet portal is a customizable dashboard that allows you to organize and access your company's internal tools and resources. 
                  All customization is done through a single JSON configuration file, making it easy to update without technical expertise.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                  <p className="text-blue-800 font-medium">💡 Pro Tip: Always make a backup of your configuration file before making changes!</p>
                </div>
              </div>
            </section>

            {/* Configuration Section */}
            <section id="configuration">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Configuration File</h2>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The main configuration file is located at <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/data/links.json</code>. 
                  This file contains all the settings for your intranet portal.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`{
  "companyName": "Your Company Name",
  "companyLogo": "/path/to/logo.png",
  "navigation": {
    "showHomeButton": true,
    "homeButtonText": "Dashboard",
    "homeButtonIcon": "Home"
  },
  "systemMonitoring": {
    "enabled": true,
    "zabbixUrl": "https://your-zabbix-server.com",
    "refreshInterval": 30000,
    "displayName": "System Status",
    "fallbackStatus": "Unknown"
  },
  "categories": [...]
}`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Branding Section */}
            <section id="branding">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Company Branding</h2>
              </div>
              <div className="prose prose-blue max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Name</h3>
                    <p className="text-gray-700 mb-2">Change the <code className="bg-gray-100 px-2 py-1 rounded text-sm">companyName</code> field:</p>
                    <div className="bg-gray-100 rounded p-3">
                      <code className="text-sm">"companyName": "Acme Corporation"</code>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Logo</h3>
                    <p className="text-gray-700 mb-2">Update the <code className="bg-gray-100 px-2 py-1 rounded text-sm">companyLogo</code> field:</p>
                    <div className="bg-gray-100 rounded p-3">
                      <code className="text-sm">"companyLogo": "/assets/logo.png"</code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Links Section */}
            <section id="links">
              <div className="flex items-center space-x-3 mb-4">
                <Link className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Managing Links</h2>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Links are organized into categories (departments). Each category can contain multiple links to tools and resources.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`{
  "id": "it",
  "title": "IT Department",
  "icon": "Monitor",
  "color": "bg-blue-500",
  "backgroundImage": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "links": [
    {
      "title": "Help Desk",
      "url": "https://helpdesk.company.com",
      "description": "Submit IT support tickets"
    },
    {
      "title": "Network Monitor",
      "url": "https://monitor.company.com",
      "description": "View network status"
    }
  ]
}`}
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Adding New Links:</h4>
                  <ol className="list-decimal list-inside text-yellow-700 space-y-1">
                    <li>Find the appropriate category in the "categories" array</li>
                    <li>Add a new object to the "links" array</li>
                    <li>Include title, url, and description fields</li>
                    <li>Save the file and refresh the page</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Icons Section */}
            <section id="icons">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Using Icons</h2>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  This system uses Lucide React icons. You can find available icons at{' '}
                  <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    lucide.dev/icons
                  </a>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <code className="text-sm text-gray-700">Monitor</code>
                    <p className="text-xs text-gray-500 mt-1">IT/Tech</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <code className="text-sm text-gray-700">Users</code>
                    <p className="text-xs text-gray-500 mt-1">HR</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <code className="text-sm text-gray-700">DollarSign</code>
                    <p className="text-xs text-gray-500 mt-1">Finance</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <code className="text-sm text-gray-700">Truck</code>
                    <p className="text-xs text-gray-500 mt-1">Operations</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Monitoring Section */}
            <section id="monitoring">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">System Monitoring (Zabbix)</h2>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Configure Zabbix monitoring to display system status in the sidebar footer.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`"systemMonitoring": {
  "enabled": true,
  "zabbixUrl": "https://your-zabbix-server.com/api_jsonrpc.php",
  "refreshInterval": 30000,
  "displayName": "Server Status",
  "fallbackStatus": "Monitoring Disabled"
}`}
                  </pre>
                </div>
                <div className="mt-4 space-y-2">
                  <p><strong>enabled:</strong> Set to false to disable monitoring</p>
                  <p><strong>zabbixUrl:</strong> Your Zabbix server API endpoint</p>
                  <p><strong>refreshInterval:</strong> Update frequency in milliseconds</p>
                  <p><strong>displayName:</strong> Label shown in the sidebar</p>
                  <p><strong>fallbackStatus:</strong> Message when monitoring is unavailable</p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-800">
              Contact IT Support at{' '}
              <a href="mailto:support@company.com" className="font-medium hover:underline">
                support@company.com
              </a>
              {' '}for technical assistance with customizing this portal.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowToUse;
