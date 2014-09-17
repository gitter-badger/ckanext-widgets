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

function fromJSONtoQuery (object) {
    var base = "?"
    var val = true;
    for (var key in object) {
       if (!val) base += "&";
       val = false;
       base += key + "=" + object[key];
    }
    console.log(base);
    return base;
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
        frameborder: 0,
        scrolling: "no"
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
          inner.query = query; //setQuery(schema.query, query);
	}
        console.log(inner.query);
        return inner.query;
    }

    //TODO - Verificar el schema coincida con el schema de codeandomexico
    this.url = function () {
       return inner.protocol + inner.host + inner.path + fromJSONtoQuery(inner.query);
    }
    this.code = function () {
          return "<iframe src='" + this.url() + 
	"' width='" + this.width() + 
	"' height='" + this.height() + 
	"' frameborder='" + inner.attr.frameborder +
	"' scrolling='" + inner.attr.scrolling + "'></iframe>";
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


var active = function (element, str) {
   var _class = $(element).attr("class").split(/\s+/);
   for (var elem in _class) {
      console.log(_class[elem]);
      if (_class[elem] === str) return true;
   }
   return false;
}
$(document).ready(function () {

  var widget = new BuildURL({
    protocol: window.location.protocol,
    host: window.location.host,
    path: window.location.pathname + '/widget',
    query: {
      widget_type: "widen"
    },
    attr: {
      width: 600,
      height: 420
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
	controller.height(500);

        $(".code-embedded").text(controller.code());
	});

    $("#large").click( function () {
	$("#large").addClass("standard-preview-active");
	$("#mini").removeClass("standard-preview-active");
	controller.width(900);
	controller.height(400);

        $(".code-embedded").text(controller.code());
	});
 
 
   $("#widen").click(function () {
       if (active("#widen", "selected")) {
          if (active("#narrow", "active")) {
	     $("#narrow").addClass("shidden");
             $("#narrow").removeClass("active");
	   } else {
             $("#narrow").addClass("active"); 
             $("#narrow").removeClass("shidden");
	   }
	} else {
          $("#widen").addClass("selected");
          $("#widen").removeClass("active");
	  $("#narrow").addClass("shidden");
          $("#narrow").removeClass("selected");
          controller.query({"widget_type": "widen"});
          $(".code-embedded").text(controller.code());
	}
	});
   
   $("#narrow").click(function () {
       if (active("#narrow", "selected")) {
          if (active("#widen", "active")) {
	    $("#widen").addClass("shidden");
            $("#widen").removeClass("active");
          } else {
 /*           $("#narrow").removeClass("shidden");*/
            $("#widen").addClass("active"); 
            $("#widen").removeClass("shidden");
          }
	} else {
          $("#narrow").addClass("selected");
          $("#narrow").removeClass("active");
	  $("#widen").addClass("shidden");
          $("#widen").removeClass("selected");
          controller.query({"widget_type": "narrow"});
          $(".code-embedded").text(controller.code());
	}
	});

      $("#visual").click(function(){
          window.open(
	window.location.pathname + 
	"/test_widget?width=" + controller.width() +
    	"&height=" + controller.height() +
    	"&widget_type=" + controller.query()["widget_type"] )
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
