import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { UserSent } from './user-sent';
import { firstValueFrom } from 'rxjs';
import { UserReceived } from './user-received';
import { Router } from '@angular/router';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { DecodedToken } from './decoder';
@Injectable({
  providedIn: 'root',
})
export class BackendUserService {
  private baseUrl: string;
  private loggedIn: boolean = false;
  userLocal: UserReceived = {
    _id: '',
    name: '',
    login: '',
  };
  private token: { token: string } = {
    token: '',
  };
  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = environment.apiUrl;
  }
  async registerUser(user: UserSent) {
    try {
      const request = await firstValueFrom(
        this.http.post(`${this.baseUrl}/auth/signup`, user)
      );

      return request;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(user: UserSent) {
    try {
      const request = (await firstValueFrom(
        this.http.post(`${this.baseUrl}/auth/signin`, user)
      )) as { token: string };
      this.loggedIn = true;
      this.token = request;
      this.setLocalUser(user, request);
      localStorage.setItem('token', this.token.token);
      localStorage.setItem('logedIn', `false`);
      localStorage.setItem('userName', user.login);

      return request;
    } catch (error) {
      throw error;
    }
  }

  async getUsers(token: { token: string }) {
    try {
      const request = await firstValueFrom(
        this.http.get(`${this.baseUrl}/users`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
            'Content-Type': 'application/json',
          },
        })
      );
      return request;
    } catch (error) {
      throw error;
    }
  }

  async getUser(token: { token: string }, id: string) {
    try {
      const request = await firstValueFrom(
        this.http.get(`${this.baseUrl}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
            'Content-Type': 'application/json',
          },
        })
      );
      return request;
    } catch (error) {
      throw error;
    }
  } 

  async updateUser(user: UserSent, token: { token: string }, id: string) {
    try {
      const request = await firstValueFrom(
        this.http.put(`${this.baseUrl}/users/${id}`, user, {
          headers: {
            Authorization: `Bearer ${token.token}`,
            'Content-Type': 'application/json',
          },
        })
      );
      return request;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(token: { token: string }, id: string) {
    try {
      const request = await firstValueFrom(
        this.http.delete(`${this.baseUrl}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
            'Content-Type': 'application/json',
          },
        })
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
  checkTokenExpiration(token: string): DecodedToken {
    const decodedToken = jwt_decode<DecodedToken>(token);
    const currentTime = new Date().getTime() / 1000;
    if (decodedToken.exp < currentTime) {
      throw new Error('Token has expired');
    }
    return decodedToken;
  }
  userLoggedIn() {
    this.loggedIn = true;
  }
  isLoggedIn() {
    return this.loggedIn;
  }
  logOutUser() {
    this.loggedIn = false;
    return this.loggedIn;
  }
  private async setLocalUser(user: UserSent, token: { token: string }) {
    const userArr: UserReceived[] = (await this.getUsers(
      token
    )) as UserReceived[];

    const userGot = userArr.filter((e) => e.login === user.login);
    this.userLocal = { ...userGot[0] };
  }
  getToken() {
    const token: { token: string } = {
      token: `${localStorage.getItem('token')}`,
    };
    return token;
  }
}
