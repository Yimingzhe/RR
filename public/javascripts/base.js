$(function () {
    $("#reg-login").on("click", function () {
        $("#reg-login").attr("data-dismiss", "modal");
        $("#signIn").modal("show");
        setTimeout(function(){
            $("body").css("padding-right", "0");
        },0);
    });
    $("#login-reg").on("click", function () {
        $("#login-reg").attr("data-dismiss", "modal");
        $("#register").modal("show");
        setTimeout(function(){
            $("body").css("padding-right", "0");
        },0);
    });
    $("#login-close, #reg-close").on("click", function () {
        setTimeout(function(){
            $("body").css("padding-right", "0");
        },0);
    });
});