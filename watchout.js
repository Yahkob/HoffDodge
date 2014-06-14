$(document).ready(function(){
bootbox.confirm("Are you sure you wont cry when the hoff hassels you??", function(result) {
  if(result){
    bootbox.hideAll();
  }
  else{
    window.location.href="http://tucsoncitizen.com/morgue/files/2007/01/l38304-1.jpg"
  }
});
})
var gameSettings = {
  height: 600,
  width: 700,
  nEnemies: 40,
  padding: 20
};

var time = 1500
var score = {
  highScore: 0,
  currentScore: 0,
  collisions: 0
};

var updateScore = function(){
  d3.select('#currentScore').text(score.currentScore);
  d3.select('#highScore').text(score.highScore);
  d3.select('#collisions').text(score.collisions);
}

$('#hard').click(function(){
  gameSettings.nEnemies = 90090;
  time = 45
});

var makeEnemies = function() {
  return _.range(0,gameSettings.nEnemies).map(function(itemId){
    return{
    id: itemId,
    cX: Math.random() * 800,
    cY: Math.random() * 600
    }
  });
};




var enemies = makeEnemies();
var board = d3.select('.container').append('svg')
                .attr({width: gameSettings.width,height: gameSettings.height})
                .attr({class: 'board'});
var enemy = board.selectAll('image').data(enemies).enter().append('svg:image')
.attr("r",10 )
.attr("xlink:href",'dave.png')
.attr('x',function(i){return i.cX})
.attr('id',function(i){return i.id})
.attr('width', 50)
.attr('height',90)
.attr('y',function(i){return i.cY});



var drag = d3.behavior.drag()
    .on("drag", function(d){
     d3.select(this)
      .attr("cx", d.x = Math.max(10, Math.min(690, d3.event.x)))
      .attr("cy", d.y = Math.max(10, Math.min(590, d3.event.y)));
})

var player = board.selectAll('player').data([666]).enter().append('circle')
.attr('r',13)
.attr('fill','magenta')
.attr('cy',200)
.attr('cx',350)
.attr('class','player').call(drag)


setInterval(function(){
  enemy.transition().duration(1900).attr('x',function(i){return Math.random() * 900})
  .attr('y',function(){return Math.random() * 750})
  .tween('custom', function(i,d){return function(t){
    var enemy = d3.select(this);
    var radiusSum =  parseFloat(enemy.attr('r')) + d3.select('.player').attr('r')
    var hero = d3.select('.player');
    var yDiff = parseFloat(enemy.attr('y')) - parseFloat(hero.attr('cy'));
    var xDiff = parseFloat(enemy.attr('x')) - parseFloat(hero.attr('cx'));
    var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) )
    if(separation < 30){
      if(score.highScore < score.currentScore){
        score.highScore = 0 + score.currentScore;
      }
      score.collisions += 1
      score.currentScore = 0;
    }
  }
  });
},time);

function increaseScore(){
  score.currentScore += 2
  updateScore()
}

setInterval(function(){
  increaseScore()
},50)
updateScore()

