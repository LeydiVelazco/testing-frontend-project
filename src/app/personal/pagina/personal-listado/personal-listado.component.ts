import { Component, OnInit , ViewChild} from '@angular/core';
import { PersonalModel } from  '../../modelos/personal-info.model';
import { Router} from  '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonalService } from '../../servicios/personal.service';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-listado',
  templateUrl: './personal-listado.component.html',
  styleUrls: ['./personal-listado.component.scss']
})
export class PersonalListadoComponent implements OnInit {
  
  personalSeleccionado:PersonalModel = null;
  idEmpresa: string = "";
  dataSourceOne: MatTableDataSource<PersonalModel>;
  displayedColumnsOne: string[] = [
    'dni',
	  'fullnombre',
    'celular',
    'email',
    'cargo'];

    @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
    @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;

    constructor(private router:Router, private personalservice:PersonalService) { 
      this.dataSourceOne = new MatTableDataSource;
    }

    ngOnInit(): void {
      this.idEmpresa = localStorage.getItem("idEmpresa");
      this.listarPersonal();
    }

    seleccionarPersonal(personal:PersonalModel):void {
        this.personalSeleccionado = personal;
    }

    //Método para llamar al api correspondiente a la api seleccionarPersonales pasándole un parámetro y listar al personal
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

    exportarExcel():void {
      this.personalservice.exportAsExcelFile(this.dataSourceOne.data, 'Reporte de personal');
    }

    //Método para ir a la vista de agregar personal nuevo
    agregarPersonal():void
    {
      this.router.navigate(['/personal/agregar']);
    }
    
    //Método para eliminar personal
    eliminarPersonal()
    {
      if (this.personalSeleccionado == null) return;
	
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
          // llamado sel servicio eliminarPersonal desde personal.service.ts y se le pasa 1 parámetro
        if (result.value) {
        this.personalservice.eliminarPersonal(this.personalSeleccionado.idEmpleado)
        .subscribe(
          (response) => {
            console.log(response);
            if (response.status){
              Swal.fire(
                'Eliminado!',
                'El registro a sido removido.',
                'success'
                );
              this.listarPersonal();
              this.personalSeleccionado = null;			
            }
          },
          (err) => {
            console.log(err);
          }
        );
        }
        })
    }
    //Método para ir a la vista de un determinado personal
    editar()
    {
      if (this.personalSeleccionado == null) return;
        let personal = this.personalSeleccionado;
        this.router.navigate(['/personal/editar', personal.idEmpleado ]);
    }
  
  }
  