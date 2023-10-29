import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';

export function getHandsetEvent(
  breakpointObserver: BreakpointObserver,
  destroyed: Subject<void>
): Observable<boolean> {
  return breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
    takeUntil(destroyed)
  );
}
