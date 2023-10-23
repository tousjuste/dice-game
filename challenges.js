/**************/
/* Regles du jeu */
/**************/

/*

Le jeu se déroule à 2 joueurs, jouant en tours ;
- A chaque tour, un joueur lance un dé autant de fois qu'il le souhaite. Chaque résultat est ajouté à son score ROND ;
- MAIS, si le joueur obtient un 1, tout son score ROND est perdu. Après c'est au tour du joueur suivant
- Le joueur peut choisir de « Hold », ce qui signifie que son score ROND est ajouté à son score GLOBAL. Après cela, c'est au tour du joueur suivant ;
- Le premier joueur à atteindre 100 points sur le score GLOBAL remporte la partie.


*/




/* 

*1. Un joueur perd la totalité de son score lorsqu’il obtient deux 6 d’affilée. Après cela, c'est au tour du joueur suivant. (Astuce : sauvegardez toujours le lancer de dés précédent dans une variable distincte) ;

* 2. Ajoutez un champ de saisie au HTML où les joueurs peuvent définir le score gagnant, afin qu'ils puissent modifier le score prédéfini de 100. (Indice : vous pouvez lire cette valeur avec la propriété « .value » en JavaScript) ;

* 3. Ajoutez un autre dé au jeu, de sorte qu'il y ait maintenant deux dés. Le joueur perd son score actuel lorsque l'un d'entre eux est un 1. (Indice : vous aurez besoin de CSS pour positionner le deuxième dé, alors jetez un œil au code CSS du premier).
*/



var scores, roundScore, activePlayer, prevDiceRoll, gamePlaying;


init();


document.querySelector('.btn-roll').addEventListener('click', function () {

  
  if (gamePlaying) {

    
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
    document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
    
    
    if(dice1 === 6 && prevDiceRoll === 6) {
        
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
        
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
         
        nextPlayer();
    }

    
    prevDiceRoll = dice1;

  }

});


document.querySelector('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {

    
    scores[activePlayer] += roundScore;

    
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    var input = document.getElementById('winningScore').value;
    var winningScore;

    
    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    
    if (scores[activePlayer] >= winningScore) {

      
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

      
      document.getElementById('dice1').style.display = 'none';
      document.getElementById('dice2').style.display = 'none';

      
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

      
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      
      gamePlaying = false;

    } else {
      
      nextPlayer();
    }
  }
});


document.querySelector('.btn-new').addEventListener('click', init);

function init() {

  
  gamePlaying = true;

  
  scores = [0, 0];

  
  activePlayer = 0;

  
  roundScore = 0;

  
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

   
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}


function nextPlayer() {

  
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  
  roundScore = 0;
  
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

}