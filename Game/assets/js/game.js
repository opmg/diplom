var MassId,SobBall,i,rez,YCode1,YCode2,YCode3,flag=true;
var pod= new Array();
var TestResult,GameResult;

var BootGameState = new Phaser.State();

BootGameState.preload = function() {

    Game.load.image('loading', 'assets/img/loading_bar.png');
    Game.load.image('esIcon', 'assets/img/es.png');
    Game.load.image('eoIcon', 'assets/img/eo.png');
    Game.load.image('kipIcon', 'assets/img/kip.png');
    Game.load.image('progIcon', 'assets/img/prog.png');
    Game.load.image('kskIcon', 'assets/img/ksk.png');
    Game.load.image('byxIcon', 'assets/img/byx.png');
    Game.load.image('raschetka', 'assets/img/raschetka.png');
    Game.load.image('nextStep', 'assets/img/nextstep.png');
    Game.load.image('back','assets/img/back.png');
    Game.load.image('onTest', 'assets/img/onTest.jpg');
    Game.load.image('kskMap', 'assets/img/kskMap.png');
    Game.load.image('p1', 'assets/img/p1.png');
    Game.load.image('p2', 'assets/img/p2.png');
    Game.load.image('p3', 'assets/img/p3.png');
    Game.load.image('ser', 'assets/img/ser.png');
    Game.load.image('pc', 'assets/img/pc.png');
    Game.load.spritesheet('balls','assets/img/balls.png',17,17);
    Game.load.image('Wright', 'assets/img/Wright.png');
    
    
    //Текст и полоса загрузки
    var loadingBar = this.game.add.sprite(154, 588, 'loading');
    this.game.load.setPreloadSprite(loadingBar);
    var loadingText = Game.add.text(220, 500, 'loading', { fontSize: '62px', fill: '#FFF' });
};

BootGameState.create = function() {
    //Масштабируем Канвас
    Game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Game.scale.pageAlignHorizontally = true;
    Game.scale.pageAlignVertically = true;
    Game.state.start('progGame');//Menu
}

var BootMenuState = new Phaser.State();

BootMenuState.create = function() {
    GameResult=10;
    TestResult='';


    var bmd = Game.add.bitmapData(Game.width, Game.height);
    bmd.rect(0, 0, 1000, 800, '#FFF');
    bmd.addToWorld();

    Game.add.text(160,650,'Выберете значок интересующей Вас специальности.',{font:'28px Arial', fill:'#000', align:'center'});

    var es = Game.add.sprite(100,20, 'esIcon');
    var esText = Game.add.text(20, 170, 'Техническая эксплуатация\nи обслуживание электрического\nи электротехнического\nоборудования', {font:'20px Arial ', fill: '#000', align:'center' });
    esText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 10);
    es.inputEnabled = true;
    es.events.onInputDown.add(esStart, this);
    

    var eo = Game.add.sprite(430,20, 'eoIcon');
    var eoText = Game.add.text(380, 170, 'Электрические станции,\nсети и системы', {font:'20px Arial ', fill: '#000', align:'center' });
    eoText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 10);
    eo.inputEnabled = true;
    eo.events.onInputDown.add(eoStart, this);

    var ksk = Game.add.sprite(730,20, 'kskIcon');
    ksk.scale.setTo(1.1,1.1);
    var kskText = Game.add.text(700, 170, 'Компьютерные системы\nи комплексы', {font:'20px Arial ', fill: '#000', align:'center' });
    kskText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 10);
    ksk.inputEnabled = true
    ksk.events.onInputDown.add(kskStart, this);

    var kip = Game.add.sprite(100,378, 'kipIcon');
    kip.scale.setTo(0.27,0.27);
    var eoText = Game.add.text(40, 520, 'Мастер\nконтрольно-измерительных\nприборов и автоматики', {font:'20px Arial ', fill: '#000', align:'center' });
    eoText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 10);
    kip.inputEnabled = true
    kip.events.onInputDown.add(kipStart, this);

    var prog = Game.add.sprite(430,378, 'progIcon');
    prog.scale.setTo(0.27,0.27);
    var progText = Game.add.text(375, 520, 'Информационные системы\nи программирование', {font:'20px Arial ', fill: '#000', align:'center' });
    progText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 10);
    prog.inputEnabled = true
    prog.events.onInputDown.add(progStart, this);

    var byx = Game.add.sprite(730,378, 'byxIcon');
    byx.scale.setTo(0.53,0.53);
    var byxText = Game.add.text(710, 520, 'Экономика и\nбухгалтерский учёт', {font:'20px Arial ', fill: '#000', align:'center' });
    byxText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 10);
    byx.inputEnabled = true;
    byx.events.onInputDown.add(byxStart, this);

    es.events.onInputDown.add(block);
    eo.events.onInputDown.add(block);
    ksk.events.onInputDown.add(block);
    kip.events.onInputDown.add(block);
    prog.events.onInputDown.add(block);
    byx.events.onInputDown.add(block);



    function block(){
        es.inputEnabled = false;
        eo.inputEnabled = false;
        ksk.inputEnabled = false;
        kip.inputEnabled = false;
        prog.inputEnabled = false;
        byx.inputEnabled = false;
    }
}
function esStart(){
    SobBall=0;
    i=0;
    Zaglav = Game.add.sprite(35,50, 'onTest');
    Zaglav.scale.setTo(1.1,1.1);
    Game.add.text(570,320,'Собеседование в\nООО "Электрик"',{font:'30px Arial', fill:'#FFF', align:'center'});
    Zaglav.alpha=0;
    Game.add.tween(Zaglav).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
    Zaglav.kill;
    Game.time.events.add(Phaser.Timer.SECOND * 3, byxStart2 = function(){Game.state.start('Test');}, this);
    MassId='es';
}
function eoStart(){
    
    SobBall=0;
    i=0;
    
    Zaglav = Game.add.sprite(35,50, 'onTest');
    Zaglav.scale.setTo(1.1,1.1);
    Game.add.text(570,320,'Собеседование в\nООО "Энергетик"',{font:'30px Arial', fill:'#FFF', align:'center'});
    Zaglav.alpha=0;
    Game.add.tween(Zaglav).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
    Zaglav.kill;
    Game.time.events.add(Phaser.Timer.SECOND * 3, byxStart2 = function(){Game.state.start('Test');}, this);
    MassId='eo';
}
function kipStart(){
    SobBall=0;
    i=0;
    
    Zaglav = Game.add.sprite(35,50, 'onTest');
    Zaglav.scale.setTo(1.1,1.1);
    Game.add.text(570,320,'Собеседование в\nООО "Контроль"',{font:'30px Arial', fill:'#FFF', align:'center'});
    Zaglav.alpha=0;
    Game.add.tween(Zaglav).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
    Zaglav.kill;
    Game.time.events.add(Phaser.Timer.SECOND * 3, byxStart2 = function(){Game.state.start('Test');}, this);
    MassId='kip';
}
function progStart(){
   
    SobBall=0;
    i=0;
    
    Zaglav = Game.add.sprite(35,50, 'onTest');
    Zaglav.scale.setTo(1.1,1.1);
    Game.add.text(570,320,'Собеседование в\nООО "ПорограммКорп"',{font:'30px Arial', fill:'#FFF', align:'center'});
    Zaglav.alpha=0;
    Game.add.tween(Zaglav).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
    Zaglav.kill;
    Game.time.events.add(Phaser.Timer.SECOND * 3, byxStart2 = function(){Game.state.start('Test');}, this);
    MassId='prog';
   


     //alert('Вы выбрали специальность "Информационные системы и программирование".\nПеред Вами будут расположены три блока программного кода на языке Pascal в хаотичном порядке.\nВаша задача расположить блоки в правильном порядке путём перетаскивания их мышью.\nВ итоге должна получится программа позволяющая осуществлять ввод с клавиатуры двух чисел, сложение этих чисел и вывод результата на экран.\nТак же, если Вы не знакомы с языком Pascal, перед Вами откроется окно с описанием структуры программы на этом языке.\nДля проверки решения нажмите на кнопку в виде зеленой стрелки.');
     
     
}
function kskStart(){
   
    SobBall=0;
    i=0;
    
    Zaglav = Game.add.sprite(35,50, 'onTest');
    Zaglav.scale.setTo(1.1,1.1);
    Game.add.text(570,320,'Собеседование в\nООО "Сисадмин"',{font:'30px Arial', fill:'#FFF', align:'center'});
    Zaglav.alpha=0;
    Game.add.tween(Zaglav).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
    Zaglav.kill;
    Game.time.events.add(Phaser.Timer.SECOND * 3, byxStart2 = function(){Game.state.start('Test');}, this);
    MassId='ksk';
   
}
function byxStart(){
    SobBall=0;
    i=0;
    //alert('Вы выбрали специальность "Экономика и бухгалтерский учёт".\nВаша задача расчитать зарплату работника ресторана быстрого обслуживания Макдоналдс.\nЗарплата работника расчитаетвается на основании произведения ставки работника и количества отработанных им часов.\nТак же из заработанной платы вычитывается штраф.\nДля проверки результата нажмите на кнопку с иконкой в виде зеленой стрелки');
    Zaglav = Game.add.sprite(35,50, 'onTest');
    Zaglav.scale.setTo(1.1,1.1);
    Game.add.text(570,320,'Собеседование в\nООО "Главбух"',{font:'30px Arial', fill:'#FFF', align:'center'});
    Zaglav.alpha=0;
    Game.add.tween(Zaglav).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
    Zaglav.kill;
    Game.time.events.add(Phaser.Timer.SECOND * 3, byxStart2 = function(){Game.state.start('Test');}, this);
    MassId='byx';
}



