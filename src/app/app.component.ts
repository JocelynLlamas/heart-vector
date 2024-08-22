import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeartComponent } from './heart/heart.component';
import { CharacterComponent } from './character/character.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeartComponent, CharacterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'heart-render';
}
