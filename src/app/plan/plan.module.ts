import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PLAN_COMPONENTS, PlanRoutingModule } from './plan-routing.module';
import { PlanService } from './servicios/plan.service';



@NgModule({
    declarations: [
        PLAN_COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,       
        SharedModule,
        PlanRoutingModule
    ],
    providers: [
        PlanService 
    ]
  })
  export class PlanModule {}