import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() viewChange = new EventEmitter<'add' | 'view'>();

  switchToAdd() {
    this.viewChange.emit('add');
  }

  switchToView() {
    this.viewChange.emit('view');
  }
}