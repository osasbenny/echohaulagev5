import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-navy text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a href="tel:1-800-ECHO-EXPRESS" className="flex items-center space-x-2 hover:text-orange transition-colors">
                <Phone className="h-4 w-4" />
                <span>1-800-ECHO-EXPRESS</span>
              </a>
              <a href="mailto:support@echohaulage.com" className="flex items-center space-x-2 hover:text-orange transition-colors">
                <Mail className="h-4 w-4" />
                <span>support@echohaulage.com</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/locations" className="flex items-center space-x-2 hover:text-orange transition-colors">
                <MapPin className="h-4 w-4" />
                <span>Find Locations</span>
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-orange hover:bg-orange-dark px-4 py-1 rounded transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-orange hover:bg-orange-dark px-4 py-1 rounded transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Echo Haulage Express" 
                className="h-16 w-auto"
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-navy font-semibold hover:text-orange transition-colors text-base"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-navy font-semibold hover:text-orange transition-colors text-base"
              >
                Shipping
              </Link>
              <Link
                to="/track"
                className="text-navy font-semibold hover:text-orange transition-colors text-base"
              >
                Tracking
              </Link>
              <Link
                to="/business"
                className="text-navy font-semibold hover:text-orange transition-colors text-base"
              >
                Business Solutions
              </Link>
              <Link
                to="/locations"
                className="text-navy font-semibold hover:text-orange transition-colors text-base"
              >
                Locations
              </Link>
              <Link
                to="/support"
                className="text-navy font-semibold hover:text-orange transition-colors text-base"
              >
                Support
              </Link>
            </div>

            {/* Dashboard Button (if logged in) */}
            {isAuthenticated && (
              <Button
                onClick={() =>
                  navigate(
                    user?.role === 'admin' ? '/admin' : '/dashboard'
                  )
                }
                className="bg-navy hover:bg-navy-light text-white"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
