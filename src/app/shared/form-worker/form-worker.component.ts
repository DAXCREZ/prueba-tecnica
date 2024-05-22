import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule


interface Trabajador {
  nombre: string;
  email: string;
  puesto: string;
}

@Component({
  selector: 'app-form-worker',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './form-worker.component.html',
  styleUrl: './form-worker.component.css'
})
export class FormWorkerComponent {
 trabajadores: Trabajador[] = [];

  onSubmit(event: Event, form: any) {
    // Evitar el comportamiento predeterminado del evento
    event.preventDefault();

    if (form.valid) {
      const nuevoTrabajador: Trabajador = {
        nombre: form.value.nombre,
        email: form.value.email,
        puesto: form.value.puesto
      };
      this.trabajadores.push(nuevoTrabajador);
      form.reset();
      console.log('Trabajador agregado:', nuevoTrabajador);
      console.log('Lista de trabajadores:', this.trabajadores);
    }
  }
}
