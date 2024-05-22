import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from "./shared/header/header.component";
import { SidebarComponent } from './shared/sidebar/sidebar.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ButtonModule, HeaderComponent, SidebarComponent]
})
export class AppComponent {
  
}
 