import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confusion-matrix',
  templateUrl: './confusion-matrix.component.html',
  styleUrls: ['./confusion-matrix.component.css']
})
export class ConfusionMatrixComponent implements OnInit {
  @Input('classes') classes: string[];
  @Input('data') data: number[][];
  @Input('type') type: string;
  constructor() { }

  ngOnInit() {
    
  }

}
