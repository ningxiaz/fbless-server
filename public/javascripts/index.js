var login = null;

$(document).ready(function(){
	$('#password_form .submit').click(function(){
		if(login){
			console.log("ready to save password!");
			var password = $('#password').val();

			$.ajax({
			    url: "/create_account",
			    type: "POST",
			    dataType: "json",
			    data: JSON.stringify({login: login, password: password}),
			    contentType: "application/json",
			    complete: function() {
			      //called when complete
			      console.log('process complete');
			    },

			    success: function(data) {
			      console.log(data);
			      console.log('process sucess');
			   },

			    error: function() {
			      console.log('process error');
			    }
			});
		}
	});
});

function show_password_input(){
	$('#password_form').show();
}