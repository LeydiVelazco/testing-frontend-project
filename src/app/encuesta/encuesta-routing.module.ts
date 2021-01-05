import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from '../shared/components/container-inside/container/container.component';
import { EncuestaComponent } from './pagina/encuesta/encuesta.component';
import { EnviarEncuestaComponent } from './pagina/enviar-encuesta/enviar-encuesta.component';
import { EstadisticasComponent } from './pagina/estadisticas/estadisticas.component';

// se declara los componentes que se usaran en el modulo
export const ENCUESTA_COMPONENTS = [
    EncuestaComponent,
    EnviarEncuestaComponent
];

// se arma el path segun el componente que queremos mostrar
const encuestaRoutes:Routes = [
	{
      path: 'encuesta',
      component: ContainerComponent,
      children: [
        {
          path: 'seleccionar-usuario',
          component: EnviarEncuestaComponent
        },
        { 
          path: 'ver-encuesta/:empresa_id/:paciente_id',
          component: EncuestaComponent
        },
        {
          path: 'estadisticas',
          component: EstadisticasComponent
        }
      ]   
  },
  {
    path: 'formulario/:empresa_id/:paciente_id',
    component: EncuestaComponent, 
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(encuestaRoutes)
  ],
  exports: [
    RouterModule
  ]
})

// se hace una clase exportable para colocarlo en empresa.module.ts
export class EncuestaRoutingModule { }
