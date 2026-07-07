import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecordsService } from './records.service';
import { RecordItem } from '../models/record.model';

describe('RecordsService', () => {
  let service: RecordsService;
  let httpTestingController: HttpTestingController;
  const mockRecords: RecordItem[] = [
    { id: 1, title: 'Record One', description: 'First record' },
    { id: 2, title: 'Record Two', description: 'Second record' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecordsService],
    });

    service = TestBed.inject(RecordsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch records from the JSON endpoint', () => {
    service.getAll().subscribe((records) => {
      expect(records).toEqual(mockRecords);
    });

    const req = httpTestingController.expectOne('/data/records.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockRecords);
  });

  it('should return a record by id', () => {
    service.getById(2).subscribe((record) => {
      expect(record).toEqual(mockRecords[1]);
    });

    const req = httpTestingController.expectOne('/data/records.json');
    req.flush(mockRecords);
  });
});
