import { Component, LOCALE_ID } from '@angular/core'; // Importa el decorador Component y LOCALE_ID para cambiar el idioma de la app.
import { RouterOutlet } from '@angular/router'; // RouterOutlet permite la navegación y muestra diferentes vistas según las rutas definidas.
import { TodoComponent } from './pages/todo/todo.component'; // Importa el componente TodoComponent que gestiona las tareas (todos).
import { TODO_DATA } from '../assets/todo'; // Importa los datos de las tareas desde un archivo externo.
import { NTodo } from './models/todo.models'; // Importa el modelo de datos para definir cómo deben estructurarse las tareas.
import { CommonModule, registerLocaleData } from '@angular/common'; // Importa el módulo común y la función para registrar configuraciones regionales.
import es from "@angular/common/locales/es"; // Importa la configuración regional para el idioma español.

registerLocaleData(es); // Registra los datos regionales del idioma español para que se usen en toda la app.

@Component({
  selector: 'app-root', // Nombre del componente que se utiliza como etiqueta en el HTML (ej. <app-root></app-root>).
  standalone: true, // Especifica que este componente es independiente y no requiere ser parte de un módulo.
  imports: [RouterOutlet, TodoComponent, CommonModule], // Define los módulos y componentes que se usarán en este componente.
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es' // Cambia la configuración regional de la app al idioma español.
    }
  ],
  templateUrl: './app.component.html', // Archivo que contiene el HTML que define la estructura visual del componente.
  styleUrl: './app.component.scss' // Archivo que contiene los estilos SCSS específicos de este componente.
})
export class AppComponent {

  // Si el array está vacío, este código comentado es una estructura de datos alternativa.
  // todoData: NTodo.TodoData[] = [];

  todoData = TODO_DATA; // Asigna los datos importados de tareas (TODO_DATA) a la variable `todoData`.

  // Método que obtiene información de una tarea seleccionada y la muestra en la consola.
  getTodoInfo(val: NTodo.TodoData){
    console.log(val); // Muestra los detalles de la tarea seleccionada en la consola.
  }

  // Método para hacer un seguimiento de los elementos en una lista cuando se renderizan, mejora el rendimiento.
  trackByFn(_index: number, item: NTodo.TodoData){
    return item.id; // Retorna el ID único de cada tarea para que Angular pueda identificarla de forma eficiente.
  }

  // Método que organiza las tarjetas de tareas según la prioridad de cada una.
  organzarCard(){
    this.todoData.sort((a, b) => a.priority - b.priority); // Ordena las tareas en orden ascendente por prioridad.
  }
}

// Hola esto es una prueba de cambio de rama esta supuestamente es ejercicio-2