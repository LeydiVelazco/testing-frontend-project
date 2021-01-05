import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EmpresaModel } from '../modelos/empresa-info.model';
import { EmpresaPostResponse } from '../modelos/empresa-post-response.model';
import { EmpresaGetResponse } from '../modelos/emresa-get-response.model';
import { AdminModel } from '../modelos/modelo admin/admin-info.model';
import { AdminGetResponse } from '../modelos/modelo admin/admin-get-response.model'; 

 
@Injectable()
export class EmpresaService {
	//construccion del api para llamar el servicio del back
	apiurl:string = environment.apiUrl + "datos-empresa";
	options = this.httpService.headerOptionsJson(true, true);

	constructor(private httpClient:HttpClient, private httpService:HttpService) {

	}
	
	// api para guardar los datos de la empresa por POST
	guardarEmpresa(empresa:EmpresaModel, idMaestro: number)
	{    
		let url = this.apiurl + "/guardar/" + idMaestro;
		return this.httpClient.post<EmpresaPostResponse>(url, empresa, this.options);
    }
	
	actualizarEmpresa(empresa:EmpresaModel, idEmpresa: number)
	{
		let url = this.apiurl + "/editar/"+ idEmpresa ;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.put<EmpresaPostResponse>(url, empresa, options);
	}

	// api para guardar los datos del admin por POST
    guardarAdmin(admin:AdminModel , idMaestro: number)
	{
		let url = this.apiurl + "/guardar-admin/" + idMaestro;
		return this.httpClient.post<EmpresaPostResponse>(url, admin, this.options);
	}
 
	// api para obtener los datos de la empresa por GET
  	obtenerEmpresa(idEmpresa:number):Observable<EmpresaGetResponse> {
		const url = this.apiurl + "/empresa/"+ idEmpresa;
		return this.httpClient.get<EmpresaGetResponse>(url, this.options);
	}
	
	cargarEmpresa(idEmpresa:number):Observable<EmpresaGetResponse> {
		const url = this.apiurl+ "/" + idEmpresa;
		return this.httpClient.get<EmpresaGetResponse>(url, this.options);
	}
	

	// api para obtener los datos del admin por GET
    obtenerAdmin(idMaestro: number):Observable<AdminGetResponse> {
		const url = this.apiurl + "/admin/"+ idMaestro;
		return this.httpClient.get<AdminGetResponse>(url, this.options);
	}

}