import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobListApiURL = `${environment.companyURLs.jobListUrl}`;
  private jobDetailsByID = `${environment.companyURLs.jobDetailsById}`;
  private jobsCache$: Observable<any> | null = null;
  private jobDetailsCache: Map<string, Observable<any>> = new Map();

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    if (!this.jobsCache$) {
      this.jobsCache$ = this.http.get(this.jobListApiURL, { withCredentials: true }).pipe(
        shareReplay(1)
      );
    }
    return this.jobsCache$;
  }
  getJobDetails(jobId: string): Observable<any> {
    if (!this.jobDetailsCache.has(jobId)) {
      const jobDetails$ = this.http.get(`${this.jobDetailsByID}/${jobId}`, { withCredentials: true }).pipe(
        shareReplay(1)
      );
      this.jobDetailsCache.set(jobId, jobDetails$);
    }
    return this.jobDetailsCache.get(jobId)!;
}
}