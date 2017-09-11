/**
 * Created by lixiang on 17/1/16.
 */

(function (){

    if(true){
        loadimg();
    }else {
        noloading();
        animt5(100)
    }
    setPerc('#view','#main')
    setRem();


})()
document.addEventListener('touchstart',function (ev){
        ev.preventDefault();
})
//设置景深的视配



function setPerc(contains,children){
    resetview();
    window.onresize = resetview;
    function resetview(){
        var view = document.querySelector(contains);
        var main = document.querySelector(children);
        var deg = 52.5;//是参照原网站
        var height = document.documentElement.clientHeight;
        var R = Math.round(Math.tan(deg/180*Math.PI)*height*.5);
        view.style.WebkitPerspective = view.style.perspective = R + "px";  //最外层 
        css(main,"translateZ",R);    //里面那层  第一层子集
    }
}


function setRem(){
    var oHtml = document.documentElement;
    var iWidth = oHtml.clientWidth;
    oHtml.style.fontSize = iWidth/16 + 'px';
    window.addEventListener('resize',setRem);
}


function loadimg(fn){

    var imgs=[];
    var count=0;
    var loadText=document.querySelector('.logoText');

    for(var name in imgData){
        imgs= imgs.concat(imgData[name])
    }

    for(var i=0;i<imgs.length;i++){
        var img= new Image();
        img.src=imgs[i];
        img.onload=function (){
            count++;
            loadText.innerHTML = "已加载 "+(Math.floor(count/imgs.length*100))+"%";
            if(count==imgs.length){
                animt()
            }
        }
    }
}

function noloading(){
    var logo1=document.querySelector('#logo1');
    var view=document.querySelector('#view');
    view.removeChild(logo1);
}

function animt(){
    var view=document.querySelector('#view');
    var logo1=document.querySelector('#logo1');
    var logo2=document.createElement('div');
    var logo3=document.createElement('div');
    var img=new Image();
    var img2=new Image();
    img.src=imgData.logo[0];
    img2.src=imgData.logo[1];
    logo3.id="logo3";
    logo2.id="logo2";
    logo3.className=logo2.className='logoImg';

    logo2.appendChild(img);
    logo3.appendChild(img2);

    css(logo2,'translateZ','-2000');
    css(logo3,'translateZ','-2000');
    css(logo3,'opacity','0');

    MTween({
        el:logo1,
        target:{
            opacity:0
        },
        time:1000,
        type:'easeOut',
        callBack:function (){
            view.removeChild(logo1)
            view.appendChild(logo2);
            view.appendChild(logo3);
            MTween({
                el:logo2,
                target:{
                    'translateZ':0
                },
                time:400,
                type:"easeBoth",
                callBack:animt2
            })
        }
    })
}

function animt2(){
    var view=document.querySelector('#view');
    var logo2=document.querySelector('#logo2');
    var logo3=document.querySelector('#logo3');

    setTimeout(function (){
        MTween({
            el:logo2,
            target:{
                'translateZ':'-2000',
            },
            time:800,
            type:'easeIn',
            callBack:function (){
                view.removeChild(logo2)
            
                css(logo3,'opacity','100');
                MTween({
                    el:logo3,
                    target:{
                        'translateZ':0,
                    },
                    time:400,
                    type:"easeBoth",
                    callBack:animt3
                })
            }
        })
    },2000)
}

function animt3(){
    var view=document.querySelector('#view');
    var logo3=document.querySelector('#logo3');


    setTimeout(function (){
        MTween({
            el:logo3,
            target:{
                'translateZ':'-2000',
            },
            time:600,
            type:'easeIn',
            callBack:function (){
                view.removeChild(logo3);
                animt4();

            }
        })
    },2000)
}

function animt4(){
    var view=document.querySelector('#view');
    var logo4=document.createElement('div');
    var logo4img=new Image();
    logo4img.src=imgData.logo[2];
    var logoIcos=document.createElement('div');
    var iconsLength=40;
    logo4.id='logo4';
    logo4img.className='logo4Img';
    logoIcos.id='logoIcos';

    for(var i=0; i<iconsLength;i++){
        var span=document.createElement('span');
        span.style.backgroundImage='url('+imgData.logoIco[i%imgData.logoIco.length]+')';
        var xR=50+Math.round(Math.random()*200);
        var xDeg = Math.round(Math.random()*360);
        var yR=100+Math.round(Math.random()*100);
        var yDeg=i*(360/iconsLength)+Math.round((Math.random() -.5)*20);
        css(span,'rotateY',xDeg);
        css(span,'translateZ',xR)
        css(span,'rotateX',yDeg);
        css(span,'translateY',yR)
        logoIcos.appendChild(span);
    }
    css(logo4,'scale',0);
    logo4.appendChild(logo4img)
    logo4.appendChild(logoIcos)
    view.appendChild(logo4)

        MTween({
            el:logo4,
            target:{
                scale:200
            },
            time:400,
            type:'easeIn',
            callBack:function (){
               setTimeout(function (){
                    MTween({
                        el:logo4,
                        target:{
                            scale:0,translateZ:'-500'
                        },
                        time:2000,
                        type:'easeIn',
                        callBack:function (){
                            view.removeChild(logo4)
                            animt5()
                        }
                    })
               },100)
            }
        })
}

