import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PlanModel } from '../modelos/plan-info.model';
import { PlanPostResponse } from '../modelos/plan-post-response.model';
import { PlanGetResponse } from '../modelos/plan-get-response.model';
import { PlanListResponse } from '../modelos/plan-list-response.model';



@Injectable()
export class PlanService {

	apiurl:string = environment.apiUrl + "cronograma";
	options = this.httpService.headerOptionsJson(true, true);
	constructor(private httpClient:HttpClient, private httpService:HttpService) {

	}

	guardarPlan(plan:PlanModel)
	{
		let url = this.apiurl + "/guardar-cronograma";
		return this.httpClient.post<PlanPostResponse>(url, plan, this.options);
	}

	actualizarPlan(plan:PlanModel, plan_id: number)
	{
		let url = this.apiurl + "/editar-cronograma/" + plan_id;
		return this.httpClient.put<PlanPostResponse>(url, plan, this.options);
	}

	seleccionarPlanes():Observable<PlanListResponse> {
		const url = this.apiurl + "/lista-cronogramas";
		return this.httpClient.get<PlanListResponse>(url, this.options);
	}

  	obtenerPlan(idPlan:string):Observable<PlanGetResponse> {
		const url = this.apiurl + "/datos-cronograma/" + idPlan;
		return this.httpClient.get<PlanGetResponse>(url, this.options);
	}

  	eliminarPlan(idPlan:string):Observable<PlanGetResponse> {
		const url = this.apiurl + "/eliminar/" + idPlan;
		return this.httpClient.delete<PlanGetResponse>(url, this.options);
	}

}
