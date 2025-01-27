import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "productos"},
    { path: "productos", component: ProductListComponent},
    { path: "producto/idproducto", component: ProductCardComponent},
    { path: 'formAlta', component: ProductFormComponent}
];
