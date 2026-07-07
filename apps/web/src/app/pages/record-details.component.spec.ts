import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { convertToParamMap, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RecordDetailsComponent } from './record-details.component';
import { RecordsService } from '../services/records.service';
import { RecordItem } from '../models/record.model';

describe('RecordDetailsComponent', () => {
  let component: RecordDetailsComponent;
  const mockRecord: RecordItem = { id: 3, title: 'Record Three', description: 'Third record' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordDetailsComponent, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '3' })),
          },
        },
        {
          provide: RecordsService,
          useValue: {
            getById: () => of(mockRecord),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecordDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the selected record based on route id', (done) => {
    component.record$.subscribe((record) => {
      expect(record).toEqual(mockRecord);
      done();
    });
  });
});
