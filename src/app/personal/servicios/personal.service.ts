import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PersonalModel } from '../modelos/personal-info.model';
import { PersonalPostResponse } from '../modelos/personal-post-response.model';
import { PersonalGetResponse } from '../modelos/personal-get-response.model';
import { PersonalListResponse } from '../modelos/personal-list-response.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class PersonalService {
	//construccion del api para llamar el servicio del back
  apiurl:string = environment.apiUrl + "datos-personal";

	constructor(private httpClient:HttpClient, private httpService:HttpService) {

	}
	//api para guardar los datos del personal por POST
	guardarPersonal(personal:PersonalModel, idEmpresa: number)
	{
		const options = this.httpService.headerOptionsJson(true, true);
		let url = this.apiurl + "/guardar/" + idEmpresa;
		return this.httpClient.post<PersonalPostResponse>(url, personal, options);
	}
	// api para obtener el listado de todo el persona por GET
	seleccionarPersonales(idEmpresa:number):Observable<PersonalListResponse> {
		const url = this.apiurl + "/" + idEmpresa;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<PersonalListResponse>(url, options);
	}
	// api para obtener los datos de un personal por GET
	obtenerPersonal(idEmpresa: string, idPersonal:string ):Observable<PersonalGetResponse> {
		const url = this.apiurl + "/"+idEmpresa+"/"+idPersonal;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.get<PersonalGetResponse>(url, options);
	}

	actualizarPersonal(personal:PersonalModel, idPersonal: number,  idEmpresa: number)
	{
		let url = this.apiurl + "/editar/"+ idEmpresa + "/" + idPersonal;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.put<PersonalPostResponse>(url, personal, options);
	}

	// api para eliminar a personal por GET
  	eliminarPersonal(idPersonal:string):Observable<PersonalGetResponse> {
		const url = this.apiurl + "/eliminar/" + idPersonal;
		const options = this.httpService.headerOptionsJson(true, true);
		return this.httpClient.delete<PersonalGetResponse>(url, options);
	}
	
	public exportAsExcelFile(json: any[], excelFileName: string): void {
    
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		console.log('worksheet',worksheet);
		const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		//const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
		this.saveAsExcelFile(excelBuffer, excelFileName);
	}
	
	private saveAsExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], {
		  type: EXCEL_TYPE
		});
		FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
	  }

}