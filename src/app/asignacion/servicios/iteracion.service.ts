import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CantidadPacientesGetResponse } from '../modelos/nroPacientes-get-response';
import { IteracionGetResponse } from '../modelos/iteracion-get-response';

@Injectable()
export class IteracionService {
	//construccion del api para llamar el servicio del back
	apiurl:string = environment.apiUrl + "capacidad-atencion";

	constructor(private httpClient:HttpClient, private httpService:HttpService) {

	}

	// api para obtener los datos de un paciente por GET
  	cacularPacientes(idPlan:number ):Observable<CantidadPacientesGetResponse> {
		const url = this.apiurl + "/cantidadPacientes/"+idPlan;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<CantidadPacientesGetResponse>(url, options);
    }
    
    calcularCapacidadAtencion( idEmpresa:number, idPlan:number ):Observable<IteracionGetResponse> {
		const url = this.apiurl + "/calcular/"+idEmpresa + "/" + idPlan;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<IteracionGetResponse>(url, options);
	}

}
