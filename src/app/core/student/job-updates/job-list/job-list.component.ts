import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {
  @Output() selectJob = new EventEmitter<string>();
  @Input() jobs: any[] = [];

  selectedJob(jobId: string): void {
    this.selectJob.emit(jobId);
  }
}
