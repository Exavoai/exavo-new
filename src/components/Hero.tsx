import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import dashboardHero from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Design System: Increased section spacing by 1.5x */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20 items-center">
          {/* Left Column - Content (60%) */}
          <div className="lg:col-span-3 space-y-10 animate-fade-in">
            {/* Heading - Design System: Increased by 1.2x (4xl→5xl, 5xl→6xl, 6xl→7xl) */}
            {/* Inter font family applied via Tailwind config */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] text-foreground tracking-tight">
              {language === 'ar'
                ? 'تحليلات مدعومة بالذكاء الاصطناعي لأعمالك'
                : 'Track time and boost productivity'}
            </h1>

            {/* Subtext - Design System: Neutral text color #1F2937 */}
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              {language === 'ar'
                ? 'حوّل بياناتك إلى رؤى قابلة للتنفيذ مع تحليلات الذكاء الاصطناعي فائقة السرعة.'
                : 'Empower your team with automated time tracking, productivity insights, and seamless workforce management.'}
            </p>

            {/* CTA Buttons - Design System: Primary #0052CC, Secondary #1A73E8 */}
            <div className="flex flex-col sm:flex-row gap-5 pt-2">
              <Button
                size="lg"
                className="text-lg px-10 h-16 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all font-medium rounded-lg"
                onClick={() => navigate(user ? '/booking' : '/login')}
              >
                {language === 'ar' ? 'ابدأ مجاناً' : 'Start free trial'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 h-16 border-2 border-border hover:border-primary/40 hover:bg-primary/5 transition-all font-medium rounded-lg"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/services');
                  }
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                {language === 'ar' ? 'شاهد العرض التوضيحي' : 'Watch demo'}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-4 text-base text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>{language === 'ar' ? 'إعداد سريع لمدة 5 دقائق' : 'Free 14-day trial'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>{language === 'ar' ? 'لا حاجة لبطاقة ائتمان' : 'No credit card required'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>{language === 'ar' ? 'إلغاء في أي وقت' : 'Cancel anytime'}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual (40%) */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Main dashboard image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-white dark:bg-card">
                <img
                  src={dashboardHero}
                  alt="Time tracking dashboard interface"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating stat card - top right */}
              <div className="absolute -top-4 -right-4 sm:-right-8 backdrop-blur-md bg-white/95 dark:bg-card/95 rounded-xl p-4 shadow-lg border border-border/50 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">+32%</div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'زيادة الإنتاجية' : 'Productivity'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat card - bottom left */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 backdrop-blur-md bg-white/95 dark:bg-card/95 rounded-xl p-4 shadow-lg border border-border/50 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">2.4k</div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'ساعات محفوظة' : 'Hours tracked'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
