function Validator(inputField, feedbackEL, submitButton) {
	
	inputField.keyup(function() {
		if(validate()) {
			submitButton.attr('disabled', false);	
		} else {
			submitButton.attr('disabled', true);
		}
	});

	return open
}

function ValidatorNonEmpty(inputField, feedbackEL, submitButton) {
	var open = new Validator(inputField, feedbackEL, submitButton);

	open.validate = function() {
		if(inputField.val().length) {
			return true;
		} else {
			return false;
		}
	}

	return open;
} 


