#!/bin/bash

echo "Building frontend..."
cd frontend/vite-project && npm install && npm run build

echo "Building backend..."
cd ../../backend && npm install 

echo "Build completed successfully!"

# Start backend
echo "Starting backend..."
npm run dev &  # Runs backend in the background

# Start frontend
echo "Starting frontend..."
cd ../frontend/vite-project && npm start

echo "Application is running!"
