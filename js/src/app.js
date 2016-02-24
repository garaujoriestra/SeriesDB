$(document).ready(function(){


	//Ponemos el foco en el primer input
	$(".auto-focus").focus();

	$("form").on("submit",function(){ //Cuando se intenta enviar el formulario 
		//Validacion del titulo
		var titulo = $.trim( $("#title").val() );
		if (titulo == ""){
			alert("El titulo no puede ser vacio");
			return false;
		}

		//validacion de url
		var url = $.trim( $("#cover_url").val() );
		var patern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;
		if (!patern.test(url) && url != "") {
			alert("la url de la caratula no es valida");
		};


		//valiadacion de almenos  una categoria
		var selectedCategories = $('input[name="category"]:checked');
		if (selectedCategories.length == 0) {
			alert("Selecciona al menos una categoria");
			return false;
		};

		return true; //permito envio del form
	});

});