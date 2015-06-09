$(function () {
    // ============================================================
    //BASE PAPER
    // ============================================================
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
    // ============================================================


    // ============================================================
    // MENU
    // ============================================================
    var menu_element = $('#menu');
    var graph_menu = new joint.dia.Graph;


    var menu = new joint.dia.Paper({
        el: menu_element,
        width: ($('.panel-body.menu').width() - 5),
        height: $( window ).height(),
        model: graph_menu,
        gridSize: 1,
        interactive: false
    });

    var rect = new joint.shapes.basic.Rect({
        position: { x: 10, y: 10},
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'ars box', fill: 'white' } },
        interactive: false
    });

    graph_menu.addCells([rect]);

    menu.on('cell:pointerdown',
        function(cellView, evt, x, y) {
            var rect2 = cellView.model.clone();
            rect2.translate(400);
            graph.addCells([rect2]);
        }
    );
    // ============================================================
});
