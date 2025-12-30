import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-button',
  standalone: true,
  templateUrl: './form-button.component.html',
  styleUrl: './form-button.component.scss',
})

export class FormButtonComponent {
  @Input() label!:string;
}
