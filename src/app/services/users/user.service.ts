import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable, BehaviorSubject, tap, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoaderService } from '../loading/loading.service';
import { throwError } from 'rxjs';
import { ApiResponse, User } from '../../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.userApiUrl}`;
  private userDataSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  getActiveUsers(): Observable<ApiResponse> {
    this.loaderService.show();

    return this.http.get<ApiResponse>(this.apiUrl, { withCredentials: true }).pipe(
      tap((response: ApiResponse) => {
        this.userDataSubject.next(response?.data);
      }),
      catchError((error) => {
        console.error('Error fetching active users:', error);
        return throwError(error);
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }

  getUserData(): Observable<User | null> {
    return this.userDataSubject.asObservable();
  }

  getPlacementDetails(): Observable<any> {
    return this.http.get('/assets/studentData/student-placement-data.json');
  }
}
