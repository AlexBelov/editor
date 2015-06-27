$(document).on('dblclick', '.model-object', function(){
  var list = $(".breadcrumb")[0];
  var name = $(this).text();
  var breadcrumb = document.createElement('li');
  var a = document.createElement('a');
  var linkText = document.createTextNode(name);
  a.appendChild(linkText);
  a.href = "#";
  breadcrumb.appendChild(a);
  list.appendChild(breadcrumb);

  saveCurrentGraph()
  $('#paper').attr('name', name)
  graph.clear()
});

$("#menu-save-db").click(function(){
  getDB('model.json')
})

$("#menu-clear-db").click(function(){
  clearDB()
})

$(".breadcrumb a").click(function(){
  saveCurrentGraph()
  var name = $(this).text()
  $('#paper').attr('name', name)
  loadGraph(name)
  $(this).parent().nextAll().remove()
})
