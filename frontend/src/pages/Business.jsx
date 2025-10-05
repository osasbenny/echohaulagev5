import { useNavigate } from 'react-router-dom';
import { Building2, TrendingUp, Package, Zap, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Business = () => {
  const navigate = useNavigate();

  const solutions = [
    {
      icon: Building2,
      title: 'Enterprise Solutions',
      description: 'Customized logistics for large-scale operations with dedicated account management.',
      features: ['Dedicated Account Manager', 'Volume Discounts', 'Priority Support', 'Custom Integration']
    },
    {
      icon: Package,
      title: 'E-commerce Integration',
      description: 'Seamless integration with your online store for automated shipping.',
      features: ['API Integration', 'Real-time Rates', 'Automated Labels', 'Order Tracking']
    },
    {
      icon: Globe,
      title: 'International Trade',
      description: 'Complete international shipping with customs and documentation support.',
      features: ['Customs Clearance', 'Documentation', 'Compliance Support', 'Global Network']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Business Solutions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scalable logistics solutions designed for businesses of all sizes
          </p>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="bg-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <solution.icon className="h-8 w-8 text-orange" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-orange rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-navy hover:bg-navy-light text-white">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Scale Your Business?</h2>
          <p className="text-xl mb-8">Contact our business solutions team today</p>
          <Button className="bg-navy hover:bg-navy-light text-white px-8 py-6 text-lg">
            Contact Sales
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Business;
