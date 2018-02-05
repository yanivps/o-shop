import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'incrementor',
  templateUrl: './incrementor.component.html',
  styleUrls: ['./incrementor.component.css']
})
export class IncrementorComponent {
  @Output('add') add = new EventEmitter();
  @Output('remove') remove = new EventEmitter();
  constructor() { }

  onAdd() {
    this.add.emit();
  }

  onRemove() {
    this.remove.emit();
  }

}
