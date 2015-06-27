var sampleGraph = function(){
  var element = function(elm, x, y, label) {
    var cell = new elm({ position: { x: x, y: y }, attrs: { text: { text: label }}});
    graph.addCell(cell);
    return cell;
  };

  var employee = element(erd.Entity, 100, 200, "Employee");
  var salesman = element(erd.Level, 100, 400, "Salesman");
  var isa = element(erd.Rate, 125, 300, "Rate");
  var skills = element(erd.Var, 150, 90, "skills");
  var car = element(erd.Entity, 430, 400, "Company car");

  var link1 = new erd.Dependence({
    source: { x: 400, y: 20 },
    target: { x: 700, y: 20 },
  });

  var link2 = new erd.Influence({
    source: { x: 400, y: 60 },
    target: { x: 700, y: 60 },
  });

  graph.addCell([link1, link2]);
}
