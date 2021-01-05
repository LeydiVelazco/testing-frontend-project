import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EncuestaModule } from '../../encuesta.module';
import { EncuestaModel } from '../../modelos/encuesta-info.model';
import { EncuestaService } from '../../servicios/encuesta.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})

export class EncuestaComponent implements OnInit {
  empresa_id : number ;
  paciente_id : number ;
  role_id: number;
  buttonEnviar: boolean ;
  buttonRegresar: boolean ;
  formulario: boolean = true;
  gracias: boolean = true;
  encuesta: EncuestaModel = new EncuestaModel();
  constructor(private encuestaservice:EncuestaService, private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.empresa_id = +this.route.snapshot.paramMap.get('empresa_id');
    this.paciente_id = +this.route.snapshot.paramMap.get('paciente_id');
    this.role_id = +localStorage.getItem("role_id");
    if(this.paciente_id == 0){
      this.buttonEnviar = false;
      this.buttonRegresar = true;
    }else{
      this.buttonEnviar = true;
      this.buttonRegresar = false;
    }
  }

  choose(e:any){
    console.log(e);
  }

  enviarRespuestas(){
    console.log(this.encuesta);

    let timerInterval;
		Swal.fire({
			title: 'Enviando respuestas...',
			text: "Espere un momento porfavor",
			icon: 'info',
			timer: 3000,
			allowOutsideClick: false,
			timerProgressBar: true,
			onBeforeOpen: () => {
			Swal.showLoading()
			},
			onClose: () => {
				clearInterval(timerInterval);
			}
			}).then((result) => {
          this.encuestaservice.guardarRespuestasFormulario(this.encuesta,this.empresa_id,this.paciente_id)
              .subscribe(
                (response) => {
                  console.log(response);
                  if ( response.status && response.message != "" )	{
                    // muestra el model success si el response es correcto
                    Swal.fire(
                      'Enhorabuena!',
                      'Las respuestas han sido enviadas.',
                      'success'
                      );
                    this.formulario = false; 
                    this.gracias = true;  
                  }
                },
                (err) => {
                  console.log(err);
                }
          );
    });
  }

  regresar(){
    this.router.navigate(['/encuesta/seleccionar-usuario']);
  }

  cerrar(){
    
  }

}
