import React, { useState } from 'react';
import { Plus, TrendingUp, Target, Users, Eye, MousePointer, BarChart3, Calendar } from 'lucide-react';
import { faker } from '@faker-js/faker';

const Marketing = () => {
  const [activeTab, setActiveTab] = useState('campaigns');

  // Generate demo data
  const campaigns = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: faker.lorem.words(3),
    type: faker.helpers.arrayElement(['Email', 'Social Media', 'Google Ads', 'Content']),
    status: faker.helpers.arrayElement(['active', 'paused', 'completed', 'draft']),
    budget: parseFloat(faker.commerce.price({ min: 100, max: 2000 })),
    spent: parseFloat(faker.commerce.price({ min: 50, max: 1500 })),
    impressions: faker.number.int({ min: 1000, max: 50000 }),
    clicks: faker.number.int({ min: 50, max: 2000 }),
    conversions: faker.number.int({ min: 5, max: 200 }),
    startDate: faker.date.recent({ days: 30 }),
    endDate: faker.date.future({ days: 30 })
  }));

  const funnels = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: faker.lorem.words(2) + ' Funnel',
    visitors: faker.number.int({ min: 1000, max: 10000 }),
    leads: faker.number.int({ min: 100, max: 2000 }),
    customers: faker.number.int({ min: 10, max: 300 }),
    revenue: parseFloat(faker.commerce.price({ min: 500, max: 15000 })),
    conversionRate: parseFloat((Math.random() * 10 + 1).toFixed(1))
  }));

  const leads = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    source: faker.helpers.arrayElement(['Google Ads', 'Facebook', 'Organic', 'Email', 'Referral']),
    score: faker.number.int({ min: 1, max: 100 }),
    status: faker.helpers.arrayElement(['new', 'qualified', 'contacted', 'converted']),
    date: faker.date.recent(),
    value: parseFloat(faker.commerce.price({ min: 50, max: 500 }))
  }));

  const stats = [
    { name: 'Total Campaigns', value: '12', icon: Target, change: '+2', changeType: 'positive' },
    { name: 'Active Leads', value: '856', icon: Users, change: '+15%', changeType: 'positive' },
    { name: 'Conversion Rate', value: '4.2%', icon: TrendingUp, change: '+0.8%', changeType: 'positive' },
    { name: 'ROI', value: '285%', icon: BarChart3, change: '+12%', changeType: 'positive' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Marketing</h2>
          <p className="text-gray-600">Manage campaigns, leads, and funnels</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>New Campaign</span>
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
            { id: 'campaigns', name: 'Campaigns', icon: Target },
            { id: 'funnels', name: 'Funnels', icon: TrendingUp },
            { id: 'leads', name: 'Leads', icon: Users },
            { id: 'analytics', name: 'Analytics', icon: BarChart3 }
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

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impressions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">
                        {campaign.startDate.toLocaleDateString()} - {campaign.endDate.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${campaign.spent.toFixed(0)} / ${campaign.budget.toFixed(0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.impressions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.conversions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          campaign.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : campaign.status === 'paused'
                            ? 'bg-yellow-100 text-yellow-800'
                            : campaign.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Funnels Tab */}
      {activeTab === 'funnels' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {funnels.map((funnel) => (
            <div key={funnel.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{funnel.name}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Visitors</span>
                  </div>
                  <span className="text-lg font-semibold">{funnel.visitors.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MousePointer className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Leads</span>
                  </div>
                  <span className="text-lg font-semibold">{funnel.leads.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Customers</span>
                  </div>
                  <span className="text-lg font-semibold">{funnel.customers.toLocaleString()}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Conversion Rate</span>
                    <span className="text-lg font-bold text-primary-600">{funnel.conversionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-gray-900">Revenue</span>
                    <span className="text-lg font-bold text-green-600">${funnel.revenue.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{lead.score}</div>
                        <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${lead.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${lead.value.toFixed(0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          lead.status === 'converted'
                            ? 'bg-green-100 text-green-800'
                            : lead.status === 'qualified'
                            ? 'bg-blue-100 text-blue-800'
                            : lead.status === 'contacted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.date.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
          <p className="text-gray-500 mb-4">Detailed marketing analytics and insights coming soon.</p>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Set up Analytics
          </button>
        </div>
      )}
    </div>
  );
};

export default Marketing;
