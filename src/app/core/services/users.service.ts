import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.interface';
import { firstValueFrom } from 'rxjs';

type LoginRequest = { email: string, password: string };
type LoginResponse = { success: string, token: string, error: string };

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = 'http://localhost:3000/api/users';

  private httpClient = inject(HttpClient);

  getAll(): Promise<User[]> {
    return firstValueFrom(
      this.httpClient.get<User[]>(this.baseUrl)
    )
  }

  registration(body: User) {
    return firstValueFrom(
      this.httpClient.post<User>(this.baseUrl, body)
    )
  }

  login(body: LoginRequest) {
    return firstValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, body)
    )
  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) return true;
    else return false;
  }


  getById(): Promise<User> {
    return firstValueFrom(
      this.httpClient.get<User>(`${this.baseUrl}/profile`)
    );
  }

  getByRole(role: string): Promise<User[]> {
    return firstValueFrom(
      this.httpClient.get<User[]>(`${this.baseUrl}/role/${role}`)
    )
  }

  updateById(body: User) {
    return firstValueFrom(
      this.httpClient.put(`${this.baseUrl}/profile`, body)
    );
  }



}
