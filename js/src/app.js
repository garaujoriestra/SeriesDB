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

		$.ajax({
			url: "/api/series/",
			data: JSON.stringify({
				title: titulo,
				url : url
			}),
			dataType: 'json',
			method: 'post',
			contentType: 'application/json',
			success: function(){
				alert("guardad con exito");
			},
			error: function(){
				alert("se ha producido un error");
			}
		});

		return false; //permito envio del form
	});

});