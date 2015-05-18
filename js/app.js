$(function () {
    var paper_element =  $('#paper');
    paper_element.css('height', $( window ).height());
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: paper_element,
        width: ($('.panel-body.base').width() - 5),
        height: $( window ).height(),
        model: graph,
        gridSize: 1
    });

    var rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'ars box', fill: 'white' } }
    });

    var rect2 = rect.clone();
    rect2.translate(300);

    var link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
    });

    graph.addCells([rect, rect2, link]);

    //paper.on('cell:pointerdown',
    //    function(cellView, evt, x, y) {
    //        alert('cell view ' + cellView.model.type + ' was clicked');
    //    }
    //);
});
