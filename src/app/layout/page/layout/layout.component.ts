import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  #sidenav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public side: MatDrawerMode;
  public opened: boolean;
  public isDesktop: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isResolution(window.innerWidth);
  }

  @HostListener('window:resize')
  private onResize() {
    this.isResolution(window.innerWidth);
  }

  setSidenavStatus(value: boolean) {
    setTimeout(() => this.#sidenav$.next(value), 200);
  }

  getSidenavStatus() {
    return this.#sidenav$.asObservable();
  }

  private isResolution(width: number) {
    this.isDesktop = width >= 768;

    this.opened = this.isDesktop;
    this.side = this.isDesktop ? 'side' : 'over';
  }

  ngOnDestroy(): void {
    this.#sidenav$.unsubscribe();
  }
}
