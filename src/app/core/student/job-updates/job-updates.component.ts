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
  isLoading: boolean = false;

  constructor(private jobListService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.isLoading = true;
    this.jobListService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  fetchJobDetails(jobId: string): void {
    this.isLoading = true;
    this.jobListService.getJobDetails(jobId).subscribe({
      next: (data) => {
        this.selectedJob = data.data;   
        this.isLoading = false;   
      },
      error: (err) => 
      {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
  clearSelection(): void {
    this.selectedJob = null;
  }
}
