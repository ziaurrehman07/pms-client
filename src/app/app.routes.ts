import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './core/login/login.component';
import { StudentComponent } from './core/student/student.component';
import { AdminComponent } from './core/admin/admin.component';
import { HomeComponent } from './core/home/home.component';
import { MasterComponent } from './core/master/master.component';
import { CompanyComponent } from './core/company/company.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard],  data: { role: 'admin' }  },
  { path: 'master', component: MasterComponent, canActivate: [authGuard],  data: { role: 'master' }  },
  { path: 'student', component: StudentComponent, canActivate: [authGuard], data: { role: 'student' }  },
  { path: 'company', component: CompanyComponent, canActivate: [authGuard], data: { role: 'company' }  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
