import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { IProducto } from '../../interfaces/iproducto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent {
  //Es necesario inyectar el servicio para usar el método de filtrado
  productService = inject(ProductService);
  productos: IProducto[] = [];

  //Ha sido necesario usar un output para poder pasarle un evento al padre(list)
  //indicándole así que el filtro se ha aplicado y tiene que actualizarse.
  //He intentado de mil formas no tener que recurrir al EventEmitter pero si no era
  //de esta forma no podía actualizar la web inicial con los filtros aunque estuvieran
  //aplicándose correctamente por consola.
  @Output() resultFiltro = new EventEmitter<void>();

  constructor() {}

  getDataForm(miForm: NgForm): void {
    //Creamos un objeto que recibirá los campos del formulario que tengan valor para hacer
    //posteriormente una búsqueda de solo auqellos campos rellenados.
    let filtro: any = [];

    //De esta forma le indicamos que si hay algún valor en el campo 'name' lo añada como objeto a la variable filtro.
    if (miForm.value.name) {
      filtro.name = miForm.value.name;
    }

    //Sucede lo mismo en la categoría:
    if (miForm.value.category) {
      filtro.category = miForm.value.category;
    }

    //El precio, al haberlo especificado en el formulario como rangos de valor
    //en formato String, recibirá dos parámetros especificados como un precio mínimo y otro
    //como precio máximo. Con .split identifica el campo del precio como esos parámetros
    //separados con guion y lo divide en un array con esos elemtnos.
    if (miForm.value.price) {
      const [minPrice, maxPrice] = miForm.value.price.split('-').map(Number);
      filtro.price = { minPrice, maxPrice }; 
    }

    //Verificamos si el valor del campo 'active' es distinto de un valor vacío. Después,
    //en caso de tener un valor distinto a vacío lo convierte en un booleano.
    //Si el valor active es true (lo que se ha definido en el form html) le asignará el valor true
    //y, si no lo es, le asignará false.
    if (miForm.value.active !== '') {
      filtro.active = miForm.value.active === 'true';
    }

    //Después de obtener el objeto filtro con los datos rellenados, aplicaremos el método filtrar
    //de nuestro servicio pasándole el objeto obtenido.
    this.productService.filtrar(filtro);

    //Emitimos el evento para el padre después de aplicar el filtrado.
    this.resultFiltro.emit();

    console.log(filtro);

    //Reseteamos el form automáticamente después de enviar:
    miForm.reset();
  }
}
