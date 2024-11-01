const state = {// colocar as variaveis aqui
    view:{ //variaveis que podem ser vistas (elementos da tela)
        boxes: document.querySelectorAll('.box'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        lifes: document.querySelector('#lifes')
    },
    values:{ //valores não vistos
        gameVelo: 1000, // tempo de troca em ms
        hitPosition: 0, //armazena o id da caixa que o inimigo ta
        result: 0, //armazena o resultado
        currentTime:60,
        totalLifes:3    
    },
    actions:{//variaveis que representam chamadas de funçoes ou ações que acontecem
        timerId:null,
        countDownTimerId: setInterval(countDown,1000),//chama a funcao countDown a cada segundo
    }
}

function playAudio(audioName){
    let audio = new Audio(`./src/audio/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime
    if(state.values.currentTime <= 0){
        gameOver()
    
        // clearInterval(state.actions.timerId)
        // clearInterval(state.actions.countDownTimerId)
    }
}

function resetGame(){
    state.values.currentTime = 60
    state.values.result = 0
    state.view.score.textContent = 0
    state.view.timeLeft.textContent = 60
    state.values.totalLifes = 3
    state.view.lifes.textContent = 'X3'
}

//mover o inimigo para outra caixa 
function moveEnemy(){
    //executa a função randomBox a cada gameVelo ms
    state.actions.timerId = setInterval(randomBox, state.values.gameVelo)
}

function randomBox(){
    //remover a classe inimigo de todas as caixas
    state.view.boxes.forEach((box)=>{
        box.classList.remove('enemy') //removendo a classe 'enemy' da caixa
    })

    let numAleatorio = Math.floor(Math.random()*9)//num aleatorio entre 0 e 8
    let boxAleatoria = state.view.boxes[numAleatorio] //pegando a caixa que corresponde ao num aleatorio
    boxAleatoria.classList.add('enemy')//colocando na box aleatoria a classe enemy
    state.values.hitPosition = boxAleatoria.id;
}

//adiciona um listener nas caixas em que o inimigo pode aparecer
function addListenerHitBox(){
    state.view.boxes.forEach((box) => {
        box.addEventListener('mousedown', ()=>{
            if(box.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null//para o jogador poder clicar apenas uma vez no inimigo
                playAudio("hit")
            }else{
                state.values.totalLifes--
                state.view.lifes.textContent = ('X'+state.values.totalLifes)
                
                if(state.values.totalLifes < 0){
                    gameOver()
                }
            }
        })
    })
}

function gameOver(){
    alert("Game Over! O seu resultado foi: "+state.values.result)
    resetGame()
}

function main(){
    moveEnemy()
    addListenerHitBox()
}

main()