# Wayne Enterprises Business Intelligence Dashboard

A comprehensive business intelligence dashboard built with FastAPI backend and Next.js frontend, providing real-time insights into Wayne Enterprises operations across financial, security, R&D, supply chain, and HR metrics.

##  Project Architecture

```
wayne-enterprises-dashboard/
├── backend/                    
│   ├── main.py                
│   ├── models.py              
│   ├── data_processor.py     
│   ├── data/                  
│   └── requirements.txt      
├── frontend/                  
│   ├── app/                   
│   ├── components/           
│   ├── lib/                   
│   └── package.json           
└── README.md                  
```

## 🚀 Quick Start

### Prerequisites

- **Backend**: Python 3.8+ and pip
- **Frontend**: Node.js 16+ and npm/yarn
- **Data**: CSV files in the `data/` directory

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install fastapi uvicorn pandas numpy python-multipart
   ```

4. **Prepare data files**
   Ensure these CSV files are in the `data/` directory:
   - `wayne_financial_data_1752126259989.csv`
   - `wayne_security_data_1752126259987.csv`
   - `wayne_rd_portfolio_1752126259988.csv`
   - `wayne_supply_chain_1752126259987.csv`
   - `wayne_hr_analytics_1752126259988.csv`

5. **Start the backend server**
   ```bash
   python main.py
   ```
   
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The dashboard will be available at `http://localhost:3000`



### Endpoints

#### Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "healthy",
  "service": "Wayne Enterprises BI API"
}
```

#### Executive Summary
```http
GET /api/executive-summary
```
**Response:**
```json
{
  "total_revenue": 2500.5,
  "revenue_growth": 12.3,
  "profit_margin": 18.7,
  "total_employees": 45000,
  "active_projects": 127,
  "high_potential_projects": 23,
  "avg_response_time": 4.2,
  "security_incidents": 15,
  "employee_retention": 94.2,
  "employee_satisfaction": 8.1
}
```

#### Financial Overview
```http
GET /api/financial-overview
```
**Response:**
```json
{
  "revenue_trends": [
    {
      "division": "Wayne Enterprises",
      "data": [
        {"period": "2024-Q1", "value": 1200.5},
        {"period": "2024-Q2", "value": 1350.2}
      ]
    }
  ],
  "profit_margins": [
    {"division": "Wayne Enterprises", "margin": 18.5}
  ],
  "rd_investment_trends": [
    {"period": "2024-Q1", "investment": 150.0}
  ],
  "market_share": [
    {"division": "Wayne Enterprises", "share": 35.2}
  ]
}
```

#### Security Metrics
```http
GET /api/security-metrics
```
**Response:**
```json
{
  "incident_trends": [
    {
      "district": "Gotham Central",
      "data": [
        {"month": "2024-01", "incidents": 5},
        {"month": "2024-02", "incidents": 3}
      ]
    }
  ],
  "response_times": [
    {"district": "Gotham Central", "avg_response_time": 4.2}
  ],
  "safety_scores": [
    {"district": "Gotham Central", "safety_score": 8.5}
  ],
  "tech_deployments": [
    {"district": "Gotham Central", "deployments": 25}
  ]
}
```

#### R&D Status
```http
GET /api/rd-status
```

#### Supply Chain Performance
```http
GET /api/supply-chain
```

#### HR Analytics
```http
GET /api/hr-analytics
```

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server for FastAPI

### Frontend
- **Next.js 13**: React framework with App Router
- **React 18**: UI library with hooks and modern features
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Composable charting library for React
- **Lucide React**: Beautiful & consistent icon toolkit

