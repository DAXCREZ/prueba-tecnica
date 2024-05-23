import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerTableComponent } from './worker-table/worker-table.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormWorkerComponent } from './shared/form-worker/form-worker.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';

interface Trabajador {
  nombre: string;
  email: string;
  puesto: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormWorkerComponent,
    WorkerTableComponent,
    SidebarComponent,
    HeaderComponent,
    ToastModule
  ],
  providers: [MessageService]
})
export class AppComponent {
  currentView: 'add' | 'view' = 'add';
  trabajadores: Trabajador[] = [];

  constructor(private messageService: MessageService) {}

  switchView(view: 'add' | 'view') {
    this.currentView = view;
  }

  agregarTrabajador(trabajador: Trabajador) {
    this.trabajadores.push(trabajador);
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Trabajador agregado' });
  }
}
