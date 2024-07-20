import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ListComponent as DeviceListComponent } from './pages/main/admin/device/list/list.component';
import { FormContactComponent } from './pages/main/admin/device/form-contact/form-contact.component';
import { FormComponent } from './pages/main/admin/device/form/form.component';
import { FormSuisComponent } from './pages/main/admin/device/form-suis/form-suis.component';
import { EditComponent as EditGroupComponent } from './pages/main/admin/group/edit/edit.component';
import { ListComponent as ListGroupComponent } from './pages/main/admin/group/list/list.component';
import { CreateComponent as SceneCreateComponent } from './pages/main/admin/scene/create/create.component';
import { ListComponent as SceneListComponent } from './pages/main/admin/scene/list/list.component';
import { ListComponent as TimerListComponent } from './pages/main/admin/timer/list/list.component';
import { CreateComponent as TimerCreateComponent } from './pages/main/admin/timer/create/create.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((x) => x.LoginComponent),
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/main/dashboard/dashboard.component').then(
            (x) => x.DashboardComponent,
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./pages/main/admin/admin.component').then(
            (x) => x.AdminComponent,
          ),
        children: [
          {
            path: 'device',
            loadComponent: () =>
              import('./pages/main/admin/device/device.component').then(
                (x) => x.DeviceComponent,
              ),
            children: [
              {
                path: 'fan',
                component: DeviceListComponent,
              },
              {
                path: 'light',
                component: DeviceListComponent,
              },
              {
                path: 'switch',
                component: DeviceListComponent,
              },
              {
                path: 'contact',
                component: DeviceListComponent,
              },
              {
                path: 'add/light',
                component: FormComponent,
              },
              {
                path: 'add/fan',
                component: FormComponent,
              },
              {
                path: 'add/switch',
                component: FormSuisComponent,
              },
              {
                path: 'add/contact',
                component: FormContactComponent,
              },
              {
                path: 'edit/light/:id',
                component: FormComponent,
              },
              {
                path: 'edit/fan/:id',
                component: FormComponent,
              },
              {
                path: 'edit/switch/:id',
                component: FormSuisComponent,
              },
              {
                path: 'edit/contact/:id',
                component: FormContactComponent,
              },
            ],
          },
          {
            path: 'group',
            loadComponent: () =>
              import('./pages/main/admin/group/group.component').then(
                (x) => x.GroupComponent,
              ),
            children: [
              {
                path: 'add',
                component: EditGroupComponent,
              },
              {
                path: 'edit/:id',
                component: EditGroupComponent,
              },
              {
                path: '',
                component: ListGroupComponent,
              },
            ],
          },
          {
            path: 'scene',
            loadComponent: () =>
              import('./pages/main/admin/scene/scene.component').then(
                (x) => x.SceneComponent,
              ),

            children: [
              {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
              },
              {
                path: 'add',
                component: SceneCreateComponent,
              },
              {
                path: 'edit/:id',
                component: SceneCreateComponent,
              },
              {
                path: 'list',
                component: SceneListComponent,
              },
            ],
          },
          {
            path: 'timer',
            loadComponent: () =>
              import('./pages/main/admin/timer/timer.component').then(
                (x) => x.TimerComponent,
              ),
            children: [
              {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
              },
              {
                path: 'list',
                component: TimerListComponent,
              },
              {
                path: 'add',
                component: TimerCreateComponent,
              },
              {
                path: 'edit/:timerId/device/:deviceId',
                component: TimerCreateComponent,
              },
            ],
          },
          {
            path: 'monitor',
            loadComponent: () =>
              import('./pages/main/admin/monitor/monitor.component').then(
                (x) => x.MonitorComponent,
              ),
          },
        ],
      },
    ],
  },
];
