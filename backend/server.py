from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Add backend directory to path for imports
sys.path.insert(0, str(ROOT_DIR))

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add hello world route
@api_router.get("/")
async def root():
    return {"message": "Drilldown Dynamics API is running"}

# Import contact routes
from routes.contact import router as contact_router
from routes.admin import router as admin_router
api_router.include_router(contact_router, tags=["contact"])
api_router.include_router(admin_router, prefix="/admin", tags=["admin"])

# Include the router in the main app
app.include_router(api_router)

# CORS Configuration
# Get allowed origins from environment variable or use default for development
allowed_origins = os.environ.get('ALLOWED_ORIGINS', '*')

# If ALLOWED_ORIGINS is a comma-separated string, convert to list
if allowed_origins != '*':
    allowed_origins = [origin.strip() for origin in allowed_origins.split(',')]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins,  # Now reads from .env
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Log CORS configuration on startup
@app.on_event("startup")
async def startup_event():
    logger.info(f"CORS allowed origins: {allowed_origins}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()