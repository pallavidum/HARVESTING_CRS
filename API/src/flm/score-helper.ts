

export class farmerScore{
    score = 0;
    getFarmerScore(farmerData){
        this.score = 0;
        let features = JSON.parse(farmerData.data);  
        this.calculateNationalIdScore(this.evaluateNationId(features));
        this.calculateNameScore(this.evaluateName(features));
        this.calculateCollateralScore(this.evaluateCollateralPercentage(features));
        this.calculatePhoneNumberScore(this.evaluatePhoneNumber(features));
        this.calculatePesticideScore(this.evaluateApplicationPesticides(features));
        this.calculateFertilizerScore(this.evaluateFertilizerManure(features)); 
        this.calculateAgeScore(this.evaluateAge(features));
        this.calculateWeedControlScore(this.evaluateWeedControl(features));
        this.calculateSoilTypeScore(this.evaluateSoilType(features));
        this.calculateLoanAcreScore(this.evaluateLoanPerAcre(features));
        let weight = this.getMetroScoreWeight(features);
        this.score = weight*this.score + (features['Metro Score '] ? this.calculateMetroScore(features['Metro Score ']) : 0);
        return this.score;
     }

    getMetroScoreWeight(features){
        if(features['Metro Score ']){
        if(features['Metro Score '].toString().trim() == 'NR'){
            return 0.10;
        }
        else return 0.05;
        }
        else return 0.05;
    }

    evaluateNationId(features){
       if(features['National ID'].toString().trim() != ''){
           return 'Yes'
       }
       else{
           return 'No';
       }
    }

    evaluateName(features){
       let nameElements = features['farmerName'].split(' ');
       let metroPolElements = features['Names as per Metropol'].split(' ');
       let matchCount = 0;
       let nameValue = 'No';
       nameElements.forEach(name => {
           metroPolElements.forEach(metropol => {
                if(metropol.toLowerCase() == name.toLowerCase()) matchCount++;
                if(matchCount == 2) nameValue = 'Yes';
           });
       });
       return nameValue;
    }

    evaluateCollateralPercentage(features){
       return (features['required_cash_collateral']/features['order_value'])*100;
    }

    evaluatePhoneNumber(features){
        if(features['phone_number'].toString().trim() != ''){
            return 'Yes'
        }
        else{
            return 'No';
        }
    }

    evaluateApplicationPesticides(features){
        return features['Application of Pesticides'].toString().trim() != '' ?  features['Application of Pesticides'] : 'No'
    }

    evaluateFertilizerManure(features){
        return features['Use of Fertilizer or Manure'];
    }

    evaluateAge(features){
        if(features['DOB']){
            if(features['DOB'].toString().match(/\d+/g).length == 1){
               return ((new Date()).getFullYear() - new Date((Number(features['DOB']) - (25567 + 1))*86400*1000).getFullYear()).toString();
            }
            else{
                return ((new Date()).getFullYear() - Number(features['DOB'].toString().match(/\d{4}/g)[0])).toString();
            }
        }
        else return '10';
    }

    evaluateWeedControl(features){
        return features['Weed control'].toString().trim();
    }

    evaluateSoilType(features){
        return features['Soil Type'].toString().trim();
    }

    evaluateLoanPerAcre(features){
        return features['order_value']/features['Land Size (Acres)'];
    }

    calculateNationalIdScore(value){
        switch(value)
        {
            case 'Yes' : this.score = this.score+200;
                        break;
            case 'No' : this.score = this.score-500;
                        break;
            default : this.score = this.score-500;
                      break;
        }
    }

    calculateNameScore(value){
        switch(value)
        {
            case 'Yes' : this.score = this.score+200;
                        break;
            case 'No' : this.score = this.score-500;
                        break;
            default : this.score = this.score-500;
                      break;
        }
    }

    calculateCollateralScore(value){
        let percentage = Number(value);
        if(percentage > 0 && percentage <=10){
            this.score = this.score-200
        }
        else if(percentage > 10 && percentage <=20){
            this.score = this.score+0
        }
        else if(percentage > 20 && percentage <=30){
            this.score = this.score+100
        }
        else if(percentage > 30 && percentage <=40){
            this.score = this.score+200
        }
        else if(percentage > 40 && percentage <50){
            this.score = this.score+300
        }
        else if(percentage>=50){
            this.score = this.score+400
        }
    }

    calculatePhoneNumberScore(value){
        switch(value){
            case 'Yes' : this.score = this.score + 100;
                         break;
            case 'No' : this.score = this.score - 100;
                        break;
            default : this.score = this.score - 100;
                      break;
        }
    }

    calculatePesticideScore(value){
        switch(value.toLowerCase()){
            case 'yes' : this.score = this.score + 200;
                         break;
            case 'No' : this.score = this.score - 200;
                        break;
            default : this.score = this.score - 200;
        }
    }

    calculateFertilizerScore(value){
        switch(value.toString()){
            case 'Fertilizer' : this.score = this.score+200;
                                break;
            case 'Manure' : this.score = this.score+300;
                            break;
            case 'manure & fertilizer': this.score=this.score+500;
                            break;
        }
    }

    calculateAgeScore(value){
         let age = Number(value);
         if(age>=10 && age<20){
             this.score = this.score - 100;
         }
         else if(age>=20 && age<30){
             this.score = this.score + 200;
         }
         else if(age>=30 && age<40){
             this.score = this.score + 300;
         }
         else if(age>=40 && age<50){
             this.score = this.score + 300;
         }
         else if(age>=50 && age<60){
            this.score = this.score + 200;
        }
        else if(age>=60 && age<70){
            this.score = this.score + 100;
        }
    }

    calculateWeedControlScore(value){
        switch(value){
            case 'Hand' : this.score = this.score -100;
                           break;
            case 'Farm Tools' : this.score = this.score + 100;
                                break;
            case 'Hand & Farm tools' : this.score = this.score + 50;
                                        break;
        }
    }

    calculateSoilTypeScore(value){
        switch(value){
            case 'Black Cotton' : this.score = this.score + 100;
                                   break;
            case 'Red Soil' : this.score = this.score + 50;
                            break;
            default : break;
        }
    }

    calculateLoanAcreScore(value){
        if(value<=200) this.score = this.score+300;
        else if(value>2000 && value<=4000) this.score = this.score + 200;
        else if(value>4000 && value<=6000) this.score = this.score + 100;
        else if(value>6000 && value<=8000) this.score = this.score + 50;
        else if(value>8000 && value<=10000) this.score = this.score -50;
        else if(value>10000 && value<=12000) this.score = this.score -100;
        else if(value>12000 && value<=14000) this.score = this.score - 120;
        else if(value>16000 && value<=18000) this.score = this.score - 140;
        else if(value>18000 && value<=20000) this.score = this.score - 180;
        else if(value>20000) this.score = this.score - 200;
    }

    calculateMetroScore(value){
        if(value == 'NR'){
            return 0;
        }
        else{
            return value*0.5;
        }
    }


}

