import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConsultaService } from '../../servicios/consulta.service';
import { HistorialModel } from '../../modelos/historial-paciente/historial-info.model';

@Component({
  selector: 'app-ver-historial',
  templateUrl: './ver-historial.component.html',
  styleUrls: ['./ver-historial.component.scss']
})
export class VerHistorialComponent implements OnInit {
  @Input() idPaciente:number;
  historiales: Array<HistorialModel>; 
  mensaje : boolean = false;
  historial : boolean = false;
 
  constructor(private consultaservice:ConsultaService, public dialogRef: MatDialogRef<VerHistorialComponent>) { }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(){
    this.consultaservice.seleccionarConsultasPaciente(this.idPaciente)
      .subscribe(
          (response) => {
              console.log(response);
              if ( response.status && response.statusCode == 200 && response.message != "" ){
                  this.historial = true;       
                  this.historiales = response.listaConsultas;
                  
              }
              if ( response.statusCode == 404 && response.message != "" ){
                this.mensaje = true;       
              }
          },
          (err) => {
              console.log(err);
          }
      );
  }

  regresar(){
    this.dialogRef.close();
  }

}
