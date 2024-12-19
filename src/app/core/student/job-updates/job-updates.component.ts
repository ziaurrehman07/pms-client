import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { JobListComponent } from "./job-list/job-list.component";
import { JobDetailsComponent } from "./job-details/job-details.component";

@Component({
  selector: 'app-job-updates',
  standalone: true,
  imports: [JobListComponent, JobDetailsComponent],
  templateUrl: './job-updates.component.html',
  styleUrl: './job-updates.component.scss'
})
export class JobUpdatesComponent implements OnInit{
  jobs: any[] = [];
  selectedJob: any = null;

  constructor(private jobListService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobListService.getJobs().subscribe({
      next: (data) => (this.jobs = data.data),
      error: (err) => console.error(err),
    });
  }

  fetchJobDetails(jobId: string): void {
    this.jobListService.getJobDetails(jobId).subscribe({
      next: (data) => {
        this.selectedJob = data.data;        
      },
      error: (err) => console.error(err),
    });
  }
  clearSelection(): void {
    this.selectedJob = null;
  }
}
