import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { RecordItem } from '../models/record.model';

@Injectable({ providedIn: 'root' })
export class RecordsService {
  private readonly http = inject(HttpClient);

  private readonly records$: Observable<RecordItem[]> = this.http
    .get<RecordItem[]>('/data/records.json')
    .pipe(shareReplay(1));

  getAll(): Observable<RecordItem[]> {
    return this.records$;
  }

  getById(id: number): Observable<RecordItem | undefined> {
    return this.records$.pipe(map((records) => records.find((r) => r.id === id)));
  }
}
