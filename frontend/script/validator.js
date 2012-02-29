
function ValidatorNonEmpty(inputField, feedbackEL, submitButton) {
	
	inputField.keyup(function() {
		if(validate()) {
			submitButton.attr('disabled', false);	
		} else {
			submitButton.attr('disabled', true);
		}
	});

	open.validate = function() {
		if(inputField.val().length) {
			return true;
		} else {
			return false;
		}
	}

	return open;
} 

function ValidatorNumber(inputField, feedbackEL, submitButton) {
	
	inputField.keyup(function() {
		if(validate()) {

			submitButton.attr('disabled', false);	
		} else {
			submitButton.attr('disabled', true);
			feedbackEL.html('Bara siffror, tack!<br>')
		}
	});

	validate = function() {
		subject = inputField.val();
		onlyNumbers = new RegExp(/^[0-9]+$/);
		if(subject.search(onlyNumbers) != -1) {
			return true;
		} else {
			return false;
		}
	}

	return open;
} 

