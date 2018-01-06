import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

import {Navbar} from './component/navbar/navbar.component';
import {Search} from './component/search/search.component';
import { RoleComponent } from './component/role/role.component';
import { CreateDepartmentComponent } from './component/create-department/create-department.component';
import { DepartmentComponent} from './component/department/department.component';
import {Register} from './component/register/register.component';
import {Login} from './component/login/login.component';
import { UserProfile } from './component/userprofile/userprofile.component';


const appRoutes: Routes = [
    {
      path: 'navbar',
      component: Navbar
    },
    {
        path: 'search',
        component: Search
    },
    {
      path: 'role',
      component: RoleComponent
    },
    {
        path: 'create-department',
        component: CreateDepartmentComponent
    },
    {
        path: 'department',
        component: DepartmentComponent
    },
    {
      path: 'register',
      component: Register
    },
    {
      path: 'login',
      component: Login
    },
    {
      path: 'userprofile',
      component: UserProfile
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
