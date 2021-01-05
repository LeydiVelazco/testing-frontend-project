import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlanModel } from '../../modelos/plan-info.model';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PlanService } from '../../servicios/plan.service';

@Component({
  selector: 'app-plan-listado',
  templateUrl: './plan-listado.component.html',
  styleUrls: ['./plan-listado.component.scss']
})
export class PlanListadoComponent implements OnInit {
  role_id: number = 0;
  dataSourceOne: MatTableDataSource<PlanModel>;
  displayedColumnsOne: string[] = ['nombre', 'duracion', 'fecha'];
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;
  //selectionOne = new SelectionModel<PlanModel>(true, []);

  selectedRow_plan: PlanModel = null;

  constructor(private router:Router, private planservice: PlanService) {
    this.dataSourceOne = new MatTableDataSource;
   }

  ngOnInit(): void {
	this.role_id = +localStorage.getItem("role_id"); //método que lee el id del rol del usuario que esta guardando en la memoria local
	this.listarPlanes();
    this.dataSourceOne.paginator = this.tableOnePaginator;
	this.dataSourceOne.sort = this.tableOneSort;
  }

  //método para listar todos los planes
  listarPlanes():void {
	this.planservice.seleccionarPlanes()
		.subscribe(
			(response) => {
				console.log(response);
				if ( response.status && response.message != ""){
					const planes = response.cronogramas;
					this.dataSourceOne.data = planes;
				}
			},
			(err) => {
			}
		);
 	}
   //método para seleccionar una plan en forma de fila de la tabla
  	selectRow_Plan(row:PlanModel):void {
	this.selectedRow_plan = row;
  	}

	//método que redirige al formulario para agregar plan
	agregar()
    {
    	this.router.navigate(['/plan/agregar']);
  	}
	  
  //método que a través de la fila seleccionada en la tabla, se envia al back el id del plan para esto
  eliminar(){
	if (this.selectedRow_plan == null) return;

	Swal.fire({
		title: 'Estas seguro?',
		text: "El registro seleccionado se eliminará!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Cancelar',
		confirmButtonText: 'Si, eliminar!'
		}).then((result) => {
		if (result.value) {
		this.planservice.eliminarPlan(this.selectedRow_plan.idPlan)
		.subscribe(
			(response) => {
				console.log(response);
				if (response.status){
					Swal.fire(
						'Eliminado!',
						'El registro a sido removido.',
						'success'
						);
					this.listarPlanes();
					this.selectedRow_plan = null;
				}
			},
			(err) => {
				console.log(err);
			}
		);
		}
		})
  	}

  //método que redirige al formulario de edición
  editar(){
    if (this.selectedRow_plan == null) return;
    let plan = this.selectedRow_plan;
    this.router.navigate(['/plan/editar', plan.idPlan ]);
  }

}
