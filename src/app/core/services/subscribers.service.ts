import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  private baseUrl: string = 'http://localhost:3000/api/subscribers';
  private httpClient = inject(HttpClient);



  subscribe(email: string): Promise<any> {
    return firstValueFrom(this.httpClient.post<any>(this.baseUrl, email));
  }


  sendNews(email: string[]) {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/newsletter`, email));
  }

}
