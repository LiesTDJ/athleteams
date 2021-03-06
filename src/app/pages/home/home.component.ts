import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthentificatorComponent } from 'src/app/tools/authentificator/authentificator.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  startClick() {
    this.loginSheet.open(AuthentificatorComponent);
  }

}
