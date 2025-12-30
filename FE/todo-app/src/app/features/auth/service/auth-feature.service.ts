// import { Injectable } from "@angular/core";
// import { environment } from "../../../../environments/environments";
// import { HttpClient } from "@angular/common/http";

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthFeatureService{
//     private baseUrl = environment.apiUrl+ "/auth"

//     constructor(private http: HttpClient) {}

//     login(data:{
//         email:string;
//         password:string}){
//         return this.http.post(`${this.baseUrl}/login`,data)
//     }

//     register(data:{
//         email:string;
//         password:string;
//         firstName:string;
//         lastName:string;
//     }){
//         return this.http.post(`${this.baseUrl}/register`,data)
//     }

//     logout(){
//         localStorage.removeItem('accessToken')
//     }
// }