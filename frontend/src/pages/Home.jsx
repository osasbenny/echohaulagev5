import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Package,
  Truck,
  Globe,
  Clock,
  Shield,
  TrendingUp,
  Search,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const Home = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber}`);
    }
  };

  const services = [
    {
      icon: <Truck className="h-12 w-12 text-primary" />,
      title: 'Express Delivery',
      description: 'Next-day delivery for urgent shipments with priority handling',
    },
    {
      icon: <Package className="h-12 w-12 text-primary" />,
      title: 'Standard Shipping',
      description: 'Reliable 3-day delivery at affordable rates',
    },
    {
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: 'International',
      description: 'Worldwide shipping with customs clearance assistance',
    },
  ];

  const features = [
    {
      icon: <Clock className="h-8 w-8 text-secondary" />,
      title: 'Real-Time Tracking',
      description: 'Track your shipments 24/7 with live updates',
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: 'Secure Delivery',
      description: 'Insurance coverage and signature confirmation',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-secondary" />,
      title: 'Business Solutions',
      description: 'Scalable logistics for growing businesses',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      text: 'Echo Haulage has been instrumental in our e-commerce growth. Their reliable service and competitive rates are unmatched.',
    },
    {
      name: 'Michael Chen',
      company: 'Global Imports',
      text: 'International shipping made easy. The customs clearance support saved us countless hours and headaches.',
    },
    {
      name: 'Emily Rodriguez',
      company: 'Boutique Fashion',
      text: 'Fast, reliable, and professional. Our customers love the tracking experience and timely deliveries.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Shipping & Logistics
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Fast, Reliable, and Secure Delivery Solutions Worldwide
            </p>

            {/* Tracking Search */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleTrack} className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter tracking number (e.g., EHE-20250104-12345)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="h-14 text-lg bg-white"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 px-8 bg-secondary hover:bg-secondary/90"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Track
                </Button>
              </form>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                size="lg"
                onClick={() => navigate('/dashboard/create-shipment')}
                className="bg-white text-primary hover:bg-gray-100"
              >
                Create Shipment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/rates')}
                className="border-white text-white hover:bg-white/10"
              >
                Calculate Rates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive logistics solutions for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Echo Haulage?
            </h2>
            <p className="text-xl text-gray-600">
              Industry-leading features for peace of mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-orange-100 rounded-full p-4 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by thousands of businesses worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-sm text-gray-500">
                      Verified Customer
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="orange-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Ship with Echo Haulage?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers and experience hassle-free
            shipping today
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
