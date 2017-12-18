import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

import {Navbar} from './component/navbar/navbar.component';
import {Search} from './component/search/search.component';

const appRoutes: Routes = [

	{
		path: 'navbar',
		component: Navbar
	},
    {
        path: 'search',
        component: Search
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