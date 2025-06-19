import { SpotifyApi, Track } from '@spotify/web-api-ts-sdk';

export class SpotifyClient {
  private spotifyApi

  constructor(clientId: string, clientSecret: string) {
    this.spotifyApi = SpotifyApi.withClientCredentials(clientId, clientSecret);
  }

  async searchTracksByGenre(genre: string): Promise<Track[]> {
    const response = await this.spotifyApi.search(`genre:${genre}`, ['track']);
    if (!response.tracks) {
      return [];
    }
    return response.tracks.items as Track[];
  }
}
