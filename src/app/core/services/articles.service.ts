import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Article } from '../models/article.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private baseUrl: string = 'http://localhost:3000/api/articles'
  private httpClient = inject(HttpClient);

  getAllPublished(): Promise<Article[]> {
    return firstValueFrom(
      this.httpClient.get<Article[]>(`${this.baseUrl}/published`)
    )
  }

}
