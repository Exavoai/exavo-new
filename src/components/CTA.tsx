import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-muted/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-primary/5"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"></div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Design System: Heading increased by 1.2x, spacing by 1.5x */}
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground animate-fade-in">
            {language === 'ar'
              ? 'هل أنت مستعد لتحويل أعمالك؟'
              : 'Ready to Transform Your Business?'}
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.1s' }}>
            {language === 'ar'
              ? 'انضم إلى آلاف الشركات التي تستخدم Exavo لاتخاذ قرارات مدعومة بالبيانات'
              : 'Join thousands of businesses using Exavo to make data-driven decisions'}
          </p>
          {/* Design System: Primary button uses #0052CC */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in pt-2" style={{ animationDelay: '0.2s' }}>
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-10 h-16 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all font-medium rounded-lg"
              onClick={() => navigate('/login')}
            >
              {language === 'ar' ? 'ابدأ الآن' : 'Get Started Now'}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 h-16 border-2 border-border hover:border-primary/40 hover:bg-primary/5 transition-all font-medium rounded-lg"
              onClick={() => navigate('/services')}
            >
              {language === 'ar' ? 'استكشف الخدمات' : 'Explore Services'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
