import { Card } from "@/components/ui/card";
import { Bot, Workflow, LineChart, Cog, Database, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { language } = useLanguage();
  
  const features = [
    { 
      icon: Database, 
      title: language === 'ar' ? 'نمذجة البيانات' : 'Data Modeling', 
      description: language === 'ar' 
        ? 'قم ببناء نماذج بيانات مخصصة تناسب احتياجات عملك الفريدة بدقة.'
        : 'Build custom data models tailored to your unique business needs with precision.'
    },
    { 
      icon: Bot, 
      title: language === 'ar' ? 'أتمتة الذكاء الاصطناعي' : 'AI Automation', 
      description: language === 'ar'
        ? 'أتمت المهام المتكررة بالذكاء الاصطناعي واوفر ساعات من العمل اليدوي.'
        : 'Automate repetitive tasks with AI and save hours of manual work.'
    },
    { 
      icon: LineChart, 
      title: language === 'ar' ? 'التحليلات التنبؤية' : 'Predictive Analytics', 
      description: language === 'ar'
        ? 'احصل على رؤى تنبؤية لاتخاذ قرارات أفضل والبقاء في المقدمة.'
        : 'Get predictive insights to make better decisions and stay ahead.'
    },
    { 
      icon: Cog, 
      title: language === 'ar' ? 'تكامل الأنظمة' : 'System Integration', 
      description: language === 'ar'
        ? 'قم بدمج حلولنا بسلاسة مع أدواتك وأنظمتك الحالية.'
        : 'Seamlessly integrate our solutions with your existing tools and systems.'
    },
    { 
      icon: Workflow, 
      title: language === 'ar' ? 'سير العمل الذكي' : 'Smart Workflows', 
      description: language === 'ar'
        ? 'قم بإنشاء سير عمل ذكي يتكيف مع احتياجات عملك المتغيرة.'
        : 'Create intelligent workflows that adapt to your changing business needs.'
    },
    { 
      icon: Sparkles, 
      title: language === 'ar' ? 'الرؤى القابلة للتنفيذ' : 'Actionable Insights', 
      description: language === 'ar'
        ? 'حوّل البيانات المعقدة إلى رؤى واضحة وقابلة للتنفيذ.'
        : 'Transform complex data into clear, actionable insights.'
    },
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
            {language === 'ar' ? 'خدماتنا الأساسية' : 'Our Core Services'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'ar'
              ? 'حلول شاملة مدعومة بالذكاء الاصطناعي لتحويل أعمالك'
              : 'Comprehensive AI-powered solutions to transform your business'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group animate-slide-up border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-primary" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