var BootEsGame = new Phaser.State();

BootEsGame.preload = function(){
    Game.load.image('SxeBlack','assets/img/SxeBlack.png');
    Game.load.image('SxeColor','assets/img/SxeColor.png');
    Game.load.image('klemm','assets/img/klemm.png');
    Game.load.image('pu','assets/img/pu.png');
    Game.load.image('rev','assets/img/rev.png');
    Game.load.image('vill','assets/img/vill.png');
    Game.load.image('vill2','assets/img/vill2.png');
    Game.load.image('kond','assets/img/kond.png');
    Game.load.image('socket','assets/img/socket.png')
    Game.load.image('pit','assets/img/pit.png');

}

BootEsGame.create = function() {
    for (i=0;i<=10;i++){
    pod[i]=false;
    }
    line = new Array();
    Balls=new Array();
    var bmd = Game.add.bitmapData(Game.width, Game.height);
    bmd.rect(0, 0, 1000, 800, '#FFF');
    bmd.addToWorld();
    sxe=Game.add.sprite(490,50,'SxeBlack')
    sxe.scale.setTo(0.7,0.7);
    sxe.inputEnabled=true;
    sxe.alpha=0.2;

    socket=Game.add.sprite(760,590,'socket');
    socket.scale.setTo(0.8,0.75);

    kond=Game.add.sprite(180,360,'kond');
    kond.scale.setTo(2,1.8);

    klemm=Game.add.sprite(100,55,'klemm');
    klemm.scale.setTo(1.9,1.75);

    pu=Game.add.sprite(250,250,'pu');
    pu.scale.setTo(0.9,0.9);

    rev=Game.add.sprite(370,270, 'rev');

    pit=Game.add.sprite(531,270,'pit');

    vill2=Game.add.sprite(750,480, 'vill2');
    vill2.anchor.set(0.6,0.65);
    vill=Game.add.sprite(900,500, 'vill');
    vill.anchor.set(0.5);

    for (i=0;i<10;i++){
    Balls[i]=Game.add.sprite(50,600,'balls',0);
    Balls[i].inputEnabled = true;
    Balls[i].input.enableDrag();
    Balls[i].scale.setTo(1.4,1.4);
    Balls[i].input.enableSnap(23, 23, true, false);
    Balls[i].anchor.set(0.5);
    Balls[i].p=i;
    Balls[i].events.onDragStop.add(onDragStop, this);
    }
    
    for (i=10;i<20;i++){
    Balls[i]=Game.add.sprite(50,300,'balls',0);
    Balls[i].inputEnabled = true;
    Balls[i].input.enableDrag();
    Balls[i].scale.setTo(1.4,1.4);
    Balls[i].input.enableSnap(23, 23, true, false);
    Balls[i].anchor.set(0.5);
    Balls[i].p=i;
    Balls[i].events.onDragStop.add(onDragStop2, this);
    }
    

    vill.inputEnabled = true;
    vill.input.enableDrag();
    vill.input.enableSnap(40, 40, true, false);
    vill.events.onDragStop.add(VillPos, this);

    lineR = new Phaser.Line(vill.x, vill.y, vill2.x, vill2.y);
    for (i=0;i<10;i++){
        line[i] = new Phaser.Line(Balls[i].x, Balls[i].y, Balls[i+10].x, Balls[i+10].y);
    }

    EsButton = Game.add.button(930, 500, 'nextStep', ValidEs, this);
    BackButton = Game.add.button(10, 500, 'back', LoadMainMenu, this);
}

