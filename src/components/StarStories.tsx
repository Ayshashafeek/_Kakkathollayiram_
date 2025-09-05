import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Bell, BookOpen, Sparkles,ArrowLeft} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';


interface StarStoriesProps {
  setActivePage: React.Dispatch<React.SetStateAction<'home' | 'about' | 'stories'>>;
}


export const StarStories: React.FC<StarStoriesProps> = ({ setActivePage }) => {

  const { toast } = useToast();

  const handleNotifyMe = () => {
    toast({
      title: "You're on the list!",
      description: "We'll notify you when Star Stories launches.",
    });
  };

  return (
    <div className="min-h-screen relative bg-[url('/bg-stars.jpg')] bg-cover bg-center text-white pt-20">
  {/* Stories content */}
  {/* Background Image */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: "url('/bg-stars.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -2
    }}
  ></div>

  {/* Animated Starfield */}
  <div className="absolute inset-0 starfield opacity-30 z-[-1]"></div>
      

      
      <div className="relative z-10 px-6 py-8 text-center">
        <div className="mb-12 float">
          <BookOpen className="h-20 w-20 mx-auto text-neon-purple mb-6 glow-purple" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
             Whispers of the Stars
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/20 border border-neon-purple/50 mb-6">
            <Sparkles className="h-4 w-4 text-neon-purple" />
            <span className="text-neon-purple font-medium">Exploring Soon</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
        <p className="text-muted-foreground text-xl mb-8 font-bold">
          Dive into the universe of stories hidden among the stars
        </p>

          
          <Card className="glass-card p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <Star className="h-12 w-12 mx-auto text-neon-blue glow-blue" />
                <h3 className="text-lg font-semibold text-cosmic-white">Star Myths</h3>
                <p className="text-muted-foreground text-sm">
                  Discover stories that shaped the constellations above us
                </p>
              </div>
              
              <div className="space-y-3">
                <Sparkles className="h-12 w-12 mx-auto text-neon-purple glow-purple" />
                <h3 className="text-lg font-semibold text-cosmic-white">The Life of a Star
                </h3>
                <p className="text-muted-foreground text-sm">
                From fiery birth to cosmic finale—discover the stellar journey.
                </p>
              </div>
              
              <div className="space-y-3">
                <BookOpen className="h-12 w-12 mx-auto text-yellow-400 glow-blue" />
                <h3 className="text-lg font-semibold text-cosmic-white">Galactic Elegance</h3>
                <p className="text-muted-foreground text-sm">
                Step into a gallery of cosmic colors and stellar brilliance.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="max-w-md mx-auto">
          <Button 
            variant="cosmic" 
            size="lg" 
            onClick={handleNotifyMe}
            className="w-full text-lg py-4"
          >
            <Bell className="h-6 w-6 mr-3" />
            Notify Me 
          </Button>
          
          <p className="text-muted-foreground text-sm mt-4">
          Your gateway to star myths, science, and cosmic art—coming soon
            Be the first to explore the cosmos through stories
          </p>
        </div>
      </div>
    </div>
  );
};