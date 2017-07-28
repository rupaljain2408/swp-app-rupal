import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from '../Home/home.component';
import {ProductSelection} from './productDetails/productSelection';
import {HeaderComponent} from '../SharedComponents/header.component';
import {ProductList} from './productList/productlist.component';
import {AuthGuard} from '../Guards/auth.guards';


// const appRoutes : Routes = [
//     // {path:'register', component:HomeComponent, pathMatch: 'full'},
//    {path:'fullhouse', component:HeaderComponent, canActivate:[AuthGuard], children:[
//         {path:'home', component:HomeComponent, outlet:'headeroutlet'},
//         {path:'products', component:ProductList, outlet:'headeroutlet'},
//         {path:'productsDetail', component:ProductSelection, outlet:'headeroutlet'},
//         // {path:'productsDetail/:id', component:ProductSelection},
//     ]},
//     // {path:'productsDetail/:id', component:ProductSelection},
//     {path:'**', redirectTo:'fullhouse/home'}];



// export const routing = RouterModule.forChild(appRoutes);