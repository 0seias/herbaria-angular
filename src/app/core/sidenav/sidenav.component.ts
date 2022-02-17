import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  nameProject!: string;

  constructor() { }

  ngOnInit(): void {
    this.nameProject = environment.nameProject
  }

}
