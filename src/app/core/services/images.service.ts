import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseUrl: string = 'http://localhost:3000/api/images';
  private httpClient = inject(HttpClient);

  getAllImages(): Promise<any[]> {
    return firstValueFrom(
      this.httpClient.get<any[]>(this.baseUrl)
    );
  }

  getAllImagesPage(page: number): Promise<any[]> {
    return firstValueFrom(
      this.httpClient.get<any[]>(`${this.baseUrl}/${page}`)
    );
  }
}
