# AlpacaPlaylist

## Development Setup

To run the project in development mode, follow these steps:

1. **Start the Dev Container**:
   - Open the project in a development environment that supports dev containers (e.g., VS Code).
   - The dev container will automatically set up the environment.

2. **Start the Services**:
   - Navigate to the `scripts` folder and run the startup script:
     ```bash
     ./scripts/startup.sh
     ```
   - This will:
     - Start the Docker Compose services, including the Ollama service.
     - Download the required Ollama model.
     - Start the React development server.

3. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000` to view the application.

4. **Stop the Services**:
   - To stop the services, run:
     ```bash
     docker-compose down
     ```