import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, TrendingUp, Clock, CheckCircle, Plus } from 'lucide-react';
import api from '../lib/axios';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_transit: 0,
    delivered: 0,
  });
  const [recentShipments, setRecentShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/shipments?limit=5');
      const shipments = response.data.shipments;
      
      setRecentShipments(shipments);
      
      // Calculate stats
      const statsData = {
        total: response.data.total,
        pending: 0,
        in_transit: 0,
        delivered: 0,
      };
      
      shipments.forEach((shipment) => {
        if (shipment.status === 'pending' || shipment.status === 'picked_up') {
          statsData.pending++;
        } else if (shipment.status === 'in_transit' || shipment.status === 'out_for_delivery') {
          statsData.in_transit++;
        } else if (shipment.status === 'delivered') {
          statsData.delivered++;
        }
      });
      
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your shipments and track deliveries
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link to="/dashboard/create-shipment">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="flex items-center p-6">
                <div className="bg-primary rounded-full p-3 mr-4">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Create Shipment</h3>
                  <p className="text-sm text-gray-600">
                    Start a new delivery order
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/track">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="flex items-center p-6">
                <div className="bg-secondary rounded-full p-3 mr-4">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Track Shipment</h3>
                  <p className="text-sm text-gray-600">
                    Monitor your deliveries
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Shipments</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Package className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Transit</p>
                  <p className="text-3xl font-bold">{stats.in_transit}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Delivered</p>
                  <p className="text-3xl font-bold">{stats.delivered}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Shipments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Shipments</CardTitle>
              <Link to="/dashboard/shipments">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-gray-500">Loading...</p>
            ) : recentShipments.length === 0 ? (
              <p className="text-center py-8 text-gray-500">
                No shipments yet. Create your first shipment to get started!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Tracking Number</th>
                      <th className="text-left py-3 px-4">Recipient</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentShipments.map((shipment) => (
                      <tr key={shipment._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">
                          {shipment.trackingNumber}
                        </td>
                        <td className="py-3 px-4">{shipment.recipient.name}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              shipment.status
                            )}`}
                          >
                            {formatStatus(shipment.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(shipment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link to={`/track/${shipment.trackingNumber}`}>
                            <Button variant="ghost" size="sm">
                              Track
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
