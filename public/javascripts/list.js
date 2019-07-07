$(function () {
    for(var i=0; i<26; i++){
        // If there is no celebrity name starting with the letter, then hide the row, border and the letter
        if(!$("#"+i).next().text()){
            $("#"+i).css("display", "none");
            $("#"+i).next().removeClass("border");
        } else{
            $("#letter"+i).css("display", "inline-block");
        }
        $("#viewing").css("display", "inline-block");
    }
    // remove the border of last row
    $(".border:last").removeClass("border");
});