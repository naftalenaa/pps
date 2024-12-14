import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import logoMealkit from '../assets/logo-mealkit.png';
import light from '../assets/light.png';

const Header = () => (
  <header className="border-b bg-white">
    <div className="container mx-auto flex items-center justify-between p-1">
      <img src={logoMealkit} alt="Mealkit Logo" className="h-11 w-auto" />
      <div className="flex items-center gap-4 p-2">
        <Button variant="ghost" size="lg" className="gap-3">
          <ShoppingCart className="!h-5 !w-5 text-blue-700" />
          <p className="text-m text-blue-700">Cart</p>
        </Button>
        <img src={light} alt="profile" className="h-11 w-11 rounded-full" />
      </div>
    </div>
  </header>
);

export default Header;
