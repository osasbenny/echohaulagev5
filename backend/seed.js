import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Shipment from './src/models/Shipment.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Shipment.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@echohaulage.com',
      password: 'admin123',
      phone: '+1 (555) 000-0001',
      role: 'admin',
    });
    console.log('Admin user created');

    // Create customer users
    const customer1 = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '+1 (555) 123-4567',
      role: 'customer',
    });

    const customer2 = await User.create({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'password123',
      phone: '+1 (555) 987-6543',
      role: 'customer',
    });
    console.log('Customer users created');

    // Create sample shipments
    const shipment1 = await Shipment.create({
      trackingNumber: 'EHE-20250104-12345',
      userId: customer1._id,
      sender: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States',
        },
      },
      recipient: {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '+1 (555) 111-2222',
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'United States',
        },
      },
      package: {
        weight: 2.5,
        length: 30,
        width: 20,
        height: 15,
        description: 'Electronics',
        value: 500,
      },
      service: {
        type: 'express',
        estimatedDays: 1,
      },
      pricing: {
        baseRate: 25,
        insurance: 5,
        tax: 2.4,
        total: 32.4,
        currency: 'USD',
      },
      status: 'in_transit',
      tracking: [
        {
          status: 'pending',
          location: 'New York, NY',
          description: 'Shipment created and awaiting pickup',
          timestamp: new Date('2025-01-04T08:00:00Z'),
        },
        {
          status: 'picked_up',
          location: 'New York, NY',
          description: 'Package picked up by courier',
          timestamp: new Date('2025-01-04T10:00:00Z'),
        },
        {
          status: 'in_transit',
          location: 'Chicago, IL',
          description: 'In transit to destination',
          timestamp: new Date('2025-01-04T14:00:00Z'),
        },
      ],
      estimatedDelivery: new Date('2025-01-05T17:00:00Z'),
      payment: {
        status: 'paid',
        method: 'stripe',
        transactionId: 'pi_test_123456',
        paidAt: new Date('2025-01-04T08:30:00Z'),
      },
    });

    const shipment2 = await Shipment.create({
      trackingNumber: 'EHE-20250103-67890',
      userId: customer2._id,
      sender: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 (555) 987-6543',
        address: {
          street: '789 Elm St',
          city: 'Boston',
          state: 'MA',
          zipCode: '02101',
          country: 'United States',
        },
      },
      recipient: {
        name: 'Bob Williams',
        email: 'bob@example.com',
        phone: '+1 (555) 333-4444',
        address: {
          street: '321 Pine Rd',
          city: 'Miami',
          state: 'FL',
          zipCode: '33101',
          country: 'United States',
        },
      },
      package: {
        weight: 1.2,
        length: 25,
        width: 15,
        height: 10,
        description: 'Books',
        value: 150,
      },
      service: {
        type: 'standard',
        estimatedDays: 3,
      },
      pricing: {
        baseRate: 15,
        insurance: 2,
        tax: 1.36,
        total: 18.36,
        currency: 'USD',
      },
      status: 'delivered',
      tracking: [
        {
          status: 'pending',
          location: 'Boston, MA',
          description: 'Shipment created and awaiting pickup',
          timestamp: new Date('2025-01-03T08:00:00Z'),
        },
        {
          status: 'picked_up',
          location: 'Boston, MA',
          description: 'Package picked up by courier',
          timestamp: new Date('2025-01-03T10:00:00Z'),
        },
        {
          status: 'in_transit',
          location: 'Atlanta, GA',
          description: 'In transit to destination',
          timestamp: new Date('2025-01-03T18:00:00Z'),
        },
        {
          status: 'out_for_delivery',
          location: 'Miami, FL',
          description: 'Out for delivery',
          timestamp: new Date('2025-01-04T08:00:00Z'),
        },
        {
          status: 'delivered',
          location: 'Miami, FL',
          description: 'Package delivered successfully',
          timestamp: new Date('2025-01-04T14:30:00Z'),
        },
      ],
      estimatedDelivery: new Date('2025-01-06T17:00:00Z'),
      actualDelivery: new Date('2025-01-04T14:30:00Z'),
      payment: {
        status: 'paid',
        method: 'stripe',
        transactionId: 'pi_test_789012',
        paidAt: new Date('2025-01-03T08:30:00Z'),
      },
    });

    console.log('Sample shipments created');
    console.log('\n=== Seed Data Summary ===');
    console.log('Admin: admin@echohaulage.com / admin123');
    console.log('Customer 1: john@example.com / password123');
    console.log('Customer 2: jane@example.com / password123');
    console.log('Shipment 1: EHE-20250104-12345 (In Transit)');
    console.log('Shipment 2: EHE-20250103-67890 (Delivered)');
    console.log('========================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
