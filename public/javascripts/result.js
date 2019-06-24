$(function () {
    $(".save").on("mouseenter", function () {
        var id = $(this).attr("id");
        $("#"+id).attr("class", "glyphicon glyphicon-heart save");
        $("#"+id).css("color", "#000");
    });
    $(".save").on("mouseleave", function () {
        var id = $(this).attr("id");
        $("#"+id).attr("class", "glyphicon glyphicon-heart-empty save");
        $("#"+id).css("color", "darkgray");
    });
});