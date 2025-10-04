import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, CreditCard } from 'lucide-react';
import api from '../lib/axios';

const Payment = () => {
  const { shipmentId } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchShipment();
  }, [shipmentId]);

  const fetchShipment = async () => {
    try {
      const response = await api.get(`/shipments/${shipmentId}`);
      setShipment(response.data);
    } catch (err) {
      setError('Failed to load shipment details');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    setError('');

    try {
      // In a real implementation, this would integrate with Stripe
      // For now, we'll simulate a successful payment
      
      // Create payment intent
      const paymentResponse = await api.post('/payments/create-intent', {
        shipmentId: shipment._id,
        amount: shipment.pricing.total,
      });

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Confirm payment
      await api.post('/payments/confirm', {
        paymentIntentId: paymentResponse.data.clientSecret.split('_secret')[0],
        shipmentId: shipment._id,
      });

      setSuccess(true);
      
      // Redirect to tracking page after 2 seconds
      setTimeout(() => {
        navigate(`/track/${shipment.trackingNumber}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your shipment has been created successfully.
            </p>
            <p className="text-sm text-gray-500">
              Tracking Number: <strong>{shipment.trackingNumber}</strong>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to tracking page...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
          <p className="text-gray-600 mt-1">
            Complete your payment to create the shipment
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Shipment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Service</h4>
                <p className="text-sm text-gray-600">
                  {shipment.service.type.charAt(0).toUpperCase() +
                    shipment.service.type.slice(1)}{' '}
                  ({shipment.service.estimatedDays} days)
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">From</h4>
                <p className="text-sm text-gray-600">
                  {shipment.sender.name}
                  <br />
                  {shipment.sender.address.city}, {shipment.sender.address.state}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">To</h4>
                <p className="text-sm text-gray-600">
                  {shipment.recipient.name}
                  <br />
                  {shipment.recipient.address.city},{' '}
                  {shipment.recipient.address.state}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Package</h4>
                <p className="text-sm text-gray-600">
                  Weight: {shipment.package.weight} kg
                  <br />
                  Dimensions: {shipment.package.length} x {shipment.package.width}{' '}
                  x {shipment.package.height} cm
                  <br />
                  Value: ${shipment.package.value}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base Rate:</span>
                  <span>${shipment.pricing.baseRate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Insurance:</span>
                  <span>${shipment.pricing.insurance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>${shipment.pricing.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${shipment.pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is a demo payment page. In
                  production, this would integrate with Stripe for secure payment
                  processing.
                </p>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePayment}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pay ${shipment.pricing.total.toFixed(2)}
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Secure payment powered by Stripe</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