esKord=new Array();
esKord[0]=new Array(690,437,644,345);
esKord[1]=new Array(690,483,138,184);
esKord[2]=new Array(552,345,276,184);
esKord[3]=new Array(483,345,138,184);
esKord[4]=new Array(391,345,276,184);
esKord[5]=new Array(299,483,437,345);
esKord[6]=new Array(230,483,207,184);
esKord[7]=new Array(230,483,276,368);
esKord[8]=new Array(483,483,322,368);
esKord[9]=new Array(391,483,299,483);

function onDragStop(t){
    pp=t.p+10;
    console.log(t.p+' '+Balls[t.p].x+' '+Balls[t.p].y+' '+pp+' '+Balls[t.p+10].x+' '+Balls[t.p+10].y);
    for (i=0; i<=9;i++){
    if (pod[i]==false && ((Balls[t.p].x==esKord[i][0] && Balls[t.p].y==esKord[i][1] && Balls[t.p+10].x==esKord[i][2] && Balls[t.p+10].y==esKord[i][3]) || (Balls[t.p].x==esKord[i][2] && Balls[t.p].y==esKord[i][3] && Balls[t.p+10].x==esKord[i][0] && Balls[t.p+10].y==esKord[i][1])) ){
            pod[i]=true;
            Balls[t.p].inputEnabled = false;
            Balls[t.p+10].inputEnabled = false;           
    }
    }
}
function onDragStop2(t){
    pp=t.p-10;
    console.log(t.p+' '+Balls[t.p].x+' '+Balls[t.p].y+' '+pp+' '+Balls[t.p-10].x+' '+Balls[t.p-10].y);

    for (i=0; i<=9;i++){
    if (pod[i]==false && ((Balls[t.p].x==esKord[i][0] && Balls[t.p].y==esKord[i][1] && Balls[t.p-10].x==esKord[i][2] && Balls[t.p-10].y==esKord[i][3]) || (Balls[t.p].x==esKord[i][2] && Balls[t.p].y==esKord[i][3] && Balls[t.p-10].x==esKord[i][0] && Balls[t.p-10].y==esKord[i][1])) ){
            pod[i]=true;
            Balls[t.p].inputEnabled = false;
            Balls[t.p-10].inputEnabled = false;           
    }
    }
}
function VillPos(t){
    if(t.x==880 && t.y==640){
        pod[10]=true;
    }
}


BootEsGame.update = function(){
     lineR.fromSprite(vill, vill2, true);

     for (i=0;i<10;i++){
        line[i].fromSprite(Balls[i],Balls[i+10], true)
     }


     if(sxe.input.pointerOver())
    {
        sxe.loadTexture('SxeColor');
        sxe.alpha=1;
    }else{
        sxe.loadTexture('SxeBlack');
        sxe.alpha=0.2;
    }
}

BootEsGame.render = function(){
    Game.context.strokeStyle = 'rgb(0,0,0)';
    Game.context.lineWidth=5;
    Game.context.beginPath();
    Game.context.lineTo(lineR.start.x, lineR.start.y);
    Game.context.lineTo(lineR.end.x, lineR.end.y);
    Game.context.stroke();
    Game.context.closePath();

    for (i=0;i<10;i++){
    Game.context.strokeStyle = 'rgb(0,0,0)';
    Game.context.lineWidth=1;
    Game.context.beginPath();
    Game.context.lineTo(line[i].start.x, line[i].start.y);
    Game.context.lineTo(line[i].end.x, line[i].end.y);
    Game.context.stroke();
    Game.context.closePath();
     }
}

function ValidEs(){
    RezEs=0;
    for (i=0;i<=10;i++){
        if (pod[i]==true){
            RezEs++;
        }
    }
    if(RezEs==11){
        Wright();
    }else{
        alert('Не справился');
        GameResult-=1;
    }
}

var BootEoGame = new Phaser.State();

BootEoGame.preload = function(){
    Game.load.image('elStation','assets/img/elStation.png');
    Game.load.image('city','assets/img/city.png');
    Game.load.image('s1','assets/img/s1.png');
    Game.load.image('s2','assets/img/s2.png');
    Game.load.image('s3','assets/img/s3.png');
}

BootEoGame.create = function() {
    var bmd = Game.add.bitmapData(Game.width, Game.height);
    bmd.rect(0, 0, 1000, 800, '#FFF');
    bmd.rect(0, 80, 1000, 650, '#4a76a8');
    bmd.addToWorld();

    poles= new Array();
    citys= new Array();
    eoText = Game.add.text(50,20,'Нажимая на блоки-линии электропередач , а так же на города подключите все города в\nэлектрическую сеть путем подключения их к электростанциям.',{font:'22px Arial', fill: '#000', align:'center'});
    map=Game.add.sprite(200,100,'kskMap');
    poles[1]=Game.add.sprite(200+1.5*100,100+0.5*100,'s1');
    poles[2]=Game.add.sprite(200+0.5*100,100+1.5*100,'s1');
    poles[3]=Game.add.sprite(200+4.5*100,100+2.5*100,'s1');
    poles[4]=Game.add.sprite(200+2.5*100,100+4.5*100,'s1');
    poles[5]=Game.add.sprite(200+3.5*100,100+4.5*100,'s1');
    poles[6]=Game.add.sprite(200+3.5*100,100+5.5*100,'s1');
    poles[7]=Game.add.sprite(200+0.5*100,100+2.5*100,'s2');
    poles[8]=Game.add.sprite(200+5.5*100,100+5.5*100,'s2');
    poles[9]=Game.add.sprite(200+4.5*100,100+3.5*100,'s3');
    poles[10]=Game.add.sprite(200+4.5*100,100+4.5*100,'s3');

    citys[1]=Game.add.sprite(200+2.5*100,100+0.5*100,'city');
    citys[2]=Game.add.sprite(200+1.5*100,100+2.5*100,'city');
    citys[3]=Game.add.sprite(200+4.5*100,100+1.5*100,'city');
    citys[4]=Game.add.sprite(200+3.5*100,100+3.5*100,'city');
    citys[5]=Game.add.sprite(200+1.5*100,100+4.5*100,'city');
    citys[6]=Game.add.sprite(200+5.5*100,100+4.5*100,'city');
    citys[7]=Game.add.sprite(200+2.5*100,100+5.5*100,'city');

    elS1=Game.add.sprite(200+0*100,100+0*100,'elStation');
    elS2=Game.add.sprite(200+4*100,100+5*100,'elStation');

    for (i=1;i<=10;i++){
    
    poles[i].inputEnabled = true;
    poles[i].anchor.setTo(0.5, 0.5);
    poles[i].pos=1;
    }

    for (i=1;i<=7;i++){
    citys[i].inputEnabled = true;
    citys[i].anchor.setTo(0.5, 0.5);
    citys[i].pos=1;
    }
    
    poles[1].events.onInputDown.add(click = polesClickV, n=1);
    poles[2].events.onInputDown.add(click = polesClickV, n=2);
    poles[3].events.onInputDown.add(click = polesClickV, n=3);
    poles[4].events.onInputDown.add(click = polesClickV, n=4);
    poles[5].events.onInputDown.add(click = polesClickV, n=5);
    poles[6].events.onInputDown.add(click = polesClickV, n=6);
    poles[7].events.onInputDown.add(click = polesClickD, n=7);
    poles[8].events.onInputDown.add(click = polesClickD, n=8);
    poles[9].events.onInputDown.add(click = polesClickD, n=9);
    poles[10].events.onInputDown.add(click = polesClickD, n=10);

    citys[1].events.onInputDown.add(click = citysClick, c=1);
    citys[2].events.onInputDown.add(click = citysClick, c=2);
    citys[3].events.onInputDown.add(click = citysClick, c=3);
    citys[4].events.onInputDown.add(click = citysClick, c=4);
    citys[5].events.onInputDown.add(click = citysClick, c=5);
    citys[6].events.onInputDown.add(click = citysClick, c=6);
    citys[7].events.onInputDown.add(click = citysClick, c=7);

    EoButton = Game.add.button(930, 500, 'nextStep', ValidEo, this);
    BackButton = Game.add.button(10, 500, 'back', LoadMainMenu, this);    

}

