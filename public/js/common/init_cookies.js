(function() {
	var isValidEnv = function () {
  	var validEnv = ["TST","OAT","SIT2"];
  	var valid = false;
  	for (var i = 0; i < validEnv.length; i++) {
  		if (Cookies.get('env') === validEnv[i]) {
  			valid = true;
  			break;
  		}
  	}
  	return valid;
  }

	if (Cookies.get('env')==undefined || Cookies.get('env')==""  || !isValidEnv())
		Cookies.set('env', 'TST', { expires: 15 });


})();