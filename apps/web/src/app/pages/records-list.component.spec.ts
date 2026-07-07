import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RecordsListComponent } from './records-list.component';
import { RecordsService } from '../services/records.service';
import { RecordItem } from '../models/record.model';

describe('RecordsListComponent', () => {
  let fixture: ComponentFixture<RecordsListComponent>;
  let component: RecordsListComponent;
  let router: Router;
  const mockRecords: RecordItem[] = [
    { id: 1, title: 'Record One', description: 'First record' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordsListComponent, RouterTestingModule],
      providers: [
        {
          provide: RecordsService,
          useValue: {
            getAll: () => of(mockRecords),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordsListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to record details when opening a record', () => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.openRecord(1);

    expect(navigateSpy).toHaveBeenCalledWith(['/records', 1]);
  });
});
