'use client';

import { ExecutiveSummary } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Clock, 
  Shield,
  Heart,
  Star
} from 'lucide-react';

interface SummaryProps {
  data: ExecutiveSummary;
}

export default function Summary({ data }: SummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value * 1000000);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const summaryCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(data.total_revenue),
      change: `${data.revenue_growth > 0 ? '+' : ''}${data.revenue_growth.toFixed(1)}%`,
      icon: data.revenue_growth > 0 ? TrendingUp : TrendingDown,
      trend: data.revenue_growth > 0 ? 'positive' : 'negative'
    },
    {
      title: 'Profit Margin',
      value: `${data.profit_margin.toFixed(1)}%`,
      change: 'Current Quarter',
      icon: Target,
      trend: 'neutral'
    },
    {
      title: 'Total Employees',
      value: formatNumber(data.total_employees),
      change: 'Active Personnel',
      icon: Users,
      trend: 'neutral'
    },
    {
      title: 'Active Projects',
      value: formatNumber(data.active_projects),
      change: `${data.high_potential_projects} High Potential`,
      icon: Target,
      trend: 'positive'
    },
    {
      title: 'Avg Response Time',
      value: `${data.avg_response_time.toFixed(1)} min`,
      change: 'Security Operations',
      icon: Clock,
      trend: 'neutral'
    },
    {
      title: 'Security Incidents',
      value: formatNumber(data.security_incidents),
      change: 'Recent Period',
      icon: Shield,
      trend: data.security_incidents > 50 ? 'negative' : 'positive'
    },
    {
      title: 'Employee Retention',
      value: `${data.employee_retention.toFixed(1)}%`,
      change: 'Annual Rate',
      icon: Heart,
      trend: 'positive'
    },
    {
      title: 'Employee Satisfaction',
      value: `${data.employee_satisfaction.toFixed(1)}/10`,
      change: 'Survey Score',
      icon: Star,
      trend: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${
                card.trend === 'positive' ? 'text-green-600' : 
                card.trend === 'negative' ? 'text-red-600' : 'text-blue-600'
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {card.value}
              </div>
              <p className={`text-xs ${
                card.trend === 'positive' ? 'text-green-600' : 
                card.trend === 'negative' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {card.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}