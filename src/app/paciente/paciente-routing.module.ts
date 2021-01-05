import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteListadoComponent } from './pagina/paciente-listado/paciente-listado.component';
import { PacienteAgregarComponent } from './pagina/paciente-agregar/paciente-agregar.component';
import { PacienteImportarComponent } from './pagina/paciente-importar/paciente-importar.component';
import { ContainerComponent } from '../shared/components/container-inside/container/container.component';

// se declara los componentes que se usaran en el modulo
export const PACIENTE_COMPONENTS = [
    PacienteListadoComponent,
    PacienteAgregarComponent,
    PacienteImportarComponent
];

// se arma el path segun el componente que queremos mostrar
const pacienteRoutes:Routes = [
	{
        path: 'paciente',
        component: ContainerComponent,
        children: [
          {
            path: 'listado',
            component: PacienteListadoComponent
          },
          {
            path: 'agregar',
            component: PacienteAgregarComponent
          },
          {
            path: 'editar/:paciente_id',
            component: PacienteAgregarComponent
          },
          {
            path: 'importar',
            component: PacienteImportarComponent
          }
        ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(pacienteRoutes)
  ],
  exports: [
    RouterModule
  ]
})
// se hace una clase exportable para colocarlo en paciente.module.ts
export class PacienteRoutingModule { }
