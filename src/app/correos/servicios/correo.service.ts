import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CorreoPostResponse } from '../modelos/personal-post-response.model';



@Injectable({
  providedIn: 'root'
})
export class CorreoService {
	//construccion del api para llamar el servicio del back
	apiurl:string = environment.apiUrl + "correo";
	
	constructor(private httpClient:HttpClient, private httpService:HttpService) {

	}
	
	enviarCorreo(idEmpresa: number , idPaciente: number, asunto:string, mensaje: string )
	{
		const options = this.httpService.headerOptionsJson(true, true);
		let url = this.apiurl + "/enviar/" + idEmpresa + "/" +idPaciente;
		let data = {
			mensaje : mensaje,
			asunto : asunto
		}
		return this.httpClient.post<CorreoPostResponse>(url, data, options);
	}
		
}