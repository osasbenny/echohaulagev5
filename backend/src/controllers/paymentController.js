import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import Shipment from '../models/Shipment.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo_key');

// @desc    Create payment intent
// @route   POST /api/payments/create-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
  try {
    const { shipmentId, amount } = req.body;

    // Verify shipment exists and belongs to user
    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    if (shipment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        shipmentId: shipmentId,
        userId: req.user._id.toString(),
      },
    });

    // Create payment record
    const payment = await Payment.create({
      userId: req.user._id,
      shipmentId,
      amount,
      currency: 'USD',
      status: 'pending',
      paymentMethod: 'stripe',
      stripePaymentIntentId: paymentIntent.id,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Confirm payment
// @route   POST /api/payments/confirm
// @access  Private
export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, shipmentId } = req.body;

    // Verify payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update payment record
      const payment = await Payment.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntentId },
        {
          status: 'completed',
        },
        { new: true }
      );

      // Update shipment payment status
      const shipment = await Shipment.findByIdAndUpdate(
        shipmentId,
        {
          'payment.status': 'paid',
          'payment.method': 'stripe',
          'payment.transactionId': paymentIntentId,
          'payment.paidAt': new Date(),
        },
        { new: true }
      );

      res.json({
        message: 'Payment successful',
        payment,
        shipment,
      });
    } else {
      res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment history
// @route   GET /api/payments/history
// @access  Private
export const getPaymentHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const payments = await Payment.find({ userId: req.user._id })
      .populate('shipmentId', 'trackingNumber')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Payment.countDocuments({ userId: req.user._id });

    res.json({
      payments,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
