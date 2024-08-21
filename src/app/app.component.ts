import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeartComponent } from './heart/heart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'heart-render';
}
