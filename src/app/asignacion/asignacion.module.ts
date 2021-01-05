import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ASIGNACION_COMPONENTS, AsginacionRoutingModule } from './asignacion-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IteracionService } from './servicios/iteracion.service';




@NgModule({
    declarations: [
        ASIGNACION_COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        AsginacionRoutingModule
    ],
    providers: [
        IteracionService
    ]
  })
  export class AsignacionModule {}
