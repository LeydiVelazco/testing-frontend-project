import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ContactanosPostResponse } from '../modelos/contactanos-post-response';
import { ComprobarPostResponse } from '../modelos/comprobar-post-response';

@Injectable({
  providedIn: 'root'
})

export class LandingService {
	//construccion del api para llamar el servicio del back
	apiurl:string = environment.apiUrl + "correo";
	apiurl2:string = environment.apiUrl + "login";

	constructor(private httpClient:HttpClient, private httpService:HttpService) {

	}
	//api para guardar los datos del personal por POST
	contactanos(correoClient:String, mensaje:String)
	{
		const options = this.httpService.headerOptionsJson(true, true);
    let url = this.apiurl + "/contacto";
    let data = {
      correoClient: correoClient,
      mensaje: mensaje
    }
		return this.httpClient.post<ContactanosPostResponse>(url, data, options);
	}

	comprobarCorreo(correo:String)
	{
	const options = this.httpService.headerOptionsJson(true, true);
    let url = this.apiurl2 + "/ingresar";
    let data = {email: correo}
		return this.httpClient.post<ComprobarPostResponse>(url, data, options);
	}
		
}