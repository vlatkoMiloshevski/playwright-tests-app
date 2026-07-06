import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecordItem } from '../models/record.model';
import { RecordsService } from '../services/records.service';

@Component({
  selector: 'app-records-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './records-list.component.html',
  styleUrl: './records-list.component.css',
})
export class RecordsListComponent {
  private readonly router = inject(Router);
  private readonly recordsService = inject(RecordsService);
  readonly records$: Observable<RecordItem[]> = this.recordsService.getAll();

  openRecord(id: number): void {
    void this.router.navigate(['/records', id]);
  }
}
