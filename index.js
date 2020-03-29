var cnv,ctx,f,path=[]
var W=800,H=800,SKIP=5,T=0



function init(){
	cnv=document.createElement("canvas")
	cnv.width=W
	cnv.height=H
	document.body.appendChild(cnv)
	ctx=cnv.getContext("2d")
	f=fourier(FOURIER,SKIP)
	requestAnimationFrame(draw)
}



function draw(){
	ctx.clearRect(0,0,cnv.width,cnv.height)
	ctx.fillStyle="#000000"
	ctx.fillRect(0,0,cnv.width,cnv.height)
	var p=draw_fourier(f,T,[cnv.width/2,100],[100,cnv.height/2],Math.PI/2,0)
	path.push(p)
	ctx.lineWidth=5
	ctx.beginPath()
	ctx.moveTo(path[0].x,path[0].y)
	for (var p of path){
		ctx.lineTo(p.x,p.y)
	}
	ctx.stroke()
	ctx.lineWidth=1
	T+=2*Math.PI/f[0].length
	if (T>=2*Math.PI){
		T=0
		path=[]
	}
	requestAnimationFrame(draw)
}




document.addEventListener("DOMContentLoaded",init,false)