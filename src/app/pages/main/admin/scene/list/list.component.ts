import { Component } from '@angular/core';
import { Scene } from '../../../../../types/scene.type';
import { map, Observable, shareReplay, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SceneService } from '../../../../../services/scene.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { ListUpdateComponent } from '../../../../../components/list-update/list-update.component';
import { InfoComponent } from './info/info.component';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatIcon,
    NgClass,
    MatMiniFabButton,
    ListUpdateComponent,
    InfoComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
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
      takeUntil(this.destroyed),
    );

  isHandset = false;
  constructor(
    private router: Router,
    private sceneService: SceneService,
    private breakpointObserver: BreakpointObserver,
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
