import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable()
export class AlertService {

	constructor() {

	}

	success(message:string, title:string):void {
		//alert(message);

		Swal.fire(title, message, 'success').then(
			(result) => {
				// console.log(result);
				// if (result.value) {
				// 	this.productService.Delete(id)
				// 		.subscribe(
				// 			(response) => {
				// 				if (response != null && response.ok && response.result) {
				// 					this.populateGrid();
				// 				}
				// 			},
				// 			(err) => {
				// 				this.alertService.error("Error al obtener la lista de productos.", err);
				// 			}
				// 		);
				// }
			}, 
			(dismiss) => {
				//this.alertService.error(dismiss);
				// dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
				//if (dismiss === 'cancel') {
				//	swal({
				//		type:'info',
				//		title: 'Cancelled',
				//		text: 'Your Staff file is safe :)'
				//	});
				//}
			}
		);
	}

	error(message:string, err:any):void {
		//alert(message);
		//console.log(err);

		let title = "Error";
		Swal.fire(title, message, 'error').then(
			(result) => {
				// console.log(result);
				// if (result.value) {
				// 	this.productService.Delete(id)
				// 		.subscribe(
				// 			(response) => {
				// 				if (response != null && response.ok && response.result) {
				// 					this.populateGrid();
				// 				}
				// 			},
				// 			(err) => {
				// 				this.alertService.error("Error al obtener la lista de productos.", err);
				// 			}
				// 		);
				// }
			}, 
			(dismiss) => {
				//this.alertService.error(dismiss);
				// dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
				//if (dismiss === 'cancel') {
				//	swal({
				//		type:'info',
				//		title: 'Cancelled',
				//		text: 'Your Staff file is safe :)'
				//	});
				//}
			}
		);
	}

	warning(message:string, title:string):void {
		Swal.fire(title, message, 'warning').then(
			(result) => {
				// console.log(result);
				// if (result.value) {
				// 	this.productService.Delete(id)
				// 		.subscribe(
				// 			(response) => {
				// 				if (response != null && response.ok && response.result) {
				// 					this.populateGrid();
				// 				}
				// 			},
				// 			(err) => {
				// 				this.alertService.error("Error al obtener la lista de productos.", err);
				// 			}
				// 		);
				// }
			}, 
			(dismiss) => {
				//this.alertService.error(dismiss);
				// dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
				//if (dismiss === 'cancel') {
				//	swal({
				//		type:'info',
				//		title: 'Cancelled',
				//		text: 'Your Staff file is safe :)'
				//	});
				//}
			}
		);
	}
}