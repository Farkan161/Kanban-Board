import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Decode the token and return the user's profile
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  // Check if the user is logged in by verifying the token's presence and validity
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decoded.exp < currentTime;
      }
      return false;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  }

  // Retrieve the JWT token from localStorage
  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  // Store the JWT token in localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Remove the JWT token from localStorage and redirect to the login page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

// Export an instance of the AuthService class
export default new AuthService();