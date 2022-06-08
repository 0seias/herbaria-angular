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


@Injectable({
  providedIn: "root",
})
export class PlantaService {
  url = environment.baseURL + '/v1/plants';



  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("token") })
  };

  getPlanta(): Observable<any> {
    
    return this.httpClient
      .get<any>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  
  getPlantaByFilter(dados: any): Observable<Planta[]> {
    let params = new HttpParams();

    if(dados.familia !== undefined && dados.familia !== '') {
    params = params.append("familia", dados.familia);
    }
    if(dados.nomeCientifico !== undefined && dados.nomeCientifico !== '') {
    params = params.append("nomeCientifico", dados.nomeCientifico);
    }
    if(dados.nomeComum !== undefined && dados.nomeComum !== '') {  
    params = params.append("nomeComum", dados.nomeComum);
    }
  //  if(dados.nomeComum !== undefined && dados.polinizacao !== '') {  
  //    params = params.append("polinizacao", dados.polinizacao);
  //    } 
    return this.httpClient.get<Planta[]>(this.url, {
      params: params,
    });


  }


  getPlantaById(id: string): Observable<any> {
    
    return this.httpClient
      .get<Planta>(this.url + '/' +id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));

  }

  getPlantaById2(id: number): Observable<Planta> {
    return this.httpClient
      .get<Planta>(this.url + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  deletePlanta(id: string) : Observable<any>{
    console.log(id);
    return this.httpClient
      .delete<any>(this.url+ '/' + id)
      ;
  }


  
  updatePlanta(planta: Planta): Observable<Planta> {
    return this.httpClient
      .put<Planta>(
        this.url + '/' + planta.familia,
        JSON.stringify(planta),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  savePlanta(planta: Planta): Observable<Planta> {
    return this.httpClient
      .post<Planta>(
        this.url,
        JSON.stringify(planta),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
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
}
