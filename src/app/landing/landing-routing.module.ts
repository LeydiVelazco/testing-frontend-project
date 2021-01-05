import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pagina/landing/landing.component';

// se declara los componentes que se usaran en el modulo
export const LANDING_COMPONENTS = [
    LandingComponent,
];

// se arma el path segun el componente que queremos mostrar
const landingRoutes:Routes = [
	{
      path: '',
      component: LandingComponent,
    },
];

@NgModule({
  imports: [
    RouterModule.forChild(landingRoutes)
  ],
  exports: [
    RouterModule
  ]
})

// se hace una clase exportable para colocarlo en empresa.module.ts
export class LandingRoutingModule { }
