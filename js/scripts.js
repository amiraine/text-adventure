//backend & globals
var strikeText = ['You throw an elbow at your enemy and the hit lands heavy. You can tell you caused some damage.', 'You strike the enemy with your torch and it staggers back. It catches its footing and races towards you.', 'You lunge at your enemy with all of your might, lifting it off of its feet and slamming it into the ground.', 'Your left hook connects with the face of your foe. Causing physical and emotional damage.', 'You hammer pound your enemy on the top of the skull with audible thunk. It turns to run and you kick it in the back.', 'You hit the enemy and it stumbles. It regains its composure and quickly reaches for you.']
var missText = ['You slip as you move to strike and your hit doesn’t land. Try to hit it again?', 'Your punch lands short. You’ve done no damage.', 'Your kick doesn’t connect. The enemy has taken no damage.', 'Your enemy darts aside and you stumble past it clumsily.', 'You under reach and your attack doesn’t connect.']
var dodgeText = ['With the grace of a ferret, you dart behind a narrow chasm and your enemy slams his fist in the wall.', 'You spin to your right and avoid your enemy’s attack.', 'You duck, narrowly missing a heavy throw from your enemy.', 'You jump back and watch as your attacker\'s punch just misses your gut.', 'Your enemy throws a punch and while you go to block, you slip. This send your enemy tumbling over you, giving you a chance to hold your ground.']
var enemyStrikeText = ['With stunning force, the enemy lunges and hits you with all of its might.', 'The enemy bludgeons you with its spiky club.', 'Your enemy swings a giant club your way, connecting with your shoulder and sending waves of shock through your body.', 'You kick at the skeleton and miss. It throws you against the wall with it’s boney arms. ', 'The enemy claws you with its dirty, stinky talons.','The enemy’s forceful blow knocks the breath right out of your lungs. Gasping, you roll out of the way before it hits you again.', 'The enemy kicks you in the knee and laughs as you fall to the floor.'
]
var roomStartNarr =['','Its damp, earthy smell overtakes your senses.', 'You look around and notice two paths: one on your left and one on your right.', 'Which path will you choose?']
var roomOneNarr = ['', 'Lying on your belly, you begin a scramble into an equally small room', 'There isn’t anything in here. Just some mushrooms on the ground and some moist moss.']
var roomTwoNarr = ['', 'As your eyes begin to adjust to the low light, you see a human skeleton on the floor.', 'Some how, some way, the skeleton begins to jostle.', ' It has noticed your appearance in its eternal chamber and has begun stumbling towards you.','Closer and closer it comes, readying its attack.', 'Prepare yourself for a fight!']
var roomTwoAfterFight = ['','You hit the skeleton with so much force, it cascades boney shards in every direction.', 'You rest a minute and try to collect your feelings.', 'What just happened?', 'The scattered bones move no more.', 'Sensing no other immediate threat, you proceed.']
var roomThree = ['', 'Holding your breath, scared and nervous, you progress deeper into the cavern.’, ‘There are no enemies in this room, save the path itself.’, ‘A rickety bridge is in front of you and is the only way across.’, ‘You step out with your right foot and the bridge begins to sway.’, ‘Anxiously, you press on.']
//front end
$(document).ready(function(){
  $("#start").submit(function(event) {
    var inputName = $("#name").val();
    var player = new User(inputName);
    var enemy = new Enemy();
    var classInput = $("#classSelect").val();
    event.preventDefault();

    $("#attack").click(function() {
      enemy.userAttack();
      if ((enemy.enemyRoll[enemy.enemyRoll.length-1]) === 20) {
        $(".combat-text").text("The enemy dodged your attack");
      } else {
        $(".combat-text").text(strikeText[Math.floor(Math.random()*strikeText.length)]);
      }
      player.enemyAttack();
      if ((player.combatRoll[player.combatRoll.length-1]) >= 19) {
        $(".enemy-text").text(dodgeText[Math.floor(Math.random()*dodgeText.length)]);
      } else if ((player.combatRoll[player.combatRoll.length-1]) >= 17) {
        $(".enemy-text").text("You blocked the attack")
      } else {
        $(".enemy-text").text(enemyStrikeText[Math.floor(Math.random()*enemyStrikeText.length)]);
      }
      $("#textTwo").hide();
      $(".combat-text").show();
      // if (player.special >= 30) {
      //   $("#special").show();
      // }
    });
    $("#special").click(function() {
      enemy.special();
      console.log(enemy);
      $("#special").hide();
      player.special = 0;
    });
    $("#userName").text(inputName);
    $("#classTitle").text(classInput);
    // $("#userHP").text("100" + " / " + "100")
    $(".titleCard").slideUp();
    $(".roomStart").slideDown();
    $(".userStats").slideDown();

  });
//start room
  var indexStart = 0;
  $(".nextStart").click(function(event){
    event.preventDefault();
    indexStart +=1;
    $("#textStart").text(roomStartNarr[indexStart]);
    if(indexStart === 4){
      $(".roomStart").hide();
      $(".choiceStart").show();
    }
  });
//make sure next buttons are in the last line of the arrays
//Go left choice
  $("#leftStart").click(function(event){
    $(".choiceStart").hide();
    $(".roomOne").show();
  })
//room one
  var indexOne = 0;
  $(".nextOne").click(function(event){
    event.preventDefault();
    indexOne +=1;
    $("#textOne").text(roomOneNarr[indexOne]);
    if(indexOne === 3){
      $(".roomOne").hide();
      $(".turn-back").show();
    }
  });
  $(".turn-back").click(function(event) {
    event.preventDefault();
    $(".choiceStart").show();
    $("#leftStart").hide();
    $(".turn-back").hide();
  });
  // Go right choice
  $("#rightStart").click(function(event) {
    event.preventDefault();
    $(".choiceStart").hide();
    $(".roomTwo").show();
  });
  // room two
  var indexTwo = 0;
  $(".nextTwo").click(function(event) {
    indexTwo +=1;
    $("#textTwo").text(roomTwoNarr[indexTwo]);
    if(indexTwo === 5) {
    $(".nextTwo").hide();
    $(".combat").show();
    $(".combat-text").hide();
    }
  });
});
