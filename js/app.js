// ============================================================
// SAVE FILE
// ============================================================
var DB = {};

var saveCurrentGraph = function () {
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
var paper_element = $('#paper');

paper_element.css('height', $(window).height());

var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: paper_element,
    width: ($('.panel-body.base').width() - 5),
    height: $(window).height(),
    model: graph,
    gridSize: 1
});

paper_element.attr('name', 'Root');
// ============================================================


// ============================================================
// HELPERS
// ============================================================
var erd = joint.shapes.erd;
var html = joint.shapes.html;
//sampleGraph();
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
    height: $(window).height(),
    model: graph_menu,
    gridSize: 1,
    interactive: false
});

var rectangle = new joint.shapes.html.Rectangle({position: {x: 35, y: 30}, size: {width: 100, height: 100}});
var round = new joint.shapes.html.Round({position: {x: 35, y: 140}, size: {width: 100, height: 100}});

graph_menu.addCells([rectangle, round]);

menu.on('cell:pointerdown',
    function (cellView, evt, x, y) {
        var new_object = cellView.model.clone();
        new_object.translate(400);

        graph.addCells([new_object]);
    }
);
// ============================================================
