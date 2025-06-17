
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
              <a href="#categories" className="text-blue-600 hover:text-blue-800 transition-colors">• Managing Categories</a>
              <a href="#links" className="text-blue-600 hover:text-blue-800 transition-colors">• Managing Links</a>
              <a href="#icons" className="text-blue-600 hover:text-blue-800 transition-colors">• Using Icons</a>
              <a href="#background" className="text-blue-600 hover:text-blue-800 transition-colors">• Background Configuration</a>
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
                  The main configuration file is located at <code className="bg-gray-100 px-2 py-1 rounded text-sm">public/links.json</code>. 
                  This file contains all the settings for your intranet portal.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`{
  "companyName": "TeleCom Solutions",
  "companyLogo": "/placeholder.svg",
  "backgroundConfig": {
    "type": "animated",
    "images": ["photo-1498050108023-c5249f4df085"],
    "animationType": "particles",
    "primaryColor": "#0066cc",
    "secondaryColor": "#004499"
  },
  "navigation": {
    "showHomeButton": true,
    "homeButtonText": "Dashboard",
    "homeButtonIcon": "Home"
  },
  "welcomeMessage": {
    "title": "Welcome to Your Digital Workspace",
    "subtitle": "Connect, collaborate, and innovate..."
  },
  "systemMonitoring": { ... },
  "categories": [ ... ]
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
                      <code className="text-sm">"companyName": "Your Company Name"</code>
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
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome Message</h3>
                  <p className="text-gray-700 mb-2">Customize the main dashboard welcome text:</p>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`"welcomeMessage": {
  "title": "Welcome to Your Digital Workspace",
  "subtitle": "Your custom subtitle here..."
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Categories Section */}
            <section id="categories">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Managing Categories</h2>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Categories represent different departments or sections in your organization. Each category has its own color, icon, and collection of links.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`{
  "id": "it",
  "title": "IT & Technology",
  "icon": "Server",
  "color": "bg-blue-500",
  "backgroundImage": "photo-1498050108023-c5249f4df085",
  "links": [ ... ]
}`}
                  </pre>
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                    <code className="text-xs text-gray-700">bg-blue-500</code>
                    <p className="text-xs text-gray-500 mt-1">IT/Tech</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2"></div>
                    <code className="text-xs text-gray-700">bg-green-500</code>
                    <p className="text-xs text-gray-500 mt-1">Support</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg mx-auto mb-2"></div>
                    <code className="text-xs text-gray-700">bg-purple-500</code>
                    <p className="text-xs text-gray-500 mt-1">HR</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg mx-auto mb-2"></div>
                    <code className="text-xs text-gray-700">bg-orange-500</code>
                    <p className="text-xs text-gray-500 mt-1">Finance</p>
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
                  Each category contains an array of links to internal tools and resources. Links open in new tabs for easy navigation.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`"links": [
  {
    "title": "Help Desk Portal",
    "url": "https://helpdesk.telecom.com",
    "description": "Submit IT tickets and track requests"
  },
  {
    "title": "Network Monitoring",
    "url": "https://network.telecom.com", 
    "description": "Monitor network status and performance"
  }
]`}
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
                    <code className="text-sm text-gray-700">Server</code>
                    <p className="text-xs text-gray-500 mt-1">IT/Tech</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <code className="text-sm text-gray-700">Headphones</code>
                    <p className="text-xs text-gray-500 mt-1">Support</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <code className="text-sm text-gray-700">Users</code>
                    <p className="text-xs text-gray-500 mt-1">HR</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <code className="text-sm text-gray-700">Calculator</code>
                    <p className="text-xs text-gray-500 mt-1">Finance</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Background Section */}
            <section id="background">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Background Configuration</h2>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Customize the animated background with particles and color schemes for a dynamic visual experience.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`"backgroundConfig": {
  "type": "animated",
  "images": [
    "photo-1498050108023-c5249f4df085",
    "photo-1605810230434-7631ac76ec81"
  ],
  "animationType": "particles",
  "primaryColor": "#0066cc",
  "secondaryColor": "#004499"
}`}
                  </pre>
                </div>
                <div className="mt-4 space-y-2">
                  <p><strong>type:</strong> Set to "animated" for dynamic backgrounds</p>
                  <p><strong>images:</strong> Array of Unsplash image IDs for background rotation</p>
                  <p><strong>animationType:</strong> Currently supports "particles"</p>
                  <p><strong>primaryColor/secondaryColor:</strong> Hex colors for the gradient effect</p>
                </div>
              </div>
            </section>

            {/* Monitoring Section */}
            <section id="monitoring">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">System Monitoring</h2>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Configure system monitoring to display status information in the sidebar footer.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`"systemMonitoring": {
  "enabled": true,
  "zabbixUrl": "https://monitoring.telecom.com/api",
  "refreshInterval": 30000,
  "displayName": "System Health",
  "fallbackStatus": "operational"
}`}
                  </pre>
                </div>
                <div className="mt-4 space-y-2">
                  <p><strong>enabled:</strong> Set to false to disable monitoring display</p>
                  <p><strong>zabbixUrl:</strong> Your monitoring system API endpoint</p>
                  <p><strong>refreshInterval:</strong> Update frequency in milliseconds (30000 = 30 seconds)</p>
                  <p><strong>displayName:</strong> Label shown in the sidebar footer</p>
                  <p><strong>fallbackStatus:</strong> Status shown when monitoring is unavailable</p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-800">
              Contact IT Support at{' '}
              <a href="mailto:support@telecom.com" className="font-medium hover:underline">
                support@telecom.com
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
