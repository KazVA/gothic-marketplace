
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gothic-muted pt-16 pb-8 border-t border-gothic-silver/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link to="/" className="font-serif text-xl font-bold text-gothic-silver">
              Gothic Haven
            </Link>
            <p className="text-gothic-silver/70 max-w-md mt-4">
              Embrace the darkness with our premium gothic-themed products. 
              Each item is carefully crafted for those who appreciate the beauty in shadows.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gothic-silver/60 hover:text-gothic-accent transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gothic-silver/60 hover:text-gothic-accent transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gothic-silver/60 hover:text-gothic-accent transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gothic-silver/60 hover:text-gothic-accent transition-colors duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium text-gothic-silver">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=mousepads" className="text-gothic-silver/60 hover:text-gothic-silver transition-colors duration-300">
                  Mousepads
                </Link>
              </li>
              <li>
                <Link to="/products?category=journals" className="text-gothic-silver/60 hover:text-gothic-silver transition-colors duration-300">
                  Journals
                </Link>
              </li>
              <li>
                <Link to="/products?category=apparel" className="text-gothic-silver/60 hover:text-gothic-silver transition-colors duration-300">
                  Apparel
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-gothic-silver/60 hover:text-gothic-silver transition-colors duration-300">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium text-gothic-silver">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gothic-silver/60 hover:text-gothic-silver transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gothic-silver/60 hover:text-gothic-silver transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gothic-silver/60 hover:text-gothic-silver transition-colors duration-300">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gothic-silver/60 hover:text-gothic-silver transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gothic-silver/10 text-center text-gothic-silver/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Gothic Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
