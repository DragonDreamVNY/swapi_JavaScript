// document.addEventListener("DOMContentLoaded", init, false);

/*
Uses SWAPI-Wrapper JavaScript API by Raymond Camden (cfjedimaster)
Available: https://swapi.co/documentation#javascript and https://github.com/cfjedimaster/SWAPI-Wrapper 

Extra reference: on accessing the SWAPI data http://tomadmz.com/SWAPI/page1.html

Background:
1. Get array of Starships[] array from JSON, from SWAPI endpoint.
2. Loop through each Starship in array
2.i) There are 37 Starships on different pages.
     Therefore need to loop through the pages as well
3. the logic...
    Loop through each Starship in Array
    starship[i].MGLT 
    starship[i].consumables 
        switch cases "days" | "week" | "weeks" | "month" | "months" | "years"
    do math..
    return Table with Answers

4. the math...
    MGLT is measured per hour
    eg. Millenium Falcon is 75 MGLT. => 1800 MGLT per day   (24 hours in Earth day)
        Carries 2 months consumables => 60 days             (approx)
        1800 * 60 = 108,000 MGLT per rest stop              (if not carrying cargo)

        Total Distance to travel (input) => 1,000,000 MGLT
        1000000 / 108000 = 9.25 Rest Stops 
5. Show Reload Button to enter new value
*/ 

// function init() {
//     console.log("init");


$(document).ready(function(){
    
    
    $('#buttonMGLT').on('click', function(event) {
        event.preventDefault(); // To prevent following the link (optional)
        // console.log("The button was clicked.");
        getStarShipData();
      });

      $('#megaLightInput').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            event.preventDefault(); // don't reload page due to Submit action
            console.log('pressed "enter" key in textbox');
            getStarShipData();
        }
    });

