import { Component, inject } from '@angular/core';
import { LifeWheelComponent } from '../life-wheel/life-wheel.component';
import { Department, departments, lifeAreas } from 'src/app/data';
import { TuiComboBoxModule } from '@taiga-ui/legacy';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListWrapper,
  TuiFilterByInputPipe,
  TuiStringifyContentPipe,
  TuiTooltip,
} from '@taiga-ui/kit';
import {TuiInputNumberModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-main-page',
  imports: [LifeWheelComponent, TuiComboBoxModule, ReactiveFormsModule, TuiTooltip, TuiIcon, TuiDataListWrapper, TuiFilterByInputPipe, TuiInputNumberModule,TuiTextfieldControllerModule,   TuiStringifyContentPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  standalone: true
})
export class MainPageComponent {
  private readonly fb = inject(FormBuilder)
  readonly departments = departments;
  readonly lifeAreas = lifeAreas;

  readonly deparmentControl = this.fb.control<Department | null>(null);

  readonly departmentStringify = (item: Department) => item.name;
}
