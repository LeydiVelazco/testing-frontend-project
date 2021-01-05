import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PlanService } from 'src/app/plan/servicios/plan.service';
import { PlanModel } from 'src/app/plan/modelos/plan-info.model';
import { PacienteModel} from  '../../modelos/paciente-info.model';
import * as XLSX from 'xlsx';
import { FormControl, Validators } from '@angular/forms';
import { PacienteService } from '../../servicios/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-importar',
  templateUrl: './paciente-importar.component.html',
  styleUrls: ['./paciente-importar.component.scss']
})
export class PacienteImportarComponent implements OnInit {
  idEmpresa: string = "";
  planes:Array<PlanModel>;
  idPlan:string;
  paciente: PacienteModel = new PacienteModel();

  dataSourceOne: MatTableDataSource<PacienteModel>;
  displayedColumnsOne: string[] = [
		'nombre',
    'apellidoPat',
    'apellidoMat',
    'dni',
    'nacimiento',
    'celular',
    'direccion'
    ];
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;

  target: DataTransfer;
  selectedFile:any = 0;
  data: any;
  data_2: any;
  fecDate: Date = new Date();

  idPlanFormControl = new FormControl('', [
    Validators.required
    ]);

  archivoFormControl = new FormControl('', [
    Validators.required
    ]);

  constructor(private router:Router,private planservice: PlanService, private datePipe: DatePipe, private pacienteService: PacienteService) {
    this.dataSourceOne = new MatTableDataSource;
   }

  ngOnInit(): void {
    this.idEmpresa = localStorage.getItem("idEmpresa");
    this.listarPlanes();
    this.dataSourceOne.paginator = this.tableOnePaginator;
	  this.dataSourceOne.sort = this.tableOneSort;
  }


  

  //Método para agregar una archivo del sistema del usuario
  addfile(event)
	{
		this.target = <DataTransfer>(event.target);
		if (this.target.files.length !== 1) {
			this.selectedFile = null;
			console.log('Elija un archivo');
			return;
    }
    
    this.selectedFile = this.target;

    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(this.selectedFile.files[0]);
    reader.onload = (e: any) => {
    /* crear el workbook */
    const binarystr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

    /* Seleccionar una hoja  */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* Guardar la data */
    this.data = XLSX.utils.sheet_to_json(ws);
    this.dataSourceOne = this.data;
    };
	}

  listarPlanes():void {
    this.planservice.seleccionarPlanes()
      .subscribe(
        (response) => {
          //console.log(response);
          if ( response.status && response.message != ""){
            this.planes = response.cronogramas;
            //console.log(response);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  agregarPaciente():void
  {

    // validacion de campos para que no sean vacios
    if ( !this.paciente.idPlan || !this.selectedFile  ) {
      return;
    } 
    
    // validacion de campos para que no sean incorrectos mediante FormControl
    if ( this.idPlanFormControl.invalid || this.archivoFormControl.invalid ) {
      return;
    }

    for(let i = 0; i < this.data.length; i++)
    {
      this.data_2 =  { 
        nombre : this.data[i].nombre.toString() , 
        apellidoPat : this.data[i].apellidoPat.toString() ,  
        apellidoMat : this.data[i].apellidoMat.toString() ,  
        dni : this.data[i].dni.toString() ,  
        nacimiento : this.data[i].nacimiento.toString() ,  
        celular : this.data[i].celular.toString() ,  
        direccion : this.data[i].direccion.toString() ,  
        email : this.data[i].email.toString() ,  
        ocupacion : this.data[i].ocupacion.toString() ,  
        genero : this.data[i].genero.toString() ,  
        grupoSanguineo : this.data[i].grupoSanguineo.toString() ,  
        estadoCivil : this.data[i].estadoCivil.toString() 
        } ;
        this.enviarPaciente( this.data_2 );
        if( i ==  this.data.length - 1){
          Swal.fire(
            'Enhorabuena!',
            'El archivo de Pacientes se ha cargado exitosamente al sistema.',
            'success'
            );  
            this.paciente.idPlan = "0";
            this.dataSourceOne = null;     
        }

        
    } 
  }

  enviarPaciente( data_2: PacienteModel ){
    this.pacienteService.guardarPaciente( data_2 , +this.idEmpresa, +this.paciente.idPlan)
    .subscribe(
      (response) => {
        console.log(response);
        if ( response.status && response.statusCode == 200 && response.message != "" )
          console.log('paciente guardado');        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  regresar():void
  {
    this.router.navigate(['/paciente/listado']);
  }

}
