/*
GAME RULES:

- The game has 2 players, playing in rounds.
- By default, the winning score is 100; the player can set the winning score.
- In each turn, a player rolls 2 dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach winning points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function (){
    if(gamePlaying){
        //1. Generate a random number;
        var dice1 = Math.floor(Math.random()*6)+1;
        var dice2 = Math.floor(Math.random()*6)+1;
        //2. Display the result
        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice2').style.display = 'block';
        
        document.getElementById('dice1').src = 'dice-'+dice1 +'.png';
        document.getElementById('dice2').src = 'dice-'+dice2 +'.png';
        
        //3. update the round score
        if(dice1 !==1 && dice2 !==1){
            //add score to roundScore
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }else{
            //switch player
            sleep(500).then(()=>{
                scores[activePlayer]=0;
                document.getElementById('score-'+activePlayer).textContent = 0;
                switchPlayer();
            })
        }              
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add the current score to the total score
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.setScore').value;
        if(input) {
            winningScore = input;
        }else{
            winningScore = 100;
        }
    
        //check if the player wins the game
        if(scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            document.getElementById('dice1').style.display = 'none'; //note: it is not a good practice to manipulate css style in javascript
            document.getElementById('dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else 
            switchPlayer();       
    }
})


document.querySelector('.btn-new').addEventListener('click', init);

function switchPlayer() {
    //next player        
    roundScore = 0;
    
    activePlayer = Math.abs(activePlayer-1);
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active'); 
    document.querySelector('.player-1-panel').classList.toggle('active'); 
        
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
   
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); 
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}