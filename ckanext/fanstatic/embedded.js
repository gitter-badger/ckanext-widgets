/*
  The Code element declares the following components:
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
        if (object[key] != "" && object[key] != null) {
	  if (!val) base += "&";
          val = false;
          base += key + "=" + object[key]; }}
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
          for (key in query) {
            inner.query[key] = query[key]; //setQuery(schema.query, query);
          }
	}
        //console.log(inner.query);
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

var checkBanner =  function () {
        if (active("#large", "standard-preview-active") && $("#banner-value").is(':checked') )  {
	  controller.query({'banner': true});
        } else {
	  controller.query({'banner': ''});
        }
        $(".code-embedded").text(controller.code());
	}

var active = function (element, str) {
   var _class = $(element).attr("class").split(/\s+/);
   for (var elem in _class) {
      //console.log(_class[elem]);
      if (_class[elem] === str) return true;
   }
   return false;
}

var activeMini = function () {
	$("#large").removeClass("standard-preview-active");
	$("#mini").addClass("standard-preview-active");
	controller.width(300);
	controller.height(500);
        controller.query({"widget_type": "narrow"});
        checkBanner();
        
        $(".code-embedded").text(controller.code());
        $("#height-widget").val(500);
	$("#width-widget").val(300);
}

var activeLarge = function () {
	$("#large").addClass("standard-preview-active");
	$("#mini").removeClass("standard-preview-active");
	controller.width(900);
	controller.height(400);
        controller.query({"widget_type": "wide"});
        checkBanner();

        $(".code-embedded").text(controller.code());
        $("#height-widget").val(400);
	$("#width-widget").val(900);
}

$(document).ready(function () {

  var widget = new BuildURL({
    protocol: window.location.protocol,
    host: window.location.host,
    path: window.location.pathname + '/widget',
    query: {
      widget_type: "narrow",
      banner: ""
    },
    attr: {
      width: 600,
      height: 420
    }
  });

  controller = widget;
  console.log("Inicio de interaccion para embebe el widget");

/*
 * Close del embedded widget
 *
 * TODO
 * - Modificar para permitir ligar acciones con Monads 
*/
    $(".toggle-widget").click(function () {
        if ($(".main-widget").hasClass("active-widget")) {
          $(".main-widget").show(200, easing="linear");
          console.log("show");
	} else {
          $(".main-widget").hide(200, easing="linear");
          console.log("hide");
        }

        console.log("Muestra/Oculta");
	$(".main-widget").toggleClass("active-widget");

        
    });

    // Limpieza de inputs
    $("#height-widget").val("");
    $("#width-widget").val("");

    $(".code-embedded").text(controller.code());

    // Monitorea tecleo en la casilla de Alto
    $("#height-widget").keyup(function() {

	//console.log("height modificado: " +  $("#height-widget").val());
	controller.height(parseInt($("#height-widget").val()));
        $(".code-embedded").text(controller.code());
	$("#large").removeClass("standard-preview-active");
	$("#mini").removeClass("standard-preview-active");
	});

    // Monitorea tecleo en la casilla de Ancho
    $("#width-widget").keyup(function() {
	//console.log("Width modificado: " + $("#width-widget").val());
	controller.width(parseInt($("#width-widget").val()));
	$(".code-embedded").text(controller.code());
	$("#large").removeClass("standard-preview-active");
	$("#mini").removeClass("standard-preview-active");
	});
    
    // Selecciona la opcion mini de la muestras por defecto
    $("#mini").click(activeMini);

    $("#large").click(activeLarge);

    $("#banner-value").click(checkBanner);
 
      $("#visual").click(function(){
        banner = controller.query()["banner"] != "" ? "&banner=true" : "";
          window.open(
	window.location.pathname + 
	"/test_widget?width=" + controller.width() +
    	"&height=" + controller.height() +
    	"&widget_type=" + controller.query()["widget_type"] +
        banner
        )
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
    
    $("#height-widget").val(400);
    $("#width-widget").val(900);
    activeMini();
    checkBanner();
});
