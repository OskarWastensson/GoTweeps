
function ValidatorNonEmpty(inputField, feedbackEL, submitButton) {
	
	inputField.change(function() {
		if(validate()) {
			submitButton.attr('disabled', false);	
			inputField.removeClass('error');
		} else {
			submitButton.attr('disabled', true);
			inputField.addClass('error');
		}
	});

	var validate = function() {
		if(inputField.val().length) {
			return true;
		} else {
			return false;
		}
	}
} 

function ValidatorNoSpaces(inputField, feedbackEL, submitButton) {
	
	inputField.keyup(function() {
		if(validate()) {
			submitButton.attr('disabled', false);	
			feedbackEL.html('');
			inputField.removeClass('error');
		} else {
			submitButton.attr('disabled', true);
			feedbackEL.html('Inga mellanrum, tack!');
			inputField.addClass('error');
		}
	});

	var validate = function() {
		if(inputField.val().indexOf(' ') == -1) {
			return true;
		} else {
			return false;
		}
	}
} 


function ValidatorNumber(inputField, feedbackEL, submitButton) {
	
	inputField.keyup(function() {
		if(validate()) {
			submitButton.attr('disabled', false);	
			feedbackEL.html('');
			inputField.removeClass('error');
		} else {
			submitButton.attr('disabled', true);
			feedbackEL.html('Bara siffror, tack!');
			inputField.addClass('error');
		}
	});

	var validate = function() {
		subject = inputField.val();
		onlyNumbers = new RegExp(/^[0-9]+$/);
		if(subject.search(onlyNumbers) != -1) {
			return true;
		} else {
			return false;
		}
	}
} 

function ValidatorDateTime(inputField, feedbackEL, submitButton) {
	
	inputField.change(function() {
		if(validate()) {
			submitButton.attr('disabled', false);	
			feedbackEL.html('');
			inputField.removeClass('error');
		} else {
			submitButton.attr('disabled', true);
			feedbackEL.html('Giltigt datum tack! Använd formatet 2000-01-01 12:00');
			inputField.addClass('error');
		}
	});

	var validate = function() {
		subject = inputField.val();
		
		// Check for correct date format
		if(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}/.test(subject)) {
			return true;
		}
		/*
		// check for salvage-able date formats	
		
		// Missing 20 in 2012 - easy to correct
		if(/[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}/.test(subject)) {
			console.log("bad");
			inputField.val("20" + inputField.val());	
			return true;
		} 
		
		// Just the days? - We can fix it!
		if(/[0-9]{2} [0-9]{2}-[0-9]{2}/.test(subject)) {
			var today = new Date();
			subject = today.getFullYear() + "-" + open.pad(today.getMonth()+1,2) + "-"+ subject;
			inputField.val(subject);
			return true;	
		}
		*/
		return false;
	}
}

function ValidatorMoney(inputField, feedbackEL, submitButton) {
	
	inputField.keyup(function() {
		if(validate()) {
			submitButton.attr('disabled', false);	
			feedbackEL.html(' ');
			inputField.removeClass('error');
		} else {
			submitButton.attr('disabled', true);
			feedbackEL.html('Ett decimaltal, tack!');
			inputField.addClass('error');
		}
	});

	var validate = function() {
		subject = inputField.val();

		if(!/^[0-9]*\.?[0-9]*$/.test(subject.replace(',', '.'))) {
			return false;
		}	

		return true;
	}
}