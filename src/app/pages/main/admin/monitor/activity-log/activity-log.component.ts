import { Component, ViewChild } from '@angular/core';
import { ActivityLogService } from '../../../../../services/activity-log.service';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatProgressSpinner,
} from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [MatPaginator, MatProgressSpinner, DatePipe],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.scss',
})
export class ActivityLogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoadingResults = true;
  resultsLength = 0;
  data: any[] = [];
  pageSize = 10;
  pageEvent!: PageEvent;

  constructor(private activityLogService: ActivityLogService) {}

  ngAfterViewInit() {
    this.subscribeToData();
  }

  /**
   * To update the page size
   * @date 3/30/2024 - 11:17:03 AM
   *
   * @param {PageEvent} e
   */
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
  }

  /**
   * Fetching data realtime from server and display by page
   * @date 3/30/2024 - 11:16:30 AM
   */
  subscribeToData() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.activityLogService
            .getActivityLog(this.paginator.pageIndex + 1, this.pageSize)
            .pipe(catchError(() => of(null)));
        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.meta.itemCount;
          return data.data;
        }),
      )
      .subscribe((data) => {
        this.data = data;
      });
  }
}
