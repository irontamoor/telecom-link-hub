
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Monitor, Headphones, Users, Calculator } from 'lucide-react';

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
  image: string;
  links: Link[];
}

interface IntranetData {
  companyName: string;
  companyLogo: string;
  welcomeMessage: {
    title: string;
    subtitle: string;
  };
  categories: Category[];
}

const iconMap = {
  Monitor,
  Headphones,
  Users,
  Calculator,
};

interface MainContentProps {
  selectedCategory: string;
}

export function MainContent({ selectedCategory }: MainContentProps) {
  const [data, setData] = useState<IntranetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/src/data/links.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error loading links data:', error);
        setData({
          companyName: 'TeleCom Solutions',
          companyLogo: '/placeholder.svg',
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

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  const selectedCategoryData = data.categories.find(cat => cat.id === selectedCategory);

  if (!selectedCategory || !selectedCategoryData) {
    return (
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {data.welcomeMessage.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data.welcomeMessage.subtitle}
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.categories.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Monitor;
              
              return (
                <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${category.image}?w=400&h=200&fit=crop`}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute top-4 left-4 p-2 rounded-lg ${category.color} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {category.links.length} tools
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrated Tools</h3>
              <p className="text-gray-600">Access all your essential business tools from one unified platform.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Enhance productivity with seamless team communication and collaboration.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help when you need it with our dedicated support team.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[selectedCategoryData.icon as keyof typeof iconMap] || Monitor;

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-xl ${selectedCategoryData.color} text-white`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedCategoryData.title}</h1>
              <p className="text-gray-600">{selectedCategoryData.links.length} available tools and resources</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategoryData.links.map((link, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between group-hover:text-blue-600 transition-colors">
                  <span>{link.title}</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col">
                <CardDescription className="mb-4 flex-1">{link.description}</CardDescription>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium group-hover:underline"
                >
                  Access Tool
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
