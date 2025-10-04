import mongoose from 'mongoose';

const serviceZoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    states: [String],
    cities: [String],
    zipCodes: [String],
    baseRate: {
      type: Number,
      required: true,
    },
    ratePerKg: {
      type: Number,
      required: true,
    },
    estimatedDays: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ServiceZone = mongoose.model('ServiceZone', serviceZoneSchema);

export default ServiceZone;
