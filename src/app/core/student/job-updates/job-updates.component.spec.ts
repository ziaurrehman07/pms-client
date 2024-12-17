import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobUpdatesComponent } from './job-updates.component';

describe('JobUpdatesComponent', () => {
  let component: JobUpdatesComponent;
  let fixture: ComponentFixture<JobUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobUpdatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
