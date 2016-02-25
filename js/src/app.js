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
			method: 'post',
			url: "/api/series/",
			data: JSON.stringify({
				title: titulo,
				url : url
			}),
			dataType: 'json',
			contentType: 'application/json',
			success: function(){
				alert("guardad con exito");
			},
			error: function(){
				alert("se ha producido un error");
			}
		});

		return false; 
	});

	function reloadSeries(){
		console.log('Cargando Series');	
		$.ajax({
			url: "/api/series/",
			success: function(data){
				console.log("/api/series",data);
				var html ="";
				for (var i in data){
					var id = data[i].id;
					var title = data[i].title;
					var url = data[i].url || "";
					html += "<li>";
					html += title;
					html += "(" + url + ")";
					html += '<button data-serieid="'+id+'">Eliminar</button>';
					html += "</li>";
				}
				$("#seriesList").html(html);
			}
		});
	}
	$("#reloadSeriesButton").on("click", reloadSeries);

	reloadSeries();

	$("#seriesList").on("click","button", function(){
		console.log("elimino la serie");
		var self = this;
		var id = $(self).data("serieid");
		$.ajax({
			url: "/api/series/" + id,
			method : "delete",
			success: function(){
				$(self).parent().remove();
			}
		});
	});
});