

export class Utill {
    static isNotificationShown=false;
    static isNotificationShown_analyst=false;
    static date: string;
    static FROMDATE: string;
    static TILLDATE: string;
    static CALIBRATION: string;

    // static MAX_NUMBER_OF_POINTS_ICONTROL: number = AppConfigServiceService.MAX_NUMBER_OF_POINTS_ICONTROL; //20
    // static MAX_NUMBER_OF_POINTS_FTEST: number = AppConfigServiceService.MAX_NUMBER_OF_POINTS_FTEST;
    // static MIN_NUMBER_OF_POINTS_FTEST: number = AppConfigServiceService.MIN_NUMBER_OF_POINTS_FTEST;
    // static MIN_NUMBER_OF_POINTS_FTEST_ENABLE: number = AppConfigServiceService.MIN_NUMBER_OF_POINTS_FTEST_ENABLE;
    // static MAX_LENGT_OF_COLUMN_INSIDE_TABLE = AppConfigServiceService.MAX_LENGT_OF_COLUMN_INSIDE_TABLE;
    // static MAX_LENGT_OF_COLUMN_RETEST_COMMENTS = AppConfigServiceService.MAX_LENGT_OF_COLUMN_RETEST_COMMENTS;
    // static MAX_PERCENTAGE_OF_POINTS_CAN_EXCLUDE = AppConfigServiceService.MAX_PERCENTAGE_OF_POINTS_CAN_EXCLUDE;
    static monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    static getDateAndTime(): string {
        let date: Date = new Date();
        var month = '' + ('0' + (date.getMonth()+1)).slice(-2);
        var day = '' +('0' +(date.getDate())).slice(-2);
        var year = date.getFullYear();
        // //////console.log("Date = " + date);
        // //////console.log(year+ '-' + month+ '-' + day+ ' ' + date.getHours() + ':' + date.getMinutes());
        return year + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
    }
    static getTime(): string {
        let date: Date = new Date();
        return date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
    }
    static getDateAndTimeForChart(): string {
        let date: Date = new Date();
        var month = '' + ('0' + (date.getMonth()+1)).slice(-2);
        var day = '' +('0' +(date.getDate())).slice(-2);
        var year = date.getFullYear();
        // //////console.log("Date = " + date);
        // //////console.log(year+ '-' + month+ '-' + day+ ' ' + date.getHours() + ':' + date.getMinutes());
        return year + '-' + month + '-' + day;
    }
    static getDateAndTimeV2(): string {
        let date: Date = new Date();
        var month = '' + ('0' + (date.getMonth()+1)).slice(-2);
        var day = '' +('0' +(date.getDate())).slice(-2);
        var year = date.getFullYear();
        // //////console.log("Date = " + date);
        // //////console.log(year+ '-' + month+ '-' + day+ ' ' + date.getHours() + ':' + date.getMinutes());
        return year + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes();
    }
    static getDateAndMonthName(date: string) {
        // //////console.log(date);
        const d = new Date(date);
        return d.getDate() + "-" + this.monthNames[d.getMonth()] + "-" + d.getFullYear();
    }
    static getCurrentDateAndMonthName() {
        // //////console.log(date);
        const d = new Date();
        return d.getDate() + "-" + this.monthNames[d.getMonth()] + "-" + d.getFullYear();
    }
    static getDateAndMonthNameForInterlabDashboard(date: string) {
        const d = new Date(date);
        return this.monthNames[d.getMonth()] + "-" + d.getFullYear();
    }
    static getDate(): string {
        let date: Date = new Date();
        var month = '' + ('0' + (date.getMonth()+1)).slice(-2);
        var day = '' +('0' +(date.getDate())).slice(-2);
        var year = date.getFullYear();
        // //////console.log(year + '-' + month + '-' + day);
        return year + '-' + month + '-' + day;
    }

    static getDateForCharts(idate: string, icrementOrDec: number): string {
        let date: Date = new Date(idate);
        var month = '' + (date.getMonth() + 1);
        var day;
        if (icrementOrDec == 1) {
            day = date.getDate() + 1;
        } else {
            day = date.getDate() - 1;
        }
        var year = date.getFullYear();
        // //////console.log(year + '-' + month + '-' + day);
        return year + '-' + month + '-' + day + " " + date.getHours() + ':' + date.getMinutes();
    }

