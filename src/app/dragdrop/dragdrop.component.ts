import { Component, OnInit , Output, EventEmitter, Inject, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit} from '@angular/cdk/drag-drop';
import {NewDataService} from '../services/new-data.service';
import {FormBuilder , FormGroup, Validators} from '@angular/forms';
//import { threadId } from 'worker_threads';

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
  errMess:string;
  todoForm:FormGroup;
  task;
  name;
  @ViewChild('tform') todoFormDirective;
  formErrors={
    'todoTask':'',
  };
  validationMessages={
    'todoTask':{
      'required':'task is required',
      'minlength':'minimum length is 2'
    },
  };
  constructor(private dataService: NewDataService,
    @Inject('BaseURL') public BaseURL,
    private tf : FormBuilder) { 
      this.task={name:''};
      this.name='';
    }

  ngOnInit(): void {
    this.createForm();
    this.dataService.getNewData().subscribe((items)=>this.to_do=items);
    this.dataService.getDoneData().subscribe((items)=>this.done=items);
  }
  createForm(){
    this.todoForm=this.tf.group({
        name:['', [Validators.required, Validators.minLength(2)]],
    });
    this.todoForm.valueChanges.subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?:any){
    if(!this.todoForm){return;}
    const form=this.todoForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        // clear prev error messages (if any)
        this.formErrors[field]='';
        const control=form.get(field);
        if(control && control.dirty && !control.valid){
          const messages=this.validationMessages[field];
          for(const key in control.errors){
              if(control.errors.hasOwnProperty(key)){
                this.formErrors[field]+=messages[key]+" ";
              }
          }
        }
      }
    }
  }
  onSubmit(){
    // this.task=this.todoForm.value;
    // console.log(this.task);
    // this.to_do.push(this.task);
    this.task=this.todoForm.value;
    //console.log(name);
    //this.to_do.push(this.name);
    this.dataService.postData(this.task).subscribe(
      data=>{
        //this.to_do.push(data);
      },
      error=>{
        this.errMess=<any>error;
      }
    );
    this.todoForm.reset({
      name:''
    });
    this.dataService.getNewData().subscribe((items)=>this.to_do=items);
    this.dataService.getDoneData().subscribe((items)=>this.done=items);
    //this.todoFormDirective.resetForm();
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
    console.log(this.to_do); 
    console.log(this.done); 
  }
  // @Output('cdkDropDropped') 
  // dropped: EventEmitter<CdkDragDrop<T, any>> = 
  //   new EventEmitter<CdkDragDrop<T, any>>();
  
}
