import { Route } from '@angular/router';
import { RecordDetailsComponent } from './pages/record-details.component';
import { RecordsListComponent } from './pages/records-list.component';

export const appRoutes: Route[] = [
	{
		path: '',
		component: RecordsListComponent,
	},
	{
		path: 'records/:id',
		component: RecordDetailsComponent,
	},
	{
		path: '**',
		redirectTo: '',
	},
];
