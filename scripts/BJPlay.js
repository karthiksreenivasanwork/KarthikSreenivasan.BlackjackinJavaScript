/*
1. Copy the card object collection into a new array.
2. Generate random numbers to fetch unique cards.
3. Have one card for the dealer and 2 cards for the player.
4. If the player is hitting, then add one additional card for dealer 
   as well as player before declaring the winner.
5. If the player is staying, then add one additonal card for the dealer
   before calculations to declare the winner.
*/

function onbtnStartGameClick() {
   document.getElementById("btnHit").style.visibility = 'visible';
   document.getElementById("btnStay").style.visibility = 'visible';
}

function onbtnbtnRestartGameClick() {
   document.getElementById("btnHit").style.visibility = 'hidden';
   document.getElementById("btnStay").style.visibility = 'hidden';
}

function onbtnHitClick() {
   console.log("Hit button event fired");
}

function onbtnStayClick() {
   console.log("Stay button event fired");
}