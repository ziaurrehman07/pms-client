import { DatePipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [DatePipe, NgIf],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
  @Input() job: any;
  @Output() back = new EventEmitter<void>();
  constructor(private jobService: JobService) {};
  errorMessage: string | null = null;
  successMessage: string | null = null;
  disableApplyButton: boolean = false;

  goBack(): void {
    this.back.emit();
  }
  ApplyForJob(jobId: string) {
    this.jobService.applyJob(jobId).subscribe({
      next: (response) => {
        this.successMessage = 'Application successful!';
        this.errorMessage = null;
        this.disableApplyButton = false;
        console.log('Job application successful:', response);
      },
      error: (err) => {
        this.successMessage = null;
        if (err?.error) {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(err.error, 'text/html');
          const preTag = htmlDoc.querySelector('pre');
          if (preTag) {
            const errorText = preTag.innerHTML.split('<br>')[0];
            const match = errorText.match(/Error: (.+)/);
            this.errorMessage = match ? match[1].trim() : 'An unknown error occurred.';
          } else {
            this.errorMessage = 'An error occurred while applying for the job.';
          }
        } else {
          this.errorMessage = 'An error occurred while applying for the job.';
        }
        this.disableApplyButton = true;
        console.error('Error applying for job:', err);
      },
    });
  }
  clearErrorMessage() {
    this.errorMessage = null;
    this.disableApplyButton = false;
  }
}
