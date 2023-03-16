import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { firstValueFrom } from 'rxjs';
import { BoardSent } from './board-sent';
@Injectable({
  providedIn: 'root',
})
export class BoardsRequestsService {
  private baseUrl: string;
  token: any;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    
  }
  async getBoards(token: { token: string }) {
    try {
      const request = await firstValueFrom(
        this.http.get(`${this.baseUrl}/boards`, {
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
  
  async setBoard(user: BoardSent, token: { token: string }) {
    try {
      console.log(user, token.token);

      const request = await firstValueFrom(
        this.http.post(`${this.baseUrl}/boards`, user, {
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
