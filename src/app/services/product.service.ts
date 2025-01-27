import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProducto } from '../interfaces/iproducto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // httpClient = inject(HttpClient);
  // baseUrl = 'https://jsonblob.com/api/1332301495248543744';
  private arrProductos: IProducto[];
  private arrProdFiltrados: IProducto[] = [];

  constructor() {
    this.arrProductos = [];
    //Con un fetch hacemos la llamada a la API y los guardamos en nuestro arrProductos. 
    fetch('https://jsonblob.com/api/1333364136998002688')
      .then((response) => response.json())
      .then((productos) => {
        productos.forEach((element: any) => {
          this.arrProductos.push(element as IProducto);
        });
      });
  }

  //Devuelve todos los productos de la API que se han almacenado en el array. 
  getAllProductos(): IProducto[] {
    return this.arrProductos;
  }

  //Utilizamos el métdo .push para añadir el producto recibido al array. Se almacenará en memoria. 
  insert(producto: IProducto): void {
    this.arrProductos.push(producto);
  }

  //Borraremos por id y devolveremos la colección de productos sin el producto que hayamos eliminado.
  delete(id: string): IProducto[] {
    let i = this.arrProductos.findIndex((producto) => producto._id == id);

    if (i != -1 && i >= 0 && i < this.arrProductos.length) {
      this.arrProductos.splice(i, 1);
    }

    //Para que tb se pueda borrar de la lista de los productos filtrados utilizamos la misma lógica
    //pero con el array de los productos filtrados:
    let f = this.arrProdFiltrados.findIndex((producto) => producto._id == id);

    if (f != -1 && f >= 0 && f < this.arrProdFiltrados.length) {
      this.arrProdFiltrados.splice(f, 1);
    }
    return this.arrProductos;
  }

  //Devuelve los productos que están en el array de productos filtrados y que han sido filtrados con el método filtrar.
  getProdFiltrados(): IProducto[] {
    return this.arrProdFiltrados;
  }

  //Con el método filtrar() aplicamos los filtros necesarios al objeto(filtro) obtenido en el fomulario,
  //que contiene únicmanete los valores que han sido rellenados en los campos del form y 
  //guardamos el resultado en nuestro arrProdFiltrados. 

  //Usamos el método .filter en el array de productos solo para devolver aquellos que cumplan
  //las condiciones que especificaremos. 
  filtrar(filtro: any): void {
    this.arrProdFiltrados = this.arrProductos.filter((producto) => {
      //Creamos la variable coincide como boolean y si alguna de las condiciones no se cumple su valor será false. 
      let coincide = true;

      //Si filtro.name tiene valor, entonces verificamos si el nombre del producto incluye el texto del filtro sin 
      //importar si está en mayúsculas o minúsculas.
      if (
        filtro.name &&
        !producto.name.toLowerCase().includes(filtro.name.toLowerCase())
      ) {
        coincide = false;
      }

      //Hacemos lo mismo con la categoría, si el filtro devuelve este valor entocnes comparamos la categoría del
      //producto con el valor del filtro. 
      if (filtro.category && producto.category !== filtro.category) {
        coincide = false;
      }

      //Si la propiedad price se encuentra dentro del objeto filtro, generamos una variable donde 
      //desglosaremos el precio por valores. Si el precio del producto es menor que minPrice o mayor
      //que el maxPrice entonces no coincide y será false. 
      if (filtro.price) {
        let { minPrice, maxPrice } = filtro.price;  
        if (producto.price < minPrice || producto.price > maxPrice) {
          coincide = false;
        }
      }

      //Si el objeto contiene este dato, comprobaremos si el producto está activo o no
      //según lo que marque su filtro. 
      if (filtro.active !== undefined && producto.active !== filtro.active) {
        coincide = false;
      }

      return coincide;
    });

    console.log('filtro:', this.arrProdFiltrados);
  }
}
