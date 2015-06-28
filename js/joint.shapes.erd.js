if (typeof exports === 'object') {

    var joint = {
        util: require('../src/core').util,
        shapes: {},
        dia: {
            Element: require('../src/joint.dia.element').Element,
            Link: require('../src/joint.dia.link').Link
        }
    };
}


joint.shapes.erd = {};

joint.shapes.erd.Rate = joint.dia.Element.extend({

  markup: '<g class="editor-element rotatable model-rate model-blockly"><g class="scalable"><polygon/></g><text/></g>',

  defaults: joint.util.deepSupplement({

    type: 'erd.Rate',
    size: { width: 150, height: 60 },
    attrs: {
      polygon: {
        points: '0,0 30,20 130,20 160,0 130,-20 30,-20',
        fill: '#F1C40F', stroke: '#F39C12', 'stroke-width': 2
      },
      text: {
        text: 'Rate', 'font-size': 14,
        ref: 'polygon', 'ref-x': .5, 'ref-y': .5,
        'x-alignment': 'middle', 'y-alignment': 'middle'
      }
    }

  }, joint.dia.Element.prototype.defaults)

});

joint.shapes.erd.Level = joint.dia.Element.extend({

    markup: '<g class="rotatable editor-element model-level"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'erd.Level',
        size: { width: 150, height: 60 },
        attrs: {
            '.outer': {
                fill: '#FFFFFF', stroke: '#000000', 'stroke-width': 2,
                points: '100,0 100,60 0,60 0,0'
            },
            '.inner': {
                fill: '#FFFFFF', stroke: '#000000', 'stroke-width': 2,
                points: '95,5 95,55 5,55 5,5',
                display: 'none'
            },
            text: {
                text: 'Level',
                'font-family': 'Arial', 'font-size': 14,
                ref: '.outer', 'ref-x': .5, 'ref-y': .5,
                'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.erd.Var = joint.shapes.basic.Circle.extend({
   markup: '<g class="rotatable editor-element model-var model-blockly"><g class="scalable"><circle/></g><text/></g>',
   defaults: joint.util.deepSupplement({
       type: 'erd.Var',
       size: { width: 80, height: 80 },
       attrs: {
         circle: { fill: '#34B625', stroke: '#0E5E05', r: 30, transform: 'translate(30, 30)', 'stroke-width': 2},
         text: { 'font-weight': '800', 'font-size': 12 }
       }
   }, joint.shapes.basic.Circle.prototype.defaults)
});

joint.shapes.erd.Upper = joint.dia.Element.extend({

    markup: '<g class="rotatable model-upper"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'erd.Upper',
        size: { width: 150, height: 60 },
        attrs: {
            '.outer': {
                fill: '#9E2121', stroke: '#000000', 'stroke-width': 2,
                points: '100,0 100,60 0,60 0,0'
            },
            '.inner': {
                fill: '#9E2121', stroke: '#000000', 'stroke-width': 2,
                points: '95,5 95,55 5,55 5,5',
                display: 'none'
            },
            text: {
                text: 'Верхний уровень',
                'font-family': 'Arial', 'font-size': 14,
                ref: '.outer', 'ref-x': .5, 'ref-y': .5,
                'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.erd.Object = joint.dia.Element.extend({

    markup: '<g class="rotatable editor-element model-object"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'erd.Object',
        size: { width: 150, height: 60 },
        attrs: {
            '.outer': {
                fill: '#878787', stroke: '#000000', 'stroke-width': 2,
                points: '100,0 100,60 0,60 0,0'
            },
            '.inner': {
                fill: '#878787', stroke: '#000000', 'stroke-width': 2,
                points: '95,5 95,55 5,55 5,5',
                display: 'none'
            },
            text: {
                text: 'Object',
                'font-family': 'Arial', 'font-size': 14,
                ref: '.outer', 'ref-x': .5, 'ref-y': .5,
                'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.erd.Line = joint.dia.Link.extend({

    defaults: { type: "erd.Line" },

    cardinality: function(value) {
        this.set('labels', [{ position: -20, attrs: { text: { dy: -8, text: value }}}]);
    }
});

joint.shapes.erd.Dependence = joint.dia.Link.extend({
  defaults: {
    type: 'erd.Dependence',
    attrs: {
      '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: 'black' },
      '.connection': { 'stroke-width': 2, 'stroke-dasharray': 2 }
    }
  }
});

joint.shapes.erd.Influence = joint.dia.Link.extend({
  defaults: {
    type: 'erd.Influence',
    attrs: {
      '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: 'black' },
      '.connection': { 'stroke-width': 1 }
    }
  }
});

if (typeof exports === 'object') {

    module.exports = joint.shapes.erd;
}
