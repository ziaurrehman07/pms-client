import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable, BehaviorSubject, tap, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UserResponse } from './user.model';
import { LoaderService } from '../loading/loading.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.userApiUrl}`;
  private userDataSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  getActiveUsers(): Observable<UserResponse> {
    this.loaderService.show();

    return this.http.get<UserResponse>(this.apiUrl, { withCredentials: true }).pipe(
      tap((response: UserResponse) => {
        this.userDataSubject.next(response.data);
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
