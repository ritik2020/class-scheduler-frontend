import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  hostName:string = "https://class-scheduler-backend.herokuapp.com";
  constructor() { }

  async getAllTeachers(){
    const response = await fetch(`${this.hostName}/teachers/`);
    return response.json();
  }
}
