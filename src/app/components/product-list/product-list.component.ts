import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProducto } from '../../interfaces/iproducto';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    ProductFilterComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  //De nuevo, inyectamos el servicio para poder llamar a su método getProdFiltrados para ver los
  //productos filtrados.
  productServices = inject(ProductService);
  productos: IProducto[] = [];

  constructor() {
    this.productos = [];
  }
  //De esta forma hacemos que nada más cargue la página se nos muestren todos los productos.
  //Obtiene estos datos llamando al servicio y su método para mostrarlos, esto se asigna a
  //nuestro array productos y así mostrarse en el componente.
  ngOnInit(): void {
    this.productos = this.productServices.getAllProductos();
    console.log('productos: ', this.productos);
  }

  //Aquí obtenemos los productos que han sido filtrados mediante el método que los devuelve
  //en el servicio. Almacenaremos estosdatos en el array productos para que se muestren.
  //Esta lógica se mostrá como evento en el template al llamar al componente hijo(filter).
  actualizarProductos(): void {
    this.productos = this.productServices.getProdFiltrados();
    console.log('prod filtrados', this.productos);
  }

  //Mi idea era crear un botón dentro del list-component que ejecutara este método para que
  //después de filtrar tuviéramos la opción de volver otra vez a ver los productos sin tener
  //que reiniciar la web. Sin embargo, así, al volver a mostrar los productos deja de funcionar
  //correctamente el filtro. 
  // mostrarTodos(): void {
  //   this.productos = this.productServices.getAllProductos();
  // }
}
