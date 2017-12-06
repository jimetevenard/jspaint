// ########## Outil pinceau
var brushTool = {
    options: {
        cursor: 'crosshair', // TODO une image de pinceau
        name: 'Pinceau',
        icon: 'paint-brush'
    },
    mouseDownHandler: function (event) {
        brushTool.workingData.isMouseDown = true;
        brushTool.utils.doBrushPoint(event.pageX, event.pageY);
    },
    mouseUpHandler: function () {
        brushTool.workingData.isMouseDown = false;
        
        jimpaint.commitAction();
    },
    mouseMoveHandler: function (event) {
        if (brushTool.workingData.isMouseDown) {
            brushTool.utils.doBrushPoint(event.pageX, event.pageY);
        }
    },
    utils: {
        doBrushPoint: function (x, y) {
            var c = jimpaint.layers.currentLayer.canvas.getContext('2d');
            c.beginPath();
            c.arc(x, y, jimpaint.currentParams.brushWidth, 0, 2 * Math.PI);

            jimpaint.fill(c); // fill avec les parametre utilisateur
            
        }
    },
    workingData: {
        isMouseDown: false,
    }
}; //  tool pinceau

jimpaint.addTool('brush',brushTool);