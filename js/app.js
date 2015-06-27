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


// Create a custom element.
// ------------------------
joint.shapes.html = {};
joint.shapes.html.Rectangle = joint.shapes.basic.Rect.extend({
    defaults: joint.util.deepSupplement({
        type: 'html.Rectangle',
        attrs: {
            rect: {stroke: 'none', 'fill-opacity': 0}
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});


// Create a custom view for that element that displays an HTML div above it.
// -------------------------------------------------------------------------
joint.shapes.html.RectangleView = joint.dia.ElementView.extend({

    template: [
        '<div class="html-element">',
        '<button class="delete">x</button>',
    ].join(''),

    initialize: function () {
        _.bindAll(this, 'updateBox');
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.$box = $(_.template(this.template)());

        this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
        // Update the box position whenever the underlying model changes.
        this.model.on('change', this.updateBox, this);
        // Remove the box when the model gets removed from the graph.
        this.model.on('remove', this.removeBox, this);
    },
    render: function () {
        joint.dia.ElementView.prototype.render.apply(this, arguments);
        this.paper.$el.prepend(this.$box);
        this.updateBox();
        return this;
    },
    updateBox: function () {
        // Set the position and dimension of the box so that it covers the JointJS element.
        var bbox = this.model.getBBox();

        // Example of updating the HTML with a data stored in the cell model.
        this.$box.css({
            width: bbox.width,
            height: bbox.height,
            left: bbox.x,
            top: bbox.y,
            transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
        });
    },
    removeBox: function (evt) {
        if (menu_element.find(this)) {
            this.$box.remove();
        }
    }
});


// ============================================================
//BASE PAPER
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

var erd = joint.shapes.erd;
sampleGraph();
saveCurrentGraph();
// ============================================================


// ============================================================
// HELPERS
// ============================================================
var element = function (elm, x, y, label) {
    var cell = new elm({position: {x: x, y: y}, attrs: {text: {text: label}}});
    graph.addCell(cell);
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

var el1 = new joint.shapes.html.Rectangle({position: {x: 55, y: 100}, size: {width: 170, height: 100}});

graph_menu.addCells([el1]);

menu.on('cell:pointerdown',
    function (cellView, evt, x, y) {
        var new_object = cellView.model.clone();
        new_object.translate(400);

        graph.addCells([new_object]);
    }
);
// ============================================================
