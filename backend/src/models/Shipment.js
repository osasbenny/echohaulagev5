import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true, default: 'United States' },
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: addressSchema, required: true },
});

const trackingEventSchema = new mongoose.Schema({
  status: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

const shipmentSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    sender: {
      type: contactSchema,
      required: true,
    },
    recipient: {
      type: contactSchema,
      required: true,
    },
    package: {
      weight: { type: Number, required: true },
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      description: { type: String, required: true },
      value: { type: Number, required: true },
    },
    service: {
      type: {
        type: String,
        enum: ['express', 'standard', 'freight', 'international'],
        required: true,
      },
      estimatedDays: { type: Number, required: true },
    },
    pricing: {
      baseRate: { type: Number, required: true },
      insurance: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      total: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
    },
    status: {
      type: String,
      enum: [
        'pending',
        'picked_up',
        'in_transit',
        'out_for_delivery',
        'delivered',
        'delayed',
        'cancelled',
      ],
      default: 'pending',
      index: true,
    },
    tracking: [trackingEventSchema],
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    estimatedDelivery: Date,
    actualDelivery: Date,
    payment: {
      status: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending',
      },
      method: String,
      transactionId: String,
      paidAt: Date,
    },
    labelUrl: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Generate tracking number
shipmentSchema.statics.generateTrackingNumber = function () {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(10000 + Math.random() * 90000);
  return `EHE-${year}${month}${day}-${random}`;
};

const Shipment = mongoose.model('Shipment', shipmentSchema);

export default Shipment;
