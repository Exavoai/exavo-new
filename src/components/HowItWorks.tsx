import { Database, Brain, Repeat } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { language } = useLanguage();

  const steps = [
    {
      icon: Database,
      title: language === 'ar' ? 'جمع البيانات وتحليلها' : 'Collect & Analyze Data',
      description: language === 'ar'
        ? 'نبدأ بجمع وتحليل بياناتك من مصادر متعددة. نستخدم أدوات متطورة لضمان دقة البيانات وجودتها، مما يوفر أساساً قوياً لحلول الذكاء الاصطناعي الخاصة بك.'
        : 'We start by collecting and analyzing your data from multiple sources. Using sophisticated tools, we ensure data accuracy and quality, providing a strong foundation for your AI solutions.',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Brain,
      title: language === 'ar' ? 'بناء نماذج مخصصة' : 'Build Custom Models',
      description: language === 'ar'
        ? 'نقوم بتطوير نماذج الذكاء الاصطناعي المخصصة التي تناسب احتياجات عملك بدقة. يقوم فريقنا من الخبراء بتدريب واختبار النماذج للحصول على أفضل أداء ممكن.'
        : 'We develop custom AI models tailored precisely to your business needs. Our team of experts trains and tests the models to achieve optimal performance and accuracy.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Repeat,
      title: language === 'ar' ? 'التكامل والنشر' : 'Integrate & Deploy',
      description: language === 'ar'
        ? 'ندمج الحلول بسلاسة مع أنظمتك الحالية ونوفر تدريباً شاملاً لفريقك. نضمن انتقالاً سلساً مع الحد الأدنى من التعطيل لعملياتك اليومية.'
        : 'We seamlessly integrate solutions with your existing systems and provide comprehensive training for your team. We ensure a smooth transition with minimal disruption to your daily operations.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section className="py-32 bg-muted/30">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-24 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
            {language === 'ar' ? 'كيف نعمل' : 'How It Works'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'ar'
              ? 'عملية بسيطة ومثبتة لتحويل بياناتك إلى رؤى قابلة للتنفيذ'
              : 'A simple, proven process to transform your data into actionable insights'}
          </p>
        </div>

        <div className="space-y-32">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                  <step.icon className="w-7 h-7 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-3xl font-bold text-foreground">{step.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
