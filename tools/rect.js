// tool ellipse
var rectTool = {
    options: {
        cursor: 'crosshair', // TODO une image de pinceau
        name: 'Rectangle',
        icon: 'object-ungroup'
    },
    initFunction: function(){
        rectTool.workingData.shiftPressed = false;
        rectTool.workingData.firstPointDone = false;
    },
    clickHandler: function (event) {
        if (!rectTool.workingData.firstPointDone) {
            rectTool.workingData.firstPointX = event.pageX;
            rectTool.workingData.firstPointY = event.pageY;


            rectTool.workingData.firstPointDone = true;
        } else {

            // go
            // on efface le working
            var wc = jimpaint.layers.workingLayer.canvas.getContext('2d');
            wc.clearRect(0, 0, wc.canvas.width, wc.canvas.height);
            
            var rc = jimpaint.layers.currentLayer.canvas.getContext('2d');
            rc.beginPath();
            
            rc.beginPath();
            rc.moveTo(rectTool.workingData.firstPointX,rectTool.workingData.firstPointY);
            rc.lineTo(rectTool.workingData.secondPointX, rectTool.workingData.firstPointY);
            rc.lineTo(rectTool.workingData.secondPointX,rectTool.workingData.secondPointY);
            rc.lineTo(rectTool.workingData.firstPointX, rectTool.workingData.secondPointY);
            rc.closePath();
            
            // TODO : factoriser ce code qui est dupliqué !
            

            jimpaint.stroke(rc);
            jimpaint.fill(rc);
            
            rectTool.workingData.firstPointDone = false;
        }
    },
    mouseMoveHandler: function (event) {
        if (rectTool.workingData.firstPointDone) {
            
            rectTool.workingData.secondPointX = event.pageX;
            
            if(rectTool.workingData.shiftPressed){
                rectTool.workingData.secondPointY = rectTool.workingData.firstPointY + Math.abs(event.pageX - rectTool.workingData.firstPointX);
            } else {
                rectTool.workingData.secondPointY = event.pageY;
            }
            
            
            var c = jimpaint.layers.workingLayer.canvas.getContext('2d');
            c.clearRect(0, 0, c.canvas.width, c.canvas.height);
            
            

            c.beginPath();
            c.moveTo(rectTool.workingData.firstPointX,rectTool.workingData.firstPointY);
            c.lineTo(rectTool.workingData.secondPointX, rectTool.workingData.firstPointY);
            c.lineTo(rectTool.workingData.secondPointX,rectTool.workingData.secondPointY);
            c.lineTo(rectTool.workingData.firstPointX, rectTool.workingData.secondPointY);
            c.closePath();
            

            jimpaint.stroke(c);
            jimpaint.fill(c);
        }
    },
    keyDownHandler: function(event){
        if(event.shiftKey){
            rectTool.workingData.shiftPressed = true;
        }
    },
     keyUpHandler: function(){
         rectTool.workingData.shiftPressed = false;
     },
    workingData: {
        firstPointDone: false,
        shiftPressed: false,
        firstPointX: 0,
        firstPointY: 0,
        secondPointX: 0,
        secondPointY: 0
    }
}; // ellipse tool

jimpaint.addTool('rect', rectTool);