    static getDateFormat(min_date: string): string {
        let date: Date = new Date(min_date);
        var month = '' + ('0' + (date.getMonth()+1)).slice(-2);
        var day = '' +('0' +(date.getDate())).slice(-2);
        var year = date.getFullYear();
        // //////console.log(year + '-' + month + '-' + day);
        return month + '/' + day + '/' + year;
    }
    static getOldDateFormat(months: number, type: number): string {
        let date: Date = new Date();
        if (type == 1) {//years old
            date.setFullYear(date.getFullYear() - months);
        } else if (type == 2) {//months old
            date.setMonth(date.getMonth() - months);
        }
        else if (type == 3) {//days old
            date.setDate(date.getDate() - months);
        }
        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();
        // //////console.log(year + '-' + month + '-' + day);
        return day + '-' + this.monthNames[month] + '-' + year
        // return  month+'/'+ +'/'+year;
    }
    static getOldDateInDBFormat(months: number, type: number): string {
        let date: Date = new Date();
        if (type == 1) {//years old
            date.setFullYear(date.getFullYear() - months);
        } else if (type == 2) {//months old
            date.setMonth(date.getMonth() - months);
        }
        else if (type == 3) {//days old
            date.setDate(date.getDate() - months);
        }
        var month = '' + (date.getMonth() + 1);
        var day = '' + date.getDate();
        var year = date.getFullYear();
        // //////console.log(year + '-' + month + '-' + day);
        return year + '-' + month + '-' + day;
    }

    static generateUniqueBatchID(userid: number, userip: string) {
        let date: Date = new Date();
        var month = '' + (date.getMonth() + 1);
        var day = '' + date.getDate();
        var year = date.getFullYear();
        return year + month + day + date.getUTCHours() + date.getUTCMinutes() + date.getUTCSeconds() + date.getUTCMilliseconds() + userid + userip;
    }

    static generateUniqueFilenmae(filename: string): string {
        let date: Date = new Date();
        var month = '' + (date.getMonth() + 1);
        var day = '' + date.getDate();
        var year = date.getFullYear();
        const d = new Date(date);
        let filesubport = d.getDate() + "-" + this.monthNames[d.getMonth()] + "-" + d.getFullYear();
        // return filename + "_" + filesubport + "_" + date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds() + "_" + date.getMilliseconds();
        return filename
    }
    static getMaxExculdepoints(totalpoints, percentage) {
        return Math.round((totalpoints * percentage) / 100);
    }
    static mean(data) {
        var sum = data.reduce(function (sum, value) {
            return sum + value;
        }, 0);
        var avg = sum / data.length;
        return avg;
    }
    static caluculateUCL(dev: number, mean: number) {
        return mean + (3 * dev);
    }
    static caluculateLCL(dev: number, mean: number) {
        return mean - (3 * dev);
    }
    static standardDeviation(values: number[]) {
        var avg = this.mean(values);
        var squareDiffs = values.map(function (value) {
            var diff = value - avg;
            var sqrDiff = diff * diff;
            return sqrDiff;
        });
        var avgSquareDiff = this.mean(squareDiffs);
        var stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
    }
    static caluculateUCLMR(dev: number, mean: number) {
        return mean + (3.27 * dev);
    }

    static caluculateUCLSec(mean: number, stdDev: number, latestpointPos: number) {
        // //////console.log(mean);
        // //////console.log(stdDev);
        // //////console.log(latestpointPos);
        let ucl=mean + (3 * stdDev * (Math.sqrt(latestpointPos / (latestpointPos - 1))))
        // //////console.log(ucl);
        return ucl;
    }
    static caluculateLCLSec(mean: number, stdDev: number, latestpointPos: number) {
        // //////console.log('m::'+mean);
        // //////console.log('d::'+stdDev);
        // //////console.log('p::'+latestpointPos);
        // //////console.log('ms::'+Math.sqrt(latestpointPos / (latestpointPos - 1)));
        let lcl=mean - (3 * stdDev * (Math.sqrt(latestpointPos / (latestpointPos - 1))));
        // //////console.log(lcl);
        return lcl;
    }
    static caluculateMeanSec(points: any) {        
        let cpoints = points.splice(0, (points.length - 1));
        // //////console.log(cpoints);
        return this.mean(cpoints);
    }

    static getDateFormatForPicker(idate: string): string {
        let date: Date = new Date(idate);
        var month = '' + ('0' + (date.getMonth()+1)).slice(-2);
        var day = '' +('0' +(date.getDate())).slice(-2);
        var year = date.getFullYear();
        // //////console.log(year + '-' + month + '-' + day);
        return day + '-' +  month+ '-' + year;
    }

    static getDateCRMFreqValid(idate:any,days:any){
        var date = new Date(idate);
        date.setDate(date.getDate() + days);
        // let date: Date = new Date();
        var month = '' + ('0' + (date.getMonth()+1)).slice(-2);
        var day = '' +('0' +(date.getDate())).slice(-2);
        var year = date.getFullYear();
        // //////console.log("Date = " + date);
        // //////console.log(year+ '-' + month+ '-' + day+ ' ' + date.getHours() + ':' + date.getMinutes());
        return year + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();

    }
}