import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import { SceneService } from 'src/app/services/scene.service';
import { Scene } from 'src/app/utils/types/scene.type';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnDestroy {
  scenes: Scene[] = [];
  destroyed = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      takeUntil(this.destroyed)
    );
  isHandset = false;

  constructor(
    private readonly sceneService: SceneService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.getAll();

    this.isHandset$.subscribe((x) => {
      this.isHandset = x;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroyed.next();
    this.destroyed.complete();
  }

  getAll() {
    this.sceneService.getAll().subscribe((data) => {
      this.scenes = data;
    });
  }

  onClicked(scene: Scene) {
    this.sceneService.updateState(scene).subscribe((data) => {});
  }
}
