import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Package } from 'lucide-react';
import api from '../lib/axios';

const CreateShipment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(null);

  const [formData, setFormData] = useState({
    // Sender
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderStreet: '',
    senderCity: '',
    senderState: '',
    senderZipCode: '',
    senderCountry: 'United States',

    // Recipient
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientStreet: '',
    recipientCity: '',
    recipientState: '',
    recipientZipCode: '',
    recipientCountry: 'United States',

    // Package
    weight: '',
    length: '',
    width: '',
    height: '',
    description: '',
    value: '',

    // Service
    serviceType: 'standard',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateRate = async () => {
    if (!formData.weight || !formData.value) {
      return;
    }

    try {
      const response = await api.post('/rates/calculate', {
        weight: parseFloat(formData.weight),
        serviceType: formData.serviceType,
        packageValue: parseFloat(formData.value),
      });
      setEstimatedCost(response.data);
    } catch (err) {
      console.error('Error calculating rate:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Calculate final rate
      const rateResponse = await api.post('/rates/calculate', {
        weight: parseFloat(formData.weight),
        serviceType: formData.serviceType,
        packageValue: parseFloat(formData.value),
      });

      const shipmentData = {
        sender: {
          name: formData.senderName,
          email: formData.senderEmail,
          phone: formData.senderPhone,
          address: {
            street: formData.senderStreet,
            city: formData.senderCity,
            state: formData.senderState,
            zipCode: formData.senderZipCode,
            country: formData.senderCountry,
          },
        },
        recipient: {
          name: formData.recipientName,
          email: formData.recipientEmail,
          phone: formData.recipientPhone,
          address: {
            street: formData.recipientStreet,
            city: formData.recipientCity,
            state: formData.recipientState,
            zipCode: formData.recipientZipCode,
            country: formData.recipientCountry,
          },
        },
        package: {
          weight: parseFloat(formData.weight),
          length: parseFloat(formData.length),
          width: parseFloat(formData.width),
          height: parseFloat(formData.height),
          description: formData.description,
          value: parseFloat(formData.value),
        },
        service: {
          type: formData.serviceType,
          estimatedDays: rateResponse.data.estimatedDays,
        },
        pricing: {
          baseRate: rateResponse.data.baseRate,
          insurance: rateResponse.data.insurance,
          tax: rateResponse.data.tax,
          total: rateResponse.data.total,
          currency: 'USD',
        },
        estimatedDelivery: new Date(
          Date.now() + rateResponse.data.estimatedDays * 24 * 60 * 60 * 1000
        ),
      };

      const response = await api.post('/shipments', shipmentData);
      navigate(`/dashboard/payment/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create Shipment</h1>
          <p className="text-gray-600 mt-1">
            Fill in the details to create a new shipment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Sender Information */}
          <Card>
            <CardHeader>
              <CardTitle>Sender Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Full Name *</Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    required
                    value={formData.senderName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Email *</Label>
                  <Input
                    id="senderEmail"
                    name="senderEmail"
                    type="email"
                    required
                    value={formData.senderEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderPhone">Phone *</Label>
                <Input
                  id="senderPhone"
                  name="senderPhone"
                  required
                  value={formData.senderPhone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderStreet">Street Address *</Label>
                <Input
                  id="senderStreet"
                  name="senderStreet"
                  required
                  value={formData.senderStreet}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderCity">City *</Label>
                  <Input
                    id="senderCity"
                    name="senderCity"
                    required
                    value={formData.senderCity}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderState">State *</Label>
                  <Input
                    id="senderState"
                    name="senderState"
                    required
                    value={formData.senderState}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderZipCode">ZIP Code *</Label>
                  <Input
                    id="senderZipCode"
                    name="senderZipCode"
                    required
                    value={formData.senderZipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipient Information */}
          <Card>
            <CardHeader>
              <CardTitle>Recipient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Full Name *</Label>
                  <Input
                    id="recipientName"
                    name="recipientName"
                    required
                    value={formData.recipientName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientEmail">Email *</Label>
                  <Input
                    id="recipientEmail"
                    name="recipientEmail"
                    type="email"
                    required
                    value={formData.recipientEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientPhone">Phone *</Label>
                <Input
                  id="recipientPhone"
                  name="recipientPhone"
                  required
                  value={formData.recipientPhone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientStreet">Street Address *</Label>
                <Input
                  id="recipientStreet"
                  name="recipientStreet"
                  required
                  value={formData.recipientStreet}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientCity">City *</Label>
                  <Input
                    id="recipientCity"
                    name="recipientCity"
                    required
                    value={formData.recipientCity}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientState">State *</Label>
                  <Input
                    id="recipientState"
                    name="recipientState"
                    required
                    value={formData.recipientState}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientZipCode">ZIP Code *</Label>
                  <Input
                    id="recipientZipCode"
                    name="recipientZipCode"
                    required
                    value={formData.recipientZipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Details */}
          <Card>
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) =>
                    handleSelectChange('serviceType', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="express">Express (1 day)</SelectItem>
                    <SelectItem value="standard">Standard (3 days)</SelectItem>
                    <SelectItem value="freight">Freight (5 days)</SelectItem>
                    <SelectItem value="international">
                      International (10 days)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    required
                    value={formData.weight}
                    onChange={handleChange}
                    onBlur={calculateRate}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length (cm) *</Label>
                  <Input
                    id="length"
                    name="length"
                    type="number"
                    required
                    value={formData.length}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (cm) *</Label>
                  <Input
                    id="width"
                    name="width"
                    type="number"
                    required
                    value={formData.width}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    required
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Package Description *</Label>
                <Input
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="e.g., Electronics, Clothing, Books"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Declared Value (USD) *</Label>
                <Input
                  id="value"
                  name="value"
                  type="number"
                  step="0.01"
                  required
                  value={formData.value}
                  onChange={handleChange}
                  onBlur={calculateRate}
                />
              </div>

              {estimatedCost && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                  <h4 className="font-semibold mb-2">Estimated Cost</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Base Rate:</span>
                      <span>${estimatedCost.baseRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight Charge:</span>
                      <span>${estimatedCost.weightRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance:</span>
                      <span>${estimatedCost.insurance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%):</span>
                      <span>${estimatedCost.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                      <span>Total:</span>
                      <span>${estimatedCost.total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Estimated delivery: {estimatedCost.estimatedDays} business
                      days
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Package className="mr-2 h-4 w-4" />
                  Continue to Payment
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShipment;
