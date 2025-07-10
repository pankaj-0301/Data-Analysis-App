from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from data_processor import DataProcessor
from models import (
    ExecutiveSummary, FinancialOverview, SecurityMetrics, 
    RDStatus, SupplyChainPerformance, HRAnalytics
)
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Wayne Enterprises BI Dashboard API",
    description="Business Intelligence Dashboard API for Wayne Enterprises",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize data processor
try:
    data_processor = DataProcessor()
    logger.info("Data processor initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize data processor: {str(e)}")
    raise

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Wayne Enterprises BI Dashboard API"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Wayne Enterprises BI API"}

@app.get("/api/executive-summary", response_model=ExecutiveSummary)
async def get_executive_summary():
    """Get executive summary with key metrics"""
    try:
        summary = data_processor.get_executive_summary()
        return summary
    except Exception as e:
        logger.error(f"Error in executive summary: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate executive summary: {str(e)}")

@app.get("/api/financial-overview", response_model=FinancialOverview)
async def get_financial_overview():
    """Get financial performance data"""
    try:
        financial = data_processor.get_financial_overview()
        return financial
    except Exception as e:
        logger.error(f"Error in financial overview: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get financial overview: {str(e)}")

@app.get("/api/security-metrics", response_model=SecurityMetrics)
async def get_security_metrics():
    """Get security operations metrics"""
    try:
        security = data_processor.get_security_metrics()
        return security
    except Exception as e:
        logger.error(f"Error in security metrics: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get security metrics: {str(e)}")

@app.get("/api/rd-status", response_model=RDStatus)
async def get_rd_status():
    """Get R&D portfolio status"""
    try:
        rd_status = data_processor.get_rd_status()
        return rd_status
    except Exception as e:
        logger.error(f"Error in R&D status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get R&D status: {str(e)}")

@app.get("/api/supply-chain", response_model=SupplyChainPerformance)
async def get_supply_chain_performance():
    """Get supply chain performance metrics"""
    try:
        supply_chain = data_processor.get_supply_chain_performance()
        return supply_chain
    except Exception as e:
        logger.error(f"Error in supply chain performance: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get supply chain performance: {str(e)}")

@app.get("/api/hr-analytics", response_model=HRAnalytics)
async def get_hr_analytics():
    """Get HR analytics data"""
    try:
        hr_analytics = data_processor.get_hr_analytics()
        return hr_analytics
    except Exception as e:
        logger.error(f"Error in HR analytics: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get HR analytics: {str(e)}")

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error occurred"}
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
