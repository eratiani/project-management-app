import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { firstValueFrom } from 'rxjs';
import { BoardSent } from './board-sent';
import { TaskSent } from './task-sent';
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
  async deleteBoard(token: { token: string }, boardId: string) {
    try {

      const request = await firstValueFrom(
        this.http.delete(`${this.baseUrl}/boards/${boardId}`, {
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
  async getCollumns(token: { token: string }, boardId: string) {
    try {
      const request = await firstValueFrom(
        this.http.get(`${this.baseUrl}/boards/${boardId}/columns`, {
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
  async getCollumn(token: { token: string }, boardId: string,colId:string) {
    try {
      const request = await firstValueFrom(
        this.http.get(`${this.baseUrl}/boards/${boardId}/columns/${colId}`, {
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
  async setCollumn(
    token: { token: string },
    boardId: string,
    body: { title: string; order: number }
  ) {
    try {
      const request = await firstValueFrom(
        this.http.post(`${this.baseUrl}/boards/${boardId}/columns`, body, {
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
  async deleteColumn(
    token: { token: string },
    boardId: string,
    columnId: string
  ) {
    try {

      const request = await firstValueFrom(
        this.http.delete(
          `${this.baseUrl}/boards/${boardId}/columns/${columnId}`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
  async editColumn(
    token: { token: string },
    boardId: string,
    columnId: string,
    body: { title: string; order: number }
  ) {
    try {

      const request = await firstValueFrom(
        this.http.put(
          `${this.baseUrl}/boards/${boardId}/columns/${columnId}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
  async addSetColumns(
    token: { token: string },
    body: { boardId: string; order: number,title:string }[]
  ) {
    try {

      const request = await firstValueFrom(
        this.http.post(
          `${this.baseUrl}/columnsSet`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
  async editSetColumns(
    token: { token: string },
    body: { _id: string; order: number }
  ) {
    try {

      const request = await firstValueFrom(
        this.http.patch(
          `${this.baseUrl}/columnsSet`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
  async setBoard(user: BoardSent, token: { token: string }) {
    try {
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
  async getTasksByBoardId(token: { token: string }, boardId: string) {
    try {
      const request = await firstValueFrom(
        this.http.get(`${this.baseUrl}/tasksSet/${boardId}`, {
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
  async setTask(
    token: { token: string },
    boardId: string,
    colId: string,
    body: { title: string; order: number }
  ) {
    try {
      const request = await firstValueFrom(
        this.http.post(
          `${this.baseUrl}/boards/${boardId}/columns/${colId}/tasks`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
  async createTask(
    token: { token: string },
    boardId: string,
    colId: string,
    body: any,
  ) {
    try {
      const request = await firstValueFrom(
        this.http.post(
          `${this.baseUrl}/boards/${boardId}/columns/${colId}/tasks`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
  async getTask(
    token: { token: string },
    boardId: string,
    body: { title: string; order: number }
  ) {
    try {
      const request = await firstValueFrom(
        this.http.post(`${this.baseUrl}/boards/${boardId}/columns`, body, {
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
  async editTask(
    token: { token: string },
    boardId: string,
    columnId: string,
    body: { title: string; order: number },
    taskId:string
  ) {
    try {

      const request = await firstValueFrom(
        this.http.put(
          `${this.baseUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(
    token: { token: string },
    boardId: string,
    columnId: string,
    taskId:string
  ) {
    try {

      const request = await firstValueFrom(
        this.http.delete(
          `${this.baseUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );
      return request;
    } catch (error) {
      throw error;
    }
  }
}
