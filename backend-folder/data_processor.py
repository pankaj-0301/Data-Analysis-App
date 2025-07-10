import pandas as pd
import numpy as np
from typing import Dict, List, Any
import logging
from datetime import datetime, timedelta
from models import *

logger = logging.getLogger(__name__)

class DataProcessor:
    def __init__(self):
        """Initialize data processor and load all datasets"""
        self.datasets = {}
        self.load_datasets()
    
    def load_datasets(self):
        """Load all CSV datasets"""
        try:
            # Load financial data
            self.datasets['financial'] = pd.read_csv('data/wayne_financial_data_1752126259989.csv')
            logger.info(f"Loaded financial data: {len(self.datasets['financial'])} records")
            
            # Load security data
            self.datasets['security'] = pd.read_csv('data/wayne_security_data_1752126259987.csv')
            self.datasets['security']['Date'] = pd.to_datetime(self.datasets['security']['Date'])
            logger.info(f"Loaded security data: {len(self.datasets['security'])} records")
            
            # Load R&D data
            self.datasets['rd'] = pd.read_csv('data/wayne_rd_portfolio_1752126259988.csv')
            self.datasets['rd']['Start_Date'] = pd.to_datetime(self.datasets['rd']['Start_Date'])
            logger.info(f"Loaded R&D data: {len(self.datasets['rd'])} records")
            
            # Load supply chain data
            self.datasets['supply_chain'] = pd.read_csv('data/wayne_supply_chain_1752126259987.csv')
            self.datasets['supply_chain']['Date'] = pd.to_datetime(self.datasets['supply_chain']['Date'])
            logger.info(f"Loaded supply chain data: {len(self.datasets['supply_chain'])} records")
            
            # Load HR data
            self.datasets['hr'] = pd.read_csv('data/wayne_hr_analytics_1752126259988.csv')
            self.datasets['hr']['Date'] = pd.to_datetime(self.datasets['hr']['Date'])
            logger.info(f"Loaded HR data: {len(self.datasets['hr'])} records")
            
        except Exception as e:
            logger.error(f"Error loading datasets: {str(e)}")
            raise
    
    def get_executive_summary(self) -> ExecutiveSummary:
        """Generate executive summary with key metrics"""
        try:
            # Financial metrics
            financial_df = self.datasets['financial']
            latest_quarter = financial_df[financial_df['Year'] == 2024].groupby('Quarter').last()
            total_revenue = latest_quarter['Revenue_M'].sum()
            total_profit = latest_quarter['Net_Profit_M'].sum()
            profit_margin = (total_profit / total_revenue) * 100 if total_revenue > 0 else 0
            
            # Calculate revenue growth
            q4_2024 = financial_df[(financial_df['Year'] == 2024) & (financial_df['Quarter'] == 'Q4')]['Revenue_M'].sum()
            q4_2023 = financial_df[(financial_df['Year'] == 2023) & (financial_df['Quarter'] == 'Q4')]['Revenue_M'].sum()
            revenue_growth = ((q4_2024 - q4_2023) / q4_2023 * 100) if q4_2023 > 0 else 0
            
            # Security metrics
            security_df = self.datasets['security']
            latest_security = security_df[security_df['Date'] >= '2024-06-01']
            avg_response_time = latest_security['Response_Time_Minutes'].mean()
            security_incidents = latest_security['Security_Incidents'].sum()
            
            # R&D metrics
            rd_df = self.datasets['rd']
            total_rd_projects = len(rd_df)
            active_projects = len(rd_df[rd_df['Status'] == 'Active'])
            high_potential_projects = len(rd_df[rd_df['Commercialization_Potential'].isin(['High', 'Very High'])])
            
            # HR metrics
            hr_df = self.datasets['hr']
            latest_hr = hr_df[hr_df['Date'] >= '2024-06-01']
            avg_retention = latest_hr['Retention_Rate_Pct'].mean()
            avg_satisfaction = latest_hr['Employee_Satisfaction_Score'].mean()
            
            # Employee count
            total_employees = financial_df[financial_df['Year'] == 2024]['Employee_Count'].iloc[-1] if not financial_df.empty else 0
            
            return ExecutiveSummary(
                total_revenue=round(total_revenue, 1),
                revenue_growth=round(revenue_growth, 1),
                profit_margin=round(profit_margin, 1),
                total_employees=int(total_employees),
                active_projects=active_projects,
                high_potential_projects=high_potential_projects,
                avg_response_time=round(avg_response_time, 1),
                security_incidents=int(security_incidents),
                employee_retention=round(avg_retention, 1),
                employee_satisfaction=round(avg_satisfaction, 1)
            )
            
        except Exception as e:
            logger.error(f"Error generating executive summary: {str(e)}")
            raise
    
    def get_financial_overview(self) -> FinancialOverview:
        """Get financial performance overview"""
        try:
            df = self.datasets['financial']
            
            # Revenue trends by division
            division_revenue = df.groupby(['Division', 'Year', 'Quarter'])['Revenue_M'].sum().reset_index()
            revenue_trends = []
            for division in division_revenue['Division'].unique():
                div_data = division_revenue[division_revenue['Division'] == division]
                trend_data = []
                for _, row in div_data.iterrows():
                    trend_data.append({
                        'period': f"{row['Year']}-{row['Quarter']}",
                        'value': float(row['Revenue_M'])
                    })
                revenue_trends.append({
                    'division': division,
                    'data': trend_data
                })
            
            # Profit margins by division
            profit_margins = []
            for division in df['Division'].unique():
                div_data = df[df['Division'] == division]
                total_revenue = div_data['Revenue_M'].sum()
                total_profit = div_data['Net_Profit_M'].sum()
                margin = (total_profit / total_revenue * 100) if total_revenue > 0 else 0
                profit_margins.append({
                    'division': division,
                    'margin': round(margin, 1)
                })
            
            # R&D Investment trends
            rd_investment = df.groupby(['Year', 'Quarter'])['RD_Investment_M'].sum().reset_index()
            rd_trends = []
            for _, row in rd_investment.iterrows():
                rd_trends.append({
                    'period': f"{row['Year']}-{row['Quarter']}",
                    'investment': float(row['RD_Investment_M'])
                })
            
            # Market share data
            market_share = df.groupby('Division')['Market_Share_Pct'].last().reset_index()
            market_share_data = []
            for _, row in market_share.iterrows():
                if pd.notna(row['Market_Share_Pct']):
                    market_share_data.append({
                        'division': row['Division'],
                        'share': float(row['Market_Share_Pct'])
                    })
            
            return FinancialOverview(
                revenue_trends=revenue_trends,
                profit_margins=profit_margins,
                rd_investment_trends=rd_trends,
                market_share=market_share_data
            )
            
        except Exception as e:
            logger.error(f"Error getting financial overview: {str(e)}")
            raise
    
    def get_security_metrics(self) -> SecurityMetrics:
        """Get security operations metrics"""
        try:
            df = self.datasets['security']
            
            # Incident trends by district
            incident_trends = []
            for district in df['District'].unique():
                district_data = df[df['District'] == district]
                monthly_incidents = district_data.groupby(df['Date'].dt.to_period('M'))['Security_Incidents'].sum().reset_index()
                trend_data = []
                for _, row in monthly_incidents.iterrows():
                    trend_data.append({
                        'month': str(row['Date']),
                        'incidents': int(row['Security_Incidents'])
                    })
                incident_trends.append({
                    'district': district,
                    'data': trend_data
                })
            
            # Response time analysis
            response_times = []
            for district in df['District'].unique():
                district_data = df[df['District'] == district]
                avg_response = district_data['Response_Time_Minutes'].mean()
                response_times.append({
                    'district': district,
                    'avg_response_time': round(avg_response, 1)
                })
            
            # Public safety scores
            safety_scores = []
            latest_data = df.groupby('District').last().reset_index()
            for _, row in latest_data.iterrows():
                safety_scores.append({
                    'district': row['District'],
                    'safety_score': float(row['Public_Safety_Score'])
                })
            
            # Wayne Tech deployment efficiency
            tech_deployment = df.groupby('District')['Wayne_Tech_Deployments'].last().reset_index()
            deployment_data = []
            for _, row in tech_deployment.iterrows():
                deployment_data.append({
                    'district': row['District'],
                    'deployments': int(row['Wayne_Tech_Deployments'])
                })
            
            return SecurityMetrics(
                incident_trends=incident_trends,
                response_times=response_times,
                safety_scores=safety_scores,
                tech_deployments=deployment_data
            )
            
        except Exception as e:
            logger.error(f"Error getting security metrics: {str(e)}")
            raise
    
    def get_rd_status(self) -> RDStatus:
        """Get R&D portfolio status"""
        try:
            df = self.datasets['rd']
            
            # Project status distribution
            status_counts = df['Status'].value_counts()
            project_status = []
            for status, count in status_counts.items():
                project_status.append({
                    'status': status,
                    'count': int(count)
                })
            
            # Budget allocation vs spending by division
            budget_analysis = []
            for division in df['Division'].unique():
                div_data = df[df['Division'] == division]
                total_allocated = div_data['Budget_Allocated_M'].sum()
                total_spent = div_data['Budget_Spent_M'].sum()
                budget_analysis.append({
                    'division': division,
                    'allocated': float(total_allocated),
                    'spent': float(total_spent),
                    'utilization': round((total_spent / total_allocated * 100), 1) if total_allocated > 0 else 0
                })
            
            # Commercialization potential
            potential_counts = df['Commercialization_Potential'].value_counts()
            commercialization_potential = []
            for potential, count in potential_counts.items():
                commercialization_potential.append({
                    'potential': potential,
                    'count': int(count)
                })
            
            # Timeline adherence by division
            timeline_adherence = []
            for division in df['Division'].unique():
                div_data = df[df['Division'] == division]
                avg_adherence = div_data['Timeline_Adherence_Pct'].mean()
                timeline_adherence.append({
                    'division': division,
                    'adherence': round(avg_adherence, 1)
                })
            
            return RDStatus(
                project_status=project_status,
                budget_analysis=budget_analysis,
                commercialization_potential=commercialization_potential,
                timeline_adherence=timeline_adherence
            )
            
        except Exception as e:
            logger.error(f"Error getting R&D status: {str(e)}")
            raise
    
    def get_supply_chain_performance(self) -> SupplyChainPerformance:
        """Get supply chain performance metrics"""
        try:
            df = self.datasets['supply_chain']
            
            # Production volume trends
            production_trends = []
            for facility in df['Facility_Location'].unique():
                facility_data = df[df['Facility_Location'] == facility]
                monthly_production = facility_data.groupby(df['Date'].dt.to_period('M'))['Monthly_Production_Volume'].sum().reset_index()
                trend_data = []
                for _, row in monthly_production.iterrows():
                    trend_data.append({
                        'month': str(row['Date']),
                        'volume': int(row['Monthly_Production_Volume'])
                    })
                production_trends.append({
                    'facility': facility,
                    'data': trend_data
                })
            
            # Quality scores by product line
            quality_scores = []
            for product_line in df['Product_Line'].unique():
                product_data = df[df['Product_Line'] == product_line]
                avg_quality = product_data['Quality_Score_Pct'].mean()
                quality_scores.append({
                    'product_line': product_line,
                    'quality_score': round(avg_quality, 1)
                })
            
            # Supply chain disruptions
            disruption_analysis = []
            for facility in df['Facility_Location'].unique():
                facility_data = df[df['Facility_Location'] == facility]
                total_disruptions = facility_data['Supply_Chain_Disruptions'].sum()
                disruption_analysis.append({
                    'facility': facility,
                    'disruptions': int(total_disruptions)
                })
            
            # Sustainability ratings
            sustainability_data = []
            latest_data = df.groupby(['Facility_Location', 'Product_Line']).last().reset_index()
            for _, row in latest_data.iterrows():
                sustainability_data.append({
                    'facility': row['Facility_Location'],
                    'product_line': row['Product_Line'],
                    'rating': row['Sustainability_Rating']
                })
            
            return SupplyChainPerformance(
                production_trends=production_trends,
                quality_scores=quality_scores,
                disruption_analysis=disruption_analysis,
                sustainability_ratings=sustainability_data
            )
            
        except Exception as e:
            logger.error(f"Error getting supply chain performance: {str(e)}")
            raise
    
    def get_hr_analytics(self) -> HRAnalytics:
        """Get HR analytics data"""
        try:
            df = self.datasets['hr']
            
            # Retention rates by department
            retention_rates = []
            for department in df['Department'].unique():
                dept_data = df[df['Department'] == department]
                avg_retention = dept_data['Retention_Rate_Pct'].mean()
                retention_rates.append({
                    'department': department,
                    'retention_rate': round(avg_retention, 1)
                })
            
            # Employee satisfaction trends
            satisfaction_trends = []
            monthly_satisfaction = df.groupby([df['Date'].dt.to_period('M'), 'Department'])['Employee_Satisfaction_Score'].mean().reset_index()
            for department in df['Department'].unique():
                dept_data = monthly_satisfaction[monthly_satisfaction['Department'] == department]
                trend_data = []
                for _, row in dept_data.iterrows():
                    trend_data.append({
                        'month': str(row['Date']),
                        'satisfaction': round(row['Employee_Satisfaction_Score'], 1)
                    })
                satisfaction_trends.append({
                    'department': department,
                    'data': trend_data
                })
            
            # Diversity metrics
            diversity_metrics = []
            for department in df['Department'].unique():
                dept_data = df[df['Department'] == department]
                avg_diversity = dept_data['Diversity_Index'].mean()
                diversity_metrics.append({
                    'department': department,
                    'diversity_index': round(avg_diversity, 2)
                })
            
            # Training and development
            training_data = []
            for department in df['Department'].unique():
                dept_data = df[df['Department'] == department]
                avg_training = dept_data['Training_Hours_Annual'].mean()
                training_data.append({
                    'department': department,
                    'avg_training_hours': round(avg_training, 1)
                })
            
            return HRAnalytics(
                retention_rates=retention_rates,
                satisfaction_trends=satisfaction_trends,
                diversity_metrics=diversity_metrics,
                training_data=training_data
            )
            
        except Exception as e:
            logger.error(f"Error getting HR analytics: {str(e)}")
            raise
