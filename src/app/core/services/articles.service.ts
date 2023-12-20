import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Article } from '../models/article.interface';
import { Assignment } from '../models/assignment.interface';



@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private baseUrl: string = 'http://localhost:3000/api/articles';
  private httpClient = inject(HttpClient);

  getAllPublished(): Promise<Article[]> {
    return firstValueFrom(
      this.httpClient.get<Article[]>(`${this.baseUrl}/published`)
    );
  }

  getAllCategories(): Promise<any[]> {
    return firstValueFrom(
      this.httpClient.get<any[]>(`${this.baseUrl}/categories`)
    );
  }

  getArticlesByCategory(category: string): Promise<Article[]> {
    return firstValueFrom(
      this.httpClient.get<Article[]>(`${this.baseUrl}/categories/${category}`)
    );
  }

  getByUser(): Promise<Article[]> {
    return firstValueFrom(
      this.httpClient.get<Article[]>(`${this.baseUrl}/user`)
    )
  }

  getByStatus(status: string) {
    return firstValueFrom(
      this.httpClient.get<any[]>(`${this.baseUrl}/status/${status}`)
    )
  }

  createArticle(body: Article): Promise<Article> {
    return firstValueFrom(
      this.httpClient.post<Article>(this.baseUrl, body)
    )
  }

  getById(articleId: string | number): Promise<Article> {
    return firstValueFrom(
      this.httpClient.get<Article>(`${this.baseUrl}/${articleId}`)
    )
  }

  getByParentCategory(idParentCategory: number | string): Promise<Article[]> {
    return firstValueFrom(
      this.httpClient.get<Article[]>(`${this.baseUrl}/parentCategory/${idParentCategory}`)
    )
  }

  updateById(articleId: string | number, body: Article) {
    return firstValueFrom(
      this.httpClient.put<Article>(`${this.baseUrl}/${articleId}`, body)
    )
  }

  updateHeadline(slug: string, headline: boolean) {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/article/${slug}`, { headline })
    )
  }

  assignArticle(articleId: string | number, body: Assignment) {
    console.log(body);

    return firstValueFrom(
      this.httpClient.post<Assignment>(`${this.baseUrl}/asign/${articleId}`, body)
    )
  }

  getBySlug(slug: string): Promise<Article> {
    return firstValueFrom(
      this.httpClient.get<Article>(`${this.baseUrl}/article/${slug}`)
    )
  }

  getByCategory(category: string): Promise<Article[]> {
    return firstValueFrom(
      this.httpClient.get<Article[]>(`${this.baseUrl}/categories/${category}`)
    )
  }

  getByCategoryId(category: number): Promise<Article[]> {
    return firstValueFrom(
      this.httpClient.get<Article[]>(`${this.baseUrl}/categories/id/${category}`)
    )
  }
}
