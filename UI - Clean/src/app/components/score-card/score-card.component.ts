import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { selectModel } from 'app/crs-model/shared/extensions';
import { ConfigureModelService } from 'app/crs-model/shared/configure-model.service';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {
  NearestMarkets : distanceModel[];
  NearestPostOffices : distanceModel[];
  cropStats:any;
  farmerDetail: any;
  reportScoreColor: string;
  reportScore: number;
  @Input('data') data: number[];
  @Input('csvPath') csvPath: string;
  fileName: string;
  district: string;
  state: string;
  country: string;
  showDialog : boolean = false;
  minScore : number;
  maxScore : number;
  scores:number[] = [];
  scoreCardList : scoreCardModel[] =  [];
  ranges:number[] = [];
  colors : string[] = ['rgb(230,47,45)', 'rgb(231,71,44)', 'rgb(234,122,38)', 'rgb(216,169,15)', 'rgb(145,186,1)', '#88BD5B'];
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  constructor(private configServeice:ConfigureModelService,private http:HttpClient) { }


  ngOnInit() {
    console.log(this.csvPath);
    let fileElements = this.csvPath.split('/');
    this.fileName = fileElements[fileElements.length-1];
    console.log(fileElements[fileElements.length-1]);
    this.NearestPostOffices = [];
    this.NearestMarkets = [];
    this.cropStats = 0;
    this.farmerDetail = 0;
    this.maxScore = Math.max(...this.data);
    this.minScore = Math.min(...this.data);
    var totalRange = this.maxScore - this.minScore;
    var bracket = totalRange/5;
    var temp = this.minScore+bracket;
    
    for(var i=0;i<5;i++){
       if(i>0 )temp = temp+bracket;
       this.ranges.push(temp);
    }
    let initLength = (this.data.length > 500) ? 500 : this.data.length
    for(var i=0;i<initLength;i++){
      this.scoreCardList.push({
        score : this.data[i],
        backColor : this.scoreColor(this.data[i]),
        name : '***** *****',
        id : i+1
      });
    }
  }
 onFamerselected(id,scoreColor,score){
   window.open("/crsmodel/tdp/"+id+"/"+score,"_blank")
  //  this.showDialog = !this.showDialog;
  //  this.NearestPostOffices = [];
  //  this.NearestMarkets = [];
  //  this.cropStats = 0;
  //  this.farmerDetail = 0;
  //  this.district = '';
  //  this.state ='';
  //  this.country = '';
  //  this.reportScoreColor = 'radial-gradient(#e2e2e2,'+scoreColor+')';
  //  this.reportScore = score;
  //  this.configServeice.getFarmerData(id).subscribe(x=>{
  //    this.farmerDetail = x;
  //    this.farmerDetail.estimatedINR = "-";
  //    this.configServeice.getCropDta(this.farmerDetail.state,this.farmerDetail.district,this.farmerDetail.cropType).subscribe(y=>{
  //      this.cropStats = y;
  //   });
  //   this.configServeice.getNearestMarkets(this.farmerDetail.lat,this.farmerDetail.lon).subscribe(res=>{
  //      res.forEach(element => {
  //        this.NearestMarkets.push({
  //           distance : parseInt(element.dis),
  //           location : element.obj.Market + ',' + element.obj.District + ',' + element.obj.State
  //        });
  //      });
  //   });
  //   this.configServeice.getNearestPostOffices(this.farmerDetail.lat,this.farmerDetail.lon).subscribe(res=>{
  //     res.forEach(element => {
  //       this.NearestPostOffices.push({
  //          distance : parseInt(element.dis),
  //          location : element.obj.OfficeName + ','  + element.obj.District + ',' + element.obj.State
  //       });
  //     });
  //  });
  //  this.configServeice.getMSPPrice(this.farmerDetail.district.replace(' ','').replace(' ',''),this.farmerDetail.cropType).subscribe(price=>{
  //       console.log(price);
  //       if(price!=null)
  //       {
  //       this.farmerDetail.estimatedINR = price.mspData.min_price;
  //       }
  //  })
  //  });
 }

  onScrollDown(){
    var length = this.scoreCardList.length-1;
    let newItemsLength = 0;
    newItemsLength =  (this.data.length - this.scoreCardList.length <= 300) ? (this.data.length - this.scoreCardList.length + 1) : 300
    for(var i=length;i<(length+newItemsLength);i++){
      this.scoreCardList.push({
        score : this.data[i],
        backColor : this.scoreColor(this.data[i]),
        name : '***** *****',
        id : i+1
      });
    }
  }

  updateRanges(values){
    this.ranges = values;
    this.scoreCardList.forEach(x=>x.backColor = this.scoreColor(x.score))
  }

  onUp(){
    console.log('scrolled up hurray!');
  }

  scoreColor(score: number) {
    if (score <= this.ranges[0]) {
      return this.colors[0];
    } else if (score <= this.ranges[1]) {
      return this.colors[1];
    } else if (score <= this.ranges[2]) {
      return this.colors[2];
    } else if (score < this.ranges[3]) {
      return this.colors[3]
    }else if (score < this.ranges[4]) {
      return this.colors[4]
    }else{
      return 'green';
    }
    
  }

  downloadExcel1(){
    let downloadData : any[] = [];
    for(let i=0;i<this.scoreCardList.length;i++){
      downloadData.push({
        id : this.scoreCardList[i].id,
        Name : this.scoreCardList[i].name,
        Score :  this.scoreCardList[i].score
      })
    };
    const ws_name = 'ScoreCard';
    const wb: XLSX.WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = XLSX.utils.json_to_sheet(downloadData);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      };
      return buf;
    }

    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'ScoreCard_export_' + new Date().getTime()+'.xlsx');
    
  }

  downloadExcel(){    
    let downloadData : any[] = [];
    for(let i=0;i<this.scoreCardList.length;i++){
        downloadData.push({
          id : this.scoreCardList[i].id,
          Name : this.scoreCardList[i].name,
          Score :  this.scoreCardList[i].score
        })
    };
    this.exportAsExcelFile(downloadData,'ScoreCard');
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log(worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['ScoreCard'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', bookSST:false, type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

   public s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    };
    console.log(buf);
    return buf;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([this.s2ab(buffer)], {
      type: EXCEL_TYPE
    });
    console.log(data);
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}

interface distanceModel{
  distance: number;
  location: string;
}

interface scoreCardModel{
  score:any;
  name:any;
  id:any;
  backColor:any;
}
