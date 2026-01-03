#!/bin/bash
# Start script for Railway deployment

# Use Railway's PORT environment variable, default to 8080 if not set
PORT=${PORT:-8080}

# Start uvicorn with the port
exec uvicorn server:app --host 0.0.0.0 --port $PORT
