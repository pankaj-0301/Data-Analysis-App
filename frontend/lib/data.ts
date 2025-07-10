export interface ExecutiveSummary {
  total_revenue: number;
  revenue_growth: number;
  profit_margin: number;
  total_employees: number;
  active_projects: number;
  high_potential_projects: number;
  avg_response_time: number;
  security_incidents: number;
  employee_retention: number;
  employee_satisfaction: number;
}

export interface TrendData {
  period: string;
  value: number;
}

export interface DivisionTrend {
  division: string;
  data: Array<{
    period: string;
    value: number;
  }>;
}

export interface ProfitMargin {
  division: string;
  margin: number;
}

export interface RDInvestmentTrend {
  period: string;
  investment: number;
}

export interface MarketShareData {
  division: string;
  share: number;
}

export interface FinancialOverview {
  revenue_trends: DivisionTrend[];
  profit_margins: ProfitMargin[];
  rd_investment_trends: RDInvestmentTrend[];
  market_share: MarketShareData[];
}

export interface DistrictIncidentTrend {
  district: string;
  data: Array<{
    month: string;
    incidents: number;
  }>;
}

export interface ResponseTimeData {
  district: string;
  avg_response_time: number;
}

export interface SafetyScoreData {
  district: string;
  safety_score: number;
}

export interface TechDeploymentData {
  district: string;
  deployments: number;
}

export interface SecurityMetrics {
  incident_trends: DistrictIncidentTrend[];
  response_times: ResponseTimeData[];
  safety_scores: SafetyScoreData[];
  tech_deployments: TechDeploymentData[];
}

export interface ProjectStatusData {
  status: string;
  count: number;
}

export interface BudgetAnalysisData {
  division: string;
  allocated: number;
  spent: number;
  utilization: number;
}

export interface CommercializationData {
  potential: string;
  count: number;
}

export interface TimelineAdherenceData {
  division: string;
  adherence: number;
}

export interface RDStatus {
  project_status: ProjectStatusData[];
  budget_analysis: BudgetAnalysisData[];
  commercialization_potential: CommercializationData[];
  timeline_adherence: TimelineAdherenceData[];
}

export interface ProductionTrendData {
  facility: string;
  data: Array<{
    month: string;
    volume: number;
  }>;
}

export interface QualityScoreData {
  product_line: string;
  quality_score: number;
}

export interface DisruptionAnalysisData {
  facility: string;
  disruptions: number;
}

export interface SustainabilityData {
  facility: string;
  product_line: string;
  rating: string;
}

export interface SupplyChainPerformance {
  production_trends: ProductionTrendData[];
  quality_scores: QualityScoreData[];
  disruption_analysis: DisruptionAnalysisData[];
  sustainability_ratings: SustainabilityData[];
}

export interface RetentionRateData {
  department: string;
  retention_rate: number;
}

export interface SatisfactionTrendData {
  department: string;
  data: Array<{
    month: string;
    satisfaction: number;
  }>;
}

export interface DiversityMetricData {
  department: string;
  diversity_index: number;
}

export interface TrainingData {
  department: string;
  avg_training_hours: number;
}

export interface HRAnalytics {
  retention_rates: RetentionRateData[];
  satisfaction_trends: SatisfactionTrendData[];
  diversity_metrics: DiversityMetricData[];
  training_data: TrainingData[];
}