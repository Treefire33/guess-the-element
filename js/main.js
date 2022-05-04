publishClue();
var currentPeriod = 1;
var guessQueued = "NAVA";
var guesses = 0;
$(".row").hide();
$("#p1").show();
$("#clues").text(currentClue);
var points;
$(document).ready(function(){
    $("#beginGround").show();
    $("#winpopup").hide();
    $("#stats").hide();
    $("#losepopup").hide();
    $('.helpBackground').click(function(){
        $('.helpBackground').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.helpBackground').hide();
    });
    $('#winpopup').click(function(){
        location.reload();
    });
    $('#winpopup > .popupCloseButton').click(function(){
        location.reload();
    });
    $("#losepopup").click(function(){
        location.reload();
    });
    $("#losepopup > .popupCloseButton").click(function(){
        location.reload();
    });
    $("#statsBttn").click(function(){
        $("#stats").show();
    });
    $("#helpBttn").click(function(){
        $("#beginGround").show();                     
    });
    if(localStorage.points)
    {
        points = localStorage.getItem("points");
        $("#totalPointsEarned").text(points.toString() + " points");
    }
    else
    {
        points = "No";
    }
    $("#lbttn").click(function(){
        if(currentPeriod !== 1)
        {
            currentPeriod -= 1;
            $("#p"+currentPeriod.toString()).show();
            $("#p"+(currentPeriod+1).toString()).hide();
        }
    });
    $("#rbttn").click(function(){
        if(currentPeriod !== 9)
        {
            currentPeriod += 1;
            $("#p"+currentPeriod.toString()).show();
            $("#p"+(currentPeriod-1).toString()).hide();
        }
    });
    $(".elementButton").click(function(){
       var guessId = $(this).attr('id');
       guessQueued = guessId;
    });
    $("#enter").click(function(){
        if(guessQueued !== "NAVA")
        {
            if(guesses != 7)
            {
                let newIMG = getElementFromSymbol(guessQueued);
                var val = newIMG, src = 'http://raw.githubusercontent.com/Treefire33/elementle/main/img/' + val +'.png', img = document.createElement('img');
                img.src = src;
                $("#guesses").append('<div id="guess'+guesses+'"'+'>', img, "<br>" ,newIMG, "</div>", "<br>");
//                 var correctnessImage = checkCorrectness(newIMG);
//                 var val = correctnessImage, src = 'http://raw.githubusercontent.com/Treefire33/elementle/main/img/' + val +'.png', img = document.createElement('img');
//                 img.src = src;
//                 img.width = "75px";
//                 img.height = "75px";
//                 $("#guess"+guesses.toString()).append(img);
                guesses = guesses + 1;
                var correctness = checkCorrectness(newIMG);
                if(correctness == "check")
                {
                    $("#winpopup").show();
                    $("#guessesUsed").text(guesses + " guesses");
                    let points = calcPoints(guesses);
                    $("#pointsEarned").text(points + " points");
                    if(localStorage.points)
                    {
                        localStorage.points = Number(localStorage.points) + points;
                    }
                    else
                    {
                        localStorage.points = points;
                    }
                }
            }
            else
            {
                $("#losepopup").show();
                let points = 5;
                $("#correctAnswerText").text(currentAnswer);
                $("#pointsLost").text(points + " points");
                if(localStorage.points)
                {
                    localStorage.points = Number(localStorage.points) - points;
                }
                else
                {
                    localStorage.points = 0;
                }
            }
        }
        guessQueued = "NAVA";
    });
});

function checkCorrectness(answer)
{
    if(answer == currentAnswer)
    {
        return "check";
    }
    else if(answer == currentCloseAnswer)
    {
        return "triangle";
    }
    else
    {
        return "cross";
    }
}

function calcPoints(gUS)
{
    if(gUS === 1)
    {
        return 10;
    }
    if(gUS === 2)
    {
        return 8;
    }
    if(gUS === 3)
    {
        return 6;
    }
    if(gUS === 4)
    {
        return 4;
    }
    if(gUS === 5)
    {
        return 2;
    }
    if(gUS === 6)
    {
        return 1;
    }
}
