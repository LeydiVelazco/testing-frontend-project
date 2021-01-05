import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule, DASHBOARD_COMPONENTS } from './dashboard-routing.module';



@NgModule({
    declarations: [
        DASHBOARD_COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,       
        SharedModule,
        DashboardRoutingModule
    ],
    providers: [ 
    ]
  })
  export class DashboardModule {}