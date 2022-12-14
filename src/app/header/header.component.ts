import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  lang:any;

  constructor() { }

  ngOnInit(): void {
    this.lang = localStorage.getItem("lang") || "en";
  }
  changeLang(lang:any) {
    localStorage.setItem("lang", lang.value);
    window.location.reload();
    
    
    
  }
}
