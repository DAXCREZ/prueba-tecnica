import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

interface Trabajador {
  nombre: string;
  email: string;
  puesto: string;
}

@Component({
  selector: 'app-form-worker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-worker.component.html',
  styleUrls: ['./form-worker.component.css']
})
export class FormWorkerComponent {
  @Output() trabajadorAgregado = new EventEmitter<Trabajador>();

  trabajador: Trabajador = { nombre: '', email: '', puesto: '' };

  constructor(private messageService: MessageService) {}

  agregarTrabajador(event: Event, form: any) {
    event.preventDefault();

    if (form.valid) {
      const nuevoTrabajador: Trabajador = { ...this.trabajador };
      this.trabajadorAgregado.emit(nuevoTrabajador);
      form.reset();
      this.trabajador = { nombre: '', email: '', puesto: '' };
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Trabajador agregado' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Formulario inválido' });
    }
  }
}
