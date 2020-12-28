"use strict"
  var campo = [];
  var column = 20;
  var row = 20;
  var snake = [];
  var dir = 0;
  var lmov,aux;
  var p1,p2, v1, v2;


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
    p1 = 10;
    p2 = 10;
    v1 = 5;
    v2 = 5;
    campo[v1][v2] = 0;
    campo[p1][p2] = 2;
    lmov = millis();
    aux = millis();
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
            }else if(campo[i][j] == 3)
            {
                fill(color(0,255,0));
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
        case 0: //direita            
            if(millis()-lmov>200){
                lmov = millis();                        
                //aqui eu pego a cabeça da snake (q é o primeiro [0])
                //o segundo [0] pode ser 0(x) ou 1(y)
                //como esta [0] corresponde ao eixo X
                //ao somar eu vou mover uma posição para direita
                for (var i = snake.length - 1; i > 0; i--) {
                    snake[i] = [snake[i-1][0],snake[i-1][1]];
                }
                snake[0][0]+=1;
            }
            if(campo[v1][v2] == 3){
                if(millis()-lmov>100){
                    lmov = millis();   
                     for (var i = snake.length - 1; i > 0; i--) {
                    snake[i] = [snake[i-1][0],snake[i-1][1]];
                }
                snake[0][0]+=1;
                }
            }
        break;
        case 1: //esquerda        
            if(millis()-lmov>200){
                lmov = millis();
                for (var i = snake.length - 1; i > 0; i--) {
                    //vou mover a cobra para baixo
                    //a partir do rabo
                    //aqui a posicao que estou no for, recebe a posicao debaixo, 
                    //fazendo cada item da cobra ir para baixo, seguindo a cabeça da cobra
                    snake[i] = [snake[i-1][0],snake[i-1][1]];
                }
                //como ainda estou no eixo X, ao subtrair, vou mover uma
                //posicao para esquerda
                snake[0][0]+=-1;  
            }   
            if(campo[v1][v2] == 3){
                if(millis()-lmov>100){

                    lmov = millis();  
                for (var i = snake.length - 1; i > 0; i--) {
                    //vou mover a cobra para baixo
                    //a partir do rabo
                    //aqui a posicao que estou no for, recebe a posicao debaixo, 
                    //fazendo cada item da cobra ir para baixo, seguindo a cabeça da cobra
                    snake[i] = [snake[i-1][0],snake[i-1][1]];
                }
                    //como ainda estou no eixo X, ao subtrair, vou mover uma
                    //posicao para esquerda
                    snake[0][0]+=-1;     
                }          
            }            
        break;
        case 2: //pra baixo        
            if(millis()-lmov>200){
                lmov = millis();
                //aqui já estamos no eixo Y, ao somar vou descer
                //uma posicao
                for (var i = snake.length - 1; i > 0; i--) {
                    snake[i] = [snake[i-1][0],snake[i-1][1]];
                }
                snake[0][1]+=1;
            }
            if(campo[v1][v2] == 3){
                if(millis()-lmov>100){

                    lmov = millis();  
                    for (var i = snake.length - 1; i > 0; i--) {
                    snake[i] = [snake[i-1][0],snake[i-1][1]];
                }
                snake[0][1]+=1;
                }
            }
        break;
        case 3: //pra cima
            if(millis()-lmov>200){
                lmov = millis();
                //ainda no eixo Y, ao subtrair vou subir uma posicao

                for (var i = snake.length - 1; i > 0; i--) {
                    snake[i] = [snake[i-1][0],snake[i-1][1]];
                }
                snake[0][1]+=-1;
            }
            if(campo[v1][v2] == 3){
                if(millis()-lmov>100){

                    lmov = millis();  
                    for (var i = snake.length - 1; i > 0; i--) {
                    snake[i] = [snake[i-1][0],snake[i-1][1]];
                }
                snake[0][1]+=-1;
                }
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

    checaponto();

    if(millis()-aux>9000){
         aux = millis();
         console.log("aqui")
        campo[v1][v2] = 3;
    }   
    pontoVerde();

    fill(color('#ff5252'));     
    for (var i = 0; i < snake.length; i++) {
        //aqui eu desenho a cobrinha, o fill define a cor
            var x = snake[i][0] * 30;
            var y = snake[i][1] * 30;
            rect(x, y, 30, 30);
    }

    //verifica se a cobra acertou ela mesma
    for (var i = 1; i < snake.length; i++) {
        if(snake[i][0] == snake[0][0] && snake[i][1] == snake[0][1])
        {
            alert("Você Perdeu!");
            snake = [];       
            snake.push([0,1]);
            snake.push([0,0]);
            campo[v1][v2] = 0;
        }
     }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if(dir !== 0)
    {
      dir = 1  
  }    
  } else if (keyCode === RIGHT_ARROW) {
    if(dir !== 1)
    {
        dir = 0
    }
  }else if (keyCode === UP_ARROW) {
    if(dir !== 2)
    {
        dir = 3
    }    
  }else if (keyCode === DOWN_ARROW) {
    if(dir !== 3)
    {
        dir = 2
    }
  }
}

function checaponto(){
    //se o p1 e p2 iniciam valendo 10/
    //se ele cair onde esta pintado, que é a posicao p1,p2 
    //eles recebem uma posicao aleatoria e ela aumenta o tamanho
    if(snake[0][0]==p1){
        if(snake[0][1]==p2){
            campo[p1][p2] = 0;
            
            while(pontonaCobra(p1,p2) != 0){
                p1 = Math.floor((Math.random()*100)%20);
                p2 = Math.floor((Math.random()*100)%20); 
            }
            
            campo[p1][p2] = 2;
           
            snake.push([-1,-1])
        }
    }
}

function pontoVerde(){
    if(snake[0][0]==v1){
        if(snake[0][1]==v2){
            campo[v1][v2] = 0;
            
            while(pontonaCobra(v1,v2) != 0){
                v1 = Math.floor((Math.random()*100)%20);
                v2 = Math.floor((Math.random()*100)%20); 
            }            

            if(millis()-aux>9000){
            aux = millis();
            campo[v1][v2] = 3;
            }           
            snake.push([-1,-1])
        }
    }
}




//verifica se nao esta atribuindo uma posicao para o ponto amarelo onde a cobra esta
function pontonaCobra(n1, n2){
    for(var i = 0; i < snake.length; i++) {
       if(snake[i][0] == n1 && snake[i][1] ==n2)
       {    
            return 1
        }
    }
    return 0;
}

