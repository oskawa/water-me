import { Context } from '@nuxt/types'
import { Auth } from '@nuxtjs/auth-next'
import axios from 'axios';

interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

export class User {
  private readonly auth: Auth

  constructor(auth: Auth) {
    this.auth = auth
  }
  async register(registrationData: RegistrationData): Promise<boolean> {
    try {
      await axios.post('https://portfolio-maxime-back.maxime-eloir.fr/wp-json/myplugin/v1/register', registrationData);
      await this.login(registrationData.username, registrationData.password )
      return true;
      
      // Registration successful, do something
    } catch (error) {
      // Handle registration error
      console.error(error);
      return false
    }
  }
  async login(username: string, password: string): Promise<void> {
    await 
    this.auth.loginWith('local', { data: { username : username, password : password } })
    
  }

  async logout(): Promise<void> {
    await this.auth.logout()
  }

  isAuthenticated(): boolean {
    return this.auth.loggedIn
  }
  getCurrentUser() {
    return this.auth.user;
  }
}
