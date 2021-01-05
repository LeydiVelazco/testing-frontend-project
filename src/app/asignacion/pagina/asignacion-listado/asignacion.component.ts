import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalModel } from 'src/app/personal/modelos/personal-info.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonalService } from 'src/app/personal/servicios/personal.service';
import { PacienteService } from 'src/app/paciente/servicios/paciente.service';
import { PlanService } from 'src/app/plan/servicios/plan.service';
import { PlanModel } from 'src/app/plan/modelos/plan-info.model';
import { IteracionService } from '../../servicios/iteracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss']
})
export class AsignacionComponent implements OnInit {
  idEmpresa: string = "";
  cantidad_pacientes: number ;
  dataSourceOne: MatTableDataSource<PersonalModel>;
  planes:Array<PlanModel>;
  idPlan:number;

  displayedColumnsOne: string[] = [
    'dni',
	  'fullnombre',
    'celular',
    'email',
    'cargo'];

    @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
    @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;

  constructor(private router:Router, private personalservice:PersonalService, private pacienteservice:PacienteService, private planservice: PlanService,
    private iteracionservice:IteracionService) {
    this.dataSourceOne = new MatTableDataSource;
  }

  ngOnInit(): void {
    this.idEmpresa = localStorage.getItem("idEmpresa");
    //this.listarPaciente();
    this.listarPersonal();
    this.listarPlanes();
  }


  listarPlanes():void {
    this.planservice.seleccionarPlanes()
      .subscribe(
        (response) => {
          console.log(response);
          if ( response.status && response.message != ""){
            this.planes = response.cronogramas;
            console.log(response);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }


  calcularPacientes(idPlan:number){
    this.iteracionservice.cacularPacientes(idPlan)
      .subscribe(
        (response) => {
          console.log(response);
          if ( response.status && response.statusCode == 200 ){
            this.cantidad_pacientes = response.cantidadPacientes
          }else{
            this.cantidad_pacientes = 0;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  iterar(){

    if (this.cantidad_pacientes == 0) {
      Swal.fire(
        'Información',
        'No existes pacientes registrados para este plan.',
        'info'
        );
    } else {
      this.iteracionservice.calcularCapacidadAtencion( +this.idEmpresa, this.idPlan )
      .subscribe(
        (response) => {
          if ( response.status && response.statusCode == 200 ){
            Swal.fire(
              'Información',
                response.message,
              'info'
              );
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
 
  }

  regresar(){
    this.router.navigate(['/principal']);
  }

  //metodo para mostrar la cantidad de pacientes según la empresa a través de la lista de pacientes que recibe del api
  listarPersonal()
    {
        this.personalservice.seleccionarPersonales(+this.idEmpresa)
        .subscribe(
            (response) => {
                console.log(response);
                if ( response.status && response.message != ""){
                    const personal = response.listaPersonal;
                    this.dataSourceOne.data = personal;
                    this.dataSourceOne.paginator = this.tableOnePaginator;
                    this.dataSourceOne.sort = this.tableOneSort;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }


}