function polesClickV(){
        poles[this].angle+=90;
        poles[this].pos++;
        if(poles[this].pos==3){poles[this].pos=1}

        if (poles[this].angle==-180){
            poles[this].angle=0;
            poles[this].pos=1;
        } else if(poles[1].angle==-90){
            poles[this].angle=90;
            poles[this].pos=2;
        }
    }

function polesClickD(){
        poles[this].angle+=90;
        poles[this].pos++;
        if (poles[this].pos==5){poles[this].pos=1};
    }

 function citysClick(){
        citys[this].angle+=90;
        citys[this].pos++;
        if (citys[this].pos==5){citys[this].pos=1};

}

function ValidEo(){

    if (poles[1].pos==2 && poles[2].pos==1 && poles[3].pos==1 && poles[4].pos==2 && poles[5].pos==2 && poles[6].pos==2 && poles[7].pos==1 && poles[8].pos==4 && poles[9].pos==4 && poles[10].pos==4 && citys[1].pos==4 && citys[2].pos==4 && citys[3].pos==3 && citys[4].pos==2 && citys[5].pos==2 && citys[6].pos==3 && citys[7].pos==2) {
        Wright();
        } else {
            alert('Не верно');
            GameResult-=1;
        }
    }
   

var BootKipGame = new Phaser.State();

BootKipGame.preload = function() {
    Game.load.image('nOff','assets/img/nagrOff.png');
    Game.load.image('nOn','assets/img/nagrOn.png');
    Game.load.image('inst','assets/img/inst.png');
    Game.load.image('tumbOff','assets/img/tumbOff.png');
    Game.load.image('tumbOn','assets/img/tumbOn.png');
    Game.load.image('nagrHit','assets/img/nagrhit.png');
    Game.load.image('term','assets/img/term.png');
    Game.load.image('amper','assets/img/amp.png');
    Game.load.spritesheet('fire','assets/img/fire.png',75,75);
    
    Game.load.start();
}

var line,line2,rBall1,rBall2,bBall1,bBall2,rnA,rnT;
var tumbpos=false, tumbpos2=false, nagrSost=false,end=false;
var bmd;
BootKipGame.create = function() {
    fire=fire2=0;
    bmd = Game.add.bitmapData(Game.width, Game.height);
    bmd.rect(0, 0, 1000, 800, '#fff');
    bmd.addToWorld();
    
    nagr = Game.add.sprite(355,55,'nOff');
    nagr.scale.setTo(2.2,2.2);

    inst= Game.add.sprite(430,70,'inst');
    inst.scale.setTo(0.6,0.6);

    tumb=Game.add.sprite(450,565, 'tumbOff');
    tumb.scale.setTo(0.6,0.6);

    tumb2=Game.add.sprite(520,565, 'tumbOff');
    tumb2.scale.setTo(0.6,0.6);

    nagrHit = Game.add.sprite(765,442,'nagrHit')

    term=Game.add.sprite(50,55, 'term');
    term.scale.setTo(1.2,1.2);

    amp=Game.add.sprite(20,450, 'amper');
    amp.scale.setTo(0.8,0.8);

    rBall1=Game.add.sprite(200, 100, 'balls',0)
    rBall1.scale.setTo(2,2);
    rBall1.anchor.set(0.5);
    rBall2=Game.add.sprite(200, 300, 'balls',0)
    rBall2.scale.setTo(2,2);
    rBall2.anchor.set(0.5);
    bBall1=Game.add.sprite(270, 100, 'balls',1)
    bBall1.scale.setTo(2,2);
    bBall1.anchor.set(0.5);
    bBall2=Game.add.sprite(270, 300, 'balls',1)
    bBall2.scale.setTo(2,2);
    bBall2.anchor.set(0.5);

    line1 = new Phaser.Line(rBall1.x, rBall1.y, rBall2.x, rBall2.y);
    line2 = new Phaser.Line(bBall1.x, bBall1.y, bBall2.x, bBall2.y);

    rBall1.inputEnabled = true;
    rBall1.input.enableDrag();
    rBall1.input.enableSnap(15, 30, false, true);
    rBall2.inputEnabled = true;
    rBall2.input.enableDrag();
    rBall2.input.enableSnap(15, 30, false, true);

    bBall1.inputEnabled = true;
    bBall1.input.enableDrag();
    bBall1.input.enableSnap(15, 30, false, true);
    bBall2.inputEnabled = true;
    bBall2.input.enableDrag();
    bBall2.input.enableSnap(15, 30, false, true);

    tumb.inputEnabled = true;
    tumb2.inputEnabled = true;
    nagrHit.inputEnabled = true;
    term.inputEnabled = true;
    nagr.inputEnabled = true;
    amp.inputEnabled = true;

    rnA=Game.rnd.integerInRange(1,2);
    rnT=Game.rnd.integerInRange(1,2);


    tumb.events.onInputDown.add(click = function(){
        if (tumbpos==false){
            tumb.loadTexture('tumbOn');
            tumbpos=true;
        }else{
            tumb.loadTexture('tumbOff');
            tumbpos=false;
            if(rnT==1 && nagrSost==true){
                rnT=2;
            }
            if (rnT!=1 && rnA!=1 && nagrSost==true){
                fire.kill();
                fire2.kill();
                end=true;
            }
        }
    }, this);

     tumb2.events.onInputDown.add(click = function(){
        if (tumbpos2==false){
            tumb2.loadTexture('tumbOn');
            tumbpos2=true;
             if (rnA==1 && nagrSost==true){
                rnA=2;
            }
            if (rnT!=1 && rnA!=1 && nagrSost==true){
                fire.kill();
                fire2.kill();
                end=true;
            }
        }else{
            tumb2.loadTexture('tumbOff');
            tumbpos2=false;
        }
    }, this);

     nagrHit.events.onInputDown.add(click = function(){
        console.log(rnA,rnT);
        if((rnA==1) || (rnT==1)){
            if (nagrSost==false){
                nagr.loadTexture('nOn');
                nagrSost=true;
                fire = Game.add.sprite(450,400, 'fire');
                fire2 = Game.add.sprite(600,540, 'fire');
                anim = fire.animations.add('fired');
                anim2 = fire2.animations.add('fired');
                anim.play(10,true);
                anim2.play(10,true);
                tumb.loadTexture('tumbOn');
                tumbpos=true;
            }else{
                fire.kill();
                fire2.kill();
                nagr.loadTexture('nOff');
                nagrSost=false;
                tumb.loadTexture('tumbOff');
                tumbpos=false;
            }
        }else{
            end=true;
            if (nagrSost==false){
                nagr.loadTexture('nOn');
                nagrSost=true;
            }else{
                 nagr.loadTexture('nOff');
                nagrSost=false;
                tumb.loadTexture('tumbOff');
                tumbpos=false;
            }
        }
                }, this);

    KipButton = Game.add.button(930, 500, 'nextStep', ValidKip, this);
    BackButton = Game.add.button(10, 500, 'back', LoadMainMenu, this);
  
}

