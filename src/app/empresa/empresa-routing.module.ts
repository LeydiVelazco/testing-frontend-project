import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosEmpresaComponent } from './paginas/datos-empresa/datos-empresa.component';

// se declara los componentes que se usaran en el modulo
export const EMPRESA_COMPONENTS = [
    DatosEmpresaComponent
];

// se arma el path segun el componente que queremos mostrar
const empresaRoutes:Routes = [
	{
      path: 'empresa',
      component: DatosEmpresaComponent    
  },
  {
      path: 'empresa/editar/:empresa_id',
      component: DatosEmpresaComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(empresaRoutes)
  ],
  exports: [
    RouterModule
  ]
})

// se hace una clase exportable para colocarlo en empresa.module.ts
export class EmpresaRoutingModule { }
