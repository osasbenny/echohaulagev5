import Shipment from '../models/Shipment.js';

// @desc    Create new shipment
// @route   POST /api/shipments
// @access  Private
export const createShipment = async (req, res) => {
  try {
    const trackingNumber = Shipment.generateTrackingNumber();
    
    const shipment = await Shipment.create({
      ...req.body,
      trackingNumber,
      userId: req.user._id,
      tracking: [
        {
          status: 'pending',
          location: req.body.sender.address.city,
          description: 'Shipment created and awaiting pickup',
          timestamp: new Date(),
        },
      ],
    });

    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all shipments for user
// @route   GET /api/shipments
// @access  Private
export const getShipments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { userId: req.user._id };
    if (status) {
      query.status = status;
    }

    const shipments = await Shipment.find(query)
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

// @desc    Get shipment by ID
// @route   GET /api/shipments/:id
// @access  Private
export const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Check if user owns the shipment or is admin
    if (
      shipment.userId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Track shipment by tracking number
// @route   GET /api/shipments/track/:trackingNumber
// @access  Public
export const trackShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      trackingNumber: req.params.trackingNumber,
    }).populate('userId', 'firstName lastName email');

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update shipment
// @route   PUT /api/shipments/:id
// @access  Private
export const updateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Check if user owns the shipment
    if (shipment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Only allow updates if shipment is pending
    if (shipment.status !== 'pending') {
      return res
        .status(400)
        .json({ message: 'Cannot update shipment after pickup' });
    }

    const updatedShipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedShipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel shipment
// @route   DELETE /api/shipments/:id
// @access  Private
export const cancelShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Check if user owns the shipment
    if (shipment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Only allow cancellation if shipment is pending or picked_up
    if (!['pending', 'picked_up'].includes(shipment.status)) {
      return res
        .status(400)
        .json({ message: 'Cannot cancel shipment at this stage' });
    }

    shipment.status = 'cancelled';
    shipment.tracking.push({
      status: 'cancelled',
      location: shipment.sender.address.city,
      description: 'Shipment cancelled by customer',
      timestamp: new Date(),
    });

    await shipment.save();

    res.json({ message: 'Shipment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add tracking update
// @route   POST /api/shipments/:id/tracking
// @access  Private (Admin/Agent)
export const addTrackingUpdate = async (req, res) => {
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

    // Update delivery date if delivered
    if (status === 'delivered') {
      shipment.actualDelivery = new Date();
    }

    await shipment.save();

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
