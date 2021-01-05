import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {

	constructor(private router:Router) {

	}

	canActivate(
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		let token = localStorage.getItem("token");

		if (token === null) {
			this.router.navigate(['/login']);
			return false;
		} else {
			return true;
		}

	}

}
