import { Component } from '@angular/core';
import { Scene } from '../../../../types/scene.type';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject, Observable, map, shareReplay, takeUntil } from 'rxjs';
import { SceneService } from '../../../../services/scene.service';
import { NgClass, TitleCasePipe } from '@angular/common';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-scene',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatRipple,
    TitleCasePipe,
    NgClass
  ],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss'
})
export class SceneComponent {
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
    this.sceneService.triggerScene(scene).subscribe((data) => {});
  }
}
