// tool ellipse
var ellipseTool = {
    options: {
        cursor: 'crosshair', // TODO une image de pinceau
        name: 'Ellipse',
        icon: 'circle-thin'
    },
    initFunction: function(){
        ellipseTool.workingData.shiftPressed = false;
        ellipseTool.workingData.firstPointDone = false;
    },
    clickHandler: function (event) {
        if (!ellipseTool.workingData.firstPointDone) {
            ellipseTool.workingData.firstPointX = event.pageX;
            ellipseTool.workingData.firstPointY = event.pageY;


            ellipseTool.workingData.firstPointDone = true;
        } else {

            // go
            // on efface dabord le workingLayer
            var wc = jimpaint.layers.workingLayer.canvas.getContext('2d');
            wc.clearRect(0, 0, wc.canvas.width, wc.canvas.height);
            
            var rc = jimpaint.layers.currentLayer.canvas.getContext('2d');
            rc.beginPath();
            var distanceX = Math.abs(event.pageX - ellipseTool.workingData.firstPointX);
            var distanceY;
            if(ellipseTool.workingData.shiftPressed){
                distanceY = distanceX;
            } else {
              distanceY  = Math.abs(event.pageY - ellipseTool.workingData.firstPointY);
            }
            
            rc.ellipse(ellipseTool.workingData.firstPointX, ellipseTool.workingData.firstPointY,
                distanceX, distanceY,
                45 * Math.PI / 180, 0, 2 * Math.PI);

            jimpaint.stroke(rc);
            jimpaint.fill(rc);
            
            ellipseTool.workingData.firstPointDone = false;
            
            jimpaint.commitAction();
        }
    },
    mouseMoveHandler: function (event) {
        if (ellipseTool.workingData.firstPointDone) {
            var c = jimpaint.layers.workingLayer.canvas.getContext('2d');
            c.clearRect(0, 0, c.canvas.width, c.canvas.height);

            c.beginPath();
            var distanceX = Math.abs(event.pageX - ellipseTool.workingData.firstPointX);
            var distanceY;
            if(ellipseTool.workingData.shiftPressed){
                distanceY = distanceX;
            } else {
              distanceY  = Math.abs(event.pageY - ellipseTool.workingData.firstPointY);
            }
            
            c.ellipse(ellipseTool.workingData.firstPointX, ellipseTool.workingData.firstPointY,
                distanceX, distanceY,
                45 * Math.PI / 180, 0, 2 * Math.PI);
            // TODO : factoriser ce code qui est dupliqué !

            jimpaint.stroke(c);
            jimpaint.fill(c);
        }
    },
    keyDownHandler: function(event){
        if(event.shiftKey){
            ellipseTool.workingData.shiftPressed = true;
        }
    },
     keyUpHandler: function(){
         ellipseTool.workingData.shiftPressed = false;
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

jimpaint.addTool('ellipse', ellipseTool);