//主场开始
function animt5(rotateY){
    var tZ=document.querySelector('#tZ');
    css(tZ,'translateZ',-2000);
    animt7();
    animt6(rotateY);
    createPano(rotateY);
    allTag(rotateY);
    tagShow();

    MTween({
        el:tZ,
        target:{
             translateZ:-200
        },
        time:3600,
        type:'easeBoth'
    })
}

//生成圆柱
function animt6(rotateY){

    var panoBg=document.querySelector('#panoBg');
    var _len=imgData.bg.length;
    var deg=360/_len;
    var width=129;

    var R=parseInt(Math.round(Math.tan((180-deg)/2*Math.PI/180)*(width/2)))-1;

    // var R= Math.floor(width / 2 / Math.tan(Math.PI / _len)) - 1;

    var startDeg=180;
    css(panoBg,'rotateX',0);
    css(panoBg,"rotateY",-695);
    for(var i=0;i<imgData.bg.length;i++){

        var span=document.createElement('span');
        css(span,'rotateY',startDeg);
        css(span,'translateZ',-R);
        span.style.backgroundImage='url('+imgData.bg[i]+')';
        panoBg.appendChild(span);
        startDeg-=deg;
        span.style.display='none'

    }
    var num=0;
    var timer=setInterval(function (){
        panoBg.children[num].style.display='block';
        num++
        if(num>=panoBg.children.length){
            clearInterval(timer)
        }
    },3600/2/20);

    MTween({
        el:panoBg,
        target:{
            rotateY:rotateY||25,
        },
        time:3600,
        type:'linear',
        callBack:function (){
            setDrag();
            setSensors();

        }
    })

}

function animt7(){
    var tZ=document.querySelector('#tZ');
    var cloud=document.querySelector('#cloud');
    var oTag=document.querySelector('#panoDots')
    var num=0;

    css(cloud,'translateZ',-400);

    for(var i=0;i<9;i++){
        var span=document.createElement('span');
        var R=200+Math.random()*150;
        var deg=360/9*i;
        span.style.backgroundImage='url('+imgData.cloud[i%3]+')';
        var x=Math.sin(deg*Math.PI/180)*R;
        var z=Math.cos(deg*Math.PI/180)*R;
        var y=(Math.random()-0.5)*200;
        css(span,'translateZ',z);
        css(span,'translateX',x);
        css(span,'translateY',y);
        span.style.display='none';
        cloud.appendChild(span)
    }
    
    var timer=setInterval(function (){
        cloud.children[num].style.display='block';
        num++;
        if(num>=cloud.children.length){
            clearInterval(timer);
        }
    },100)

    MTween({
        el:cloud,
        target:{
            rotateY:540
        },
        time:3500,
        type:'easeIn',
        callIn:function (){
            var deg=-css(cloud,'rotateY');
            for(var i=0;i<cloud.children.length;i++){
                css(cloud.children[i],'rotateY',deg)
            }
        },
        callBack:function (){
            tZ.removeChild(cloud);
            bgShow();
            infoShow();
            closeInfo();
        }
    })

}


