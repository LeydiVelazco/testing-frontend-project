import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http'


@Injectable()
export class HttpService {

	constructor() {

	}

	headerOptionsJson(sendToken:boolean, isGet:boolean):object {
		let httpOptions:object;
		
		let headers = new HttpHeaders();

		if (sendToken) {
			let token = localStorage.getItem("token");
			if (token != null) headers = headers.set('Token', token);
		}
		if (!isGet) {
			headers = headers.set("Content-Type", "application/json; charset=utf-8");
		}
		
		httpOptions = { headers: headers };
		return httpOptions;
	}

	headerOptionsForm(sendToken:boolean):object {
		let httpOptions:object;
		
		let headers = new HttpHeaders();

		if (sendToken) {
			let token = localStorage.getItem("token");
			if (token != null) headers = headers.set('Token', token);
		}
		
		httpOptions = { headers: headers };
		return httpOptions;
	}

}