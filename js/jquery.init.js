$(document).ready(function() {
	
	/**
	 * @author Jo�o Lagarto
	 * Method to handle logins
	 */
	/*
	//initialize notification plugin
	$("#alertDiv").startAlert({});	
	*/
	/**
	 * @abstract TipTip plugin initialization
	 * @author Drew wilson
	 * This plugin shows a fancy tag (title) on hover 
	 */
	
	$("*").tipTip();
	
	/**
	 * @abstract Method to handle datumo login
	 * @author Jo�o Lagarto
	 */
	
	jQuery.fn.login = function(){
		//check if any of the fields is empty		
		if($("#user_login").val()=="" || $("#user_passwd").val()==""){
			$("#alertDiv").alertMsg({
				  text: "Missing fields"
			});
		} else {
			//send the ajax request
			$.post("session.php?login",{login:$("#user_login").val(),
							  pass:$('#user_passwd').val()},
							  function(data){
								  //return the data
								  if(data.length!=0){
									  $("#alertDiv").alertMsg({
										  text: "Wrong Login"
									  });
								  } else {
									  window.location = "admin.php";
								  }
							  });
		}	
	};
	
	/**
	 * @abstract Method to handle password recovery issues
	 * 
	 */
	
	jQuery.fn.recoverPwd = function(){
		var mail = prompt("Your email:");
		if(mail){
			$.get("session.php?pwd",{email:mail},
								function(data){
									if(data.length!=0){
										msg=data;
									} else {
										msg="Password updated. Check your email";
									}
									$("#alertDiv").alertMsg({
										text: msg
									});
								});
		}
	};
	
	/**
	 * @abstract Method to dinamically send an email
	 */
	
	jQuery.fn.submitBug = function(options){
		//set defaults
		var defaults = {
			form: "cform"
		};
		var options = jQuery.extend({}, defaults, options);
		//call contact form
		var CurForm=eval("document."+options.form);
		for(var i=0;i<CurForm.length;i++){
			if(CurForm[i].value==""){
				CurForm[i].focus();
				$("#alertDiv").alertMsg({
					  text: "Missing fields"
				});
				return;
			}
		}
		var url = "ajaxMail.php?type=1";
		//ajax request with post variables (NICE)
		$.post(url,{name:$('#name').val(),
			  email:$('#email').val(),
			  message:$('#message').val()},
		
		//retrieve that from ajax request
		function(data){
			$("#alertDiv").alertMsg({
				text: data
			});
		});
		//call method to clean form
		cleanForm(options.form);
	};

	
	
	
	/**
	 * @author Jo�o Lagarto
	 * @abstract Method called on anchor/button click event. Acts like a show/hide method. Only one div can be visible
	 */
	
	$("table").find("div").hide().end().find("a:not(.exp),input:button").click(function() {
		$(this).next().slideToggle(function(){
			$("div").not("#"+this.id+",div[lang=tiptip], .alertClass").slideUp('slow');
			
		});
	});

	
	/**
	 * @author Jo�o Lagarto / Nuno Moreno
	 * @description method to clean all textfield inputs
	 */
	
	function cleanForm(form){
		$("form[name="+form+"]").find(":input").each(function(){
			switch(this.type){
				case "text":
				case "textarea":
					$(this).val("");
					break;
			}	
		});
	}
	
	/**
	 * @author Jo�o Lagarto
	 * @description method to display the information div on key press
	 */
	
	//
	$(document).keypress(function(event){
		if(event.which==43){
			$("div[class=info]").slideToggle();
		}
		
	});
	
	/**
	 * AutoSuggest Plugin
	 * 
	 * Input must have lang=__fk in order to work correctly
	 */
	
	$("input[lang=__fk]").focus(function(){
		$(this).simpleAutoComplete("autoSuggest.php?field="+this.id);
	});
	
});