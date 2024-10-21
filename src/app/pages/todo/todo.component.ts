import { Component, EventEmitter, Input, Output } from '@angular/core'; // Importa Component para crear el componente, Input para recibir datos, Output y EventEmitter para emitir eventos.
import { NTodo } from '../../models/todo.models'; // Importa el modelo de tareas (NTodo), que define la estructura de las tareas.
import { CommonModule } from '@angular/common'; // Importa el módulo común, necesario para usar directivas como *ngIf o *ngFor en el componente.

@Component({
  selector: 'app-todo', // El nombre que utilizarás en el HTML para este componente (ej. <app-todo></app-todo>).
  standalone: true, // Indica que el componente es independiente y no necesita ser parte de un módulo.
  imports: [
    CommonModule // Se importa CommonModule para tener acceso a las funcionalidades básicas de Angular en la plantilla HTML.
  ],
  templateUrl: './todo.component.html', // El archivo de plantilla HTML que define la vista de este componente.
  styleUrl: './todo.component.scss' // El archivo SCSS que contiene los estilos específicos del componente.
})
export class TodoComponent {
  // Inputs que reciben datos desde el componente padre.
  @Input({required: true}) todoData! : NTodo.TodoData; // Recibe los datos de una tarea específica (obligatorio).
  @Input() primero!: boolean; // Indica si esta es la primera tarea de la lista.
  @Input() ultimo!: boolean; // Indica si esta es la última tarea de la lista.
  @Input() par!: boolean; // Indica si la tarea es de posición par en la lista.
  @Input() impar!: boolean; // Indica si la tarea es de posición impar en la lista.

  // Output que emite un evento cuando se hace clic en un icono.
  @Output() onClickIcon = new EventEmitter<NTodo.TodoData>(); // Emite la tarea seleccionada cuando se interactúa con el icono en la vista.

  // Getter que devuelve la prioridad de la tarea como texto basado en el valor numérico.
  get Prioridad(): string {
    switch (this.todoData.priority) {
      case NTodo.Priority.LOW:
        return NTodo.PriorityText.LOW; // Retorna "Baja" si la prioridad es baja.
      case NTodo.Priority.MEDIUM:
        return NTodo.PriorityText.MEDIUM; // Retorna "Media" si la prioridad es media.
      case NTodo.Priority.HIGH:
        return NTodo.PriorityText.HIGH; // Retorna "Alta" si la prioridad es alta.
      default:
        return ''; // Retorna una cadena vacía si no coincide con ninguna prioridad.
    }
    return '';
  }

  // Getter que devuelve el progreso de la tarea como un porcentaje (entre 0 y 100).
  get Progreso() {
    return this.todoData.progress * 100; // Multiplica el progreso (0-1) por 100 para obtener el porcentaje.
  }

  // Getter que devuelve el rango textual basado en el progreso de la tarea.
  get Rango() {
    if (this.Progreso >= 0 && this.Progreso <= NTodo.Range.LOW) {
      return NTodo.RangeText.LOW; // Si el progreso está en el rango bajo, retorna "Bajo".
    } else if (this.Progreso > NTodo.Range.LOW && this.Progreso <= NTodo.Range.MEDIUM) {
      return NTodo.RangeText.MEDIUM; // Si está en el rango medio, retorna "Medio".
    }
    return NTodo.RangeText.HIGH; // Si supera el rango medio, retorna "Alto".
  }
}
