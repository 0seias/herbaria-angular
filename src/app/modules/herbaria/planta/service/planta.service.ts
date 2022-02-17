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
import { ConfigPrioridade } from "../model/planta";


@Injectable({
  providedIn: "root",
})
export class PlantaService {
  url = environment.baseURL + 'ProdutoBacenJud';



  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" })
  };

  getConfigPrioridade(): Observable<any> {
    
    return this.httpClient
      .get<any>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  
  getConfigPrioridadeByFilter(dados: any): Observable<ConfigPrioridade[]> {
    let params = new HttpParams();

    if(dados.siglaProduto !== undefined && dados.siglaProduto !== '') {
    params = params.append("siglaProduto", dados.siglaProduto);
    }
    if(dados.descricaoProduto !== undefined && dados.descricaoProduto !== '') {
    params = params.append("descricaoProduto", dados.descricaoProduto);
    }
    if(dados.indiceProduto !== undefined && dados.indiceProduto !== '') {  
    params = params.append("indiceProduto", dados.indiceProduto);
    }
    return this.httpClient.get<ConfigPrioridade[]>(this.url, {
      params: params,
    });


  }


  getConfigPrioridadeById(id: string): Observable<any> {
    
    return this.httpClient
      .get<ConfigPrioridade>(this.url + '/' +id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));

  }

  getConfigPrioridadeById2(id: number): Observable<ConfigPrioridade> {
    return this.httpClient
      .get<ConfigPrioridade>(this.url + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  deleteConfigPrioridade(id: string) : Observable<any>{
    console.log(id);
    return this.httpClient
      .delete<any>(this.url+ '/' + id)
      ;
  }


  
  updateConfigPrioridade(configPrioridade: ConfigPrioridade): Observable<ConfigPrioridade> {
    return this.httpClient
      .put<ConfigPrioridade>(
        this.url + '/' + configPrioridade.siglaProduto,
        JSON.stringify(configPrioridade),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  saveConfigPrioridade(configPrioridade: ConfigPrioridade): Observable<ConfigPrioridade> {
    return this.httpClient
      .post<ConfigPrioridade>(
        this.url,
        JSON.stringify(configPrioridade),
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
