
import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
  links: Link[];
}

interface IntranetData {
  companyName: string;
  categories: Category[];
}

const iconMap = {
  Monitor,
  Headphones,
  Users,
  Calculator,
};

const IntranetLanding = () => {
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
        // Fallback data if JSON fails to load
        setData({
          companyName: 'TeleCom Solutions',
          categories: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading intranet...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-red-600">Failed to load intranet data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{data.companyName}</h1>
              <p className="text-gray-600 mt-1">Employee Intranet Portal</p>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Internal Access Only
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Quick Access Portal</h2>
          <p className="text-gray-600">Access all your essential tools and resources</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="multiple" className="space-y-4">
            {data.categories.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Monitor;
              
              return (
                <AccordionItem key={category.id} value={category.id} className="border rounded-lg shadow-sm bg-white">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 rounded-t-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                        <p className="text-sm text-gray-500">{category.links.length} available tools</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 border-t bg-gray-50">
                    <div className="grid gap-4 md:grid-cols-2">
                      {category.links.map((link, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center justify-between">
                              <span>{link.title}</span>
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription className="mb-3">{link.description}</CardDescription>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Access Tool
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            Need help? Contact IT Support at{' '}
            <a href="mailto:support@telecom.com" className="text-blue-600 hover:text-blue-800">
              support@telecom.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default IntranetLanding;
