import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message } from "../models/message";
import { User } from "../models/user";

const API_LOGIN = '/login';
const API_AUTH = '/v1/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    postLogin(user: User) {
        return this.http.post(API_LOGIN, { user });
    }

    getAuth(){
        return this.http.get<Message>(API_AUTH);
    }
}