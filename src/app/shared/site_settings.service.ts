
export class SiteSettingsService{

    constructor() {}

    convertDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }



    convertToArray(number) {
        return new Array(number);
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key)){
              if(!obj[key]) {
                  return false;
              } else {
                  return true;
              }
                
            }
        }
    }

    jsonToStr(jsonData) {
        return JSON.stringify(jsonData);
    }

    strToJosn(jsonString) {
        return JSON.parse(jsonString);
    }

    getDateInYears(num: number) {
        const date = new Date();
        date.setFullYear(date.getFullYear() - num);
        return date;
      }
 
    saveDataInLocalStorage(data) {
        //NOTE: data has $key & value

    }
}