function setSensors(){
    var pano=document.querySelector('#pano');
    var panoBg=document.querySelector('#panoBg');
    var tZ=document.querySelector('#tZ');
    var panoDots=document.querySelector('#panoDots');
    var dir = window.orientation;
    window.isStart=false;
    window.isTouch=false;
    var start={x:0,y:0};
    var startPonit={x:0,y:0}
    var now={x:0,y:0}
    var lastTime=Date.now();

    window.addEventListener('orientationchange', function(e) {
        dir = window.orientation;
    });


    window.addEventListener('deviceorientation', function(e){
        if(isTouch) return ;
        var nowTime=Date.now();
        var beta = Math.round(e.beta);
        var gamma = Math.round(e.gamma);
        var alpha = Math.round(e.alpha);

        switch(dir){
            case 0:
                var x = beta;
                var y = gamma + alpha;
                break;
            case 90:
                var x = gamma;
                var y = beta + alpha;
                break;
            case -90:
                var x = -gamma;
                var y = -(beta + alpha);
                break;
            case 180:
                var x = -beta;
                var y = -(gamma + alpha);
                break;
            default:
                var x = beta;
                var y = gamma + alpha;
        }

        y = y%360;
        y = y < 0 ? y+360:y;

        if(nowTime-lastTime<30){
            return ;
        }
        lastTime=nowTime;

        if(!isStart) {
            startPonit.y = css(panoBg,'rotateY');
            startPonit.x = css(panoBg,'rotateX');
            start.x=x;
            start.y=y;
            isStart = true;
        }
        else {
            now.x=x;
            now.y=y;
            var dis={}
            dis.x=(now.x-start.x)*.5;
            dis.y=now.y-start.y;

            var deg={};
            deg.x=startPonit.x+dis.x;
            deg.y=startPonit.y-dis.y;

            if(deg.x < -35){
                deg.x = -35;
            } else if(deg.x > 35){
                deg.x = 35;
            }

            if( deg.y - css(panoBg,'rotateY') > 180) {
                deg.y -= 360;
            } else if (deg.y - css(panoBg,'rotateY') < -180){
                deg.y += 360;
            }

            MTween({
                el:panoBg,
                target:{
                    rotateX:deg.x,
                    rotateY:deg.y
                },
                time:100,
                type:'easeOut',
                callBack:function (){
                    var deg = css(panoBg,'rotateY');
                    css(panoBg,'rotateY',(deg+360)%360);
                }
            })

            MTween({
                el:pano,
                target:{
                    rotateX:deg.x,
                    rotateY:deg.y
                },
                time:100,
                type:'easeOut',
                callBack:function (){
                    var deg = css(pano,'rotateY');
                    css(pano,'rotateY',(deg+360)%360);
                }
            })

            MTween({
                el:panoDots,
                target:{
                    rotateX:deg.x,
                    rotateY:deg.y
                },
                time:100,
                type:'easeOut',
                callBack:function (){

                    var deg = css(panoDots,'rotateY');
                    css(panoDots,'rotateY',(deg+360)%360);
                }
            })


            tagShow();
        }
    });
}


function setDrag(){
    var pano=document.querySelector('#pano');
    var panoBg=document.querySelector('#panoBg');
    var tZ=document.querySelector('#tZ');
    var panoDots=document.querySelector('#panoDots');

    var startPoint={x:0};
    var startEl={x:0};
    var scaleX=129/18;
    var scaleY=1170/70;
    var lastDeg={x:0,y:0};
    var lastDis={x:0,y:0};
    var startZ=css(tZ,'translateZ');

    document.addEventListener('touchstart',function (ev){

       window.isStart=true;
       window.isTouch=true;
       clearInterval(panoBg.timer);
       clearInterval(tZ.timer);
       clearInterval(pano.timer);
       clearInterval(panoDots.timer);
       startPoint.x=ev.changedTouches[0].pageX;
       startEl.x=css(panoBg,'rotateY');

       startPoint.y=ev.changedTouches[0].pageY;
       startEl.y=css(panoBg,'rotateX');

    })
    document.addEventListener('touchmove',function (ev){
        var nowPonint={x:0,y:0};
            nowPonint.x=ev.changedTouches[0].pageX;
            nowPonint.y=ev.changedTouches[0].pageY;
        var disX=nowPonint.x-startPoint.x;
        var disY=nowPonint.y-startPoint.y;

        var disDegX=-disX/scaleX;
        var disDegY=disY/scaleY;

        lastDis.x=(startEl.x+disDegX)-lastDeg.x;
        lastDeg.x=startEl.x+disDegX;

        lastDis.y=(startEl.y+disDegY)-lastDeg.y;
        lastDeg.y=startEl.y+disDegY;

        if(Math.abs(disX)>300){
            disX=300;
        }
        var endDegY=startEl.y+disDegY;
        var endDegX=startEl.x+disDegX;

        var panoEndY=startEl.y+disDegY*.95;
        var panoEndX=startEl.x+disDegX*.95;

        if(endDegY>35){
            endDegY=35;
        }else if(endDegY<-35){
            endDegY=-35
        }

        if(panoEndY>35){
            panoEndY=35;
        }else if(panoEndY<-35){
            panoEndY=-35
        }

        tagShow();
        css(panoBg,'rotateY',endDegX);
        css(panoBg,'rotateX',endDegY);

        css(pano,'rotateY',panoEndX);
        css(pano,'rotateX',panoEndY);

        css(panoDots,'rotateY',panoEndX);
        css(panoDots,'rotateX',panoEndY);
        
        css(tZ,'translateZ',startZ-Math.abs(disX));

    })

    document.addEventListener('touchend',function (ev){

        //css(tZ,'translateZ',startZ);
        var nowDegX=css(panoBg,'rotateY');
        var nowDegY=css(panoBg,'rotateX');
        var disDegX=lastDis.x*10;
        var disDegY=lastDis.y*10;
        var endDegY=nowDegY+disDegY;

        if(endDegY>35){
            endDegY=35;
        }else if(endDegY<-35){
            endDegY=-35
        }

        MTween({
            el:tZ,
            target:{
                translateZ:startZ,
            },
            time:300,
            type:'easeOut'
        })


        MTween({
            el:panoBg,
            target:{
                rotateY:nowDegX+disDegX,

            },
            time:600,
            type:'easeOut',
            
            callBack:function (){
                lastDis.x=0;
                lastDis.y=0;
                window.isStart=false;
                window.isTouch=false;
                tagShow()
            }
        })

        MTween({
            el:pano,
            target:{
                rotateY:nowDegX+disDegX,

            },
            time:600,
            type:'easeOut'
        })

        MTween({
            el:panoDots,
            target:{
                rotateY:nowDegX+disDegX,
            },
            time:600,
            type:'easeOut'
        })
    })
}

