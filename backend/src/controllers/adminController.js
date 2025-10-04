import User from '../models/User.js';
import Shipment from '../models/Shipment.js';
import Payment from '../models/Payment.js';
import ServiceZone from '../models/ServiceZone.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all shipments
// @route   GET /api/admin/shipments
// @access  Private/Admin
export const getAllShipments = async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }
    if (search) {
      query.trackingNumber = { $regex: search, $options: 'i' };
    }

    const shipments = await Shipment.find(query)
      .populate('userId', 'firstName lastName email')
      .populate('agentId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Shipment.countDocuments(query);

    res.json({
      shipments,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update shipment status
// @route   PUT /api/admin/shipments/:id/status
// @access  Private/Admin
export const updateShipmentStatus = async (req, res) => {
  try {
    const { status, location, description, coordinates } = req.body;
    
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    shipment.status = status;
    shipment.tracking.push({
      status,
      location,
      description,
      coordinates,
      timestamp: new Date(),
    });

    if (status === 'delivered') {
      shipment.actualDelivery = new Date();
    }

    await shipment.save();

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get revenue report
// @route   GET /api/admin/reports/revenue
// @access  Private/Admin
export const getRevenueReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = {
      'payment.status': 'paid',
    };

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const shipments = await Shipment.find(query);

    const totalRevenue = shipments.reduce(
      (sum, shipment) => sum + shipment.pricing.total,
      0
    );

    const revenueByService = shipments.reduce((acc, shipment) => {
      const serviceType = shipment.service.type;
      if (!acc[serviceType]) {
        acc[serviceType] = 0;
      }
      acc[serviceType] += shipment.pricing.total;
      return acc;
    }, {});

    res.json({
      totalRevenue,
      totalShipments: shipments.length,
      revenueByService,
      averageOrderValue: totalRevenue / shipments.length || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get shipment statistics
// @route   GET /api/admin/reports/shipments
// @access  Private/Admin
export const getShipmentStatistics = async (req, res) => {
  try {
    const totalShipments = await Shipment.countDocuments();
    
    const statusCounts = await Shipment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const serviceTypeCounts = await Shipment.aggregate([
      {
        $group: {
          _id: '$service.type',
          count: { $sum: 1 },
        },
      },
    ]);

    const recentShipments = await Shipment.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'firstName lastName email');

    res.json({
      totalShipments,
      statusCounts,
      serviceTypeCounts,
      recentShipments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create service zone
// @route   POST /api/admin/service-zones
// @access  Private/Admin
export const createServiceZone = async (req, res) => {
  try {
    const serviceZone = await ServiceZone.create(req.body);
    res.status(201).json(serviceZone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update service zone
// @route   PUT /api/admin/service-zones/:id
// @access  Private/Admin
export const updateServiceZone = async (req, res) => {
  try {
    const serviceZone = await ServiceZone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!serviceZone) {
      return res.status(404).json({ message: 'Service zone not found' });
    }

    res.json(serviceZone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all service zones
// @route   GET /api/admin/service-zones
// @access  Private/Admin
export const getServiceZones = async (req, res) => {
  try {
    const serviceZones = await ServiceZone.find();
    res.json(serviceZones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
