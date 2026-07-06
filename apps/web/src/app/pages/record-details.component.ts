import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { RecordItem } from '../models/record.model';
import { RecordsService } from '../services/records.service';

@Component({
  selector: 'app-record-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './record-details.component.html',
  styleUrl: './record-details.component.css',
})
export class RecordDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly recordsService = inject(RecordsService);

  readonly record$: Observable<RecordItem | undefined> = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.recordsService.getById(id))
  );
}