function bgShow(){
    var pageBg=document.querySelector('#pageBg');
    MTween({
        el:pageBg,
        target:{
            opacity:100
        },
        time:300,
        type:'linear'
    })
}



function createPano(rotateY){
    var pano = document.querySelector('#pano');
    var deg = 18;
    var R = 406;
    var nub = 0;
    var startDeg = 180;
    css(pano,"rotateX",0);
    css(pano,"rotateY",-180);
    css(pano,"scale",0);



    createPanoList({ point:{x:1.564,z:-9.877},deg:180,num:0,step:{num:2,h:344,mt:-172},firstY:-163,R:-406 })

    createPanoList({ point:{x:20.225,z:-14.695},deg:126,num:2,step:{num:3,h:326,mt:-163},firstY:278,R:-406 })

    createPanoList({ point:{x:22.175,z:-11.35},deg:72,num:5,step:{num:4,h:195,mt:-80.5},firstY:192.5,R:-406 })

    createPanoList({ point:{x:20.225,z:14.695},deg:90,num:9,step:{num:5,h:468,mt:-234},firstY:129,R:-406 })

    createPanoList({ point:{x:-4.54,z:8.91},deg:18,num:14,step:{num:6,h:444,mt:-222},firstY:-13,R:-406 })

    createPanoList({ point:{x:-11.35,z:22.275},deg:18,num:20,step:{num:6,h:582,mt:-291},firstY:256,R:-406 })

    createPanoList({ point:{x:-20.225,z:-14.695},deg:-108,num:26,step:{num:3,h:522,mt:-261},firstY:176.5,R:-406 })

    createPanoList({ point:{x:-17.82,z:-9.08},deg:-72,num:29,step:{num:4,h:421,mt:-211},firstY:-19.5,R:-406 })


    setTimeout(function(){
        MTween({
            el:pano,
            target: {
                rotateY: rotateY||25,
                scale:100
            },
            time: 1200,
            type: "easeBoth"
        });
    },2800);
}

function createPanoList(info){   //info { point:{x:,y:},deg:,step:{num:,h:,mt:},firstY: info.R }

    var pano=document.querySelector('#pano')
    var panolist = document.createElement("div");
    panolist.className = "pano";
    css(panolist,"translateX",info.point.x); //
    css(panolist,"translateZ",info.point.z);
    startDeg = info.deg;
    var deg=18;

    for(var i = 0; i < info.step.num; i++){
        var span = document.createElement("span");
        span.style.cssText =  "height:"+info.step.h+"px; margin-top:"+info.step.mt+"px;";
        span.style.background = "url("+imgData["pano"][info.num]+")";
        css(span,"translateY",info.firstY);
        css(span,"rotateY",startDeg);
        css(span,"translateZ",info.R);
        info.num++
        startDeg -= deg;
        panolist.appendChild(span)
    }

    pano.appendChild(panolist);
}



