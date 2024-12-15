import { Component } from '@angular/core';
import { MainPageComponent } from './components/main-page/main-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [MainPageComponent]
})
export class AppComponent {
  title = 'life-wheel';
}
