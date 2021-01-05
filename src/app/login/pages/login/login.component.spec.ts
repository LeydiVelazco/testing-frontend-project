import {LoginComponent} from './login.component';
import { LoginService } from '../../services/login.service';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginModule } from '../../login.module';
import { LoginModel } from '../../modelos/login-info.model';


describe('LoginComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          LoginModule
        ],
        declarations: [
          LoginComponent
        ],
      }).compileComponents();
    }));
  
    it('should create the LoginComponent', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });
  
    it('should create the loginService', () => {
        const fixture = TestBed.configureTestingModule({ providers: [LoginService] });
        const app = fixture; 
        expect(app).toBeTruthy();
    });
  });