var keys = ["LOrmlUBVcdcOCzhxd5QM", "i9GNFvuGLRX3Xuqgiyfk"];
var key;

createCookiesIfNotExists();
printLastPlayers();

switch(Math.floor((Math.random() * 2) + 1))
{
	case 1: key = keys[0]; break;
	case 2: key = keys[1]; break;
}

function updatePlayer(nev)
{
	if(nev == "")
		nev = $("#formName").val();
	
	if(!nev.trim())
		return;
	
	$.ajax({
        url: "https://fortnite.y3n.co/v2/player/" + nev,
        type: "GET",
        beforeSend: function(request){request.setRequestHeader("X-Key", key);},		
		error: function(request)
		{			
			$("#errorMessage").html("<div class='alert alert-danger alert-dismissible fade show mt-1 normal_font'><button type='button' class='close' data-dismiss='alert'>&times;</button>Nincs ilyen nevű felhasználó!</div>");
		},
        success: function(result)
		{
			addLastPlayer(result.displayName);
			printLastPlayers();
			
			$("#errorMessage").html("");
			
			var profilePic = Math.floor((Math.random() * 7) + 1);
			
			if(result.displayName == "Ninja")
				profilePic = "ninja";
			else if(result.displayName == "KriszhAdvice")
				profilePic = "kriszhadvice";
		
			$("#profilePic").html("<img src='images/" + profilePic + ".jpg'>");
		 
			$("#name").html(result.displayName);
			
			var lastUpdate = Math.floor((Date.now() - Date.parse(result.lastUpdate)) / 1000);
			var lastUpdateText = lastUpdate + " másodperce";			
			if(lastUpdate <= 0)
				lastUpdateText = "Most";
			
			$("#lastUpdate").html("Utoljára frissítve: " + lastUpdateText);
			
			$("#solo_lastMatch").html("Utolsó meccs: " + timeSince(Date.parse(result.br.stats.pc.solo.lastMatch)));
			$("#duo_lastMatch").html("Utolsó meccs: " + timeSince(Date.parse(result.br.stats.pc.duo.lastMatch)));
			$("#squad_lastMatch").html("Utolsó meccs: " + timeSince(Date.parse(result.br.stats.pc.squad.lastMatch)));
			
			$("#solo_matchesPlayed").html("Játszott meccsek: " + result.br.stats.pc.solo.matchesPlayed);
			$("#duo_matchesPlayed").html("Játszott meccsek: " + result.br.stats.pc.duo.matchesPlayed);
			$("#squad_matchesPlayed").html("Játszott meccsek: " + result.br.stats.pc.squad.matchesPlayed);
			$("#all_matchesPlayed").html("Játszott meccsek: " + result.br.stats.pc.all.matchesPlayed);
			
			$("#solo_wins").html("Győzelmek: " + result.br.stats.pc.solo.wins + " (" + (result.br.stats.pc.solo.wins/result.br.stats.pc.solo.matchesPlayed*100).toFixed(2) + "%)");
			$("#duo_wins").html("Győzelmek: " + result.br.stats.pc.duo.wins + " (" + (result.br.stats.pc.duo.wins/result.br.stats.pc.duo.matchesPlayed*100).toFixed(2) + "%)");
			$("#squad_wins").html("Győzelmek: " + result.br.stats.pc.squad.wins + " (" + (result.br.stats.pc.squad.wins/result.br.stats.pc.squad.matchesPlayed*100).toFixed(2) + "%)");
			$("#all_wins").html("Győzelmek: " + result.br.stats.pc.all.wins + " (" + (result.br.stats.pc.all.wins/result.br.stats.pc.all.matchesPlayed*100).toFixed(2) + "%)");
			
			var solo_kpd = "<span class='text-" + getColorForKPD(result.br.stats.pc.solo.kpd) + "'>" + (result.br.stats.pc.solo.kpd).toFixed(2) + "</span>";			
			var duo_kpd = "<span class='text-" + getColorForKPD(result.br.stats.pc.duo.kpd) + "'>" + (result.br.stats.pc.duo.kpd).toFixed(2) + "</span>";
			var squad_kpd = "<span class='text-" + getColorForKPD(result.br.stats.pc.squad.kpd) + "'>" + (result.br.stats.pc.squad.kpd).toFixed(2) + "</span>";
			var all_kpd = "<span class='text-" + getColorForKPD(result.br.stats.pc.all.kpd) + "'>" + (result.br.stats.pc.all.kpd).toFixed(2) + "</span>";
			
			$("#solo_kills").html("Ölések: " + result.br.stats.pc.solo.kills + " (K/D: " + solo_kpd + ")");
			$("#duo_kills").html("Ölések: " + result.br.stats.pc.duo.kills + " (K/D: " + duo_kpd + ")");
			$("#squad_kills").html("Ölések: " + result.br.stats.pc.squad.kills + " (K/D: " + squad_kpd + ")");
			$("#all_kills").html("Ölések: " + result.br.stats.pc.all.kills + " (K/D: " + all_kpd + ")");
		}
      });
}

function getColorForKPD(kpd)
{
	var color = "orange";
	
	if(kpd < 0.5)
		color = "red";
	if(0.5 <= kpd && kpd < 1)
		color = "grey";
	if(1 <= kpd && kpd < 1.5)
		color = "green";
	if(1.5 <= kpd && kpd < 2)
		color = "blue";
	if(2 <= kpd && kpd < 3)
		color = "purple";
	
	return color;
}

function timeSince(date)
{
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1)
  {
    return interval + " éve";
  }
  interval = Math.floor(seconds / 2592000);
  
  if (interval > 1)
  {
    return interval + " hónapja";
  }
  interval = Math.floor(seconds / 86400);
  
  if (interval > 1)
  {
    return interval + " napja";
  }
  interval = Math.floor(seconds / 3600);
  
  if (interval > 1)
  {
    return interval + " órája";
  }
  interval = Math.floor(seconds / 60);
  
  if (interval > 1)
  {
    return interval + " perce";
  }
  
  return Math.floor(seconds) + " másodperce";
}

$(document).keypress(function(e)
{
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13')
	{
		updatePlayer("");
    }
});

function setCookie(name, value)
{
        var d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        var cookieExpireDate = "expires=" + d.toString();
        document.cookie = name + "=" + value + "; " + cookieExpireDate + "; path=/";
}

function getCookie(cname)
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function createCookiesIfNotExists()
{
	if(getCookie("player1") == "" && getCookie("player2") == "" && getCookie("player3") == "")
	{
		setCookie("player1", "");
		setCookie("player2", "");
		setCookie("player3", "");
	}
}

function printLastPlayers()
{
	var toPrint = "";
	
	for(var i = 1; i <= 3; i++)
	{
		var player = getCookie("player" + i);
		
		if(player != "")
		{
			toPrint += "<button type='button' class='btn btn-dark ml-1' onClick='updatePlayer(\"" + player + "\");'>" + player + "</button>";
		}
	}
	
	$("#lastPlayers").html(toPrint);
}

function addLastPlayer(name)
{
	if(getCookie("player1") == name || getCookie("player2") == name || getCookie("player3") == name)
		return;
	
	setCookie("player3", getCookie("player2"));
	setCookie("player2", getCookie("player1"));
	setCookie("player1", name);	
}
