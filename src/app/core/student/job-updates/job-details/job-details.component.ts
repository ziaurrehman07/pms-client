import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
  @Input() job: any;
  @Output() back = new EventEmitter<void>();

  goBack(): void {
    this.back.emit();
  }
}
