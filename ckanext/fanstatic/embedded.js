/*
  The Code element declare the following components:
    - Width
    - Height
    - Url
      - Query
      - Protocol
      - Address
      - Path
    - Attribute

  Each component has a getter attribute and a getter function for setting
  value on the textarea.

  Test 1. A monadic pattern for chaining operation and provide better event
  programming.
*/


Id = function (element) {
  return element;
}

Bind = function (valueA, valueB) {
  if (valueA == null) {
    return null;
  }
  valueB(valueA);
}

function fromJSONtoQuery () {
    return "";
}


function BuildURL(schema) {
    var inner = {
      protocol: schema["protocol"],
      host: schema["host"],
      path: schema["path"],
      query: schema["query"],
      attr: {
        width: schema["attr"]["width"],
        height: schema["attr"]["height"],
      }
    };  

  
    this.constructor = BuildURL;

    this.width = function (newWidth) {
	if (newWidth != undefined && newWidth != null) {
           inner.attr.width = validateNumeric(newWidth);
        } 
        return inner.attr.width;
    }

    this.height = function (newHeight) {
	if (newHeight != undefined && newHeight != null) {
          inner.attr.height = validateNumeric(newHeight);
        }
       return inner.attr.height;
    }

    // TODO: Add support for build query with non specific arguments
    this.query = function (query){
	if (query != undefined && query != null) {
          inner.attr.query = setQuery(schema.query, query);
	}
        return inner.attr.query;
    }

    //TODO - Verificar el schema coincida con el schema de codeandomexico
    this.url = function () {
       return inner.protocol + inner.host + inner.path; //+ fromJSONtoQuery(inner.query);
    }
    this.code = function () {
          return "<iframe src='" + this.url() + "' width='" + this.width() + "' height='" + this.height() + "'></iframe>";
    }
}


function isNumeric(n) {
	return !isNaN(parseInt(n)) && isFinite(n);
}

function validateNumeric(n){
  if (isNumeric(n)){
    return n;
  }
  return 0;
}

$(document).ready(function () {

  var widget = new BuildURL({
    protocol: window.location.protocol,
    host: window.location.host,
    path: window.location.pathname + '/widget',
    query: {},
    attr: {
      width: 300,
      height: 423
    }
  });

  var controller = widget;
  console.log("Inicio de interaccion para embebe el widget");

/*
 * Close del embedded widget
 *
 * TODO
 * - Modificar para permitir ligar acciones con Monads 
*/
    $(".toggle-widget").click(function () {
        $(".main-widget").toggleClass("active-widget");
        console.log("Muestra/Oculta");
    });

    // Limpieza de inputs
    $("#height-widget").val("");
    $("#width-widget").val("");

    $(".code-embedded").text(controller.code());

    // Monitorea tecleo en la casilla de Alto
    $("#height-widget").keyup(function() {

	console.log("height modificado: " +  $("#height-widget").val());
	controller.height(parseInt($("#height-widget").val()));
        $(".code-embedded").text(controller.code());
	$("#large").removeClass("standard-preview-active");
	$("#mini").removeClass("standard-preview-active");
	});

    // Monitorea tecleo en la casilla de Ancho
    $("#width-widget").keyup(function() {
	console.log("Width modificado: " + $("#width-widget").val());
	controller.width(parseInt($("#width-widget").val()));
	$(".code-embedded").text(controller.code());
	$("#large").removeClass("standard-preview-active");
	$("#mini").removeClass("standard-preview-active");
	});
    
    // Selecciona la opcion mini de la muestras por defecto
    $("#mini").click( function () {
	$("#large").removeClass("standard-preview-active");
	$("#mini").addClass("standard-preview-active");
	controller.width(300);
	controller.height(423);

        $(".code-embedded").text(controller.code());
	});

    $("#large").click( function () {
	$("#large").addClass("standard-preview-active");
	$("#mini").removeClass("standard-preview-active");
	controller.width(900);
	controller.height(400);

        $(".code-embedded").text(controller.code());
	});
  
 /*   $("#small").onClick(
	function () {
           ModifyText
		(getTextArea(), ValidateSize(
			ValidateNumber(
				getText())))});
    // refreshCode(widget.url);
/*  $(".style-widget").click(function(){
    $(".style-widget").toggleClass("active");
  })*/
});
