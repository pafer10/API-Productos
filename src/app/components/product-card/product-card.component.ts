import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IProducto } from '../../interfaces/iproducto';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  //Es necesario inyectar el servicio para trabajar con el método delete que hemos
  //definido previamente en él.
  productoService = inject(ProductService);

  //A través de un Input recibe un producto desde el componente padre.
  @Input() miProducto!: IProducto;

  //Este método se comunica con el servicio para eliminar el producto a través de su ID,
  //el cual envía al servicio para poder ser borrado.
  deleteProducto(producto: IProducto) {
    this.productoService.delete(producto._id);
  }
}
