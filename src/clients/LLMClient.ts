export interface LLMClient {
  generateResponse(prompt: string): Promise<string>;
}

export class OllamaClient implements LLMClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:52329') {
    this.baseUrl = baseUrl;
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        model: 'gemma3:1b',
        prompt: prompt,
        stream: false }),
    });
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Ollama API response:', data);
    return data.response;
  }
}

export class OpenAIClient implements LLMClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'https://api.openai.com/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].text.trim();
  }
}
