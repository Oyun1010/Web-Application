let calendar = document.getElementById("calendar");

const date = new Date();


let currentYear = date.getFullYear();
let currentMonth = date.getMonth() + 1;
let selectYear = document.createElement("p");
let selectMonth = document.createElement("p");
let output = "";
function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
} 
console.log("daysInMonth " + daysInMonth(currentYear, currentMonth));
console.log("date " + date.getDate());
console.log("date " +  new Date(2022, 10, 0).getDay());
function prevBtn() {  
    output = "";
    if(currentMonth == 1) {
         currentYear--;
         currentMonth = 12;
    }
    else { 
        currentMonth --;
    }    
    calendar.innerHTML = calen();      
}
function nextBtn() {
    output = "";
    console.log("year "+ currentYear);
    console.log("month " + currentMonth);
    if(currentMonth > 11) {
        currentYear++;
        currentMonth = 1;
    }
    else {
        currentMonth++;
    }    
    calendar.innerHTML = calen();
}
console.log("hhh" + date.getDay());

function calen() {
    let weekName = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    output += 
        "<thead>" + 
            "<tr>" + 
                "<th colspan = '7'>" + 
                    "<div>Calendar</div>" +
                "</th>" + 
            "</tr>" + 
        "</thead>";
    console.log("year month : " + currentYear + " " + currentMonth);

    output += 
        "<tr class = 'row0'>" + 
            "<td>" + 
                "<button class = 'btn' onclick = 'prevBtn()'><img src='icon/back.png' width='20px' height=20px></button>" + 
            "</td>" +
            "<td colspan = '5'>" + 
                "<p>" + currentYear + " оны " + currentMonth + "-р сар "  + "</p>"+
            "</td>" +
            "<td>" +
                "<button class = 'btn' onclick = 'nextBtn()'><img src='icon/next.png' width='20px' height=20px></button>" + 
            "</td>"
        "</tr>" 
   
    output += "<tr class = 'weekName'>" 

    for(let i = 0; i < weekName.length; i++) {
        output += "<td>" + weekName[i] + "</td>";
       
    }
  
    let startDay = 7 - new Date(currentYear, currentMonth, 0).getDay();
    console.log("startday:  " + startDay);
    console.log("current month : " + currentMonth);
    console.log("get Month :" + new Date(currentYear, currentMonth - 1, 0).getMonth());
    console.log("get day :" + new Date(currentYear, currentMonth - 1, 0).getDay());
    console.log("get date :" + new Date(currentYear, currentMonth - 1, 0).getDate());
    output += "</tr>"
    console.log("days in month " + daysInMonth(currentYear, currentMonth) );

    let val =  daysInMonth(currentYear, currentMonth - -1) -  startDay;
    console.log("val:  " + val);
    let val2 = 0;
    let val3 = 0;

    for(let i = 0; i < 6;  i++) {
        output += "<tr>";      
        for(let j = 0; j < 7; j++) {
            if(i == 0 && j < startDay) {                            
                output += "<td class = 'passDay'>" + val + "</td>";  
                if(val > daysInMonth(currentYear, currentMonth))  {
                  //val = daysInMonth(currentYear, currentMonth - 1);
                }
                else {
                   val++; 
                }                
            }
            else {
                val2++;
                if(val2 == date.getDate() && currentMonth == date.getMonth()) {
                    console.log("val " + val2);
                    output += "<td class = 'nowDay'>" + val2 + "</td>"; 
                } 
                else if(val2 > daysInMonth(currentYear, currentMonth)) {               
                    val3 ++;
                    output += "<td class = 'passDay'>" + val3 + "</td>";     
                } 
                else {
                     output += "<td class = 'activeDay'>" + val2 + "</td>";
                }                            
            }                             
        }          
        output += "</tr>"
    }
    return output;
}
calendar.innerHTML  =  calen();