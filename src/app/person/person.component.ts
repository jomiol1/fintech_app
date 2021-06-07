import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PersonService} from '../service/person.service';
import {IPersonResponse, IPersonRequest} from '../model/person.interface';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons:IPersonResponse[];
  createForm: FormGroup;
  toUpdate:number = 0;

  constructor(private modalService: NgbModal, private personService:PersonService) {
    this.loadData();
   }

  ngOnInit(): void {

    this.createForm = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(''),
      gender: new FormControl(''),
      creditCard: new FormGroup({
        number: new FormControl(''),
        cvv: new FormControl(''),
        year: new FormControl(''),
        month: new FormControl('')
      }),
    });

  }

  openLg(content) {
    this.toUpdate = 0;
    this.createForm.reset();
    this.modalService.open(content, { size: 'lg' });
  }

  save(form:IPersonRequest){
    if(this.createForm.invalid)
    {
      alert("Complete the Form!")
    }
    else if(this.toUpdate>0){
        this.personService.update(form,this.toUpdate).subscribe(()=>{
          this.loadData();
          this.modalService.dismissAll();
        });
      }
      else{
        this.personService.create(form).subscribe(()=>{
          this.loadData();
          this.modalService.dismissAll();
        });
      }
    

  }

  findById(content, id:number){
    this.toUpdate = id;
    this.personService.findById(id).subscribe(response=>{
      this.createForm.controls['name'].setValue(response.data.name);
      this.createForm.controls['lastName'].setValue(response.data.lastName);
      this.createForm.controls['gender'].setValue(response.data.gender);
      this.createForm.controls['creditCard'].setValue(response.data.creditCard);
    });

    this.modalService.open(content, { size: 'lg' });
  }

  delete(id:number){
    if(confirm("Are you sure to delete")) {
      this.personService.delete(id).subscribe(response=>{
        this.loadData();
      });
    }
  }

  loadData(){
    this.personService.getPersons().subscribe(
      response => this.persons = response.data
    );
  }

}
