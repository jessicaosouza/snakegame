"use strict"
  var campo = [];
  var head;
  var column = 20;
  var row = 20;
  var snake = [];
  var dir = 0;


var lmov;

function setup() {
    createCanvas(601, 601);
    //aqui eu crio a matriz e coloco 0 em cada posicao
    for (var i = 0; i < row; i++) {
    campo[i] = [];
        for (var j = 0; j < column; j++) {
            campo[i][j]=0;
        }
    }
    //aqui eu crio uma cobrinha
    //os itens passados são coordenadas na matriz
    //[0,4] esta na posicao 0 do vetor snake, mas esta na posicao [0][0]
    //[0,3] na posicao  etc
   
    snake.push([0,1]);
    snake.push([0,0]); 
    campo[10][10] = 2;
    lmov = millis();
}

function draw() {
    clear();
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < column; j++) {
            //aqui vai inserir pontos coloridos na matriz campo
            //quando for diferente de 0 ele vai ser amarelo
            //os campos foram definidos manualmente
            if(campo[i][j] == 0)
            {
                fill(color(255, 255, 255));          
            }else if(campo[i][j] == 2)
            {
                fill(color(255, 255, 0));        
            }
            var x = i * 30;
            var y = j * 30;        
            rect(x, y, 30, 30);
        }
    }

    //quando eu coloco snake[][] o primeiro colchete se refere a cobrinha
    //ou seja, a posicao do vetor que tem a cobrinha
    //o segundo se refere a cordenada x ou y, x move na horizontal
    //e o y move na vertical
    //sempre ter em mente que a cobra é um array que guarda a coordenada x,y 
    //dentro da matriz maior
    switch(dir){
        case 0:
            if(millis()-lmov>400){
                lmov = millis();
                //aqui eu pego a cabeça da snake (q é o primeiro [0])
                //o segundo [0] pode ser 0(x) ou 1(y)
                //como esta [0] corresponde ao eixo X
                //ao somar eu vou mover uma posição para direita
                
                // for (var i = snake.length - 1; i > 0; i--) {
                    
                //     snake[i] = [snake[i-1][0],snake[i-1][1]];
                // }
                snake[0][0]+=1;
            }
        break;
        case 1:
            if(millis()-lmov>400){
                lmov = millis();
                
                // for (var i = snake.length - 1; i > 0; i--) {
                //     //vou mover a cobra para baixo
                //     //a partir do rabo
                //     snake[i] = [snake[i-1][0],snake[i-1][1]];
                // }
                //como ainda estou no eixo X, ao subtrair, vou mover uma
                //posicao para esquerda
                snake[0][0]+=-1;
            }
        break;
        case 2:
            if(millis()-lmov>400){
                lmov = millis();
                //aqui já estamos no eixo Y, ao somar vou descer
                //uma posicao

                // for (var i = snake.length - 1; i > 0; i--) {
                //     snake[i] = [snake[i-1][0],snake[i-1][1]];
                // }
                snake[0][1]+=1;
            }
        break;
        case 3:
            if(millis()-lmov>400){
                lmov = millis();
                //ainda no eixo Y, ao subtrair vou subir uma posicao

                // for (var i = snake.length - 1; i > 0; i--) {
                //     snake[i] = [snake[i-1][0],snake[i-1][1]];
                // }
                snake[0][1]+=-1;
            }
        break;
    }

    if(snake[0][0] > 19)
    {
        snake[0][0] = 0;
    }
    if(snake[0][1] > 19)
    {
        snake[0][1] = 0;
    }
    if(snake[0][0] <0)
    {
        snake[0][0] = 19;
    }
    if(snake[0][1] <0)
    {
        snake[0][1] = 19;
    }
    

    fill(color('#ff5252'));     
    for (var i = 0; i < snake.length; i++) {
        //aqui eu desenho a cobrinha, o fill define a cor
            var x = snake[i][0] * 30;
            var y = snake[i][1] * 30;
            rect(x, y, 30, 30);
    }
}

