import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { firstValueFrom } from 'rxjs';
import { BackendUserService } from './backend-user.service';
@Injectable({
  providedIn: 'root',
})
export class BoardsRequestsService {
  private baseUrl: string;
  token: any;
  constructor(private http: HttpClient) {
    const backendUserService = new BackendUserService(http);
    this.baseUrl = environment.apiUrl;
    this.token = backendUserService.getToken();
    console.log(this.token);
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
}
