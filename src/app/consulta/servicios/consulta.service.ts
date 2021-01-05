import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ConsultaPostResponse } from '../modelos/consulta-post-response.model';
import { ConsultaModel } from '../modelos/consulta-info.model';
import { ConsultaListResponse } from '../modelos/consulta-list-response.model';
import { ConsultaGetResponse } from '../modelos/consulta-get-response.model';
import { HistorialListResponse } from '../modelos/historial-paciente/historial-list-response.model';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
	//construccion del api para llamar el servicio del back
	  apiurl:string = environment.apiUrl + "documentar-atencion";
	  apiurl2:string = environment.apiUrl + "asignar-paciente";

	constructor(private httpClient:HttpClient, private httpService:HttpService) {

	}
	
	guardarConsulta(consulta:ConsultaModel, idEmpleado: number,idPaciente: number)
	{
		const options = this.httpService.headerOptionsJson(true, true);
		let url = this.apiurl + "/guardar/" + idEmpleado + "/" + idPaciente;
		return this.httpClient.post<ConsultaPostResponse>(url, consulta, options);
	}
	
	seleccionarMisConsultas(idEmpleado:number):Observable<ConsultaListResponse> {
		const url = this.apiurl + "/lista-consultas/personal/" + idEmpleado;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<ConsultaListResponse>(url, options);
	}

	seleccionarConsultasPaciente(idPaciente:number):Observable<HistorialListResponse> {
		const url = this.apiurl + "/lista-consultas/paciente/" + idPaciente;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<HistorialListResponse>(url, options);
	}

	analizarNrocitas(dni:string, cantidadCitasPaciente: number):Observable<ConsultaListResponse> {
		const url = this.apiurl2 + "/" + dni + "/" + cantidadCitasPaciente;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<ConsultaListResponse>(url, options);
	}

	
  	obtenerConsulta(idConsulta:number):Observable<ConsultaGetResponse> {
		const url = this.apiurl + "/detalle-consulta/"+idConsulta;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<ConsultaGetResponse>(url, options);
    }

	
	public exportAsExcelFile(json: any[], excelFileName: string): void {
    
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		console.log('worksheet',worksheet);
		const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		this.saveAsExcelFile(excelBuffer, excelFileName);
	}
	
	private saveAsExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], {
		  type: EXCEL_TYPE
		});
		FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
	  }

}