function ValidKip(){
    if (end==true){
        Wright();
    }else{
        alert('Не верно');
        GameResult-=1;
    }
}

var oneTerm=oneAmp=false;
BootKipGame.update = function() {
    
    line1.fromSprite(rBall1, rBall2, true);
    line2.fromSprite(bBall1, bBall2, true);
    
    if ((rBall1.x==315 && rBall1.y==690 && rBall2.x==555 && rBall2.y==690) || (rBall2.x==315 && rBall2.y==690 && rBall1.x==555 && rBall1.y==690)){
        if (oneAmp==false){
            oneAmp=true;
        if (rnA==1){
             y=187;
         } else{
            y=rnA*2+100;
         }
        bmd.line(187,700,y,500,'#000');
    }
    }

    if ((bBall1.x==75 && bBall1.y==390 && bBall2.x==765 && bBall2.y==690) || (bBall2.x==75 && bBall2.y==390 && bBall1.x==765 && bBall1.y==690)){
        if (oneTerm==false){
        oneTerm=true;
        if (rnT==1){
             y=180;
         } else{
            y=rnT*2+200;
         }
        d=345-y;
        bmd.rect(95, y, 25, d, '#FF7F7F');
    }
    }
    
}

BootKipGame.render = function() {
    Game.context.strokeStyle = 'rgb(0,0,0)';
    Game.context.beginPath();
    Game.context.lineTo(line1.start.x, line1.start.y);
    Game.context.lineTo(line1.end.x, line1.end.y);
    Game.context.stroke();
    Game.context.closePath();

    Game.context.strokeStyle = 'rgb(0,0,0)';
    Game.context.beginPath();
    Game.context.lineTo(line2.start.x, line2.start.y);
    Game.context.lineTo(line2.end.x, line2.end.y);
    Game.context.stroke();
    Game.context.closePath();
}





var BootProgGame = new Phaser.State();

BootProgGame.preload = function() {
    Game.load.image('code1', 'assets/img/Code1.png');
    Game.load.image('code2', 'assets/img/Code2.png');
    Game.load.image('code3', 'assets/img/Code3.png');
    Game.load.image('code4', 'assets/img/Code4.png');
    Game.load.image('code5', 'assets/img/Code5.png');
    Game.load.image('code6', 'assets/img/Code6.png');

}
var code=new Array();

BootProgGame.create = function() {
    bmd=Game.add.bitmapData(Game.width, Game.height);
    bmd.rect(0, 0, 1000,600, '#fff');
    bmd.line(0,100,1000,100,'#000');
    bmd.line(0,200,1000,200,'#000');
    bmd.line(0,300,1000,300,'#000');
    bmd.line(0,400,1000,400,'#000');
    bmd.line(0,500,1000,500,'#000');
    bmd.line(0,600,1000,600,'#000');
    bmd.addToWorld();
    

    code[0]=Game.add.sprite(0,500, 'code1');
    code[1]=Game.add.sprite(0,200, 'code2');
    code[2]=Game.add.sprite(0,400, 'code3');
    code[3]=Game.add.sprite(0,0, 'code4');
    code[4]=Game.add.sprite(0,100, 'code5');
    code[5]=Game.add.sprite(0,300, 'code6');

    for (i=0;i<=5;i++){
    code[i].inputEnabled = true;
    code[i].input.enableDrag();
    code[i].input.enableSnap(200, 100, false, true);
    }

    ProgButton = Game.add.button(930, 550, 'nextStep', ValidProg, this);
    BackButton = Game.add.button(0, 550, 'back', LoadMainMenu, this);
}



function ValidProg (){
    var ProgResult=false;
    for (i=0;i<=5;i++){
        if(code[i].y!=i*100){
            ProgResult=false;
            break;
        }else{
            ProgResult=true;
        }
    }

    if(ProgResult){
        alert('Уху');
    }else{
        alert('sd;kgd;ksgh;');
    }
}



var BootKskGame = new Phaser.State();

