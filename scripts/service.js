

// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions 
// https://flaviocopes.com/javascript-regular-expressions/ 
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers 
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
	var filter = /^(\([0-9]{3})\)[-+]?[0-9]{3}[-+]?[0-9]{4}$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}


// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/ 
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
var unavailableDates = ["2020-06-29","2020-07-07","2020-07-10"]
const setDateFormat = "yy-mm-dd";
const setTimeFormat = "hh:mm p";

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() == 0)
        return [false];
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [ unavailableDates.indexOf(string) == -1 ]
}

function done(n) {
	if ((n == 1) &&
		(((document.getElementById("Cut").options[0].selected === false)&&
				(document.getElementById("Cuth").options[0].selected === false))||
			((document.getElementById("Dry").options[0].selected === false)&&
				(document.getElementById("Dryh").options[0].selected === false))||
			((document.getElementById("Style").options[0].selected === false)&&
				(document.getElementById("Styleh").options[0].selected === false))||
			((document.getElementById("Consult").options[0].selected === false)&&
				(document.getElementById("Consulth").options[0].selected === false)))&&
		((document.getElementById("dateInput").value != "yyyy-mm-dd")&&
			(document.getElementById("timeInput").value != document.getElementById("timeInput").defaultValue))&&
		((document.getElementById("name").value != "")&&
			(document.getElementById("email").value != "")&&
			(document.getElementById("telephone").value != "")&&
			(document.getElementById("telephone").value != "(xxxx)"))&&
		((document.getElementById("debit").value != ""))
		){
		alert("Done regerist, See you next illusion.")
	}else if ((n == 1) &&
		(((((document.getElementById("Cut").options[0].selected === false)&&
				(document.getElementById("Cuth").options[0].selected === false))||
			((document.getElementById("Dry").options[0].selected === false)&&
				(document.getElementById("Dryh").options[0].selected === false))||
			((document.getElementById("Style").options[0].selected === false)&&
				(document.getElementById("Styleh").options[0].selected === false))||
			((document.getElementById("Consult").options[0].selected === false)&&
				(document.getElementById("Consulth").options[0].selected === false)))&&
		((document.getElementById("dateInput").value != "yyyy-mm-dd")&&
			(document.getElementById("timeInput").value != document.getElementById("timeInput").defaultValue))&&
		((document.getElementById("name").value != "")&&
			(document.getElementById("email").value != "")&&
			(document.getElementById("telephone").value != "")&&
			(document.getElementById("telephone").value != "(xxxx)"))&&
		((document.getElementById("debit").value != ""))) === false)
		){
		alert("Information not yet filled in")
	}
	else if (n == 0)
		location.reload();
}

// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#telephone").on("change", function(){
        if (!validatePhone("telephone")){
            //alert("Wrong format for phone");
            $("#telephone").val("(xxx)-xxx-xxxx");
            $("#telephone").addClass("error");
        }
        else {
			//alert("pass")
            $("#telephone").removeClass("error");
        }
    });

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery 
    // You can try different themes (the names are under the calendars) / This is Excite Bike 
    // To use a different theme you must include its css in your HTML file. 
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/ 
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/ 
    $( "#dateInput" ).datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/01/2020'),  
            maxDate: '+4M',
			//minTime: '08:00',  
            //maxTime: '17:00',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }   
    );

	$( "#timeInput" ).timepicker(
        {
            timeFormat: setTimeFormat,
        }   
    );

    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put 
    $("#debit").on("mouseenter", function(){
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function(){
        $("#debit").removeClass("showInput");
    });
  
    // https://jqueryui.com/tooltip/ 
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        classes: {
          "ui-tooltip": "highlight"
        }
    });

	
});