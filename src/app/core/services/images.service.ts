import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Image } from '../models/image.interface';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseUrl: string = 'http://localhost:3000/api/images';
  private httpClient = inject(HttpClient);

  // getAllImages(): Promise<any[]> {
  //   return firstValueFrom(
  //     this.httpClient.get<any[]>(this.baseUrl)
  //   );
  // }

   getAllImages(page: number): Promise<any[]> {
    return firstValueFrom(
      this.httpClient.get<any[]>(`${this.baseUrl}/${page}`)
    );
    }
  }
