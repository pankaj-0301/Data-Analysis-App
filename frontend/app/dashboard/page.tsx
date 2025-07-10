'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { 
  ExecutiveSummary, 
  FinancialOverview, 
  SecurityMetrics, 
  RDStatus, 
  SupplyChainPerformance, 
  HRAnalytics 
} from '@/lib/data';
import Summary from '@/components/summary';
import Finance from '@/components/finance';
import Security from '@/components/security';
import Loading from '@/components/loading';
import Error from '@/components/error';
import { Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { Building2, DollarSign, Shield, Lightbulb, Truck, Users } from 'lucide-react';

export default function DashboardPage() {
  const [executiveSummary, setExecutiveSummary] = useState<ExecutiveSummary | null>(null);
  const [financialOverview, setFinancialOverview] = useState<FinancialOverview | null>(null);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics | null>(null);
  const [rdStatus, setRdStatus] = useState<RDStatus | null>(null);
  const [supplyChain, setSupplyChain] = useState<SupplyChainPerformance | null>(null);
  const [hrAnalytics, setHrAnalytics] = useState<HRAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [
        summaryData,
        financialData,
        securityData,
        rdData,
        supplyData,
        hrData
      ] = await Promise.all([
        apiClient.getExecutiveSummary(),
        apiClient.getFinancialOverview(),
        apiClient.getSecurityMetrics(),
        apiClient.getRDStatus(),
        apiClient.getSupplyChainPerformance(),
        apiClient.getHRAnalytics()
      ]);

      setExecutiveSummary(summaryData);
      setFinancialOverview(financialData);
      setSecurityMetrics(securityData);
      setRdStatus(rdData);
      setSupplyChain(supplyData);
      setHrAnalytics(hrData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} retry={fetchData} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Wayne Enterprises</h1>
            </div>
            <div className="text-sm text-gray-500">
              Business Intelligence Dashboard
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Summary */}
        {executiveSummary && <Summary data={executiveSummary} />}

        {/* Dashboard Tabs */}
        <Tabs defaultValue="financial" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="financial" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Financial</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="rd" className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">R&D</span>
            </TabsTrigger>
            <TabsTrigger value="supply" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Supply Chain</span>
            </TabsTrigger>
            <TabsTrigger value="hr" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">HR</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="financial" className="space-y-6">
            {financialOverview && <Finance data={financialOverview} />}
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {securityMetrics && <Security data={securityMetrics} />}
          </TabsContent>

          <TabsContent value="rd" className="space-y-6">
            {rdStatus && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">R&D Portfolio</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Project Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {rdStatus.project_status.map((status, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{status.status}</span>
                            <span className="text-lg font-bold text-gray-900">{status.count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Budget Utilization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {rdStatus.budget_analysis.map((budget, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-700">{budget.division}</span>
                              <span className="text-sm font-semibold text-gray-900">{budget.utilization}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${budget.utilization}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="supply" className="space-y-6">
            {supplyChain && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Supply Chain Performance</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Quality Scores by Product Line</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {supplyChain.quality_scores.map((quality, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{quality.product_line}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${quality.quality_score}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{quality.quality_score}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Supply Chain Disruptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {supplyChain.disruption_analysis.map((disruption, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{disruption.facility}</span>
                            <span className="text-lg font-bold text-gray-900">{disruption.disruptions}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="hr" className="space-y-6">
            {hrAnalytics && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">HR Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Retention Rates by Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {hrAnalytics.retention_rates.map((retention, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{retention.department}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${retention.retention_rate}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{retention.retention_rate}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Training Hours by Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {hrAnalytics.training_data.map((training, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{training.department}</span>
                            <span className="text-lg font-bold text-gray-900">{training.avg_training_hours}h</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}