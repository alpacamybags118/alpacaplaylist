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

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

```
# Spotify API Credentials
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here

# Ollama API Configuration
REACT_APP_OLLAMA_API_URL=http://localhost:11434
```

To obtain Spotify API credentials:

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Create a new application
3. Copy the Client ID and Client Secret into your `.env` file