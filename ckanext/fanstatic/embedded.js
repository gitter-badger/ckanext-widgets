function fromJSONtoQuery () {
    return "";
}

function BuildURL(schema) {
    this.constructor = BuildURL;
    //TODO - Verificar el schema coincida con el schema de codeandomexico
    this.url = function () {
       return schema.protocol + schema.host +
           schema.path + fromJSONtoQuery(schema.params);
    }
    return this;
}

function refreshCode (attribute) {
    $($(".code-embedded")[0]).text(buildIFrame(attribute));
}

function buildIFrame(attributes) {
    var url = attributes["url"] || getActualUrl();
    var option = attributes["options"] || getActualOption();

    return IFrame(url, option) ;
}

var widget = BuildURL({
    protocol: window.location.protocol,
    host: window.location.host,
    path: window.location.pathname + '/widget',
    params: {}
});


$(document).ready(function () {
  console.log("Inicio de interaccion para embebe el widget");
    $(".toggle-widget").click(function () {
        $(".main-widget").toggleClass("active-widget");
        console.log("Muestra/Oculta");
    });
    // refreshCode(widget.url);
/*  $(".style-widget").click(function(){
    $(".style-widget").toggleClass("active");
  })*/
});
