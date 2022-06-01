import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    set(name: string, obj: any){
        localStorage.setItem(name, JSON.stringify(obj));
    }

    get(name: string){
        return localStorage.getItem(name);
    }
}