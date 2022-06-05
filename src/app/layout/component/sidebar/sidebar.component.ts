import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { menuList } from '../../../data/dummy/menu_list';
import { MenuModel } from '../../../data/model/menu-model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItem: MenuModel[] = menuList;

  constructor(public router: Router) {
    
  }

  ngOnInit(): void {}

}
