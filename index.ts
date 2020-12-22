const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 5 
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 12.9 
const barFactor : number = 5.9 
const delay : number = 20 
const colors : Array<string> = [
    "#F44336",
    "#3F51B5",
    "#4CAF50",
    "#FF9800",
    "#795548"
]
const backColor : string = "#BDBDBD"

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number  {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawLineDivideExpand(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        const barSize : number = Math.min(w, h) / barFactor 
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            const sj : number = 1 - 2 * j 
            context.save()
            context.scale(sj, 1)
            for (var k = 0; k < 2; k++) {
                context.save()
                context.scale(1, 1 - 2 * k)
                context.translate((w / 2 - size) * sf2, barSize * sf3)
                DrawingUtil.drawLine(context, 0, 0, size * sf1, 0)
                context.fillRect(0, -(barSize) * sf4, size, barSize * sf4)
                context.restore()
            }
            context.restore()
        }
        context.restore()
    }
    
    static drawLDENode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawLineDivideExpand(context, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {
            
        }
    }
    
    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}