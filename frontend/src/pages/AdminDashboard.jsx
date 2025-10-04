import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  Edit,
} from 'lucide-react';
import api from '../lib/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, [statusFilter]);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, shipmentsResponse] = await Promise.all([
        api.get('/admin/reports/shipments'),
        api.get(
          `/admin/shipments?${statusFilter !== 'all' ? `status=${statusFilter}` : ''}&limit=20`
        ),
      ]);

      setStats(statsResponse.data);
      setShipments(shipmentsResponse.data.shipments);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (shipmentId, newStatus) => {
    try {
      await api.put(`/admin/shipments/${shipmentId}/status`, {
        status: newStatus,
        location: 'Distribution Center',
        description: `Status updated to ${newStatus}`,
      });
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatStatus = (status) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'in_transit':
      case 'out_for_delivery':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
      case 'picked_up':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredShipments = shipments.filter((shipment) =>
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 animate-pulse text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage shipments, users, and system operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Shipments</p>
                  <p className="text-3xl font-bold">{stats?.totalShipments || 0}</p>
                </div>
                <Package className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Users</p>
                  <p className="text-3xl font-bold">
                    {stats?.statusCounts?.reduce((sum, s) => sum + s.count, 0) || 0}
                  </p>
                </div>
                <Users className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Transit</p>
                  <p className="text-3xl font-bold">
                    {stats?.statusCounts?.find((s) => s._id === 'in_transit')
                      ?.count || 0}
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Delivered</p>
                  <p className="text-3xl font-bold">
                    {stats?.statusCounts?.find((s) => s._id === 'delivered')?.count ||
                      0}
                  </p>
                </div>
                <DollarSign className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipments Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <CardTitle>Manage Shipments</CardTitle>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search tracking number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="picked_up">Picked Up</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="out_for_delivery">
                      Out for Delivery
                    </SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Tracking #</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">From → To</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShipments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        No shipments found
                      </td>
                    </tr>
                  ) : (
                    filteredShipments.map((shipment) => (
                      <tr key={shipment._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">
                          {shipment.trackingNumber}
                        </td>
                        <td className="py-3 px-4">
                          {shipment.userId?.firstName} {shipment.userId?.lastName}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {shipment.sender.address.city} →{' '}
                          {shipment.recipient.address.city}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              shipment.status
                            )}`}
                          >
                            {formatStatus(shipment.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          ${shipment.pricing.total.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Select
                            value={shipment.status}
                            onValueChange={(value) =>
                              handleStatusUpdate(shipment._id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <Edit className="h-3 w-3 mr-1" />
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="picked_up">Picked Up</SelectItem>
                              <SelectItem value="in_transit">
                                In Transit
                              </SelectItem>
                              <SelectItem value="out_for_delivery">
                                Out for Delivery
                              </SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="delayed">Delayed</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
