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
  if(DB[name]) {
    loadGraph(name)
  }
});

$(document).on('click', '.object', function(){
  var name = $(this).text();
  var objectId = $(this).attr('id');
  var properties_div = $(".properties")
  properties_div.empty()
  var newDiv = document.createElement("div");
  newDiv.innerHTML = "<label for='name' class='property-label'>Название</label>"
  newDiv.innerHTML += "<input type='text' name='name' value='" + name + "'>";
  newDiv.innerHTML += "<button class='btn btn-primary property-button' data-id='" + objectId + "'>Обновить</button>";
  properties_div[0].appendChild(newDiv);
});

$(document).on('click', '.property-button', function(){
  var objectId = $(this).attr('data-id');
  var new_name = $(this).parent().children("input[name='name']").val()
  var modelId = $("#" + objectId).parent().attr('model-id')
  var cell = graph.getCell(modelId)
  cell.attr('text/text', new_name)
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
