import {
  Component,
  EventEmitter,
  Inject,
  Output,
  Renderer2,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
})
export class AdminNavComponent {
  @Output()
  themChange = new EventEmitter<boolean>();
  checked = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.checked = this.themeService.init(this.document, this.renderer);
  }

  toggleChange({ checked }: MatSlideToggleChange) {
    if (checked) {
      this.themeService.setDark(this.document, this.renderer);
    } else {
      this.themeService.setLight(this.document, this.renderer);
    }
  }
}
