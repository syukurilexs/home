import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import { SceneService } from 'src/app/services/scene.service';
import { SceneDto } from 'src/app/types/scene-dto.type';
import { Scene } from 'src/app/types/scene.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  scenesDto: Scene[] = [];
  scenes: Scene[] = [];
  listInput: { name: string; id: number }[] = [];
  info!: Scene;

  destroyed = new Subject<void>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      takeUntil(this.destroyed)
    );

  isHandset = false;
  constructor(private router: Router, private sceneService: SceneService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$.subscribe((x) => {
      this.isHandset = x;
    });

    this.getAll();
  }

  getAll() {
    this.sceneService.getAll().subscribe((data) => {
      this.scenes = data;
    });
  }

  onClickedEdit(id: number) {
    this.router.navigate(['/admin/scene/edit/', id]);
  }

  onClickedDelete(id: number) {
    this.sceneService.deleteById(id).subscribe((data) => {
      this.getAll();
    });
  }

  onClickedInfo(id: number) {
    const idx = this.scenes.findIndex((x) => x.id === id);
    if (idx > -1) {
      this.info = this.scenes[idx];
    }
  }

  onClickedAdd() {
    this.router.navigate(['/admin/scene/add']);
  }
}
