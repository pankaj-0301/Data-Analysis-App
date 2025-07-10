from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class ExecutiveSummary(BaseModel):
    total_revenue: float
    revenue_growth: float
    profit_margin: float
    total_employees: int
    active_projects: int
    high_potential_projects: int
    avg_response_time: float
    security_incidents: int
    employee_retention: float
    employee_satisfaction: float

class TrendData(BaseModel):
    period: str
    value: float

class DivisionTrend(BaseModel):
    division: str
    data: List[Dict[str, Any]]

class ProfitMargin(BaseModel):
    division: str
    margin: float

class RDInvestmentTrend(BaseModel):
    period: str
    investment: float

class MarketShareData(BaseModel):
    division: str
    share: float

class FinancialOverview(BaseModel):
    revenue_trends: List[DivisionTrend]
    profit_margins: List[ProfitMargin]
    rd_investment_trends: List[RDInvestmentTrend]
    market_share: List[MarketShareData]

class DistrictIncidentTrend(BaseModel):
    district: str
    data: List[Dict[str, Any]]

class ResponseTimeData(BaseModel):
    district: str
    avg_response_time: float

class SafetyScoreData(BaseModel):
    district: str
    safety_score: float

class TechDeploymentData(BaseModel):
    district: str
    deployments: int

class SecurityMetrics(BaseModel):
    incident_trends: List[DistrictIncidentTrend]
    response_times: List[ResponseTimeData]
    safety_scores: List[SafetyScoreData]
    tech_deployments: List[TechDeploymentData]

class ProjectStatusData(BaseModel):
    status: str
    count: int

class BudgetAnalysisData(BaseModel):
    division: str
    allocated: float
    spent: float
    utilization: float

class CommercializationData(BaseModel):
    potential: str
    count: int

class TimelineAdherenceData(BaseModel):
    division: str
    adherence: float

class RDStatus(BaseModel):
    project_status: List[ProjectStatusData]
    budget_analysis: List[BudgetAnalysisData]
    commercialization_potential: List[CommercializationData]
    timeline_adherence: List[TimelineAdherenceData]

class ProductionTrendData(BaseModel):
    facility: str
    data: List[Dict[str, Any]]

class QualityScoreData(BaseModel):
    product_line: str
    quality_score: float

class DisruptionAnalysisData(BaseModel):
    facility: str
    disruptions: int

class SustainabilityData(BaseModel):
    facility: str
    product_line: str
    rating: str

class SupplyChainPerformance(BaseModel):
    production_trends: List[ProductionTrendData]
    quality_scores: List[QualityScoreData]
    disruption_analysis: List[DisruptionAnalysisData]
    sustainability_ratings: List[SustainabilityData]

class RetentionRateData(BaseModel):
    department: str
    retention_rate: float

class SatisfactionTrendData(BaseModel):
    department: str
    data: List[Dict[str, Any]]

class DiversityMetricData(BaseModel):
    department: str
    diversity_index: float

class TrainingData(BaseModel):
    department: str
    avg_training_hours: float

class HRAnalytics(BaseModel):
    retention_rates: List[RetentionRateData]
    satisfaction_trends: List[SatisfactionTrendData]
    diversity_metrics: List[DiversityMetricData]
    training_data: List[TrainingData]
