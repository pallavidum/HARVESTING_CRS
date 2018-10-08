import {Routes} from '@angular/router';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
        data: {
          breadcrumb: 'Login'
        }
      },
      {
        path: 'registration',
        loadChildren: './registration/registration.module#RegistrationModule',
        data: {
          breadcrumb: 'Registration'
        }
      }, {
        path: 'forgot',
        loadChildren: './forgot/forgot.module#ForgotModule'
      }, {
        path: 'lock-screen',
        loadChildren: './lock-screen/lock-screen.module#LockScreenModule'
      }
    ]
  }
];


