import { Component } from '@angular/core';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [MainPageComponent, TuiRoot]
})
export class AppComponent {
  title = 'life-wheel';
}
