import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

interface Trabajador {
  nombre: string;
  email: string;
  puesto: string;
}

@Component({
  selector: 'app-worker-table',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, DialogModule, ButtonModule, ToastModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './worker-table.component.html',
  styleUrls: ['./worker-table.component.css']
})
export class WorkerTableComponent implements OnInit {
  @Input() trabajadores: Trabajador[] = [];
  trabajadoresPaginados: Trabajador[] = [];
  trabajadorSeleccionado: Trabajador | null = null;
  displayModal: boolean = false;
  totalRecords: number = 0;
  loading: boolean = false;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.totalRecords = this.trabajadores.length;
    this.loadTrabajadores({ first: 0, rows: 10 });
  }

  loadTrabajadores(event: any) {
    this.loading = true;
    const start = event.first;
    const end = event.first + event.rows;
    this.trabajadoresPaginados = this.trabajadores.slice(start, end);
    this.loading = false;
  }

  onRowEditInit(trabajador: Trabajador) {
    this.trabajadorSeleccionado = { ...trabajador };
    this.displayModal = true;
  }

  onRowEditSave() {
    if (this.trabajadorSeleccionado) {
      const index = this.trabajadores.findIndex(t => t.email === this.trabajadorSeleccionado!.email);
      if (index !== -1) {
        this.trabajadores[index] = this.trabajadorSeleccionado;
        this.updatePaginatedTrabajadores();
      }
      this.trabajadorSeleccionado = null;
      this.displayModal = false;
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Trabajador actualizado' });
    }
  }

  onRowEditCancel() {
    this.trabajadorSeleccionado = null;
    this.displayModal = false;
  }

  onDelete(trabajador: Trabajador) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este trabajador?',
      accept: () => {
        this.trabajadores = this.trabajadores.filter(t => t.email !== trabajador.email);
        this.totalRecords = this.trabajadores.length;
        this.updatePaginatedTrabajadores();
        this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: 'Trabajador eliminado' });
      }
    });
  }

  updatePaginatedTrabajadores() {
    const start = 0;
    const end = 10;
    this.trabajadoresPaginados = this.trabajadores.slice(start, end);
  }
}
