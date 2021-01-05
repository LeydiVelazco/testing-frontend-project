import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../shared/services/token.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { LoginModel } from '../../modelos/login-info.model';
import { Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide = true;
  user: LoginModel = new LoginModel();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  appVersion:string = environment.appVersion;

  constructor(private router:Router, private route:ActivatedRoute,
    private loginService:LoginService, private tokenService:TokenService) { }

	ngOnInit() {

	}

	goto(url):void
	{
		this.router.navigate([url]);
	}

  //método que permite loguear
	login()
	{
		if( !this.user.email || !this.user.password ){
			return;
		}

		if( this.emailFormControl.invalid || this.passwordFormControl.invalid ){
			return;
		}

				this.loginService.login(this.user)
				.subscribe(
				  (response) => {
					console.log(response);
					if ( response.status && response.statusCode == 200 && response.message != "" )	{
						localStorage.setItem("role_id", response.usuario.rol );
					  	Swal.fire(
						'Enhorabuena!',
						'Usuario verificado.',
						'success'
						);

						setTimeout(() => {
						if( response.usuario.rol == 1 ){
							this.router.navigate(['/principal/dashboard']);
							localStorage.clear();
							localStorage.setItem("name", "SuperAdmin");
							localStorage.setItem("email", "superadmin@empresa.com");
							localStorage.setItem("rol", "SuperAdmin");
							localStorage.setItem("role_id", "1" );
							localStorage.setItem("usuario", "SuperAdmin");

						}else if ( response.usuario.rol == 2 && response.usuario.vidEmpresa > 0){
							localStorage.clear();
							localStorage.setItem("idEmpresa", response.usuario.vidEmpresa);
							localStorage.setItem("usuario", response.usuario.nombre);
							localStorage.setItem("role_id", response.usuario.rol);
							localStorage.setItem("rol", "Administrador");
							localStorage.setItem("name", response.usuario.nombre);
							localStorage.setItem("idMaestro", response.usuario.idMaestro);
							localStorage.setItem("email", response.usuario.email);
							this.router.navigate(['/principal/dashboard']);
						}else if ( response.usuario.rol == "3" ){
							localStorage.clear();
							let vidEmpresa = response.usuario.Empresa_idEmpresa;
							localStorage.setItem("idEmpresa", vidEmpresa);
							localStorage.setItem("idEmpleado", response.usuario.idEmpleado);
							localStorage.setItem("usuario", response.usuario.nombre);
							localStorage.setItem("role_id", response.usuario.rol);
							localStorage.setItem("nombreCompleto", response.usuario.nombre+ ' '+ response.usuario.apellidoPat + ' ' + response.usuario.apellidoMat);
							localStorage.setItem("rol", "Médico");
							localStorage.setItem("name", response.usuario.nombre);
							localStorage.setItem("email", response.usuario.email);
							this.router.navigate(['/principal/dashboard']);
						}else{
							localStorage.setItem("idMaestro", response.usuario.idMaestro);
							this.router.navigate(['/empresa']);
						}
						}, 1500);
					}else{
						Swal.fire(
							'Oops!',
							'Usuario o contraseña ingresados son incorrectos.',
							'error'
						  );
					}
				  },
				  (err) => {
					console.log(err);
				  }
				);
	}

}
