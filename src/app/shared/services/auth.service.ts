import { LocalStorageService } from './local-storage-service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Credentials } from "../models/credentials";
import { Message } from "../models/message";
import { User } from "../models/user";

const API_LOGIN = 'http://localhost:8080/login';
const API_AUTH = 'http://localhost:8080/v1/auth';
const API_USERS = 'http://localhost:8080/v1/users';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private local: LocalStorageService) { }

    login(creds: Credentials){
        return this.http.post(API_LOGIN, creds).pipe(map(res => this.local.setToken(res)));
    }

    signin(user: User){
        return this.http.post(API_USERS, user);
    }

    getAuth(){
        return this.http.get<Message>(API_AUTH);
    }
}
