import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { UserSent } from './user-sent';
import { firstValueFrom } from 'rxjs';
import { UserReceived } from './user-received';

@Injectable({
  providedIn: 'root'
})
export class BackendUserService {
  private baseUrl: string;
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl;
  }
  async registerUser(user: UserSent) {
    try {
      const request = await firstValueFrom(this.http.post(`${this.baseUrl}/auth/signup`, user));
      return request;
    } catch (error) {
      throw error
    }
  }

  async loginUser(user: UserSent) {
    try {
      const request = await firstValueFrom(this.http.post(`${this.baseUrl}/auth/signin`, user));
      return request;
    } catch (error) {
      throw error
    }
  }

  async getUsers(token: {token:string}) {
    try {
      const request = await firstValueFrom(this.http.get(`${this.baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
      }));
      return request;
    } catch (error) {
      throw error
    }
  }

  async getUser(token: {token:string}, id: string) {
    try {
      const request = await firstValueFrom(this.http.get(`${this.baseUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }));
      return request;
    } catch (error) {
      throw error
    }
  }

  async updateUser(user: UserSent, token: {token:string}, id: string) {
    try {
      const request = await firstValueFrom(this.http.put(`${this.baseUrl}/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }));
      return request;
    } catch (error) {
      throw error
    }
  }

  async deleteUser( token: {token:string}, id: string) {
    try {
      const request = await firstValueFrom(this.http.delete(`${this.baseUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }));
      return request;
    } catch (error) {
      throw error
    }
  }
}
