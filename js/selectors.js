var element = function(elm, x, y, label) {
  var cell = new elm({ position: { x: x, y: y }, attrs: { text: { text: label }}});
  graph.addCell(cell);
  return cell;
};

$(document).on('dblclick', '#paper .model-object', function(){
  var list = $(".breadcrumb")[0];
  var name = $(this).text();
  var dbid = $(this).parent().attr('model-id');
  var breadcrumb = document.createElement('li');
  var a = document.createElement('a');
  var linkText = document.createTextNode(name);
  a.appendChild(linkText);
  a.href = "#" + dbid;
  breadcrumb.appendChild(a);
  list.appendChild(breadcrumb);

  saveCurrentGraph()
  $('#paper').attr('name', dbid)
  graph.clear()
  if(DB[dbid]) {
    loadGraph(dbid)
  }
  else {
    element(erd.Upper, 350, 30);
  }
});

$(document).on('click', '#paper .editor-element', function(){
  var name = $(this).text();
  var objectId = $(this).attr('id');
  var properties_div = $(".properties")
  properties_div.empty()
  var newDiv = document.createElement("div");
  inner = "<label for='name' class='property-label'>Название</label>"
  inner += "<input type='text' name='name' value='" + name + "'>";
  inner += "<div class='row-fluid'>";
  inner += "<button class='btn btn-primary property-button' data-id='" + objectId + "'>Обновить</button>";
  inner += "<button class='btn btn-danger property-button-delete' data-id='" + objectId + "'>Удалить</button>";
  inner += "</div>";
  newDiv.innerHTML = inner;
  properties_div[0].appendChild(newDiv);
});

$(document).on('click', '.property-button', function(){
  var objectId = $(this).attr('data-id');
  var new_name = $(this).parent().parent().children("input[name='name']").val()
  var modelId = $("#" + objectId).parent().attr('model-id')
  var cell = graph.getCell(modelId)
  cell.attr('text/text', new_name)
});

$(document).on('click', '.property-button-delete', function(){
  var objectId = $(this).attr('data-id');
  var modelId = $("#" + objectId).parent().attr('model-id')
  var cell = graph.getCell(modelId)
  cell.remove()
});

$("#menu-save-db").click(function(){
  getDB('model.json')
})

$("#menu-clear-db").click(function(){
  clearDB()
})

$(document).on('dblclick', '.model-upper', function(){
  $(".breadcrumb a").slice(-2, -1).trigger('click');
})

$(document).on('click', '.breadcrumb a', function(){
  var dbid = $(this).attr('href').substring(1)
  saveCurrentGraph()
  $('#paper').attr('name', dbid)
  loadGraph(dbid)
  $(this).parent().nextAll().remove()
})
