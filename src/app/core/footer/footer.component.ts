import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version!: string;
  year!: string;

  constructor() { }

  ngOnInit(): void {
    this.version = environment.version;
    this.year = (new Date()).getFullYear().toString()
  }

}