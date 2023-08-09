import { Component } from '@angular/core';
import { TestErrorService } from './test-error.service';


@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  constructor(private errorService : TestErrorService){
    //this.get404();
  }

  get404(){
    this.errorService.get404Error().subscribe({
      next : response => {console.log(response),
      console.log("hello responseeeeee")
      },
        error: error => {console.log(error),
          console.log("errorrr")}         
      })
  }

  get500(){
    this.errorService.get500Error().subscribe({
      next : response => console.log(response),
        error: error => console.log(error)      
      })
  }

  get400(){
    this.errorService.get400Error().subscribe({
      next : response => console.log(response),
      error: error => console.log(error)      
    })
  }

  get400Validation(){
    this.errorService.get400ValidationError().subscribe({
      next : response => console.log(response),
        error: error => console.log(error)      
      })
  }
}