BootKskGame.create = function() {
    var bmd = Game.add.bitmapData(Game.width, Game.height);
    bmd.rect(0, 0, 1000, 800, '#fff');
    bmd.rect(0, 80, 1000, 650, '#4a76a8');
    bmd.addToWorld();
    wirings= new Array();
    pcs= new Array();
    kskText = Game.add.text(50,20,'Нажимая на блоки-провода, а так же на компьютеры соедените все компьютеры в одну\nсеть путем подключения их к серверу.',{font:'22px Arial', fill: '#000', align:'center'});
    map=Game.add.sprite(200,100,'kskMap');
    wirings[1]=Game.add.sprite(200+3.5*100,100+4.5*100,'p1');
    wirings[2]=Game.add.sprite(200+4.5*100,100+3.5*100,'p1');
    wirings[2].angle=90;
    wirings[3]=Game.add.sprite(200+3.5*100,100+2.5*100,'p1');
    wirings[4]=Game.add.sprite(200+2.5*100,100+1.5*100,'p1');
    wirings[4].angle=90;
    wirings[5]=Game.add.sprite(200+5.5*100,100+3.5*100,'p2');
    wirings[6]=Game.add.sprite(200+3.5*100,100+0.5*100,'p3');
    wirings[7]=Game.add.sprite(200+3.5*100,100+1.5*100,'p3');
    wirings[8]=Game.add.sprite(200+3.5*100,100+5.5*100,'p3');
    pcs[1]=Game.add.sprite(200+2.5*100,100+5.5*100,'pc');
    pcs[2]=Game.add.sprite(200+4.5*100,100+5.5*100,'pc');
    pcs[3]=Game.add.sprite(200+5.5*100,100+2.5*100,'pc');
    pcs[4]=Game.add.sprite(200+1.5*100,100+1.5*100,'pc');
    pcs[5]=Game.add.sprite(200+2.5*100,100+0.5*100,'pc');
    pcs[6]=Game.add.sprite(200+4.5*100,100+0.5*100,'pc');
    server=Game.add.sprite(200+3*100,100+3*100,'ser');

    for (i=1;i<=8;i++){
    wirings[i].inputEnabled = true;
    wirings[i].anchor.setTo(0.5, 0.5);
    wirings[i].pos=1;
    }

    for (i=1;i<=6;i++){
    pcs[i].inputEnabled = true;
    pcs[i].anchor.setTo(0.5, 0.5);
    pcs[i].pos=1;
    }

    wirings[1].events.onInputDown.add(click = WiringsClickV, n=1);
    wirings[2].events.onInputDown.add(click = WiringsClickV, n=2);
    wirings[3].events.onInputDown.add(click = WiringsClickV, n=3);
    wirings[4].events.onInputDown.add(click = WiringsClickV, n=4);
    wirings[5].events.onInputDown.add(click = WiringsClickD, n=5);
    wirings[6].events.onInputDown.add(click = WiringsClickD, n=6);
    wirings[7].events.onInputDown.add(click = WiringsClickD, n=7);
    wirings[8].events.onInputDown.add(click = WiringsClickD, n=8);
    pcs[1].events.onInputDown.add(click = PcsClick, n=1);
    pcs[2].events.onInputDown.add(click = PcsClick, n=2);
    pcs[3].events.onInputDown.add(click = PcsClick, n=3);
    pcs[4].events.onInputDown.add(click = PcsClick, n=4);
    pcs[5].events.onInputDown.add(click = PcsClick, n=5);
    pcs[6].events.onInputDown.add(click = PcsClick, n=6);



     button = Game.add.button(930, 500, 'nextStep', ValidKsk, this);
     BackButton = Game.add.button(10, 500, 'back', LoadMainMenu, this);

}

function WiringsClickV(){
        wirings[this].angle+=90;
        if (wirings[this].angle==90 || wirings[this].angle==-90){
            wirings[this].pos=2;
        } else{
             wirings[this].pos=1;
        }
    }

function WiringsClickD(){
        wirings[this].angle+=90;
        wirings[this].pos++;
        if (wirings[this].pos==5){wirings[this].pos=1};
    }

function PcsClick(){
        pcs[this].angle+=90;
        pcs[this].pos++;
        if (pcs[this].pos==5){pcs[this].pos=1};
}

function ValidKsk(){
    if(wirings[1].pos==2 && wirings[2].pos==1 && wirings[3].pos==2 && wirings[4].pos==1 && wirings[5].pos==4 && wirings[6].pos==2 && wirings[7].pos==3 && wirings[8].pos==4 && pcs[1].pos==1 && pcs[2].pos==3 && pcs[3].pos==2 && pcs[4].pos==1 && pcs[5].pos==1 && pcs[6].pos==3){
       Wright()
    } else {
        alert( 'Не верно' );
        GameResult-=1;
    }
}

var BootByxGame = new Phaser.State();

BootByxGame.create = function() {
    bmd = Game.add.bitmapData(Game.width, Game.height);
    bmd.rect(0, 0, 1000, 800, '#fff');
    bmd.rect(0, 80, 1000, 650, '#4a76a8');
    bmd.addToWorld();
    Game.add.text(10,20,'Расчитайте зарплату работника Макдоналдс умножте ставку на количество отработанных часов за\nвычетом штрафа. Возьмите 400 руб. за свои услуги и сделайте налоговый вычет 13%.',{font:'20px Arial', fill: '#000', align:'center'});
    Rez='';
    Game.add.text(100,500,'Ответ округлите до целого числа',{font:'20px Arial', fill: '#fff', align:'center'});
    Game.add.sprite(100,100, 'raschetka');
    var stav=Game.rnd.integerInRange(100, 300);
    Game.add.text(320, 205, stav, {font:'20px Arial ', fill: '#000', align:'center' });
    var hour=Game.rnd.integerInRange(1, 200);
    Game.add.text(365, 232, hour, {font:'20px Arial ', fill: '#000', align:'center' });
    var shtraf=Game.rnd.integerInRange(0, 500);
    Game.add.text(250, 262, shtraf, {font:'20px Arial ', fill: '#000', align:'center' });


    Game.input.keyboard.addCallbacks(this, null, null, keyPress);

    button = Game.add.button(930, 500, 'nextStep', ValidByx, this);
    BackButton = Game.add.button(10, 500, 'back', LoadMainMenu, this);

    rez=((stav*hour-shtraf)-400)-(((stav*hour-shtraf)-400)*0.13);
    rez=Math.round(rez);

    RezText=Game.add.text(200, 325, '', {font:'20px Arial ', fill: '#000', align:'center' });

    back = Game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        back.onUp.add(backs= function() {
            RezText.destroy();
            Rez=Rez.substring(0, Rez.length-1);
            RezText=Game.add.text(200, 325, Rez, {font:'20px Arial ', fill: '#000', align:'center' });
        }, this);
}
var Rez='',RezText;

function keyPress(Char) {
        RezText.destroy();
        Rez=Rez+Char;
        RezText=Game.add.text(200, 325, Rez, {font:'20px Arial ', fill: '#000', align:'center' });
        i=0;
}

