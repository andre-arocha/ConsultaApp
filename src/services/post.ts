import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class Post{
    server: string = "http://localhost/consultaApi/api.php/";
constructor (private http:HttpClient) {

}
dadosApi(dados: any, api:string){
    const httOptions = {
        headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    let url = this.server + api;
    return this.http.post(url, JSON.stringify(dados), httOptions).map(res => res);
}

}