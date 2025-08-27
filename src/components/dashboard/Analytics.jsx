import React, { useState } from 'react';
import { TrendingUp, Users, Eye, Clock, BarChart3, PieChart, Download, Filter } from 'lucide-react';
import { faker } from '@faker-js/faker';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');

  const stats = [
    { name: 'Total Views', value: '45,678', icon: Eye, change: '+12%', changeType: 'positive' },
    { name: 'Active Users', value: '2,345', icon: Users, change: '+8%', changeType: 'positive' },
    { name: 'Avg. Watch Time', value: '12m 34s', icon: Clock, change: '+15%', changeType: 'positive' },
    { name: 'Completion Rate', value: '68%', icon: TrendingUp, change: '+5%', changeType: 'positive' }
  ];

  const topCourses = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: faker.lorem.words(3),
    views: faker.number.int({ min: 1000, max: 10000 }),
    completions: faker.number.int({ min: 100, max: 2000 }),
    avgRating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    revenue: parseFloat(faker.commerce.price({ min: 500, max: 5000 }))
  }));

  const geoData = Array.from({ length: 10 }, (_, i) => ({
    country: faker.location.country(),
    users: faker.number.int({ min: 50, max: 500 }),
    percentage: parseFloat((Math.random() * 20 + 5).toFixed(1))
  }));

  const trafficSources = [
    { source: 'Direct', users: 45.2, color: 'bg-blue-500' },
    { source: 'Google Search', users: 32.8, color: 'bg-green-500' },
    { source: 'Social Media', users: 15.6, color: 'bg-purple-500' },
    { source: 'Email', users: 6.4, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600">Track performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
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
              <span className="text-sm text-gray-500 ml-1">from last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'courses', name: 'Course Analytics', icon: TrendingUp },
            { id: 'users', name: 'User Analytics', icon: Users },
            { id: 'geography', name: 'Geography', icon: PieChart }
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Sources */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                    <span className="text-sm font-medium text-gray-900">{source.source}</span>
                  </div>
                  <span className="text-sm text-gray-600">{source.users}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Courses</h3>
            <div className="space-y-4">
              {topCourses.slice(0, 5).map((course) => (
                <div key={course.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{course.title}</p>
                    <p className="text-xs text-gray-500">{course.views.toLocaleString()} views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">${course.revenue.toFixed(0)}</p>
                    <p className="text-xs text-gray-500">⭐ {course.avgRating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Course Analytics Tab */}
      {activeTab === 'courses' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Course Performance</h3>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.completions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ⭐ {course.avgRating}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ${course.revenue.toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Analytics Tab */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Engagement</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Active Users</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weekly Active Users</span>
                <span className="font-semibold">5,678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Active Users</span>
                <span className="font-semibold">12,345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">User Retention (7-day)</span>
                <span className="font-semibold text-green-600">72%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Behavior</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Session Duration</span>
                <span className="font-semibold">15m 32s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Pages per Session</span>
                <span className="font-semibold">4.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Course Completion Rate</span>
                <span className="font-semibold text-green-600">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bounce Rate</span>
                <span className="font-semibold text-orange-600">23%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Geography Tab */}
      {activeTab === 'geography' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Users by Country</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {geoData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{country.country}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{country.users}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h4>
              <p className="text-gray-500">Visual geography analytics coming soon</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
