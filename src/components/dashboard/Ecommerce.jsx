import React, { useState } from 'react';
import { Plus, DollarSign, ShoppingCart, CreditCard, TrendingUp, Package, Users, Percent } from 'lucide-react';
import { faker } from '@faker-js/faker';

const Ecommerce = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Generate demo data
  const products = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({ min: 29, max: 499 })),
    sales: faker.number.int({ min: 10, max: 200 }),
    revenue: parseFloat(faker.commerce.price({ min: 500, max: 5000 })),
    status: faker.helpers.arrayElement(['active', 'draft', 'archived']),
    image: `https://images.unsplash.com/photo-${faker.number.int({ min: 1500000000000, max: 1700000000000 })}?w=100&h=100&fit=crop`
  }));

  const subscriptions = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    plan: faker.helpers.arrayElement(['Basic', 'Pro', 'Premium', 'Enterprise']),
    price: parseFloat(faker.commerce.price({ min: 9, max: 99 })),
    subscribers: faker.number.int({ min: 20, max: 300 }),
    revenue: parseFloat(faker.commerce.price({ min: 200, max: 3000 })),
    period: faker.helpers.arrayElement(['Monthly', 'Yearly'])
  }));

  const coupons = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    code: faker.lorem.word().toUpperCase() + faker.number.int({ min: 10, max: 99 }),
    discount: faker.number.int({ min: 5, max: 50 }),
    type: faker.helpers.arrayElement(['percentage', 'fixed']),
    used: faker.number.int({ min: 5, max: 100 }),
    limit: faker.number.int({ min: 100, max: 1000 }),
    expires: faker.date.future(),
    status: faker.helpers.arrayElement(['active', 'expired', 'disabled'])
  }));

  const stats = [
    { name: 'Total Revenue', value: '$12,345', icon: DollarSign, change: '+15%', changeType: 'positive' },
    { name: 'Orders', value: '234', icon: ShoppingCart, change: '+8%', changeType: 'positive' },
    { name: 'Active Subscriptions', value: '1,234', icon: Users, change: '+12%', changeType: 'positive' },
    { name: 'Conversion Rate', value: '3.2%', icon: TrendingUp, change: '+0.5%', changeType: 'positive' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">E-commerce</h2>
          <p className="text-gray-600">Manage products, subscriptions, and payments</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: DollarSign },
            { id: 'products', name: 'Products', icon: Package },
            { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
            { id: 'coupons', name: 'Coupons', icon: Percent }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt={product.name} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.revenue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          product.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : product.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subscriptions Tab */}
      {activeTab === 'subscriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{subscription.plan} Plan</h3>
                <span className="text-2xl font-bold text-primary-600">
                  ${subscription.price.toFixed(2)}/{subscription.period.toLowerCase()}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subscribers</span>
                  <span className="font-medium">{subscription.subscribers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Revenue</span>
                  <span className="font-medium">${subscription.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Billing Period</span>
                  <span className="font-medium">{subscription.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coupons Tab */}
      {activeTab === 'coupons' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <code className="text-lg font-mono font-bold text-primary-600">{coupon.code}</code>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      coupon.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : coupon.status === 'expired'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {coupon.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium">
                      {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Used</span>
                    <span className="font-medium">{coupon.used}/{coupon.limit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expires</span>
                    <span className="font-medium">{coupon.expires.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{1000 + i}</p>
                    <p className="text-xs text-gray-500">{faker.person.fullName()}</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    ${faker.commerce.price({ min: 29, max: 199 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
            <div className="space-y-3">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <img className="h-8 w-8 rounded object-cover" src={product.image} alt={product.name} />
                    <span className="text-sm font-medium text-gray-900">{product.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.sales} sales</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ecommerce;
