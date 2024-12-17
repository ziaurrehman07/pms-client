import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { JobService } from '../job.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [NgIf, NgFor],
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
