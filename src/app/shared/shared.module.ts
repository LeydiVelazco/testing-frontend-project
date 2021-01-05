// aqui se importa los componentes que usaremos de angular material
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpService } from './services/http.service';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ContainerComponent } from './components/container-inside/container/container.component';
import { AlertService } from './services/alert.service';
import { TokenService } from './services/token.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

// se importa los modulos de angular para material y 
//se hace exports para que sea usado en diferentes componentes del sistema
@NgModule({
	declarations: [
        ContainerComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		RouterModule,
		MatSnackBarModule,
		ReactiveFormsModule,
		ScrollingModule,
		MaterialFileInputModule,
		MatProgressBarModule,
		MatButtonModule,
		MatCheckboxModule, 
		MatNativeDateModule,
		MatToolbarModule,
		MatRadioModule,  
		MatSidenavModule, 
		MatIconModule,  
		MatListModule, 
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatDialogModule,
		MatDatepickerModule,
		MatExpansionModule,
		MatTableModule,
		MatPaginatorModule,
		MatCardModule,
		MatSliderModule,
		MatDividerModule,
		MatTabsModule,
		ChartsModule,
		MatGridListModule,
		MatMenuModule,
		MatSortModule,
		MatSnackBarModule
	],
	exports: [
		ReactiveFormsModule,
        ContainerComponent,
		MaterialFileInputModule,
		MatProgressBarModule,
		MatButtonModule,
		MatCheckboxModule, 
		MatNativeDateModule,
		MatToolbarModule,
		MatRadioModule,
		MatSidenavModule, 
		MatIconModule, 
		MatListModule, 
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatDialogModule,
		ChartsModule,
		MatDatepickerModule,
		MatExpansionModule,
		MatTableModule,
		MatPaginatorModule,
		MatCardModule,
		MatSliderModule,
		MatDividerModule,
		MatTabsModule,
		MatGridListModule,
		MatMenuModule,
		MatSortModule,
		MatSnackBarModule
	],
	providers: [ 
		AlertService,
		HttpService, 
		TokenService
	]
})
export class SharedModule {}