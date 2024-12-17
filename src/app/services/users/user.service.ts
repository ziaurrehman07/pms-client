import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable, BehaviorSubject, tap, catchError } from 'rxjs';
import { LoaderService } from '../loading/loading.service';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, User } from '../../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.userApiUrl}`;
  private userUpdateApiUrl = `${environment.userUpdateUrl}`
  private userAvatarApiUrl = `${environment.userAvatarUrl}`
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

  updateUserProfile(updatedData: any): Observable<any> {
    // this.loaderService.show();
    return this.http.patch(this.userUpdateApiUrl, updatedData, { withCredentials: true }).pipe(
      tap((response: any) => {
        console.log('User profile updated successfully', response);
  
        // Update the BehaviorSubject with the new data
        const currentUser = this.userDataSubject.value;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updatedData };
          this.userDataSubject.next(updatedUser);
        }
      }),
      catchError((error) => {
        console.error('Error updating user profile:', error);
        return throwError(() => error);
      }),
      finalize(() => {
        // this.loaderService.hide();
      })
    );
  }

  updateUserAvatar(updatedProfile: any): Observable<any> {
    return this.http.put<any>(this.userAvatarApiUrl, updatedProfile, { withCredentials: true });
  }  
}