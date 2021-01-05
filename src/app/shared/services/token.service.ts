import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../../environments/environment';

import { HttpService } from './http.service';



@Injectable()
export class TokenService {

	constructor(
		private http:HttpClient,
        private httpService:HttpService
	) 
	{

	}

	empty() {
		localStorage.removeItem('token');
	}

	set(token:string) {
		localStorage.setItem("token", token);
	}

	get()
	{
		return localStorage.getItem("token");
	}

	check(token:string) 
	{
		const url = environment.apiUrl + "security/token-check";
		const httpOptions = this.httpService.headerOptionsJson(true, true);
        let data = {
            token: token
        };
        return this.http.post<any>(url, data, httpOptions);
	}

}