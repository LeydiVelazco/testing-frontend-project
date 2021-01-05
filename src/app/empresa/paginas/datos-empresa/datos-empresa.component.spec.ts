import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DatosEmpresaComponent } from './datos-empresa.component';
import { EmpresaService } from '../../servicios/empresa.service';
import { EmpresaModule } from '../../empresa.module';

describe('DatosEmpresaComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        EmpresaModule
      ],
      declarations: [
        DatosEmpresaComponent
      ],
    }).compileComponents();
  }));

  it('should create the EmpresaComponent', () => {
    const fixture = TestBed.createComponent(DatosEmpresaComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the empresaService', () => {
    const fixture = TestBed.configureTestingModule({ providers: [EmpresaService] });
    const app = fixture;
    expect(app).toBeTruthy();
  });

  

});
