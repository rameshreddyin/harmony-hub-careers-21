import { Button } from "@/components/ui/button";
import { Music, Users, Trophy, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-music-careers.jpg";
const HeroSection = () => {
  return <section className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Music className="w-4 h-4" />
                Join Our Musical Journey
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Ignite Your
                </span>
                <br />
                <span className="text-foreground">
                  Musical Career
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Shape the future of music education and inspire countless learners worldwide. 
                Our distinction lies in creating exceptional learning experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Explore Opportunities
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary">
                Meet Our Team
              </Button>
            </div>

            
          </div>

          {/* Right Content - Images */}
          
        </div>
      </div>
    </section>;
};
export default HeroSection;