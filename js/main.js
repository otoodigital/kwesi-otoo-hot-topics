/*global $, console*/

$(document).ready(function () {
    
    "use strict";
    
    var contents, url, nm, em, sb, ms, dt, err, collect, i;
    
    dt = {};
    
    err = [];
    
    contents = {};
    
    // Use load method to load the home.html into index.html
    $(".bg-main .box").load("./partials/home.html", function (pageRsp) {
        
        contents["./partials/home.html"] = pageRsp;
    });
    
    function handleResponse(rsp) {
        $(".feedback").html(rsp);
    }

    function handleError(jqXHR, textStatus, errorThrown) {
        console.log("textStatus: " + textStatus + "\n" +
                        "errorThrown: " + errorThrown);
    }

    
function validateForm(ev) {
    
        ev.preventDefault();
    



        nm = $("#full-name").val().trim();
        em = $("#email").val().trim();
        sb = $("#subject").val().trim();
        ms = $("#message").val().trim();


        if (nm !== "") {


                dt.full_name = nm;

            } else {


                err.push("First name?");
            }



            if (em !== "") {
                dt.email = em;
            } else {
                err.push("Email?");
            }

            if (sb !== "") {
                dt.subject = sb;
            } else {
                err.push("Subject?");
            }

            if (ms !== "") {
                dt.message = ms;
            } else {
                err.push("Message?");
            }




            // Check if the data is ready
            if (err.length === 0) {

                // handle ajax request
                $.ajax({
                    type: "post",
                    url: "./server-side-script/web-service.php",
                    data: dt,
                    dataType: "text"
                }).done(handleResponse).fail(handleError);

            } else {

                collect = "Please fix the following errors:";

                for (i = 0; i < err.length; i += 1) {
                    collect += err[i];
                }
                
    

                $(".feedback").html(collect);
                // report error(s)
                
                err.length = 0;
                
                collect = "";
            }
}

    function storeContents(urlParam) {
            // if content already exists inside contents
            if (contents[urlParam]) {
                // load the content from contents
                $(".bg-main .box").html(contents[urlParam]);
                //console.log("Loaded from array!");
            } else {
                // load the content by ajax request
                $(".bg-main .box").load(urlParam, function (pageRsp) {
                    contents[urlParam] = pageRsp;
                    //console.log("Loaded by ajax request!");
                });
            }
        }



        $('.bg-header .box a').on("click", function (ev) {
            ev.preventDefault();
            url = $(this).attr("href");
            /*
            // test
            console.log(url); */
            storeContents(url);

            $(".bg-main .box").on("submit", "form", validateForm);


        });
        


});

      
    
