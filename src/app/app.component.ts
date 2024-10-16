import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  loading: boolean = false;

  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loaderService.loading$.subscribe(loading => {
      this.loading = loading;
      this.cdr.detectChanges();
    });
  }
}
