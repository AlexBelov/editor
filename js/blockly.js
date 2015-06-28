Blockly.inject(document.getElementById('blocklyDiv'), {toolbox: document.getElementById('toolbox')});
Blockly.mainWorkspace.clear();
$('#blocklyBase').addClass('not-visible');

var jointjsElement;

paper.on('cell:pointerdown',
    function (cellView, evt, x, y) {
        $('.container').addClass('hidden');
        $('#blocklyBase').removeClass('not-visible');

        jointjsElement = cellView.model;

        Blockly.mainWorkspace.clear();

        var xml = Blockly.Xml.textToDom(jointjsElement.attributes.blockly_xml);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
);

$('#blocklySave').click(function () {
        var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        var xml_text = Blockly.Xml.domToText(xml);
        $('.container').removeClass('hidden');
        $('#blocklyBase').addClass('not-visible');

        jointjsElement.attributes.blockly_xml = xml_text;
    }
);

$('#blocklyBack').click(function () {
        $('.container').removeClass('hidden');
        $('#blocklyBase').addClass('not-visible');
    }
);