function ValidByx () {
    alert(rez);
    if (rez==Rez){
        Wright()
    } else {
        alert('Ответ не корректен, попробуйте ещё раз');
        GameResult-=1;
    }
}

var BootTest = new Phaser.State();

var Question
var Answer1;
var Answer2;
var Answer3;
BootTest.create = function() {
    if (i>6){ // Не забудь! 6

         var bmd = Game.add.bitmapData(Game.width, Game.height);
        bmd.rect(0, 0, 1000, 800, '#fff');
        bmd.rect(0,50,1000,300, '#4a76a8');
        bmd.addToWorld();
        RezTextTest = Game.add.text(0,0, 'Эта специальность подходит Вам на\n'+SobBall+' из 14 баллов.', {font:'38px Arial ', fill: '#fff', align:'center',  boundsAlignH: "center", boundsAlignV: "middle"});
        RezTextTest.setTextBounds(100, 50, 800, 300);
        LetsGo= Game.add.text(170, 500, 'Перейти к практической части!',{font:'44px Arial ', fill: '#000', align:'center'});
        LetsGo.inputEnabled = true;
        Game.time.events.repeat(500, 1000, LetsGo2 = function() {
            if (LetsGo.fill=='#000'){
                LetsGo.fill='#4a76a8';
            }else{
                LetsGo.fill='#000';
            }
        }, this);
        LetsGo.events.onInputDown.add(LetsGo1 = function(){
            var state=MassId+'Game';
            Game.state.start(state);

            }, this);
    } else {
    var QuestionsCount = 0;
    var j = 0;
    var QuestionX = 0

    var rectangle = new Phaser.Rectangle(100,50,800,300);
    var bmd = Game.add.bitmapData(Game.width, Game.height);
    bmd.rect(0, 0, 1000, 800, '#fff');
    bmd.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height, '#4a76a8');
    bmd.line(0,400,1000,400,'#000');
    bmd.line(0,533,1000,533,'#000');
    bmd.line(0,667,1000,667,'#000');
    bmd.addToWorld();
    
    if(MassId=='prog'){
    var Questions = ['Что такое программирование?','Кем Вы видите себя через 5 лет?','Вам интерсно узнать, что такое\nкомпилятор?','Вы бы хотели знать как создать\nсоциальную сеть?','Вы бы хотели узнать, что такое\nассемблер?','Считаете ли вы себя любопытным\nи усидчивым человеком?','Какая из этих профессий нравится\nВам больше?'];
    var Answers1 = ['Я не знаю.','Я вижу себя первоклассным специалистом в области программирования.','Да.','Да.','Да.','Да.','Водитель.'];
    var Answers2 = ['Процесс создания компьютерных программ.','Не знаю.','Нет.','Нет.','Нет.','Нет','Продавец.'];
    var Answers3 = ['Что-то связанное с компьютерами и вычислениями.','Планирую работать штатным программистом в компании.','Не знаю.','Не знаю.','Не знаю.','Не знаю.','Я хочу стать программистом!']; 
    }


    if(MassId=='ksk'){
    var Questions = ['Что такое компьютерная система?','Кем Вы видите себя через 5 лет?','Вам интерсно узнать, что такое\nкомпьютерная сеть?','Вы бы хотели узнать о компонентах\nкомпьютера?','Вы бы хотели узнать, что такое\nсетевые протоколы?','Вы считаете себя внимательным\nи аккуратным человеком?','Какая из этих профессий нравится\nВам больше?'];
    var Answers1 = ['Я не знаю.','Я вижу себя первоклассным специалистом в области системного администрирования.','Да.','Да.','Да.','Да.','Автомеханик.'];
    var Answers2 = ['Устройство или система, способная выполнять заданную, чётко определённую,\nизменяемую последовательность операций.','Не знаю.','Нет.','Нет.','Нет.','Нет','Терапевт.'];
    var Answers3 = ['Система позволяющая осуществялть вычисления согласно программе.','Планирую работать системным администратором в компании.','Не знаю.','Не знаю.','Не знаю.','Не знаю.','Я хочу стать системным администратором!']; 
    }

    if (MassId=='byx'){
    var Questions = ['Что такое бухгалтерский учёт?','Кем Вы видите себя через 5 лет?','Вам интерсно узнать, что такое\nменеджмент?','Вы бы хотели узнать, что такое\nмаркетинг?','Вы считаете себя внимательным\nи усидчивым человеком?','Вы бы хотели получить знания\nв области экономики?','Какая из этих профессий нравится\nВам больше?'];
    var Answers1 = ['Я не знаю.', 'Я планирую развивать свои навыки, продолжая приносить пользу\nв области бухгалтерии.','Да.','Да.','Да.','Да.','Лаборант.'];
    var Answers2 = ['Упорядоченная система сбора, регистрации и обобщения информации в денежном\nвыражении о состоянии имущества, обязательствах и капитале организации\nи их изменениях путём сплошного, непрерывного и\nдокументального отражения всех хозяйственных операций.', 'Я не задумывался над этим.','Нет.','Нет.','Нет.','Нет.','Дрессировщик.'];
    var Answers3 = ['Кажется что-то про расчет зарплаты и всё в этом духе...', 'Планирую стать бухгалтером в одной из компаний.','Не знаю.','Не знаю.','Не знаю.','Не знаю.','Я хочу стать бухгалтером!'];
    }

    if (MassId=='kip'){
    var Questions = ['Что такое измерительный прибор?','Кем Вы видите себя через 5 лет?','Интересна ли Вам автоматизаиция\nпредприятия?','Вы бы хотели узнать, что такое\nлюксметр?','Вы считаете себя внимательным\nи ответственным человеком?','Вы бы хотели узнать, что такое\nзолометр?','Какая из этих профессий нравится\nВам больше?'];
    var Answers1 = ['Я не знаю.', 'Я планирую постоянно развивать свои навыки и получить высший разряд\nв этой профессии.','Да.','Да.','Да.','Да.','Агроном.'];
    var Answers2 = ['Это средство измерений, предназначенное для получения значений измеряемой\nфизической величины в установленном диапазоне. Часто измерительным\nприбором называют средство измерений для выработки сигнала измерительной\nинформации в форме, доступной для непосредственного восприятия оператора.', 'Я не задумывался над этим.','Нет.','Нет.','Нет.','Нет.','Официант.'];
    var Answers3 = ['Кажется что-то для измерения различных велечин.', 'Планирую стать наладчиком КИПиА в одной из компаний.','Не знаю.','Не знаю.','Не знаю.','Не знаю.','Я хочу стать наладчиком КИПиА!'];
    }

    if (MassId=='es'){
    var Questions = ['Что такое электрическая станция?','Кем Вы видите себя через 5 лет?','Вы бы хотели научиться читать\nчертежи?','Вы бы хотели узнать как работают\nэлектростанции?','Вы считаете себя внимательным\nи коммуникабельным человеком?','Интересны ли Вам испытания нового\nэлектрооборудования?','Какая из этих профессий нравится\nВам больше?'];
    var Answers1 = ['Я не знаю.', 'Я планирую стать ведущим специалистом в области энергетики.','Да.','Да.','Да.','Да.','Строитель.'];
    var Answers2 = ['Это совокупность установок, оборудования и аппаратуры, используемых\nнепосредственно для производства электрической энергии, а также необходимые\nдля этого сооружения и здания, расположенные на определённой территории.', 'Я не задумывался над этим.','Нет.','Нет.','Нет.','Нет.','Юрист.'];
    var Answers3 = ['Наверное это станция которая производит электричество.', 'Планирую стать штатным энергетиком в одной из компаний.','Не знаю.','Не знаю.','Не знаю.','Не знаю.','Я хочу стать энергетиком!'];
    }

    if (MassId=='eo'){
    var Questions = ['Что такое электричество?','Кем Вы видите себя через 5 лет?','Что такое электрический ток?','Вы бы хотели узнать как работают\nтранзисторы?','Вы считаете себя внимательным\nи ответственным человеком?','Вам интересно узнать о монтаже\nэлектрооборудования?','Какая из этих профессий нравится\nВам больше?'];
    var Answers1 = ['Я не знаю.', 'Я планирую получить высший разряд в области электрики.','Это направленное движение заряженных частиц.','Да.','Да.','Да.','Летчик.'];
    var Answers2 = ['Это совокупность явлений, обусловленных существованием, взаимодействием и\nдвижением электрических зарядов.', 'Я не задумывался над этим.','Не знаю.','Нет.','Нет.','Нет.','Программист.'];
    var Answers3 = ['Энергия которая заставляет работать телевизор.', 'Планирую стать штатным электриком в одной из компаний.','Это электрический заряд в движении.','Не знаю.','Не знаю.','Не знаю.','Я хочу стать электриком!'];
    }


    Question = Game.add.text(1000,0, Questions[i], {font:'42px Arial ', fill: '#FFF', boundsAlignH: "center", boundsAlignV: "middle", align:'center'});
    Question.setTextBounds(100, 50, 800, 300);
    Game.add.tween(Question).to( { left:0 }, 500, Phaser.Easing.Linear.None, true);
    Answer1 = Game.add.text(10,410, Answers1[i], {font:'24px Arial ', fill: '#000', align:'justify'});
    Answer2 = Game.add.text(10,540, Answers2[i], {font:'24px Arial ', fill: '#000', align:'justify'});
    Answer3 = Game.add.text(10,676, Answers3[i], {font:'24px Arial ', fill: '#000', align:'justify'});

    Answer1.inputEnabled = true;
    Answer2.inputEnabled = true;
    Answer3.inputEnabled = true;

    Answer1.events.onInputDown.add(OnAnswer1 = function(){
        if (i==0) SobBall+=0;
        if (i==1) SobBall+=2;
        if (i==2 || i==3 || i==4 || i==5) SobBall+=2;
        if (i==6) SobBall+=1;
        Answer1.kill();
        Answer2.kill();
        Answer3.kill();
        Game.add.tween(Question).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        i++;
        Game.time.events.add(Phaser.Timer.SECOND * 1, byxStart2 = function(){Game.state.start('Test');}, this);
        TestResult+='1';
    }, this);

    Answer2.events.onInputDown.add(OnAnswer1 = function(){
        if (i==0) SobBall+=2;
        if (i==1) SobBall+=0;
        if (i==2 || i==3 || i==4 || i==5) SobBall+=0;
        if (i==6) SobBall+=0;
        Answer1.kill();
        Answer2.kill();
        Answer3.kill();
        Game.add.tween(Question).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        i++;
        Game.time.events.add(Phaser.Timer.SECOND * 1, byxStart2 = function(){Game.state.start('Test');}, this);
        TestResult+='2';
    }, this);

    Answer3.events.onInputDown.add(OnAnswer1 = function(){
        if (i==0) SobBall+=1;
        if (i==1) SobBall+=1;
        if (i==2 || i==3 || i==4 || i==5) SobBall+=1;
        if (i==6) SobBall+=2;
        Answer1.kill();
        Answer2.kill();
        Answer3.kill();
        Game.add.tween(Question).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        i++;
        Game.time.events.add(Phaser.Timer.SECOND * 1, byxStart2 = function(){Game.state.start('Test');}, this);
        TestResult+='3';
    }, this);
    }
}