function createTag(info){

    var oTag = document.querySelector('#panoDots');
    var oLink = document.createElement('div');
    oLink.className = 'link';
    oLink.dataset.name = info.name; //标签与展示信息映射关系
    var oBlink = new Image();
    oBlink.className = 'blink scale';
    oBlink.src = imgData.tag[10];
    css(oBlink,'translateZ',2);
    var oName = document.createElement('span');
    oName.className = 'name';
    oName.style.background = 'url('+imgData.tag[info.num]+') no-repeat';
    css(oName,'translateZ',-2);
    css(oTag,'rotateX',0);
    css(oTag,'rotateY',20);
    css(oLink,'rotateY',info.iRot);
    css(oLink,'translateY',info.iDis.y);
    css(oLink,'translateZ',info.iDis.z);
    oLink.appendChild(oBlink);
    oLink.appendChild(oName);
    css(oLink,'scale',60);
    oLink.style.opacity="0";
    oTag.appendChild(oLink);
    // css(oTag,'rotateY',25);

}


function tagShow(){
    //此处宽度改变动画用transtion简单实现
    var oCyl = document.querySelector('#panoBg');
    var oTag = document.querySelector('#panoDots');
    window.tagRot = css(oCyl,'rotateY')>0 ? 360-css(oCyl,'rotateY')%360 : Math.abs(css(oCyl,'rotateY')%360); //场景旋转角度修正
    for (var i=0; i<oTag.children.length; i++) {
        (function (n){
            //用场景旋转角度与标签固有角度之间的差值判定是否即将靠近或远离标签
            if (Math.abs(window.tagRot-css(oTag.children[n],'rotateY'))<30) {
                oTag.children[n].querySelector('.name').style.width = '230px';
            } else {
                oTag.children[n].querySelector('.name').style.width = '0';
            }
        })(i);
    }
}





function allTag(rotateY){
    var oTag = document.querySelector('#panoDots');

    createTag({
        "name": "fyl",
        "num": 0,
        "iRot": 290,
        "iDis": {
            "y": -400,
            "z": -380
        }
    });
    createTag({
        "name": "jqay",
        "num": 1,
        "iRot": 220,
        "iDis": {
            "y": -103.5,
            "z": -340
        }
    });
    createTag({
        "name": "lfx",
        "num": 2,
        "iRot": 148,
        "iDis": {
            "y": -162.9,
            "z": -360
        }
    });
    createTag({
        "name": "qdp",
        "num": 3,
        "iRot": 30,
        "iDis": {
            "y": -60,
            "z": -350
        }
    });
    createTag({
        "name": "rqly",
        "num": 4,
        "iRot": 215,
        "iDis": {
            "y": -400,
            "z": -360
        }
    });
    createTag({
        "name": "tp",
        "num": 5,
        "iRot": 152,
        "iDis": {
            "y": 310,
            "z": -360
        }
    });
    createTag({
        "name": "wd",
        "num": 6,
        "iRot": 106,
        "iDis": {
            "y": 120,
            "z": -350
        }
    });
    createTag({
        "name": "wjy",
        "num": 7,
        "iRot": 293,
        "iDis": {
            "y": 120,
            "z": -350
        }
    });
    createTag({
        "name": "zgl",
        "num": 8,
        "iRot": 60,
        "iDis": {
            "y": 210,
            "z": -350
        }
    });
    createTag({
        "name": "zjk",
        "num": 9,
        "iRot": 310,
        "iDis": {
            "y": -112,
            "z": -350
        }
    });


    setTimeout(function (){

        for(var i=0;i<oTag.children.length;i++){
            oTag.children[i].style.opacity = '1';
        }
    },4000);

    MTween({
        el:oTag,
        target: {
            rotateY: rotateY||25,
        },
        time: 1200,
        type: "easeBoth"
    });

}



function infoShow(){
    var oTag = document.querySelector('#panoDots');
    var oInfo = document.querySelector('.info');
    for (var i=0; i<oTag.children.length; i++) {
        (function (n){
            oTag.children[n].addEventListener('touchstart',function (){
                if (Math.abs(window.orientation)==90) {
                    return;
                }
                window.isShow = true;
                var name = this.dataset.name; //标签与展示信息映射关系
                var oTarget = oInfo.querySelector('.info-'+name+'');
                oInfo.style.display = 'block';
                oTarget.style.display = 'block';
            });
        })(i);
    }
}

//Step4-1: 商品展示页关闭
function closeInfo(){
    var oInfo = document.querySelector('.info');
    var aClose = document.querySelectorAll('.close');
    for (var i=0; i<aClose.length; i++) {
        (function (n){
            aClose[n].addEventListener('touchstart',function (){
                oInfo.style.display = 'none';
                this.parentNode.style.display = 'none';
                setTimeout(function (){
                    window.isShow = false;
                },300);
            });
        })(i);
    }
}


