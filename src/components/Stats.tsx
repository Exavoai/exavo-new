import { Users, TrendingUp, Clock, Headphones } from "lucide-react";

const stats = [
  { 
    icon: Users,
    value: "10K+", 
    label: "Active Businesses" 
  },
  { 
    icon: TrendingUp,
    value: "250%", 
    label: "Growth Rate" 
  },
  { 
    icon: Clock,
    value: "70%", 
    label: "Time Saved" 
  },
  { 
    icon: Headphones,
    value: "24/7", 
    label: "Expert Support" 
  },
];

const Stats = () => {
  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow">
                <stat.icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              
              {/* Value */}
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-muted-foreground text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
