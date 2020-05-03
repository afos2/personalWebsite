import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as AppActions from '../../State-Management/actions'
import { take, map } from 'rxjs/operators';
import { selectName } from 'src/app/State-Management/selectors';

@Injectable({
  providedIn: 'root'
})
export class LandingPageGuard implements CanActivate {

  constructor(private store: Store<any>) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.pipe(
      take(1),
      select(selectName),
      map(data => {
        if (!data) {
          this.store.dispatch(AppActions.getInitalData())
        }
      })
    ).subscribe()
    return true;
  }
}