BootTest.update=function() {
    if(Answer1.input.pointerOver())
    {
        Answer1.fill='#4a76a8';
    }else{
        Answer1.fill='#000';
    }
    if(Answer2.input.pointerOver())
    {
        Answer2.fill='#4a76a8';
    }else{
        Answer2.fill='#000';
    }
    if(Answer3.input.pointerOver())
    {
        Answer3.fill='#4a76a8';
    }else{
        Answer3.fill='#000';
    }
}

function Wright () {
    console.log(SobBall);
     $.ajax({
          type:'POST',
          url:'insert.php',
          data:{
                GameResult:GameResult,
                TestResult:TestResult,
                Spec:MassId,
                Ball:SobBall
              },
          success:function(msg){
            console.log(msg);
          },
          error: function(){
            alert ('error');
            }
        });
     alert(GameResult);
    W=Game.add.sprite(1000,250, 'Wright');
    W.alpha=0;
    Game.add.tween(W).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    Game.add.tween(W).to( { left:300 }, 500, Phaser.Easing.Linear.None, true);
    Game.time.events.add(Phaser.Timer.SECOND * 2, LoadMainMenu, this);
}

function LoadMainMenu () {
    Game.state.start('Menu');
}

var Game = new Phaser.Game(1000, 800, Phaser.CANVAS, 'game');

Game.state.add('Boot', BootGameState, false);
Game.state.add('Menu', BootMenuState, false);
Game.state.add('esGame', BootEsGame, false);
Game.state.add('eoGame', BootEoGame, false);
Game.state.add('kipGame', BootKipGame, false);
Game.state.add('progGame', BootProgGame, false);
Game.state.add('kskGame', BootKskGame, false);
Game.state.add('byxGame', BootByxGame, false);
Game.state.add('Test', BootTest, false);
Game.state.start('Boot');