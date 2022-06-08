import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Planta } from "../model/planta";
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';


@Injectable({
  providedIn: "root",
})
export class PlantaService {
  url = environment.baseURL + '/v1/plants';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  getPlanta(): Observable<Planta[]> {
    return this.httpClient.get<Planta[]>(this.url, {'headers': this.getHeaders()});
  }

  savePlanta(planta: Planta): Observable<Planta> {
    return this.httpClient
      .post<Planta>(this.url, planta, {headers: this.getHeaders()});
  }
  getPlantaById(id: number){
    return this.httpClient.get<Planta>(`${this.url}/${id}`);
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getToken(){
    const token = this.localStorageService.getToken();
    return `Bearer ${token}`;
  }

  getHeaders(){
    const headers = new HttpHeaders()
    .append('Content-Type','application/json')
    .append('Authorization', this.getToken());
    return headers;
  }
}
