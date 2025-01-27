import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  //Este será el objeto de nuestro formulario Reactive.
  productoForm!: FormGroup;

  //Inyectamos el servicio para manejar los métodos necesarios, así como el
  //router para navegar entre los htmls y Activatedroute para acceder a las URL.
  productService = inject(ProductService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    //Dentro del constructor especificamos los FormGroup de nuestro formulario. Primero
    //inicializamos sus valores en null y con los validadores establecemos que sean campos
    //obligatorios.

    //El id se asignará de forma automática y, por ello, no lo hemos definido aquí.

    //El precio, además de ser obligatorio, también deberá estar entre esos rangos de precio
    //mínimo y máximo.

    //Por otro lado, la imagen contendrá un validador pattern para que la URL siempre sea válida.
    this.productoForm = new FormGroup(
      {
        //  _id: new FormControl(null,[Validators.required]),
        name: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [
          Validators.required,
          Validators.min(1),
          Validators.max(35),
        ]),
        category: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
          ),
        ]),
        active: new FormControl(true, [Validators.required]),
      },
      []
    );
    //Llamamos al me´todo dentro del constructor para poder cargar los datos nada más se incialicen.
    this.cargarProductos();
  }
  //Para cargar los productos usamos el servicio que contiene ese método:
  cargarProductos() {
    this.productService.getAllProductos();
  }

  //Gestiona que todo esté correcto en el formulario. Por ello, primero comprueba que todo sea válido.
  getDataForm() {
    if (this.productoForm.valid) {
      //De esta forma creamos un objeto del nuevo producto con los datos recibidos del formulario, añadiendo
      //el _id generado por uuidv4.
      let prodForm = {
        ...this.productoForm.value,
        _id: uuidv4(),
      };
      //A continuación, llama al servicio para insertar ese objeto con todos los datos.
      this.productService.insert(prodForm);
      console.log('Producto nuevo: ', prodForm);
      console.log('API ahora: ', this.productService.getAllProductos());
    }
    //Resetea los datos del formulario de forma automática:
    this.productoForm.reset();
  }

  //Con este método verificaremos que los datos del formulario sean correctos y también
  //podemos mostrar que, si el usuario ha pulsado sobre el campo, se muestre. Podremos
  //mostrar mensajes en caso de que haya algún error en el campo para facilitar el envío.
  checkControl(
    formControlName: string,
    validador: string
  ): boolean | undefined {
    return (
      this.productoForm.get(formControlName)?.hasError(validador) &&
      this.productoForm.get(formControlName)?.touched
    );
  }
}
