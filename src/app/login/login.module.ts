import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from './services/login.service';
import { LoginComponent } from './pages/login/login.component';
import { LOGIN_COMPONENTS, LoginRoutingModule } from './login-routing.module';

// se declara la constante componentes , shared module para el material , el servicio y el formsmodule para el formulario
@NgModule({
    declarations: [
        LOGIN_COMPONENTS,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
        SharedModule
    ],
    providers: [
        LoginService,
        DatePipe
    ]
    //entryComponents: [VancancieEditComponent]
  })

  // se hace un module propio del modulo que vamos a trabajar y se exportara en el app.module.ts de la raiz
  export class LoginModule {}
