/*eslint-env browser*/
/*eslint-env jquery*/

/*
    Yepaa ! ça marche !
    
    
    TODOS BIS :
    1. Preparer les layers (ne pas appeler directement mainCanvas mais un jimpaint.getCurrentLayer) // bof jQ ? natif ?
    2. 
*/



var jimpaint = {
    tools: {
        void: {
            // The built-in "void" tool
            options: {
                cursor: 'not-allowed'
            },
            initFunction: function () {
                // do nothing
            }
        }
    },
    canvas: {
        //toolCanvas + mainCanvas ( populated by this.init() )
    },
    init: function () {

        this.canvas.mainCanvas = $('#main-canvas');
        this.layers.defaultLayer.canvas = this.canvas.mainCanvas[0]; // elt DOM natif
        this.layers.currentLayer = this.layers.defaultLayer;

        this.canvas.toolCanvas = $('#tool-canvas');
        this.layers.workingLayer.canvas = this.canvas.toolCanvas[0]; //elt DOM natif


        var toolKeys = Object.keys(jimpaint.tools);
        for (var i = 0; i < toolKeys.length; i++) {
            if (toolKeys[i] != 'void') {
                var leTool = jimpaint.tools[toolKeys[i]];
                var iconClass = 'fa fa-' + leTool.options.icon;
                var toolButton = $('<li><span class="label">' + leTool.options.name + '</label></li>');
                toolButton.addClass(iconClass);
                toolButton.attr('data-tool', toolKeys[i]);
                $('#toolbox .tools').append(toolButton);
            }
        }

        // Controls ***
        $('.drag-me').draggable({ handle: '.handle'});

        $('#toolbox .tools li').click(function () {
            $('#toolbox .tools li').removeClass('selected');
            $(this).addClass('selected');

            jimpaint.toggleTool($(this).data('tool'));
            
            jimpaint.canvas.toolCanvas.focus()

        })

        $('#toolbox .params input[data-param]').change(function () {
            jimpaint.currentParams[$(this).data('param')] = $(this).val();
            jimpaint.canvas.toolCanvas.focus()
        });
        
        




        //** init to void
        jimpaint.canvas.mainCanvas.attr('width', $(window).width()); // (impossible de la faire en css, ça fait buguer les canvas...)
        jimpaint.canvas.mainCanvas.attr('height', $(window).height()); // TODO redim

        jimpaint.canvas.toolCanvas.attr('width', $(window).width());
        jimpaint.canvas.toolCanvas.attr('height', $(window).height()); // TODO mes remarques que plus haut

        jimpaint.toggleTool('void');
    },
    addTool: function (toolId, toolObject) {
        jimpaint.tools[toolId] = toolObject;
    },
    toggleTool: function (toolName) {
        this.currentTool = jimpaint.tools[toolName] != undefined ? jimpaint.tools[toolName] : jimpaint.tools['void'];

        if (this.currentTool.initFunction != undefined) {
            this.currentTool.initFunction();
        }

        jimpaint.canvas.toolCanvas.css('cursor', this.currentTool.options.cursor != undefined ? this.currentTool.options.cursor : 'default');

        jimpaint.canvas.toolCanvas.off();
        jimpaint.canvas.toolCanvas.on('click', this.currentTool.clickHandler != undefined ? this.currentTool.clickHandler : false);
        jimpaint.canvas.toolCanvas.on('mousemove', this.currentTool.mouseMoveHandler != undefined ? this.currentTool.mouseMoveHandler : false);
        jimpaint.canvas.toolCanvas.on('mousenter', this.currentTool.mouseMoveHandler != undefined ? this.currentTool.mouseMoveHandler : false);
        jimpaint.canvas.toolCanvas.on('mouseup', this.currentTool.mouseUpHandler != undefined ? this.currentTool.mouseUpHandler : false);
        jimpaint.canvas.toolCanvas.on('mousedown', this.currentTool.mouseDownHandler != undefined ? this.currentTool.mouseDownHandler : false);
        jimpaint.canvas.toolCanvas.on('keydown', this.currentTool.keyDownHandler != undefined ? this.currentTool.keyDownHandler : false);
        jimpaint.canvas.toolCanvas.on('keyup', this.currentTool.keyUpHandler != undefined ? this.currentTool.keyUpHandler : false);
        jimpaint.canvas.toolCanvas.focus();
        //canvas.on()
    },
    stroke: function (canvasContext) {
        canvasContext.strokeStyle = this.currentParams.strokeColor;
        canvasContext.lineWidth = this.currentParams.lineWidth;
        canvasContext.stroke();
    },
    fill: function (canvasContext) {
        canvasContext.fillStyle = this.currentParams.fillColor;
        canvasContext.fill();
    },
    commitAction: function(){
        var layerThumb = jimpaint.layers.currentLayer.canvas.toDataURL('image/png');
        $('#layers .layer.current img').attr('src',layerThumb);
    },
    currentTool: {},
    layers: {
        workingLayer: {
            // .canvas: toolCanvas
        },

        defaultLayer: {
            // pour l'instant l'unique calque
            // .canvas: mainCanvas
        },
        currentLayer: {}
    },
    currentParams: {
        strokeColor: "#007",
        fillColor: "#FFFF00",
        brushWidth: 10,
        lineWidth: 5
    }
};




$(document).ready(function () {

    jimpaint.init();

})
