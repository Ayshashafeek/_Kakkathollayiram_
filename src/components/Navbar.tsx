// Navbar.tsx
import { Button } from "@/components/ui/button";
import { Home, Star, Info } from "lucide-react";

interface NavbarProps {
  setActivePage: React.Dispatch<React.SetStateAction<'home' | 'about' | 'stories'>>;
}

export const Navbar: React.FC<NavbarProps> = ({ setActivePage }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center
                    bg-transparent ">
      <div className="flex gap-2 ml-auto">
        <Button variant="glass" size="sm" onClick={() => setActivePage('home')}>
          <Home className="h-4 w-4 mr-1" />
          Home
        </Button>

        <Button variant="glass" size="sm" onClick={() => setActivePage('stories')}>
          <Star className="h-4 w-4 mr-1" />
          Star Stories
        </Button>

        <Button variant="glass" size="sm" onClick={() => setActivePage('about')}>
          <Info className="h-4 w-4 mr-1" />
          About Us
        </Button>
      </div>
    </nav>
  );
};
