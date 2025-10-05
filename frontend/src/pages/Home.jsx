import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Search, 
  Calculator, 
  MapPin, 
  Globe, 
  FileText, 
  TrendingUp, 
  Truck,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Home = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber.trim()}`);
    }
  };

  const quickActions = [
    { icon: Package, label: 'Ship', link: '/dashboard/create-shipment', color: 'bg-orange' },
    { icon: Search, label: 'Track', link: '/track', color: 'bg-navy-light' },
    { icon: Calculator, label: 'Get Rates', link: '/rates', color: 'bg-navy-light' },
    { icon: MapPin, label: 'Locations', link: '/locations', color: 'bg-navy-light' },
  ];

  const features = [
    { icon: Globe, title: 'International Trade Support' },
    { icon: FileText, title: 'Business Logistics Optimization' },
    { icon: TrendingUp, title: 'Global Network Coverage' },
    { icon: Truck, title: 'Express Shipping' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Moving Your World with{' '}
                <span className="text-orange">Speed</span> and{' '}
                <span className="text-orange">Precision</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Global logistics solutions for individuals, SMEs, and enterprises.
                <br />
                From express shipping to international trade support.
              </p>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(action.link)}
                    className={\`\${action.color} hover:opacity-90 text-white p-6 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all hover:scale-105\`}
                  >
                    <action.icon className="h-8 w-8" />
                    <span className="font-semibold">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Content - Tracking Card */}
            <div className="bg-navy-light/50 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">Track Your Shipment</h2>
              <p className="text-gray-300 mb-6">
                Tracking Number / Reference / Container ID
              </p>
              <form onSubmit={handleTrack} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter tracking number..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full px-6 py-4 text-lg bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-orange focus:ring-orange"
                />
                <Button
                  type="submit"
                  className="w-full bg-orange hover:bg-orange-dark text-white py-4 text-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Track Package</span>
                </Button>
              </form>
              <p className="text-sm text-gray-400 mt-4 text-center">
                For multiple packages, try{' '}
                <a href="/track" className="text-orange hover:underline">
                  bulk tracking
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Ticker */}
      <section className="bg-orange py-4 overflow-hidden">
        <div className="flex items-center space-x-12 animate-marquee whitespace-nowrap">
          {[...features, ...features].map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 text-white">
              <feature.icon className="h-6 w-6" />
              <span className="font-semibold text-lg">{feature.title}</span>
              <span className="text-2xl">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive logistics solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Express Shipping */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange">
              <div className="bg-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Truck className="h-8 w-8 text-orange" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Express Shipping</h3>
              <p className="text-gray-600 mb-6">
                Fast, reliable delivery for time-sensitive shipments. Domestic and international express services available.
              </p>
              <Button
                onClick={() => navigate('/services')}
                className="bg-navy hover:bg-navy-light text-white w-full"
              >
                Learn More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* International Trade */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange">
              <div className="bg-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-orange" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">International Trade</h3>
              <p className="text-gray-600 mb-6">
                Complete international shipping solutions with customs clearance and documentation support.
              </p>
              <Button
                onClick={() => navigate('/services')}
                className="bg-navy hover:bg-navy-light text-white w-full"
              >
                Learn More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Business Solutions */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange">
              <div className="bg-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-orange" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Business Solutions</h3>
              <p className="text-gray-600 mb-6">
                Customized logistics solutions for businesses of all sizes. API integration and bulk shipping available.
              </p>
              <Button
                onClick={() => navigate('/business')}
                className="bg-navy hover:bg-navy-light text-white w-full"
              >
                Learn More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ship?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Create your shipment in minutes and get instant rates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/register')}
              className="bg-orange hover:bg-orange-dark text-white px-8 py-6 text-lg"
            >
              Create Account
            </Button>
            <Button
              onClick={() => navigate('/dashboard/create-shipment')}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-navy px-8 py-6 text-lg"
            >
              Create Shipment
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{\`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      \`}</style>
    </div>
  );
};

export default Home;
