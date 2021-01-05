import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '../shared/components/container-inside/container/container.component';
import { ContactosComponent } from './pagina/contactos/contactos.component';

// se declara los componentes que se usaran en el modulo
export const SOLICITUD_COMPONENTS = [
    ContactosComponent
];

// se arma el path segun el componente que queremos mostrar
const correoSolicitudRoutes:Routes = [
	{
      path: 'solicitudes',
      component: ContainerComponent,
      children: [
        {
          path: 'listado',
          component: ContactosComponent
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
    RouterModule.forChild(correoSolicitudRoutes)
  ],
  exports: [
    RouterModule
  ]
})

// se hace una clase exportable para colocarlo en empresa.module.ts
export class ContactosRoutingModule { }
