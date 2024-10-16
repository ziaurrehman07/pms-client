import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { finalize, Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from './user.model';
import { LoaderService } from '../loading/loading.service';

// Define the user interface (strong typing)
export interface UserResponse {
  data: User;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.userApiUrl}`;

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  getActiveUsers(): Observable<UserResponse> {
    this.loaderService.show();
    const loaderDuration = 2000;
    return this.http.get<UserResponse>(this.apiUrl, {
      withCredentials: true,
    }).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loaderService.hide(); // Hide loader after the specified duration
        }, loaderDuration);
      })
    );
  }
}
