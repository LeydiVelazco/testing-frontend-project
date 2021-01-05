import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { EncuestaModel } from '../modelos/encuesta-info.model';
import { EncuestaPostResponse } from '../modelos/encuesta-post-response.model';
import { EstadisticasGetResponse } from '../modelos/estadisticas/estadisticas-get-response.model';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
	//construccion del api para llamar el servicio del back
	apiurl:string = environment.apiUrl + "encuesta";
	apiurl2:string = environment.apiUrl + "correo";

	constructor(private httpClient:HttpClient, private httpService:HttpService) {

	}
	//api para guardar los datos del personal por POST
	guardarRespuestasFormulario(encuesta:EncuestaModel, idEmpresa: number , idPaciente: number)
	{
		const options = this.httpService.headerOptionsJson(true, true);
		let url = this.apiurl + "/enviar/" + idEmpresa + "/" +idPaciente;
		return this.httpClient.post<EncuestaPostResponse>(url, encuesta, options);
	}

	cargarDatosEstadisticos(idEmpresa: number)
	{
		const options = this.httpService.headerOptionsJson(true, true);
		let url = this.apiurl + "/obtenerDatos/" + idEmpresa;
		return this.httpClient.get<EstadisticasGetResponse>(url, options);
	}


	enviarEncuesta(idEmpresa: number , idPaciente: number)
	{
		const options = this.httpService.headerOptionsJson(true, true);
		let url = this.apiurl2 + "/enviar-encuesta/" + idEmpresa + "/" +idPaciente;
		let data = {
			linkEncuesta : 'http://adrenalinsalud.appspot.com/formulario/'+ idEmpresa + "/" + idPaciente
		}
		console.log(url);
		console.log(data);
		return this.httpClient.post<EncuestaPostResponse>(url, data, options);
	}

		
}