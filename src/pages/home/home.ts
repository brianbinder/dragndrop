import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TouchPunchProvider } from '../../providers/touchPunch';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public url = document.URL;

  constructor(private touchIt: TouchPunchProvider) { }

  ngOnInit(): void {
    this.touchIt.init();
    const toggleColor = this.toggleColor;
    $('.dragTest').draggable();
    $('.drop').droppable({
      drop: function() {
        toggleColor(this);
      }
    });
  }

  toggleColor(target) {
    const oldColor = $(target).css('background-color')
    const newColor = oldColor === 'rgb(29, 215, 29)' ? '#D01F1F' : '#1DD71D'
    $(target).css('background-color', newColor);
  }

}