import { CanActivateFn, CanMatchFn } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { inject } from '@angular/core';



export const authGuard: CanMatchFn = (route, state) => {
  const userToken = inject(UserService);
  return userToken.getInformation();
};


