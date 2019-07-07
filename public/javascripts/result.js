$(function () {
    // dynamic effect of saving picture
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

    // display photos of celebrity
    var photoContainer = $(".small-photo ul li.small-pic");
    var counter = -1;
    var isMore = true;

    // the photoList array is to collect all photos
    var photoList = $("#photoList").text().split(",");
    for(var i=0; i<photoList.length; i++){
        photoList[i] = "../images/celebrities/" + photoList[i];
    }

    // show the photos need to be displayed for the first time
    if(photoList.length > 0){
        $(".big-photo").css({"background": "url("+ photoList[0] + ") no-repeat",
            "background-position": "center center", "background-size": "center center", "backgroundSize":"cover"});
    }
    rightImgs(photoContainer,photoList);

    // show next photos when user click on the "small-photo-btn2 "button
    $("#small-photo-btn2").on("click", function () {
        rightImgs(photoContainer,photoList);
    });

    // show previous photos when user click on the "small-photo-btn1 "button
    $("#small-photo-btn1").on("click", function () {
        leftImgs(photoContainer,photoList);
    });

    // if click the small photo, it will be shown as a big photo
    photoContainer.each(function () {
        $(this).on("click", function () {
            var photoUrl = $(this).css("backgroundImage");
            if(photoUrl !== "none"){
                $(".big-photo").css({"background": ""+photoUrl+"","background-position": "center center",
                    "background-size": "center center", "backgroundSize":"cover"});
                // set a border to the small image currently being displayed
                $(this).css("border", "1px solid #333");
                $(this).siblings().css("border", "none");
            }
        });
    });

    /**
     * to show the next three photos
     * @param photoContainer the container to show all small photos
     * @param photoList photoList the array of photos which need to be shown
     */
    function rightImgs(photoContainer,photoList) {
        if(isMore){
            if(counter === -1){
                $("#small-photo-btn1").css({"background-color":"lightgrey", "border": "1px solid lightgrey"});
            }else{
                $("#small-photo-btn1").css({"background-color":"#000", "border": "1px solid #000"});
            }

            $("#small-photo-btn2").css({"background-color":"#000", "border": "1px solid #000"});
            photoContainer.each(function () {
                $(this).css("border", "none");
            });
            counter++;
            photoContainer.each(function (index) {
                if(index+counter*3 < photoList.length){
                    var photoUrl = "url("+ photoList[index+counter*3] + ") no-repeat";
                    $(this).css({"background": photoUrl,"background-position": "center center",
                        "background-size": "center center", "backgroundSize":"cover"});
                }else{
                    $(this).css("backgroundImage", "none");
                }
            });
            if((counter+1)*3 >= photoList.length){
                isMore = false;
            }
            if(!isMore){
                $("#small-photo-btn2").css({"background-color":"lightgrey", "border": "1px solid lightgrey"});
            }
        }
    }

    /**
     * to show the previous three photos
     * @param photoContainer the container to show all small photos
     * @param photoList the array of photos which need to be shown
     */
    function leftImgs(photoContainer,photoList) {
        if(counter !== 0){
            photoContainer.each(function () {
                $(this).css("border", "none");
            });
            isMore = true;
            counter--;
            photoContainer.each(function (index) {
                var photoUrl = "url("+ photoList[counter*3+index] + ") no-repeat";
                $(this).css({"background": photoUrl,"background-position": "center center",
                    "background-size": "center center", "backgroundSize":"cover"});
            });
            if(counter === 0){
                $("#small-photo-btn1").css({"background-color":"lightgrey", "border": "1px solid lightgrey"});
                $("#small-photo-btn2").css({"background-color":"#000", "border": "1px solid #000"});
            }
        }
    }

    /**
     * send ajax query
     * @param url
     * @param data
     */
    function sendAjaxQuery(url, data){
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            type: 'POST',
            success: function (dataR) {
                var ret = dataR;
                $(".result-list .photo").css({"background": ""});
                $(".result-list").css("display", "none");
                for(var i=0; i<ret.length; i++){
                    var bgImgsUrl = "url(../deepFashion/"+ ret[i] + ") no-repeat";
                    $(".result-list .photo").eq(i).css({"background": bgImgsUrl,
                        "background-size": "cover", "background-position": "center"});
                    $(".result-list").eq(i).css("display", "inline-block")
                }
            },
            error: function (xhr, status, error) {
                alert("'Error:" + error.message);
            }
        });
    }

    // show the result of the first photo
    var imgUrl = $('.small-pic:first').css("background-image");
    sendAjaxQuery(window.location.href, imgUrl.substring(imgUrl.lastIndexOf('/')+1, imgUrl.indexOf(".jpg")));
    // $('.small-pic:first').trigger("click");

    // when big photo changes, the corresponding recommended images also changes
    $('.small-pic').on("click", function () {
        var img = $(this).css("background-image");

        // data stores the name of picture, in order to search the database for corresponding images
        var data = img.substring(img.lastIndexOf("/", img.indexOf(".jpg")) + 1, img.indexOf(".jpg"));

        if(data.length !== 0){
            sendAjaxQuery(window.location.href, data);
        }
    });

    // if the user is using a small screen device
    if($(window).width() < 768){
        $(".big-photo").css("height", "120px");
        $(".small-pic").css({"height": "30px", "width": "20%"});
        $("#small-photo-btn1, #small-photo-btn2").css({"width": "10px", "height":"16px", "font-size": "12px"});
        $(".result-list").css("padding","2px");
    }

    // click the small image to enlarge
    $(".result-list .photo").on("click", function () {
        var address = $(this).css("backgroundImage");
        address = "../" + address.substring(address.indexOf("/deepFashion/")+1, address.length-2);
        $("#enlarge .modal-body img").attr("src", address);
    });

});