if (typeof exports === 'object') {

    var joint = {
        util: require('../src/core').util,
        shapes: {
            basic: require('./joint.shapes.basic')
        },
        dia: {
            ElementView: require('../src/joint.dia.element').ElementView,
            Link: require('../src/joint.dia.link').Link
        }
    };
    var _ = require('lodash');
}

joint.shapes.devs = {};

joint.shapes.devs.Implementation = joint.dia.Link.extend({
  defaults: {
    type: 'uml.Implementation',
    attrs: {
      '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' },
      '.connection': { 'stroke-dasharray': '3,3' }
    }
  }
});

joint.shapes.devs.Model = joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {

    markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
    portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/></g>',

    defaults: joint.util.deepSupplement({

        type: 'devs.Model',
        size: { width: 1, height: 1 },

        inPorts: [],
        outPorts: [],

        attrs: {
            '.': { magnet: false },
            '.body': {
                width: 150, height: 250,
                stroke: '#000000'
            },
            '.port-body': {
                r: 10,
                magnet: true,
                stroke: '#000000'
            },
            text: {
                'pointer-events': 'none'
            },
            '.label': { text: 'Model', 'ref-x': .5, 'ref-y': 10, ref: '.body', 'text-anchor': 'middle', fill: '#000000' },
            '.inPorts .port-label': { x:-15, dy: 4, 'text-anchor': 'end', fill: '#000000' },
            '.outPorts .port-label':{ x: 15, dy: 4, fill: '#000000' }
        }

    }, joint.shapes.basic.Generic.prototype.defaults),

    getPortAttrs: function(portName, index, total, selector, type) {

        var attrs = {};

        var portClass = 'port' + index;
        var portSelector = selector + '>.' + portClass;
        var portLabelSelector = portSelector + '>.port-label';
        var portBodySelector = portSelector + '>.port-body';

        attrs[portLabelSelector] = { text: portName };
        attrs[portBodySelector] = { port: { id: portName || _.uniqueId(type) , type: type } };
        attrs[portSelector] = { ref: '.body', 'ref-y': (index + 0.5) * (1 / total) };

        if (selector === '.outPorts') { attrs[portSelector]['ref-dx'] = 0; }

        return attrs;
    }
}));

joint.shapes.devs.Rate = joint.shapes.devs.Model.extend({
  markup: '<g class="rotatable"><g class="scalable"><polygon/></g><text/></g>',

  defaults: joint.util.deepSupplement({

    type: 'devs.Rate',
    size: { width: 160, height: 80 },
    attrs: {
      polygon: {
        points: '0,0 30,40 130,40 160,0 130,-40 30,-40',
        fill: 'white', stroke: 'salmon', 'stroke-width': 2
      },
      '.body': { fill: 'salmon' },
      '.label': { text: 'Темп' },
      '.inPorts .port-body': { fill: 'PaleGreen' },
      '.outPorts .port-body': { fill: 'Tomato' }
    }

  }, joint.shapes.devs.Model.prototype.defaults)

});

joint.shapes.devs.Atomic = joint.shapes.devs.Model.extend({

    defaults: joint.util.deepSupplement({

        type: 'devs.Atomic',
        size: { width: 160, height: 80 },
        attrs: {
            '.body': { fill: 'salmon' },
            '.label': { text: 'Уровень' },
            '.inPorts .port-body': { fill: 'PaleGreen' },
            '.outPorts .port-body': { fill: 'Tomato' }
        }

    }, joint.shapes.devs.Model.prototype.defaults)

});

joint.shapes.devs.Coupled = joint.shapes.devs.Model.extend({

    defaults: joint.util.deepSupplement({

        type: 'devs.Coupled',
        size: { width: 200, height: 300 },
        attrs: {
            '.body': { fill: 'seaGreen' },
            '.label': { text: 'Объект' },
            '.inPorts .port-body': { fill: 'PaleGreen' },
            '.outPorts .port-body': { fill: 'Tomato' }
        }

    }, joint.shapes.devs.Model.prototype.defaults)
});

joint.shapes.devs.Link = joint.dia.Link.extend({
    defaults: {
        type: 'devs.Link',
        attrs: {
          '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'black' },
          '.connection' : { 'stroke-width' :  2 }
        }
    }
});

joint.shapes.devs.Implementation = joint.dia.Link.extend({
  defaults: {
    type: 'devs.Implementation',
    attrs: {
      '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'black' },
      '.connection': { 'stroke-dasharray': 2 }
    }
  }
});

joint.shapes.devs.ModelView = joint.dia.ElementView.extend(joint.shapes.basic.PortsViewInterface);
joint.shapes.devs.AtomicView = joint.shapes.devs.ModelView;
joint.shapes.devs.CoupledView = joint.shapes.devs.ModelView;
joint.shapes.devs.RateView = joint.shapes.devs.ModelView;

if (typeof exports === 'object') {

    module.exports = joint.shapes.devs;
}
