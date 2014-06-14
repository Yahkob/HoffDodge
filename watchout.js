var gameSettings = {
  height: 600,
  width: 700,
  nEnemies: 90,
  padding: 20
};
var score = {
  highScore: 0,
  currentScore: 0
};

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
var enemy = board.selectAll('circle').data(enemies).enter().append('circle')
.attr("r",10 )
.attr("fill",'teal')
.attr('cx',function(i){return i.cX})
.attr('id',function(i){return i.id})
.attr('cy',function(i){return i.cY})

var drag = d3.behavior.drag()
    .on("drag", function(d){
     d3.select(this)
      .attr("cx", d.x = Math.max(10, Math.min(690, d3.event.x)))
      .attr("cy", d.y = Math.max(10, Math.min(590, d3.event.y)));
})

var player = board.selectAll('player').data([1]).enter().append('circle')
.attr('r',10)
.attr('fill','magenta')
.attr('cy',200)
.attr('cx',350)
.attr('class','player').call(drag)


setInterval(function(){
  enemy.transition().duration(1900).attr('cx',function(i){return Math.random() * 900})
  .attr('cy',function(){return Math.random() * 750})
},1500);



