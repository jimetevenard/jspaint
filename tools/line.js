var lineTool = {
    options: {
        cursor: 'crosshair',
        name: 'Ligne',
        icon: 'arrows-h'
    },
    clickHandler: function (event) {
        if (lineTool.workingData.firstPointDone) {
            jimpaint.canvas.toolCanvas.css('background', 'transparent');

            var tc = jimpaint.layers.workingLayer.canvas.getContext('2d'); 
            tc.clearRect(0, 0, tc.canvas.width, tc.canvas.height);

            var c = jimpaint.layers.currentLayer.canvas.getContext('2d');
            c.beginPath();
            c.moveTo(lineTool.workingData.firstPointX, lineTool.workingData.firstPointY);
            c.lineTo(event.pageX, event.pageY);

            jimpaint.stroke(c); // stroke avec les paramètres en cours
            
            lineTool.workingData.firstPointDone = false;
            
            jimpaint.commitAction();
        } else {
            lineTool.workingData.firstPointDone = true;
            // mouseMoveHandler fera le reste...
        }
    },
    mouseMoveHandler: function (event) {
        if (!(lineTool.workingData.firstPointDone)) {
            lineTool.workingData.firstPointX = event.pageX;
            lineTool.workingData.firstPointY = event.pageY;
            //console.log(lineTool.workingData.firstPointX);
        } else {
            var c = jimpaint.canvas.toolCanvas[0].getContext('2d');
            c.clearRect(0, 0, jimpaint.layers.workingLayer.canvas.width, jimpaint.layers.workingLayer.canvas.height);
            c.beginPath();
            c.moveTo(lineTool.workingData.firstPointX, lineTool.workingData.firstPointY);
            c.lineTo(event.pageX, event.pageY);
            // TODO : factoriser ce code qui est dupliqué !

            jimpaint.stroke(c); // stroke avec les paramètres en cours
        }
    },
    workingData: {
        firstPointDone: false,
        firstPointX: 0,
        firstPointY: 0,
        secondPointX: 0,
        secondPointY: 0
    }
}; // line tool

jimpaint.addTool('line', lineTool);