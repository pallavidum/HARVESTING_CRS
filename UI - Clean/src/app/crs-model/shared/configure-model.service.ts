import { Injectable, setTestabilityGetter } from '@angular/core';
import { ConfigureModel, Column, MlTaskResult, AIEModel } from './configure-model';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class ConfigureModelService {
  private _model: Observable<ConfigureModel>;
  private _currentModelaConfiguraion : Observable<ConfigureModel>;

  private configureModel: ConfigureModel = new ConfigureModel();
  private selectedModelIndex: number = -1;
  constructor(private http: HttpClient, private http1:HttpClient) {
    this._model = Observable.of(new ConfigureModel());
  }

  saveModel(modelConfiguration: ConfigureModel): Observable<any> {
    return this.http.post('/ml/submit', modelConfiguration);
  }
  get model(): Observable<ConfigureModel> {
    return this._model;
  }
  set model(__model: Observable<ConfigureModel>) {
    this._model = __model;
  }

  get currentdModelConfiguration(): Observable<ConfigureModel>{
    return this._currentModelaConfiguraion
  }

  set currentModelConfiguration(_selectedModelaConfiguraion : Observable<ConfigureModel>){
    this._currentModelaConfiguraion = _selectedModelaConfiguraion;
  }

  deleteProjectName(projectId: string, excelPath: string): Observable<boolean>{
      return this.http.post<boolean>('/project/deleteProject',{ projectId, excelPath });
  }

  getModelIndex(): Observable<number> {
    if (this.selectedModelIndex === -1) {
      return Observable.of(this.configureModel.models.length - 1);
    } else {
      return Observable.of(this.selectedModelIndex);
    }
  }
  setModelIndex(index: number): Observable<boolean> {
    this.selectedModelIndex = index;
    return Observable.of(true);
  }
  getModelConfiguration(): Observable<ConfigureModel> {
    if (this.configureModel.projectName !== undefined) {
      return Observable.of(this.configureModel);
    } else {
      //this.router.navigate(['/pages/configuremodel/create']);
    }
    return Observable.of(new ConfigureModel());
  }
  setModelConfiguration(config: ConfigureModel): Observable<boolean> {
    try {
      this.configureModel = config;
      return Observable.of(true);
    } catch (ex) {
      return Observable.of(false);
    }
  }

  getMSPPrice(district:string,crop:string): Observable<any>{
    let params1 = new HttpParams().set('district',district).set('crop',crop);
    return this.http.get('/project/getMSPPrice',{params:params1});
  }

  getNearestMarkets(lng:string,lat:string): Observable<any>{
    let params1 = new HttpParams().set('lat',lat).set('lng',lng);
    return this.http.get('/project/getNearestMarkets',{params:params1});
  }

  getNearestPostOffices(lng:string,lat:string): Observable<any>{
    let params1 = new HttpParams().set('lat',lat).set('lng',lng);
    return this.http.get('/project/getNearestPostOffices',{params:params1});
  }

  checkProjectName(projectName: string): Observable<boolean> {
    let params = new HttpParams().set('projectName', projectName);
    return this.http.get<boolean>('/project/checkProjectName',{params:params});
  }

  getCropDta(state: string,district: string,crop:string):Observable<any>{
    return this.http.get<any>('/project/getCropData/'+state+'/'+district+'/'+crop);
  }

  getCropDataForGraph(state: string,district: string,crop:string):Observable<any>{
    return this.http.get<any>('/project/getCropDataForGraph/'+state+'/'+district+'/'+crop);
  }

  getMSPDta(state: string,district: string):Observable<any>{
    return this.http.get<any>('/project/getMSPData');
  }

  getModels(): Observable<ConfigureModel[]> {
    return this.http.get<ConfigureModel[]>('/ml');
  }

  getAIEModel(): any{
    return this.http.get('/ml/AIEData');
  }

  getFarmerData(id:number):Observable<any>{
    let params = new HttpParams().set('id', id.toString());
    return this.http.get('/ml/getFarmerData',{params: params});
  }

  getFarmdata(csvPath:string):Observable<any>{
    let params = new HttpParams().set('fileName', csvPath);
    return this.http.get('/getFarmData',{params: params});
  }

  uploadFile(payLoad: any) {
    return this.http.post<any>(`/upload`, payLoad);
  }
  /*
  featureInfo(type: number, columnName: string, csvPath: string, predictionColumn: string): Observable<any> {
    return this.http.post(`/ml/featureinfo`,
      { url: csvPath, columnName, type, predictionColumn });
  }*/
  featureType(csvPath: string): Observable<any> {
    return this.http.post(`/ml/featuretype`, {url: csvPath}).map((res:Response) => res);
  }
  combineUserAie(csvPath: string): Observable<any> {
    return this.http.post(`/ml/combineuseraie`, {url: csvPath});
  }
  featureInfo(columnName: string, csvPath: string, predictionColumn: string): Observable<any> {
    return this.http.post(`/ml/featureinfo`,
      { url: csvPath, columnName,predictionColumn });
  }
  featureInfoTyped(columnName: string, featureType: Number, csvPath: string, predictionColumn: string): Observable<any> {
    return this.http.post('/ml/featureinfotyped',
      { url: csvPath, columnName, featureType, predictionColumn });
  }
  executeML(csvPath: string, testingSetRatio: number, algoName: string): Observable<MlTaskResult> {
    const payLoad = { csvPath, testingSetRatio };
    return this.http.post<MlTaskResult>(`/ml/${algoName}`, payLoad);
  }

  getLocationDetails(lat,lon):Observable<any>{
    return this.http1.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lon+','+lat+'&intercept=1');
  }
}
