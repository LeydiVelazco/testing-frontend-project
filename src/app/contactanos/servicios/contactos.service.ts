import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CorreoSolicitudPostResponse } from '../modelos/contactanos-post-response.model';
import { Observable } from 'rxjs';
import { ContactanosListResponse } from '../modelos/contactanos-list-response.model';
import { LinkModel } from '../modelos/enviar-correo-link/enviar-link-info.model';



@Injectable({
  providedIn: 'root'
})
export class ContactanosService {
	//construccion del api para llamar el servicio del back
	apiurl:string = environment.apiUrl + "contacto";
	
	constructor(private httpClient:HttpClient, private httpService:HttpService) {

	}
	
	enviarReunion(reunion: LinkModel )
	{
		const options = this.httpService.headerOptionsJson(true, true);
		let url = this.apiurl + "/enviar-reunion/" + 1;
		return this.httpClient.post<CorreoSolicitudPostResponse>(url, reunion, options);
	}

	listarSolicitudes():Observable<ContactanosListResponse> {
		const url = this.apiurl + "/lista";
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<ContactanosListResponse>(url, options);
	}

	enviarCredenciales( correo : String, password: String)
	{
		console.log('Correo: '+ correo + '// Contraseña: '+ password.toString() );
		const options = this.httpService.headerOptionsJson(true, true);
		let url = this.apiurl + "/enviar-credenciales/" + 1;
		let data = {
			correoClient: correo,
			contraseniaDefault: password
		}
		return this.httpClient.post<CorreoSolicitudPostResponse>(url, data , options);
	}
		
}