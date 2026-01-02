import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoPageComponent } from './features/todo/pages/todo-page/todo-page.component';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}


