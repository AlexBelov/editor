// ============================================================
// SAVE FILE
// ============================================================
var DB = {};

var saveCurrentGraph = function (name) {
    name = $('#paper').attr('name');
    json = JSON.stringify(graph);
    DB[name] = JSON.parse(json)
};

var loadGraph = function (name) {
    graph.clear();
    graph.fromJSON(DB[name])
};

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
}

var getDB = function (filename) {
    json = JSON.stringify(DB);
    download(filename, json)
};

var setDB = function (string_with_json) {
    DB = JSON.parse(string_with_json);
    loadGraph("Root")
};

var clearDB = function () {
    graph.clear();
    DB = {}
};
// ============================================================

// ============================================================
// BASE PAPER
// ============================================================
var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
  el: $('#paper'),
  width: 800,
  height: 700,
  gridSize: 1,
  model: graph,
});

$('#paper').attr('name', 'Root');
// ============================================================


// ============================================================
// HELPERS
// ============================================================
var erd = joint.shapes.erd;
// sampleGraph();
saveCurrentGraph();

var menuElement = function (elm, x, y, label) {
    var cell = new elm({position: {x: x, y: y}, attrs: {text: {text: label}}});
    graph_menu.addCell(cell);
    return cell;
};
// ============================================================


// ============================================================
// MENU
// ============================================================
var menu_element = $('#menu');
var graph_menu = new joint.dia.Graph;

var menu = new joint.dia.Paper({
    el: menu_element,
    width: ($('.panel-body.menu').width() - 5),
    height: 400,
    model: graph_menu,
    gridSize: 1,
    interactive: false
});

var menuDependence = function(elm1, elm2) {
  var myLink = new erd.Dependence({ source: { id: elm1.id }, target: { id: elm2.id }});
  graph_menu.addCell(myLink);
  return myLink;
}

var menuInfluence = function(elm1, elm2) {
  var myLink = new erd.Influence({ source: { id: elm1.id }, target: { id: elm2.id }});
  graph_menu.addCell(myLink);
  return myLink;
}

//var el1 = new joint.shapes.html.Rectangle({position: {x: 55, y: 100}, size: {width: 170, height: 100}});
menuElement(erd.Level, 45, 10, "Уровень");
menuElement(erd.Entity, 45, 90, "Объект");
menuElement(erd.Rate, 45, 200, "Темп");
menuElement(erd.Var, 80, 250, "Переменная");
var link1 = new erd.Dependence({
  source: { x: 40, y: 360 },
  target: { x: 200, y: 360 },
});

var link2 = new erd.Influence({
  source: { x: 40, y: 390 },
  target: { x: 200, y: 390 },
});

graph_menu.addCell([link1, link2]);

menu.on('cell:pointerdown',
    function (cellView, evt, x, y) {
        var new_object = cellView.model.clone();
        graph.addCells([new_object]);
    }
);
// ============================================================
