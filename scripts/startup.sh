#!/bin/bash

set -e

# Start Docker Compose services
docker-compose up -d

docker exec ollama ollama pull gemma3:1b

# Start the React development server
npm start