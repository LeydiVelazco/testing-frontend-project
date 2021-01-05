import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalListadoComponent } from './pagina/personal-listado/personal-listado.component';
import {PersonalAgregarComponent } from './pagina/personal-agregar/personal-agregar.component';
import { ContainerComponent } from '../shared/components/container-inside/container/container.component';

// se declara los componentes que se usaran en el modulo
export const PERSONAL_COMPONENTS = [
    PersonalListadoComponent,
    PersonalAgregarComponent
];

// se arma el path segun el componente que queremos mostrar
const personalRoutes:Routes = [
	{
        path: 'personal',
        component: ContainerComponent,
        children: [
          {
            path: 'listado',
            component: PersonalListadoComponent
          },
          {
            path: 'agregar',
            component: PersonalAgregarComponent
          },
          {
            path: 'editar/:personal_id',
            component: PersonalAgregarComponent
          }     
        ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(personalRoutes)
  ],
  exports: [
    RouterModule
  ]
})
// se hace una clase exportable para colocarlo en personal.module.ts
export class PersonalRoutingModule { }