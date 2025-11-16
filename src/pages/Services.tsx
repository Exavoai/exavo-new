import { useState, useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import BookingDialog from "@/components/BookingDialog";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceFilters } from "@/components/ServiceFilters";
import { Bot, Workflow, LineChart, Mail, FileText, BarChart3 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  price: number;
  currency: string;
  active: boolean;
  image_url?: string | null;
}

const iconMap: Record<string, any> = {
  'AI Chatbot': Bot,
  'Workflow Automation': Workflow,
  'Predictive Analytics': LineChart,
  'Marketing Automation': Mail,
  'Content Generation': FileText,
  'Data Visualization': BarChart3
};

// Map services to categories
const serviceToCategoryMap: Record<string, string> = {
  'AI Chatbot': 'ai',
  'Workflow Automation': 'automation',
  'Predictive Analytics': 'analytics',
  'Marketing Automation': 'marketing',
  'Content Generation': 'content',
  'Data Visualization': 'analytics'
};

const Services = () => {
  const { language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('name');
    
    if (data) {
      setServices(data);
      // Set max price range based on data
      const maxPrice = Math.max(...data.map(s => s.price), 50000);
      setPriceRange([0, maxPrice]);
    }
  };

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    const maxPrice = Math.max(...services.map(s => s.price), 50000);
    setPriceRange([0, maxPrice]);
  };

  // Filtered services based on all filters
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        service.name.toLowerCase().includes(searchLower) ||
        service.name_ar.includes(searchQuery) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.description_ar.includes(searchQuery);

      // Category filter
      const serviceCategory = serviceToCategoryMap[service.name];
      const matchesCategory = 
        selectedCategories.length === 0 || 
        selectedCategories.includes(serviceCategory);

      // Price filter
      const matchesPrice = 
        service.price >= priceRange[0] && 
        service.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [services, searchQuery, selectedCategories, priceRange]);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ai: 0,
      automation: 0,
      analytics: 0,
      marketing: 0,
      content: 0,
    };

    services.forEach(service => {
      const category = serviceToCategoryMap[service.name];
      if (category && counts[category] !== undefined) {
        counts[category]++;
      }
    });

    return counts;
  }, [services]);

  const maxPrice = useMemo(() => 
    Math.max(...services.map(s => s.price), 50000),
    [services]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <ServiceFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
              categoryCounts={categoryCounts}
              onClearFilters={handleClearFilters}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                  {language === 'ar' 
                    ? `عرض ${filteredServices.length} خدمة` 
                    : `Showing ${filteredServices.length} services`}
                </h1>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => {
                  const Icon = iconMap[service.name] || Bot;
                  
                  return (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      name={service.name}
                      name_ar={service.name_ar}
                      description={service.description}
                      description_ar={service.description_ar}
                      price={service.price}
                      currency={service.currency}
                      image_url={service.image_url}
                      Icon={Icon}
                      onBook={() => handleBookService(service)}
                    />
                  );
                })}
              </div>

              {/* Empty State */}
              {filteredServices.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4">
                    <Bot className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === 'ar' 
                      ? 'جرب تعديل البحث أو الفلاتر' 
                      : 'Try adjusting your search or filters'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {selectedService && (
        <BookingDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          serviceName={language === 'ar' ? selectedService.name_ar : selectedService.name}
          serviceId={selectedService.id}
        />
      )}
    </div>
  );
};

export default Services;
