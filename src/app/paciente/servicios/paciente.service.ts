import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PacienteModel } from '../modelos/paciente-info.model';
import { PacientePostResponse } from '../modelos/paciente-post-response.model';
import { PacienteGetResponse } from '../modelos/paciente-get-response.model';
import { PacienteListResponse } from '../modelos/paciente-list-response.model';

@Injectable()
export class PacienteService {
	//construccion del api para llamar el servicio del back
	apiurl:string = environment.apiUrl + "datos-paciente";

	constructor(private httpClient:HttpClient, private httpService:HttpService) {

	}
	//api para guardar los datos del paciente por POST
	guardarPaciente(paciente:PacienteModel, idEmpresa: number, idPlan: number)
	{
		const options = this.httpService.headerOptionsJson(true, true);
		let url = this.apiurl + "/guardar/"+idEmpresa+"/"+ idPlan;
		return this.httpClient.post<PacientePostResponse>(url, paciente, options);
	}
	// api para obtener el listado de todos los paciente por GET
	seleccionarPacientes(idEmpresa: number):Observable<PacienteListResponse> {
		const url = this.apiurl + "/"+idEmpresa;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<PacienteListResponse>(url, options);
	}
	// api para obtener los datos de un paciente por GET
  	obtenerPaciente(idEmpresa: string, idPaciente:string ):Observable<PacienteGetResponse> {
		const url = this.apiurl + "/"+idEmpresa+"/"+idPaciente;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<PacienteGetResponse>(url, options);
	}

	actualizarPaciente(paciente:PacienteModel, idPaciente: number)
	{
		let url = this.apiurl + "/editar/" + idPaciente;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.put<PacientePostResponse>(url, paciente, options);
	}


	/* cargarExcel(file:File) {
		const formData:FormData = new FormData();
		let idEmpresa=1;
		console.log(file);
		console.log(file.name);
		formData.append('filename', file, file.name);
		const url = this.apiurl + '/archivo/' + idEmpresa ;
		return this.httpClient.post<any>(url, formData, this.httpService.headerOptionsJson(true, true));
	}
 	*/
// api para eliminar a un paciente por GET
  	eliminarPaciente(idPaciente:string):Observable<PacienteGetResponse> {
		const url = this.apiurl+"/eliminar/"+idPaciente;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.delete<PacienteGetResponse>(url, options);
	}

}
