import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/services/http.service';
import { LoginModel } from '../modelos/login-info.model';

@Injectable()
export class LoginService {
  //construccion del api para llamar el servicio del back
	private api_url: string = environment.apiUrl + 'login/';
  	constructor(
  		private http:HttpClient,
        private httpService:HttpService
        )
  		{ }

        //api para enviar los datos de la cuenta a loguearse al servicio del back
        login(user:LoginModel)
        {
        const url = this.api_url;
        const httpOptions = this.httpService.headerOptionsJson(true, true);
        return this.http.post<any>(url, user, httpOptions);
    }


}
