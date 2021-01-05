import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashborad.module';
import { HttpClientModule } from '@angular/common/http';
import { PlanModule } from './plan/plan.module';
import { PersonalModule } from './personal/personal.module';
import { PacienteModule } from './paciente/paciente.module';
import { EmpresaModule } from './empresa/empresa.module';
import { LoginModule } from './login/login.module';
import { AsignacionModule } from './asignacion/asignacion.module';
import { CommonModule } from '@angular/common';
import { ConsultaModule } from './consulta/consulta.module';
import { EncuestaModule } from './encuesta/encuesta.module';
import { CorreoModule } from './correos/correo.module';
import { LandingModule } from './landing/landing.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ContactosModule } from './contactanos/contactos.module';
 
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //importamos todos los module de los modulos que se van a trabajar
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxUsefulSwiperModule,
    SharedModule,
    LandingModule,
    LoginModule,
    DashboardModule,
    EmpresaModule,
    PlanModule,
    PersonalModule,
    PacienteModule,
    AsignacionModule,
    ConsultaModule,
    EncuestaModule,
    CorreoModule,
    ContactosModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
