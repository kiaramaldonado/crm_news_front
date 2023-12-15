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


  assignArticle(articleId: string | number, body: Assignment) {
    return firstValueFrom(
      this.httpClient.post<Assignment>(`${this.baseUrl}/asign/${articleId}`, body)
    )
  }
  getBySlug(slug: string): Promise<Article> {
    return firstValueFrom(
      this.httpClient.get<Article>(`${this.baseUrl}/article/${slug}`)
    )
  }



}


//router.post('/asign/:articleId', checkToken, ArticlesController.asignArticle);

// const asignArticle = async (req, res) => {
//   try {
//       const {user_id, comments, actual_status } = req.body;
//       const {articleId}  = req.params;
//       console.log(articleId);
//       console.log(req.body)
//       const [nuevoRegistro] = await ArticleModel.insertUsersHasArticles(user_id, articleId, comments, actual_status);
//       const [article] = await ArticleModel.selectById(articleId);
//       const [statusArticle] = await ArticleModel.updateStatusArticle(articleId, {status:actual_status})
//       console.log(nuevoRegistro[0]);
//       console.log(statusArticle);
//       res.json(nuevoRegistro[0]);
//   } catch (error) {
//       res.json({ error: error.message });
//   }
// }