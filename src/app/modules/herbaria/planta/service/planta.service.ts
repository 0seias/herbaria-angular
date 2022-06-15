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
    return this.httpClient.get<Planta[]>(this.url, {headers: this.getHeaders()});
  }

  getPlantaPorFiltro(planta: Planta): Observable<Planta[]> {

    let params = new HttpParams();

    if(planta.familia !== undefined && planta.familia !== '') {
    params = params.append("familia", planta.familia);
    }
    if(planta.nomeCientifico !== undefined && planta.nomeCientifico !== '') {
    params = params.append("nomeCientifico", planta.nomeCientifico);
    }
    if(planta.nomeComum !== undefined && planta.nomeComum !== '') {  
    params = params.append("nomeComum", planta.nomeComum);
    }

    return this.httpClient.get<Planta[]>(this.url, { params: params, headers: this.getHeaders()});
  }

  savePlanta(planta: Planta): Observable<Planta> {
    return this.httpClient
      .post<Planta>(this.url, JSON.stringify(planta)
      , {headers: this.getHeaders()});
  }

  getPlantaById(id: string){
    return this.httpClient.get<Planta>(this.url+'/'+id, {headers: this.getHeaders()});
  }

  updatePlanta(planta: Planta): Observable<any> {
    return this.httpClient
      .put<Planta>(this.url, JSON.stringify(planta)
      , {headers: this.getHeaders()});
  }

  deletePlanta(id: string): Observable<any> {
    return this.httpClient
      .delete(this.url+'/'+ id, {headers: this.getHeaders()});
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
