import { 
  ExecutiveSummary, 
  FinancialOverview, 
  SecurityMetrics, 
  RDStatus, 
  SupplyChainPerformance, 
  HRAnalytics 
} from './data';

const API_BASE_URL = 'https://data-analysis-app-8szn.onrender.com';

class ApiClient {
  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  async getExecutiveSummary(): Promise<ExecutiveSummary> {
    return this.fetchData<ExecutiveSummary>('/api/executive-summary');
  }

  async getFinancialOverview(): Promise<FinancialOverview> {
    return this.fetchData<FinancialOverview>('/api/financial-overview');
  }

  async getSecurityMetrics(): Promise<SecurityMetrics> {
    return this.fetchData<SecurityMetrics>('/api/security-metrics');
  }

  async getRDStatus(): Promise<RDStatus> {
    return this.fetchData<RDStatus>('/api/rd-status');
  }

  async getSupplyChainPerformance(): Promise<SupplyChainPerformance> {
    return this.fetchData<SupplyChainPerformance>('/api/supply-chain');
  }

  async getHRAnalytics(): Promise<HRAnalytics> {
    return this.fetchData<HRAnalytics>('/api/hr-analytics');
  }
}

export const apiClient = new ApiClient();