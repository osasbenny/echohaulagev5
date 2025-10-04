import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Loader2,
} from 'lucide-react';
import api from '../lib/axios';

const Track = () => {
  const { trackingNumber: urlTrackingNumber } = useParams();
  const [trackingNumber, setTrackingNumber] = useState(urlTrackingNumber || '');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError('');
    setShipment(null);

    try {
      const response = await api.get(`/shipments/track/${trackingNumber}`);
      setShipment(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Shipment not found');
    } finally {
      setLoading(false);
    }
  };

  // Auto-track if URL has tracking number
  useState(() => {
    if (urlTrackingNumber) {
      handleTrack();
    }
  }, [urlTrackingNumber]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'out_for_delivery':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'in_transit':
        return <Package className="h-6 w-6 text-orange-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };

  const formatStatus = (status) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Track Your Shipment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrack} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter tracking number (e.g., EHE-20250104-12345)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </>
                )}
              </Button>
            </form>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Shipment Details */}
        {shipment && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      Tracking Number: {shipment.trackingNumber}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Service: {formatStatus(shipment.service.type)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      {getStatusIcon(shipment.status)}
                      <span className="font-semibold text-lg">
                        {formatStatus(shipment.status)}
                      </span>
                    </div>
                    {shipment.estimatedDelivery && (
                      <p className="text-sm text-gray-600">
                        Est. Delivery:{' '}
                        {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">From</h3>
                    <p className="text-sm">{shipment.sender.name}</p>
                    <p className="text-sm text-gray-600">
                      {shipment.sender.address.street}
                    </p>
                    <p className="text-sm text-gray-600">
                      {shipment.sender.address.city}, {shipment.sender.address.state}{' '}
                      {shipment.sender.address.zipCode}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">To</h3>
                    <p className="text-sm">{shipment.recipient.name}</p>
                    <p className="text-sm text-gray-600">
                      {shipment.recipient.address.street}
                    </p>
                    <p className="text-sm text-gray-600">
                      {shipment.recipient.address.city},{' '}
                      {shipment.recipient.address.state}{' '}
                      {shipment.recipient.address.zipCode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Tracking History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative tracking-timeline pl-12">
                  {shipment.tracking
                    .slice()
                    .reverse()
                    .map((event, index) => (
                      <div key={index} className="mb-8 last:mb-0">
                        <div className="absolute left-0 flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold">
                              {formatStatus(event.status)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(event.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {event.description}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Track;
