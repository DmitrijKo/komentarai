import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Komentaras } from './komentaras.model';
import { Observable, pipe, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class KomentaraiService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  getKomentarai() {
    return this.http
      .get<{ [key: string]: Komentaras }>(
        'https://komentarai-6c920-default-rtdb.europe-west1.firebasedatabase.app/komentarai.json'
      )
      .pipe(
        map((responseData) => {
          const komentarai: Komentaras[] = [];
          for (const key in responseData) {
            komentarai.push({ ...responseData[key], id: key });
          }
          return komentarai;
        })
      );
  }

  postKomentaras(email: string, text: string) {
    const komentaras: Komentaras = { email: email, text: text };

    return this.http.post<{ name: string }>(
      'https://komentarai-6c920-default-rtdb.europe-west1.firebasedatabase.app/komentarai.json',
      komentaras
    );
  }
}
