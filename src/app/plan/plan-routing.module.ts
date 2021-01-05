import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanListadoComponent } from './pagina/plan-listado/plan-listado.component';
import { ContainerComponent } from '../shared/components/container-inside/container/container.component';
import { PlanAgregarComponent } from './pagina/plan-agregar/plan-agregar.component';


export const PLAN_COMPONENTS = [
    PlanListadoComponent,
    PlanAgregarComponent
];

const planRoutes:Routes = [
	{
        path: 'plan',
        component: ContainerComponent,
        children: [
          {
            path: 'listado',
            component: PlanListadoComponent
          },
          {
            path: 'agregar',
            component: PlanAgregarComponent
          },
          {
            path: 'editar/:plan_id',
            component: PlanAgregarComponent
          }
        ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(planRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlanRoutingModule { }