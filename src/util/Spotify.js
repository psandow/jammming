const clientId = '35d137967eab48359ab93520f007c591';
const redirectUri = 'http://127.0.0.1:3000/';

let accessToken;

const Spotify = {
  // Helper to generate a random string for security (Code Verifier)
  generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = window.crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  },

  // Helper to hash the verifier into a challenge
  async sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  },

  base64encode(input) {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  },

  async getAccessToken() {
    if (accessToken) return accessToken;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const codeVerifier = window.localStorage.getItem('code_verifier');
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      });

      const data = await response.json();
      accessToken = data.access_token;
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const codeVerifier = this.generateRandomString(64);
      const hashed = await this.sha256(codeVerifier);
      const codeChallenge = this.base64encode(hashed);

      window.localStorage.setItem('code_verifier', codeVerifier);

      const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: 'playlist-modify-public',
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      });

      window.location = `https://accounts.spotify.com/?${params.toString()}`;
    }
  }
};

export default Spotify;
