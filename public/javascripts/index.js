var login = null;

$(document).ready(function(){
	$('#signup_form .submit').click(function(){
		if(login){
			console.log("ready to sign up!");
			var email = $('#email').val();
			var password = $('#password').val();

			$.ajax({
			    url: "/create_account",
			    type: "POST",
			    dataType: "json",
			    data: JSON.stringify({login: login, email: email, password: password}),
			    contentType: "application/json",
			    success: function(data) {
			      console.log(data);
			      console.log('process sucess');
			   	},

			    error: function() {
			      console.log('create account error');
			    }
			});
		}
	});
});

function show_signup_form(){
	$('#signup_form').show();
}

function show_settings(){
	$('#settings').show();
	$('.greeting').html('Hello, '+login.first_name);
}

function app_login(){
	if(!login) return;

	$.ajax({
	    url: "/get_user",
	    type: "GET",
	    dataType: "json",
	    data: JSON.stringify({query_data: login.id}),
	    contentType: "application/json",
	    success: function(data) {
	      console.log('process sucess');
	      console.log(data);
	      // var user = JSON.parse(data.results);
	      // console.log(user);

	      // //not yet signed up to our FBless app
	      // if(user.length == 0){
	      // 		show_signup_form();
	      // }
	      // else{
	      // 		show_settings();
	      // }
	   	},

	    error: function() {
	      console.log('search user error');
	    }
	});


}