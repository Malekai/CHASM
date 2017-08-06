// Get user input for conversion and dropdown vars for conversion
var input = $("#input").val();
var currency = $("#currency").val();
var convertTo = $("#convertTo").val();
var converted;
var dateObject;

// Get date with date box and add it on the API url
$("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "yy-mm-dd",

    onSelect: function() { 
        dateObject = $(this).datepicker().val(); 
    }
});

// Bind input
$('#input').on('change', function () {
    input = $("#input").val();
}).change();

// Bind Currency
$('#currency').on('change', function () {
    currency = $("#currency").val();
}).change();

// Bind Currency to convert
$('#convertTo').on('change', function () {
    convertTo = $("#convertTo").val();
}).change();

$("#target").submit(function(event) {
	conversion(input, currency, convertTo);
  	event.preventDefault();
});

var reverse = false;
// Reverse
$('#reverse').click(function(event) {
	reverse = !reverse;
	conversion(input, currency, convertTo);
});

// Call Conversion onSubmit
function conversion(input, currency, convertTo) {
	var rate;
	$.getJSON('http://api.fixer.io/' + dateObject, function(data) {
	  	fx.rates = data.rates;
	  	if (!reverse) {
	  		rate = fx(input).from(currency).to(convertTo);
	  		$('#convertedNumber').html(rate.toFixed(2) + " " + convertTo);
	  	} else {
	  		rate = fx(input).from(convertTo).to(currency);
	  		$('#convertedNumber').html(rate.toFixed(2) + " " + currency);	  		
	  	}
    });
}