'use client';

import { SecurityMetrics } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Clock, Star, Zap } from 'lucide-react';

interface SecurityProps {
  data: SecurityMetrics;
}

export default function Security({ data }: SecurityProps) {
  const totalIncidents = data.incident_trends.reduce((sum, trend) => 
    sum + trend.data.reduce((trendSum, item) => trendSum + item.incidents, 0), 0
  );

  const avgResponseTime = data.response_times.reduce((sum, time) => 
    sum + time.avg_response_time, 0
  ) / data.response_times.length;

  const avgSafetyScore = data.safety_scores.reduce((sum, score) => 
    sum + score.safety_score, 0
  ) / data.safety_scores.length;

  const totalDeployments = data.tech_deployments.reduce((sum, deployment) => 
    sum + deployment.deployments, 0
  );

  const summaryStats = [
    {
      title: 'Total Incidents',
      value: totalIncidents.toString(),
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Avg Response Time',
      value: `${avgResponseTime.toFixed(1)} min`,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg Safety Score',
      value: `${avgSafetyScore.toFixed(1)}/10`,
      icon: Star,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Tech Deployments',
      value: totalDeployments.toString(),
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Operations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`${stat.bgColor} border-0 shadow-lg`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Response Times by District</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.response_times}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} min`, 'Response Time']} />
                <Bar dataKey="avg_response_time" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Safety Scores by District</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.safety_scores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis domain={[0, 10]} />
                <Tooltip formatter={(value) => [`${value}/10`, 'Safety Score']} />
                <Bar dataKey="safety_score" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Wayne Tech Deployments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.tech_deployments.map((deployment, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{deployment.district}</span>
                  <span className="text-lg font-bold text-gray-900">{deployment.deployments}</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((deployment.deployments / totalDeployments) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}