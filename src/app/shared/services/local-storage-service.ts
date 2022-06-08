import { Injectable } from "@angular/core";
import { Token } from "../models/token";
import jwt_decode from 'jwt-decode';
import { NULL_EXPR } from "@angular/compiler/src/output/output_ast";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    set(name: string, obj: any){
        localStorage.setItem(name, JSON.stringify(obj));
    }

    get(name: string, obj: any){
        return localStorage.getItem(name), JSON.stringify(obj);
    }
    setToken(token: any){
        localStorage.setItem('token', JSON.stringify(token.chave));
    }

    getToken(token: any){
       return localStorage.setItem('token', JSON.stringify(token.chave));
    }


    getDecodedAccessToken(token: string): any {
        try {
          return jwt_decode(token);
        } catch(Error) {
          return null;
        }
      }

 
}