import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  Package,
  Globe,
  Boxes,
  Clock,
  Shield,
  DollarSign,
  CheckCircle,
} from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Truck className="h-16 w-16 text-primary" />,
      title: 'Express Delivery',
      subtitle: 'Next-Day Service',
      description:
        'Get your packages delivered within 24 hours with our premium express service. Perfect for urgent shipments and time-sensitive deliveries.',
      features: [
        'Next-day delivery guarantee',
        'Priority handling',
        'Real-time tracking',
        'Signature on delivery',
        'Insurance included',
      ],
      price: 'Starting at $25',
    },
    {
      icon: <Package className="h-16 w-16 text-primary" />,
      title: 'Standard Shipping',
      subtitle: '3-Day Delivery',
      description:
        'Reliable and affordable shipping for everyday needs. Our standard service offers the perfect balance of speed and cost-effectiveness.',
      features: [
        '3-day delivery',
        'Real-time tracking',
        'Signature on delivery',
        'Package protection',
        'Flexible pickup options',
      ],
      price: 'Starting at $15',
    },
    {
      icon: <Boxes className="h-16 w-16 text-primary" />,
      title: 'Freight Service',
      subtitle: 'Large Item Shipping',
      description:
        'Specialized handling for large, heavy, or oversized shipments. Our freight service ensures your big items arrive safely and on time.',
      features: [
        'Large item handling',
        'Specialized equipment',
        'White glove service',
        'Delivery scheduling',
        'Full insurance coverage',
      ],
      price: 'Starting at $50',
    },
    {
      icon: <Globe className="h-16 w-16 text-primary" />,
      title: 'International Shipping',
      subtitle: 'Worldwide Delivery',
      description:
        'Ship globally with confidence. We handle customs clearance and provide door-to-door delivery to over 200 countries worldwide.',
      features: [
        'Global coverage',
        'Customs assistance',
        'Duty & tax calculation',
        'International tracking',
        'Comprehensive insurance',
      ],
      price: 'Starting at $75',
    },
  ];

  const additionalServices = [
    {
      icon: <Clock className="h-8 w-8 text-secondary" />,
      title: 'Same-Day Delivery',
      description: 'Ultra-fast delivery for critical shipments within the same city',
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: 'Insurance Options',
      description: 'Comprehensive coverage for high-value items and fragile goods',
    },
    {
      icon: <DollarSign className="h-8 w-8 text-secondary" />,
      title: 'COD Service',
      description: 'Cash on delivery option for e-commerce businesses',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-100">
            Comprehensive logistics solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-center mb-2">
                    {service.title}
                  </h3>
                  <p className="text-center text-primary font-semibold mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-lg font-semibold text-center mb-4">
                      {service.price}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => navigate('/dashboard/create-shipment')}
                    >
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Enhanced options to meet your specific requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Solutions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Business Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Scalable logistics for growing businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">E-commerce Integration</h3>
                <p className="text-gray-600 mb-6">
                  Seamlessly integrate our shipping services with your online store.
                  Automated label generation, bulk shipping, and real-time rate
                  calculation.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>API integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Bulk shipping tools</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Automated tracking updates</span>
                  </li>
                </ul>
                <Button onClick={() => navigate('/contact')}>Learn More</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Corporate Accounts</h3>
                <p className="text-gray-600 mb-6">
                  Volume discounts and dedicated support for businesses. Customized
                  solutions with flexible billing and priority service.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Volume discounts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Monthly invoicing</span>
                  </li>
                </ul>
                <Button onClick={() => navigate('/contact')}>Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="orange-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Create your first shipment today and experience hassle-free logistics
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
