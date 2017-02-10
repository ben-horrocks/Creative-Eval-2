$(document).ready(function() {

    var currentmonster={name:"",challenge:""}
    var wincount=0;
var getmonster=function()
{
  $("#status").empty();
  var randomNumber=Math.floor((Math.random()*325)+1);
  var url="http://www.dnd5eapi.co/api/monsters/"+randomNumber+"/";
  var image="img/" + randomNumber + ".png";
  $("#monstericon").attr('src',image);
  showbuttons();
  $("#EncounterButton").css("opacity","0");
//  console.log(image);
//  console.log(url);
  $.ajax({
  url,
  dataType : "json",
  success : function(parsed_json) {
      console.log(parsed_json);
      var statblock="Here are it's stats: <ul>";
      var monstername=parsed_json['name'];
      var strength=parsed_json['strength'];
      var dexterity=parsed_json['dexterity'];
      var constitution=parsed_json['constitution'];
      var wisdom=parsed_json['wisdom'];
      var intelligence=parsed_json['intelligence'];
      var charisma=parsed_json['charisma'];
      var hp=parsed_json['hit_points'];
      var chal=parsed_json['challenge_rating'];
      var monsterstring = "A Wild " + monstername + " Appeared!";
      statblock += "<li> Hit Points: " + hp;
      statblock += "<li> Strength: " + strength;
      statblock += "<li> Dexterity: " + dexterity;
      statblock += "<li> Constitution: " + constitution;
      statblock += "<li> Intelligence: " + intelligence;
      statblock += "<li> Wisdom: " + wisdom;
      statblock += "<li> Charisma: " + charisma;
      currentmonster.name=monstername;
      currentmonster.challenge=chal;
  $("#monsterencounter").html(monsterstring);
  $('#monsterstats').html(statblock);
  }
  });
}

var hidebuttons=function()
{
    $(".battlebuttons").css("opacity","0");
}

var showbuttons=function()
{
    $(".battlebuttons").css("opacity","1");
}

$( "#EncounterButton" ).click(function(e)
{
    getmonster();
    e.preventDefault();
})
$( "#FightButton" ).click(function(e)
{
    var winstatus=currentmonster.challenge*2;
    var randomNumber=Math.floor((Math.random()*100)+1);
    if(randomNumber<=winstatus){
        var losestring="YOU LOSE!";
        $("#status").html(losestring);
        $("#monsterstats").empty();
        $("#monstername").empty();
        var losemp3=document.getElementById("loseaudio");
        losemp3.play();
        var slainby = "You were slain by a " + currentmonster.name + ".<br>";
        slainby += "I am sure that they will tell tales of your epic struggle for greatness."
        $("#monsterencounter").html(slainby);
        var image="img/lose.png";
        $("#monstericon").attr('src',image);
        wincount=0;
        hidebuttons();
        $("#EncounterButton").css("opacity","1");
        $("#EncounterButton").val("Try Again?");
    }
    else{
        wincount++;
        var winstring="YOU WIN!";
        winstring +=" WIN COUNT: " + wincount;
        getmonster();
        $("#status").html(winstring);
    }
    e.preventDefault();   
    
});
$( "#FleeButton" ).click(function(e){
    var losestring = "You cowardly run away.";
    var fleemp3=document.getElementById("fleeaudio");
        fleemp3.play();

        $("#status").html(losestring);
        $("#monsterstats").empty();
        $("#monstername").empty();
        var image="img/runaway.png";
        $("#monstericon").attr('src',image);
        $("#monsterencounter").empty();
        $("#EncounterButton").css("opacity","1");
        $("#EncounterButton").val("Go Look for Mo' Trouble??");    
        hidebuttons();
});

$( "")
    
});
