
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';
import { AnimatedBackground } from './AnimatedBackground';

interface Link {
  title: string;
  url: string;
  description: string;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  backgroundImage: string;
  links: Link[];
}

interface IntranetData {
  companyName: string;
  companyLogo: string;
  backgroundConfig: {
    type: string;
    images: string[];
    animationType: string;
    primaryColor: string;
    secondaryColor: string;
  };
  welcomeMessage: {
    title: string;
    subtitle: string;
  };
  categories: Category[];
}

interface MainContentProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export function MainContent({ selectedCategory, onCategorySelect }: MainContentProps) {
  const [data, setData] = useState<IntranetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/links.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error loading links data:', error);
        setData({
          companyName: 'TeleCom Solutions',
          companyLogo: '/placeholder.svg',
          backgroundConfig: {
            type: 'animated',
            images: ['photo-1498050108023-c5249f4df085'],
            animationType: 'particles',
            primaryColor: '#0066cc',
            secondaryColor: '#004499'
          },
          welcomeMessage: {
            title: 'Welcome to Your Digital Workspace',
            subtitle: 'Connect, collaborate, and innovate with our integrated platform.'
          },
          categories: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
  };

  const handleBackToHome = () => {
    onCategorySelect('');
  };

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center relative min-h-screen">
        <AnimatedBackground backgroundConfig={{
          type: 'animated',
          images: ['photo-1498050108023-c5249f4df085'],
          animationType: 'particles',
          primaryColor: '#0066cc',
          secondaryColor: '#004499'
        }} />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  const selectedCategoryData = data.categories.find(cat => cat.id === selectedCategory);

  if (!selectedCategory || !selectedCategoryData) {
    return (
      <div className="flex-1 relative min-h-screen overflow-hidden">
        <AnimatedBackground backgroundConfig={data.backgroundConfig} />
        <div className="relative z-10 p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Hero Section - Fixed spacing and text cutoff */}
          <div className="text-center mb-16 pt-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  {data.welcomeMessage.title}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
                {data.welcomeMessage.subtitle}
              </p>
            </div>
          </div>

          {/* Categories Grid - Improved cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {data.categories.map((category) => {
              return (
                <Card 
                  key={category.id} 
                  className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-0 bg-white/90 backdrop-blur-sm hover:bg-white/95 hover:-translate-y-2 h-full"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${category.backgroundImage}?w=400&h=200&fit=crop&auto=format&q=80`}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className={`absolute top-4 left-4 p-3 rounded-xl ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <DynamicIcon name={category.icon} className="h-6 w-6" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-200 transition-colors">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs font-medium bg-blue-50 text-blue-700 border-blue-200">
                        {category.links.length} tools
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Features Section - Improved styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "Server",
                title: "Integrated Tools",
                description: "Access all your essential business tools from one unified platform designed for efficiency.",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: "Users",
                title: "Team Collaboration", 
                description: "Enhance productivity with seamless team communication and collaboration tools.",
                gradient: "from-green-500 to-green-600"
              },
              {
                icon: "Headphones",
                title: "24/7 Support",
                description: "Get help when you need it with our dedicated support team and comprehensive resources.",
                gradient: "from-purple-500 to-purple-600"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100/50">
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <DynamicIcon name={feature.icon} className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative min-h-screen">
      <AnimatedBackground backgroundConfig={data.backgroundConfig} />
      <div className="relative z-10 p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 pt-4">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Category Header */}
        <div className="mb-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-100/50">
          <div className="flex items-center space-x-6">
            <div className={`p-5 rounded-2xl ${selectedCategoryData.color} text-white shadow-lg`}>
              <DynamicIcon name={selectedCategoryData.icon} className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{selectedCategoryData.title}</h1>
              <p className="text-lg text-slate-600">{selectedCategoryData.links.length} available tools and resources</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategoryData.links.map((link, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 cursor-pointer h-full border-0 bg-white/90 backdrop-blur-sm hover:bg-white/95 hover:-translate-y-2"
              onClick={() => handleLinkClick(link.url)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center justify-between group-hover:text-blue-600 transition-colors">
                  <span className="font-bold">{link.title}</span>
                  <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors group-hover:scale-110" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col">
                <CardDescription className="mb-6 flex-1 text-slate-600 leading-relaxed">
                  {link.description}
                </CardDescription>
                <div className="pt-4 border-t border-slate-100">
                  <span className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold group-hover:underline">
                    Launch Application
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
