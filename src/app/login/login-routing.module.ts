import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

// se declara los componentes que se usaran en el modulo
export const LOGIN_COMPONENTS = [
    LoginComponent
];

// se arma el path segun el componente que queremos mostrar
const loginRoutes:Routes = [
    {
      path: 'login',
      component: LoginComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})

// se hace una clase exportable para colocarlo en empresa.module.ts
export class LoginRoutingModule { }
