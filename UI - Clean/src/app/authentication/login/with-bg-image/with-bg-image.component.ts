import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ConfigureModel } from 'app/crs-model/shared/configure-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-with-bg-image',
  templateUrl: './with-bg-image.component.html'
})
export class WithBgImageComponent implements OnInit {
  loginForm: FormGroup;
  showDialog:boolean;
  constructor(private fb: FormBuilder, private router: Router,private http: HttpClient,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle(`Sign In | CRS | Harvesting`);
    this.showDialog = false;
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required] 
    })
  }
  onSubmit() {
    if (this.loginForm.valid) {
      if (this.loginForm.controls['email'].value === 'admin@harvesting.co' && this.loginForm.controls['password'].value === 'admin@123') {
        sessionStorage.setItem('isLoggedIn', 'true');
        this.http.get<ConfigureModel[]>('/ml').subscribe((res :ConfigureModel[])=>{
          if(res.length>0){
            this.router.navigate(['crsmodel/model-list']);
          }
          else{
            this.router.navigate(['crsmodel']);
          }
        });
        // this.modelService.getModels().subscribe((res : ConfigureModel[])=>{
        //   if(res.length>0){
        //     this.router.navigate(['crsmodel/model-list']);
        //   }
        //   else{
        //     this.router.navigate(['crsmodel']);
        //   }
        // });
        
      }
      else{
        this.showDialog = true;
      }
    }
  }
  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.onSubmit();
    }
  }

}
