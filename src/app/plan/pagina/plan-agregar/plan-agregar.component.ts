import { Component, OnInit, COMPILER_OPTIONS } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PlanService } from '../../servicios/plan.service';
import { PlanModel } from '../../modelos/plan-info.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-plan-agregar',
  templateUrl: './plan-agregar.component.html',
  styleUrls: ['./plan-agregar.component.scss']
})
export class PlanAgregarComponent implements OnInit {

  plan_id: number = 0;
  periodicidadConsulta: string = "" ;
  duracionConsulta: string = "" ;
  duracionPlan: string = "" ;
  plan: PlanModel = new PlanModel();
  actualizarButton: boolean = false;
  guardarButton: boolean = true;

  //validaciones de los campos del formulario
  enfermedadFormControl = new FormControl('', [
	Validators.required
  ]);

  intervaloFormControl = new FormControl('', [
	Validators.required,
	Validators.max(30),
	Validators.min(1)
  ]);


  duplanFormControl = new FormControl('', [
	Validators.required
  ]);

  descripcionFormControl = new FormControl('', [
	Validators.required
  ]);

  constructor(private route:ActivatedRoute, private router:Router, private planservice: PlanService) { }

  ngOnInit(): void {
	this.plan_id = +this.route.snapshot.paramMap.get('plan_id');
	if ( this.plan_id > 0) {
		this.obtenerPlan( this.plan_id);
		this.actualizarButton = true;
		this.guardarButton = false;
	}
  }


	obtenerPlan( idPlan){
		this.planservice.obtenerPlan(idPlan)
		.subscribe(
		(response) => {
			console.log(response);
			if ( response.message != "" ){
			console.log('Plan encontrado');			
			this.plan = response.cronograma;    
			this.plan.intervaloConsulta = response.cronograma.intervaloConsulta.toString();
			this.plan.duracionPlan = response.cronograma.duracionPlan.toString();
			}
		},
		(err) => {
			console.log(err);
		}
		);
	}

   actualizarPlan(){

	if ( !this.plan.nombrePlan || !this.plan.intervaloConsulta  ||
		!this.plan.duracionPlan || !this.plan.descripcion ) {
		return;
	}

	if ( this.enfermedadFormControl.invalid || this.intervaloFormControl.invalid
		|| this.duplanFormControl.invalid || this.descripcionFormControl.invalid ) {
		return;
	}

	console.log(this.plan)   
	this.planservice.actualizarPlan(this.plan, this.plan_id )
	.subscribe(
		(response) => {
			console.log(response);
			if ( response.status && response.message != "" )	{
				Swal.fire(
					'Enhorabuena!',
					'El plan ha sido actualizado.',
					'success'
					);
				this.router.navigate(['/plan/listado']); //Redirige al listado de planes después de un guardado exitoso
			}
		},
		(err) => {
			console.log(err);
		}
	);

  }

  	//método para guardar los planes, recibe los campos a través de ngmodel en el html para enviarlos a la api
  	guardar(){

	if ( !this.plan.nombrePlan || !this.plan.intervaloConsulta  ||
		!this.plan.duracionPlan || !this.plan.descripcion ) {
		return;
	}

	if ( this.enfermedadFormControl.invalid || this.intervaloFormControl.invalid
		|| this.duplanFormControl.invalid || this.descripcionFormControl.invalid ) {
		return;
	}

	console.log(this.plan)
    Swal.fire({
		title: 'Aviso',
		text: "Estas seguro que desea crear el plan",
		icon: 'info',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Cancelar',
		confirmButtonText: 'Si, guardar!' ,

		}).then((result) => {
      // llamado sel servicio guardarplan desde plan.service.ts y se le pasa 2 parametros
		if (result.value) {
			this.planservice.guardarPlan(this.plan)
			.subscribe(
				(response) => {
					console.log(response);
					if ( response.status && response.message != "" )	{
            // muestra el model success si el response es correcto
						Swal.fire(
							'Enhorabuena!',
							'El plan ha sido guardado.',
							'success'
							);
						this.router.navigate(['/plan/listado']); //Redirige al listado de planes después de un guardado exitoso
				 	}
				},
				(err) => {
					console.log(err);
				}
			);
		}
	});

  }

  validarControles(){

  }

  // funcion para retroceder al listado de planes
  cancelar(){
    this.router.navigate(['/plan/listado']);
  }

  // funcion para validar solo el ingreso de números por teclado
  keypressNumbers(event: any) {
		const pattern = /[0-9]/;
		const inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar)) {
			event.preventDefault();
		}
	}

}
