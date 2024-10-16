import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { masterGuard } from './guards/master.guard';
import { studentGuard } from './guards/student.guard';
import { companyGuard } from './guards/company.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./core/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./core/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'master',
    loadComponent: () => import('./core/master/master.component').then(m => m.MasterComponent),
    canActivate: [masterGuard]
  },
  {
    path: 'student',
    loadComponent: () => import('./core/student/student.component').then(m => m.StudentComponent),
    canActivate: [studentGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./core/student/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: 'company',
    loadComponent: () => import('./core/company/company.component').then(m => m.CompanyComponent),
    canActivate: [companyGuard],
    data: { role: 'company' }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
