import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

import {Navbar} from './component/navbar/navbar.component';
import {Search} from './component/search/search.component';
import { RoleComponent } from './component/role/role.component';

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
