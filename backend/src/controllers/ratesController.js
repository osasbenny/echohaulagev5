import ServiceZone from '../models/ServiceZone.js';

// @desc    Calculate shipping rate
// @route   POST /api/rates/calculate
// @access  Public
export const calculateRate = async (req, res) => {
  try {
    const { weight, serviceType, originZipCode, destinationZipCode } = req.body;

    // Base rates by service type
    const baseRates = {
      express: 25,
      standard: 15,
      freight: 50,
      international: 75,
    };

    const ratePerKg = {
      express: 5,
      standard: 3,
      freight: 8,
      international: 12,
    };

    const estimatedDays = {
      express: 1,
      standard: 3,
      freight: 5,
      international: 10,
    };

    // Calculate base rate
    const baseRate = baseRates[serviceType] || baseRates.standard;
    const weightRate = (ratePerKg[serviceType] || ratePerKg.standard) * weight;
    
    // Calculate insurance (1% of declared value, minimum $2)
    const insurance = Math.max(2, (req.body.packageValue || 0) * 0.01);
    
    // Calculate tax (8%)
    const subtotal = baseRate + weightRate + insurance;
    const tax = subtotal * 0.08;
    
    const total = subtotal + tax;

    res.json({
      baseRate,
      weightRate,
      insurance,
      tax,
      total,
      currency: 'USD',
      estimatedDays: estimatedDays[serviceType] || estimatedDays.standard,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get available services
// @route   GET /api/rates/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const services = [
      {
        type: 'express',
        name: 'Express Delivery',
        description: 'Next-day delivery for urgent shipments',
        estimatedDays: 1,
        features: ['Next-day delivery', 'Real-time tracking', 'Priority handling'],
      },
      {
        type: 'standard',
        name: 'Standard Delivery',
        description: 'Reliable delivery at an affordable price',
        estimatedDays: 3,
        features: ['3-day delivery', 'Real-time tracking', 'Signature on delivery'],
      },
      {
        type: 'freight',
        name: 'Freight Service',
        description: 'For large and heavy shipments',
        estimatedDays: 5,
        features: ['Large item handling', 'Specialized equipment', 'White glove service'],
      },
      {
        type: 'international',
        name: 'International Shipping',
        description: 'Worldwide delivery with customs clearance',
        estimatedDays: 10,
        features: ['Global coverage', 'Customs assistance', 'Insurance included'],
      },
    ];

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get transit time
// @route   POST /api/rates/transit-time
// @access  Public
export const getTransitTime = async (req, res) => {
  try {
    const { serviceType, originZipCode, destinationZipCode } = req.body;

    const transitTimes = {
      express: { min: 1, max: 1 },
      standard: { min: 2, max: 4 },
      freight: { min: 4, max: 7 },
      international: { min: 7, max: 14 },
    };

    const time = transitTimes[serviceType] || transitTimes.standard;

    res.json({
      serviceType,
      estimatedMinDays: time.min,
      estimatedMaxDays: time.max,
      estimatedDelivery: new Date(
        Date.now() + time.max * 24 * 60 * 60 * 1000
      ),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
