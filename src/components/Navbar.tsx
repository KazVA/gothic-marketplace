
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from '@/lib/types';
import { ShoppingCart, Menu, X, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'py-3 glass shadow-lg' : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-serif text-2xl font-bold text-gothic-silver animate-fade-in"
        >
          Gothic Haven
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'nav-link text-gothic-silver/80 hover:text-gothic-silver transition-colors duration-300',
                location.pathname === item.href && 'text-gothic-silver'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        
        {/* Right-side icons */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gothic-silver/80 hover:text-gothic-silver transition-colors duration-300" />
            <span className="absolute -top-2 -right-2 bg-gothic-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-gothic-silver/80" />
            <span className="absolute -top-2 -right-2 bg-gothic-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gothic-silver focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 glass pt-24 px-6 animate-fade-in">
          <nav className="flex flex-col items-center space-y-8 mt-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'text-xl font-medium',
                  location.pathname === item.href 
                    ? 'text-gothic-silver' 
                    : 'text-gothic-silver/70'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
