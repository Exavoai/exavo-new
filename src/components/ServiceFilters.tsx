import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, ChevronDown, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ServiceFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  categoryCounts: Record<string, number>;
  onClearFilters: () => void;
}

const categories = [
  { id: 'ai', name: 'AI Services', name_ar: 'خدمات الذكاء الاصطناعي' },
  { id: 'automation', name: 'Automation', name_ar: 'الأتمتة' },
  { id: 'analytics', name: 'Analytics', name_ar: 'التحليلات' },
  { id: 'marketing', name: 'Marketing', name_ar: 'التسويق' },
  { id: 'content', name: 'Content', name_ar: 'المحتوى' },
];

export const ServiceFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  categoryCounts,
  onClearFilters,
}: ServiceFiltersProps) => {
  const { language } = useLanguage();
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [emailAlert, setEmailAlert] = useState('');

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={language === 'ar' ? 'ابحث عن أي شيء' : 'Search for anything'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Categories Filter */}
        <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
          <div className="bg-card rounded-lg border border-border p-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left group">
              <span className="font-semibold text-foreground">
                {language === 'ar' ? 'الفئات' : 'Categories'}
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4 space-y-2">
              {categories.map((category) => {
                const count = categoryCounts[category.id] || 0;
                const isSelected = selectedCategories.includes(category.id);
                
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategoryToggle(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="text-sm">
                      {language === 'ar' ? category.name_ar : category.name}
                    </span>
                    <Badge 
                      variant={isSelected ? "secondary" : "outline"}
                      className="ml-2"
                    >
                      {count}
                    </Badge>
                  </button>
                );
              })}
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Price Range Filter */}
        <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
          <div className="bg-card rounded-lg border border-border p-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left group mb-4">
              <span className="font-semibold text-foreground">
                {language === 'ar' ? 'السعر' : 'Price Range'}
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${priceOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                max={maxPrice}
                step={100}
                className="w-full"
              />
              
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                  className="flex-1 h-9"
                  min={0}
                  max={priceRange[1]}
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                  className="flex-1 h-9"
                  min={priceRange[0]}
                  max={maxPrice}
                />
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Clear Filters */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onClearFilters}
        >
          {language === 'ar' ? 'مسح الفلاتر' : 'Clear filters'}
        </Button>

        {/* Newsletter */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="font-semibold mb-2 text-foreground">
            {language === 'ar' ? 'ابق على اطلاع' : 'Stay in the loop'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {language === 'ar' 
              ? 'احصل على إشعارات حول الخدمات الجديدة والعروض والمزيد!' 
              : 'Get notified about new services, discounts, and much more!'}
          </p>
          <Input
            type="email"
            placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'your@email.com'}
            value={emailAlert}
            onChange={(e) => setEmailAlert(e.target.value)}
            className="mb-3"
          />
          <Button variant="default" className="w-full">
            {language === 'ar' ? 'إنشاء تنبيهات' : 'Create alerts'}
          </Button>
        </div>
      </div>
    </aside>
  );
};
