function fourier(_pts,SKIP){
	var pts=[]
	for (var i=0;i<_pts.length;i+=SKIP){
		pts.push(_pts[i])
	}
	var fX=[],fY=[]
	for (var i=0;i<pts.length;i++){
		var sX={r:0,i:0}
		for (var j=0;j<pts.length;j++){
			var a=Math.PI*2*i*j/pts.length
			sX.r+=pts[j].x*Math.cos(a)
			sX.i-=pts[j].x*Math.sin(a)
		}
		fX[i]={r:sX.r/pts.length,i:sX.i/pts.length,f:i,a:Math.sqrt(sX.r/pts.length*sX.r/pts.length+sX.i/pts.length*sX.i/pts.length),p:Math.atan2(sX.r/pts.length,sX.i/pts.length)}
		var sY={r:0,i:0}
		for (var j=0;j<pts.length;j++){
			var a=Math.PI*2*i*j/pts.length
			sY.r+=pts[j].y*Math.cos(a)
			sY.i-=pts[j].y*Math.sin(a)
		}
		fY[i]={r:sY.r/pts.length,i:sY.i/pts.length,f:i,a:Math.sqrt(sY.r/pts.length*sY.r/pts.length+sY.i/pts.length*sY.i/pts.length),p:Math.atan2(sY.r/pts.length,sY.i/pts.length)}
	}
	fX.sort((a,b)=>b.a-a.a)
	fY.sort((a,b)=>b.a-a.a)
	return [fX,fY]
}
function draw_fourier(f,t,pX,pY,rX,rY){
	for (var fx of f[0]){
		var ppX=[...pX]
		ctx.strokeStyle="#ffffff"
		ctx.globalAlpha=0.4
		ctx.beginPath()
		ctx.arc(ppX[0],ppX[1],fx.a*2,0,Math.PI*2)
		ctx.stroke()
		ctx.globalAlpha=1
		pX[0]+=fx.a*Math.cos(fx.f*t+fx.p+rX)
		pX[1]+=fx.a*Math.sin(fx.f*t+fx.p+rX)
		ctx.beginPath()
		ctx.moveTo(ppX[0],ppX[1])
		ctx.lineTo(pX[0],pX[1])
		ctx.stroke()
	}
	for (var fy of f[1]){
		var ppY=[...pY]
		ctx.strokeStyle="#ffffff"
		ctx.globalAlpha=0.4
		ctx.beginPath()
		ctx.arc(ppY[0],ppY[1],fy.a,0,Math.PI*2)
		ctx.stroke()
		ctx.globalAlpha=1
		pY[0]+=fy.a*Math.cos(fy.f*t+fy.p+rY)
		pY[1]+=fy.a*Math.sin(fy.f*t+fy.p+rY)
		ctx.beginPath()
		ctx.moveTo(ppY[0],ppY[1])
		ctx.lineTo(pY[0],pY[1])
		ctx.stroke()
	}
	ctx.beginPath()
	ctx.moveTo(pX[0],pX[1])
	ctx.lineTo(pX[0],pY[1])
	ctx.moveTo(pY[0],pY[1])
	ctx.lineTo(pX[0],pY[1])
	ctx.stroke()
	return {x:pX[0],y:pY[1]}
}