import { Injectable } from "@angular/core";
import { Token } from "../models/token";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
  
  constructor(){  }

    setToken(token: Token){
        if(this.getToken()){
          localStorage.removeItem('token');
        }
        localStorage.setItem('token', token.token);
    }

    getToken(){
       return localStorage.getItem('token');
    }

}