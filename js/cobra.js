"use strict"

var tabuleiro = [];
var seta = 2;
var cobrinha;
var mov;
var a1, a2, v1, v2;
var velocidade = false;
var aux1, aux2;
var participantes = [];
var pararMover = false;
var init;

$(window).load(function(){
    $('#modal1').modal();
});


function setup(){
    tabuleiro = [];
    seta = 2;
    velocidade = false;
    pararMover = false;
    canvas = createCanvas(601, 601);
    canvas.parent("canvasjs");
    a1 = 15;
    a2 = 19;
    v1 = 5;
    v2 = 5;
    tabuleiro = campo.createMatriz(20,20);
    tabuleiro[a1][a2] = 2;

    mov = millis();
    cobrinha = criacobra();

    init  = setTimeout(function(){

        tabuleiro[v1][v2] = 3;
    }, 3000);
}


function draw(){
    for(var i = 0; i < campo.linha; i++){
        for(var j = 0; j < campo.coluna; j++){  
            if(tabuleiro[i][j] == 0){
                fill(color(255,255,255))
            }else
            if(tabuleiro[i][j] == 2){
                fill(color(255,255,0))
            }else
            if(tabuleiro[i][j] == 3){
                fill(color(0,255,0))
            }
            var x = i * 30;
            var y = j * 30;
            rect(x, y, 30, 30)
        }
    }
    cobrinha.pontoAmarelo();
    cobrinha.pontoVerde();
    cobrinha.colorirCobra();
    cobrinha.moverCobra();
    cobrinha.regrasMovimentacao();
    

    // if(millis()-mov>1000){
    //     console.log("a")
    //      mov = millis();
    //     tabuleiro[v1][v2] = 3;
    // }

    cobrinha.trombar();

}


var campo = {
    matriz : [],
    linha : null,
    coluna : null,

    createMatriz : function(a,b){
        this.linha = a;
        this.coluna = b;
        for(var i = 0; i < this.linha; i++) {
            this.matriz[i] = [];
            for(var j = 0; j < this.coluna; j++) {
                this.matriz[i][j] = 0;
            }    
        }
        return this.matriz;
    }, 
}

function criacobra(){
    var cobrinha = {
        corpo : [[0,1],[0,0]],
        cor : null,
        tamanho : 30,
        lastMove: millis(),
        tempoEntreMovimentos:200,
        faster : 1,
        tempoReferencia : 0,
        tempoFasterAtivado : 0,


        colorirCobra : function(){
            fill(color(this.cor))
            for(var i =0; i < this.corpo.length; i++){
                var x = this.corpo[i][0] * this.tamanho;
                var y = this.corpo[i][1] * 30;
                rect(x, y, 30, 30);
            }
        },

        moverCobra : function(){ 
            var t_mov = this.tempoEntreMovimentos/this.faster;
            if(millis()-this.lastMove<t_mov){
                return;
            }
            this.lastMove = millis();
            for (var i = this.corpo.length - 1; i > 0; i--) {
                this.corpo[i] = [this.corpo[i-1][0],this.corpo[i-1][1]];
            }

            switch(seta){
                case 0:
                    this.corpo[0][0]+=1;
                break;
                case 1:
                    this.corpo[0][0]+=-1;
                break;
                case 2:
                    this.corpo[0][1]+=1;
                break;
                case 3:
                    this.corpo[0][1]+=-1;
                break;
            }

            if(millis()-this.tempoFasterAtivado>3000){
                this.faster = 1
            }
             
        },

        regrasMovimentacao : function(){
            if(this.corpo[0][0] > 19)
            {
                this.corpo[0][0] = 0;
            }
            if(this.corpo[0][1] > 19)
            {
                this.corpo[0][1] = 0;
            }
            if(this.corpo[0][0] <0)
            {
                this.corpo[0][0] = 19;
            }
            if(this.corpo[0][1] <0)
            {
                this.corpo[0][1] = 19;
            }
        },

        pontoAmarelo : function(){
            if(this.corpo[0][0]==a1){
                if(this.corpo[0][1]==a2){
                    tabuleiro[a1][a2] = 0;
                    
                    while(pontonaCobra(a1,a2, this.corpo) != 0){
                        a1 = Math.floor((Math.random()*100)%20);
                        a2 = Math.floor((Math.random()*100)%20);
                    }
                    
                    tabuleiro[a1][a2] = 2;
                   
                    this.corpo.push([-1,-1])
                }
            }
        },

        pontoVerde : function(){
            if(this.corpo[0][0]==v1){
                if(this.corpo[0][1]==v2){
                    tabuleiro[v1][v2] = 0;
                    this.faster = 2;
                    while(pontonaCobra(v1,v2, this.corpo) != 0){
                        v1 = Math.floor((Math.random()*100)%20);
                        v2 = Math.floor((Math.random()*100)%20);
                    }            
                    init  = setTimeout(function(){
                        tabuleiro[v1][v2] = 3;
                    }, 3000);

                    this.tempoFasterAtivado = millis()
                }
            }

        },

        trombar : function(){
            for(var i = 1; i<this.corpo.length; i++){
                if(this.corpo[i][0] == this.corpo[0][0]
                    && this.corpo[i][1] == this.corpo[0][1]){
                    noLoop();
                    document.getElementById("pontos").value = this.corpo.length * 10;
                    $('#first_name').val('');
                    $('#modal1').modal('open');
                }
            }
        }
    }
    cobrinha.corpo; 
    cobrinha.cor = '#ff5252';

    return cobrinha;

}

function keyPressed(){
    if (keyCode === LEFT_ARROW){
    if(seta !== 0)
    {
      seta = 1  
  }    
  } else if (keyCode === RIGHT_ARROW){
    if(seta !== 1)
    {
        seta = 0
    }
  }else if (keyCode === UP_ARROW){
    if(seta !== 2)
    {
        seta = 3
    }    
  }else if (keyCode === DOWN_ARROW){
    if(seta !== 3)
    {
        seta = 2
    }
  }
}

function pontonaCobra(n1, n2, arg){
    for(var i = 0; i < arg.length; i++){
       if(arg[i][0] == n1 && arg[i][1] ==n2)
       {
            return 1
        }
    }
    return 0;
}


$('#btnSalvar').click(function(){
    participantes.push({nome : $('#first_name').val(), pontuacao : $('#pontos').val()});

        $('#modal1').modal('close')
        listarParticipantes();
         setup();
        loop()
});

function listarParticipantes(){
        $('#rrrr').html("")
    for (var i = 0; i < participantes.length; i++){
         var tr = "<tr>";
         tr += "<td>"+ participantes[i].nome +"</td>";
        tr += "<td>"+ participantes[i].pontuacao +"</td>";
        tr += "</tr>"
        $('#rrrr').append(tr)
    }
}