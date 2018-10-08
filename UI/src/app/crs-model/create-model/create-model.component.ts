import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigureModelService } from '../shared/configure-model.service';
import { Column, DataSet, ConfigureModel, Model } from '../shared/configure-model';
import { environment } from 'environments';
import { Router, NavigationEnd, RoutesRecognized, ActivatedRoute, Params } from '@angular/router';
import { WizardService } from '../../components/wizard/wizard.service';
import { Observable } from 'rxjs/Observable';
import { selectModel } from '../shared/extensions';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { ComingSoonComponent } from '../../maintenance/coming-soon/coming-soon.component';
import { IndexedDBService } from '../shared/indexedDB.service';

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.css']
})
export class CreateModelComponent implements OnInit {
  isUploading = false;
  private uploadSubscription : Subscription;
  @ViewChild('fileUpload') fileUpload;
  createProject: FormGroup;
  filesToUpload: FormData;
  uploadedFiles: string[] = [];
  filesInProject: string[] = [];
  columns : any[] = [];
  modelConfiguration: ConfigureModel;
  constructor(private fb: FormBuilder, private modelService: ConfigureModelService,
    private router: Router, private wizardService: WizardService,private activatedRoute: ActivatedRoute,
    private location: Location,public indexedDB: IndexedDBService) {
    this.createProject = this.fb.group({
      projectName: ['', Validators.required],
      modelName: ['', Validators.required],
      files: null,
    });
    //
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     console.log('navigation ended');
    //     console.log(event);
    //   }
    //   if (event instanceof RoutesRecognized) {
    //     console.log('route recognized');
    //   }
    //   // Instance of should be:
    //   // NavigationEnd
    //   // NavigationCancel
    //   // NavigationError
    //   // RoutesRecognized
    // });
  }
  ngOnInit() {
    this.wizardService.activeTab.next(0);
    //console.log(this.router);
    let model = new Model();
    
    this.modelService.model.
      subscribe(res => {  
        this.modelConfiguration = res;
        const model = selectModel(this.modelConfiguration);
        this.activatedRoute.params.subscribe((params: Params) => {
          let id = params['id'];
          if(id == '1'){
            this.filesInProject.push(this.modelConfiguration.dataSets[0].csvOriginalName);
            const model = selectModel(this.modelConfiguration);
            this.createProject.setValue({
              modelName : model.modelName,
              projectName :this.modelConfiguration.projectName,
              files:null
            });
          }
          else{          
            this.modelService.model = Observable.of(new ConfigureModel());
            this.modelService.model.subscribe(result=>{
              console.log(result);
            })
            this.filesInProject = [];
            this.createProject.setValue({
              modelName : '',
              projectName : '',
              files:null
            });
          }
        });       
      });
      // if(this.modelConfiguration.isSaved){
      //   let uploadedFiles = [];
      //   // this.modelConfiguration.dataSets.forEach(x=>uploadedFiles.push(x.csvOriginalName));
      //   this.filesInProject.push(this.modelConfiguration.dataSets[0].csvOriginalName);
      //   const model = selectModel(this.modelConfiguration);
      //   this.createProject.setValue({
      //     modelName : model.modelName,
      //     projectName :this.modelConfiguration.projectName,
      //     files:null
      //   });
      // }
  }
  moveNext() {
    this.router.navigate(['crsmodel/features']);
  }

  onCancel(){
    if(this.uploadSubscription){
      this.uploadSubscription.unsubscribe();
      this.isUploading = false;
    }
  }

  onSubmit() {
    if(this.modelConfiguration.isSaved){
      this.router.navigate(['crsmodel/features']);
    }
    else{
    
    const fi = this.fileUpload.nativeElement;
    this.modelConfiguration = new ConfigureModel();
    if (fi.files) {
      this.isUploading = true;
      this.uploadSubscription = this.modelService
        .uploadFile(this.filesToUpload)
        .subscribe(res => {
          const response = res;
          const fileData = response.fileData;
          // tslint:disable-next-line:prefer-for-of
          this.modelConfiguration.isLite = (fileData[0].rows <= 6000) ? true:false;
          let isLite:number = fileData[0].rows <= 6000? 1:0 
          this.wizardService.isLite.next(isLite);
          for (let i = 0; i < this.uploadedFiles.length; i++) {
            const columns: Column[] = fileData[i].cols.map((col, index) => <Column>{
              name: col,
              isDeleted: false,
              isNumeric: fileData[i].featureTypes[index],
              defaultValue: fileData[i].defaultValues[index],
            });
            const dataSet = <DataSet>{
              csvPath: `${environment.apiHost}/Uploads/${fileData[i].fileName}`,
              columns,
              isSaved: true,
              isSelected: false,
              predictionColumn: fileData[i].cols.slice(-1)[0],
              csvOriginalName: this.uploadedFiles[i],
              rowCount: fileData[i].rows,
            };
            this.modelConfiguration.dataSets.push(dataSet);
          }
          if (this.modelConfiguration.dataSets.length > 0
            &&
            this.modelConfiguration.dataSets.filter(x => x.isSelected).length === 0) {
            this.modelConfiguration.dataSets[0].isSelected = true;
            this.modelConfiguration.selectedDataSet = this.modelConfiguration.dataSets[0].csvPath;
          }
          const model = selectModel(this.modelConfiguration);
          model.modelName = this.createProject.controls['modelName'].value;
          this.modelConfiguration.projectName = this.createProject.controls['projectName'].value;
          this.modelService.model = Observable.of(this.modelConfiguration);
          this.wizardService.activeTab.next(1);
          localStorage.setItem("configModel",JSON.stringify(this.modelConfiguration));
          this.router.navigate(['crsmodel/features']);
        });
    }
  }
  }
  fileUploadChange(e) {
    this.filesToUpload = new FormData();
    this.uploadedFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      this.filesToUpload.append('files', e.target.files[i]);
    }
    if (e.target.files && e.target.files.length > 0) {
      for (const file of e.target.files) {
        this.uploadedFiles.push(file.name);
      }
    }
  }
  moveback() {
    // this.location.back();
    this.router.navigate(['crsmodel/model']);
  }
}