function getStarShipData() {    
    console.log("submitted");
    //get all starships
    swapiModule.getStarships(function(data) {
        console.log("Result of getStarships", data);
    });

    //get all starships, page 2
    // swapiModule.getStarships(2, function(data) {
    //     console.log("Result of getStarships (page 2)", data);
    // });

    //get all starships, page 3
    // swapiModule.getStarships(3, function(data) {
    //     console.log("Result of getStarships (page 2)", data);
    // });

    //get one starship (assumes 2 works)
    // swapiModule.getStarship(2,function(data) {
    //     console.log("Result of getStarship/2", data);
    // }); //CR90 corvette

    
    /* ---
    * Returns the number of days a starship's consumables will last
    * for use in calculating number of rest stops
    * note: MGLT is the speed, measured per hour. Assuming 24 hours in a day.
    */
    function convertConsumables(shipName,sStarshipConsumables){
        // init variables
        var nValue = 0;
        var sThisAmount = "";

        nValue =  parseInt( sStarshipConsumables.substr(0,1) ); // get the number
        sTimeSpan = sStarshipConsumables.substr(2); // get the timespan after the number
        // console.log(shipName);
        // console.log("timespan:" + nValue + " " + sTimeSpan);
        switch(sTimeSpan) {
            // case "days":
            //     nValue = nValue*1; // n number of days
            //     break;
            case "unknown":
                nValue = 0; // remember to check for this in the Math section 
                console.log("unkown value for consuble");
                break;
            case "week":
                nValue = nValue*7; // 7 days
                // console.log("week (* 7) \n---");
                // console.log(nValue);
                break;
            case "weeks":
                nValue = nValue*7; // 7 days
                // console.log("WEEKs (* 7) \n---");
                break;
            case "month":
                nValue = nValue*30; // 30 days
                // console.log("month (* 30) \n---");
                break;
            case "months":
                nValue = nValue*30; // ie. 2 months is 60 days
                // console.log("MONTHs (* 30) \n---");
                break;
            case "year":
                nValue = nValue*365; // 365 Earth days
                break;
            case "years":
                nValue = nValue*365; //ie. 2 years is 700 Earth days
                break;
            default:
                nValue = nValue; // else default is days
                // console.log("DAY : " + nValue);
        }
        // console.log("timespan : " + sTimeSpan);
        // console.log("converted : " + nValue);
        return nValue; // return daily MGLT
    } // end convertConsumables()

    //  handle if number
    function checkIsNumber(o){
        return typeof o == "number" || (typeof o == "object" && o["constructor"] === Number);
    }

    var $tableBody = $('<tbody></tbody>');  // new content jQuery. Start Table Body.

    // Go to each page, Starship array count is 37. But console log shows array of 10 Starship objects
    // there are 4 pages  ( https://swapi.co/api/starships/?page=4 )
    for (j=1; j<5; j++ ){
        (function(i) { //need to create closure for j
            var page = i; 

        // returns JSON parsed responseText from request...
        swapiModule.getStarships(page, function(data) {
            var starshipsObj = data;
            // var myStarshipString =JSON.stringify(starshipsObj);
            // console.log(myStarshipString);
            var output = "";
            var numOfStarShips = starshipsObj.results.length; 
            // console.log("number of starships : "+numOfStarShips); // 10
        
            // for (thisShip in starshipsObj) { // only returns 4 ships?
            //     // output += thisShip + ' : ' + starshipsObj.results.name+'\n';
            //     // console.log(output);
            //     console.log("test number of ships");
            // }

            for ( var k=0; k<numOfStarShips; k++ ) {
                // console.log("test for ships length");
                var shipName = starshipsObj.results[k].name;
                var consumables = starshipsObj.results[k].consumables;

                var numberOfDaysConsumables = convertConsumables(shipName,consumables);
                
                var megalights = starshipsObj.results[k].MGLT;  // per hour 
                var dailyMGLT = megalights*24;

                var totalDistancePerRecharge = numberOfDaysConsumables*dailyMGLT;
                
                var output = "=========\n";
                output = "Starship: " + shipName;
                
                if( isNaN(numberOfDaysConsumables) ) {
                    output += "\nconsumables: UNKOWN";
                    numberOfDaysConsumables = "-";
                }else{
                    output += "\nconsumables: " + numberOfDaysConsumables + "days";
                }

                if( isNaN(megalights) ) {
                    output += "\nMGLT: UNKOWN"
                    + "\nTotal Distance Per Refuel: UNKNOWN";
                    dailyMGLT = "UNKOWN";
                    megalights = "UNKOWN";
                } else{
                    output += "\nMGLT: " + megalights;
                    + "\tDailyMGLT: " + dailyMGLT
                    + "\nTotal Distance Per Refuel: " + totalDistancePerRecharge
                }
                

                // var maxMGLT = 1000000;
                // console.log("\nIs Number??\n" + checkIsNumber(maxMGLT));
                var maxMGLT = $('#megaLightInput').val();
                
                var restStops =  Math.round(maxMGLT/totalDistancePerRecharge);
                // console.log("Is Number??\n" + (typeof restStops));
                if ( !isNaN(restStops)){ // it IS a number
                    output += "\nRest Stops : " + restStops + "\n";
                } else {
                    console.log("UNKOWN number of Rest Stops");
                    restStops = "UNKOWN no. of stops";
                }

                console.log(output);
                
                // populate table using JQuery
                var $row = $('<tr>'); // create row for items
                $row.append($("<td>" + shipName + "</td>"));
                $row.append($("<td>" + megalights + "</td>"));
                $row.append($("<td>" + numberOfDaysConsumables + "</td>"));
                $row.append($("<td>" + dailyMGLT + "</td>"));
                $row.append($("<td>" + restStops + "</td>"));
                
            
                $row.append('</tr>');
                $tableBody.append( $row );  // add row to new content
                
                // Add new content after body of page
                
            } // end for
            $('thead').after($tableBody);       //add body after thead
            // console.log(output);

        }); //end swapi get Starship

    })(j); //end i
    
    } //end loop pages  
} // end init

}); //end ready
