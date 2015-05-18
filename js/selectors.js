$(".model-object").dblclick(function() {
  graph.clear();
  var list = $(".breadcrumb")[0];

  var breadcrumb = document.createElement('li');
  var a = document.createElement('a');
  var linkText = document.createTextNode("Object");
  a.appendChild(linkText);
  a.href = "#";
  breadcrumb.appendChild(a);

  list.appendChild(breadcrumb);
});
