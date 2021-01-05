import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '../shared/components/container-inside/container/container.component';
import { AsignacionComponent } from './pagina/asignacion-listado/asignacion.component';

// se declara los componentes que se usaran en el modulo
export const ASIGNACION_COMPONENTS = [
    AsignacionComponent
];

// se arma el path segun el componente que queremos mostrar
const asignacionRoutes:Routes = [
	{
        path: 'asignacion',
        component: ContainerComponent,
        children: [
          {
            path: 'listado',
            component: AsignacionComponent
          }
          /* ,
          {
            path: 'agregar',
            component: PacienteAgregarComponent
          },
          {
            path: 'editar/:personal_id',
            component: PacienteAgregarComponent
          },
          {
            path: 'importar',
            component: PacienteImportarComponent
          } */
        ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(asignacionRoutes)
  ],
  exports: [
    RouterModule
  ]
})

// se hace una clase exportable para colocarlo en asignacion.module.ts
export class AsginacionRoutingModule { }
