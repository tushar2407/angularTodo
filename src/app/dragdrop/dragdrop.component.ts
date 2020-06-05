import { Component, OnInit , Output, EventEmitter, Inject} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit} from '@angular/cdk/drag-drop';
import {NewDataService} from '../services/new-data.service';
@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.scss']
})
export class DragdropComponent implements OnInit {
  // to_do=[
  //   'Get to work',
  //   'Pick up something',
  //   'go home',
  //   'fall asleep'
  // ];
  // done=[
  //   'Get up',
  //   'Take a shower',
  //   'Check e mail',
  //   'walk dog'
  // ];
  to_do:any[];
  done:any[];
  constructor(private dataService: NewDataService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dataService.getNewData().subscribe((items)=>this.to_do=items);
    this.dataService.getDoneData().subscribe((items)=>this.done=items);

  }
  drop(event : CdkDragDrop<string[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data,
        event.previousIndex,event.currentIndex);
    }
    else{
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  dropped(event:CdkDragDrop<string[]>){
    //moveItemInArray(this.to_do,event.previousIndex, event.currentIndex);
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data,
        event.previousIndex,event.currentIndex);
    }
    else{
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  // @Output('cdkDropDropped') 
  // dropped: EventEmitter<CdkDragDrop<T, any>> = 
  //   new EventEmitter<CdkDragDrop<T, any>>();
  
}
