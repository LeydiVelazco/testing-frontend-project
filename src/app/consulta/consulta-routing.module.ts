import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '../shared/components/container-inside/container/container.component';
import { ConsultasListadoComponent } from './pagina/consultas-listado/consultas-listado.component';
import { ConsultaAgregarComponent } from './pagina/consulta-agregar/consulta-agregar.component';

// se declara los componentes que se usaran en el modulo
export const CONSULTA_COMPONENTS = [
    ConsultasListadoComponent,
    ConsultaAgregarComponent
];

// se arma el path segun el componente que queremos mostrar
const consultaRoutes:Routes = [
	{
        path: 'consulta',
        component: ContainerComponent,
        children: [
          {
            path: 'listado',
            component: ConsultasListadoComponent
          },
          {
            path: 'agregar/:idPaciente',
            component: ConsultaAgregarComponent
          },
          {
            path: 'editar/:consulta_id',
            component: ConsultaAgregarComponent
          }     
        ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(consultaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
// se hace una clase exportable para colocarlo en personal.module.ts
export class ConsultaRoutingModule { }