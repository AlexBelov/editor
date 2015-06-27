var DB = {}

var saveCurrentGraph = function() {
  name = $('#paper').attr('name')
  json = JSON.stringify(graph)
  DB[name] = JSON.parse(json)
}

var loadGraph = function(name) {
  graph.clear()
  graph.fromJSON(DB[name])
}

function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  pom.style.display = 'none';
  document.body.appendChild(pom);

  pom.click();

  document.body.removeChild(pom);
}

var getDB = function(filename) {
  json = JSON.stringify(DB)
  download(filename, json)
}

var setDB = function(string_with_json) {
  DB = JSON.parse(string_with_json)
  loadGraph("Root")
}

var clearDB = function() {
  graph.clear()
  DB = {}
}

// ===========================================================

var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
  el: $('#paper'),
  width: 800,
  height: 600,
  gridSize: 5,
  model: graph,
  //embeddingMode: true
});

$('#paper').attr('name', 'Root')

var erd = joint.shapes.erd;

sampleGraph()

saveCurrentGraph()
