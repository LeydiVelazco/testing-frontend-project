import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '../shared/components/container-inside/container/container.component';
import { EnviarCorreoComponent } from './pagina/enviar-correo.component';

// se declara los componentes que se usaran en el modulo
export const CORREO_COMPONENTS = [
    EnviarCorreoComponent
];

// se arma el path segun el componente que queremos mostrar
const correoRoutes:Routes = [
	{
      path: 'correo',
      component: ContainerComponent,
      children: [
        {
          path: 'enviar-correo',
          component: EnviarCorreoComponent
        }
      ]   
  }/* ,
  {
    path: 'formulario',
    component: EncuestaComponent, 
  } */
];

@NgModule({
  imports: [
    RouterModule.forChild(correoRoutes)
  ],
  exports: [
    RouterModule
  ]
})

// se hace una clase exportable para colocarlo en empresa.module.ts
export class CorreoRoutingModule { }
