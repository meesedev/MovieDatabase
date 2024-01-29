$(document).ready(function () {


    $(document).on('click', '#login', function () {

        var email = $('#email').val();
        var password = $('#password').val();

        $.ajax({
            type: "POST",
            url: "https://movieapi.meesey.com/api/token",
            contentType: "application/json",
            data: JSON.stringify({ "email": email, "password": password }),
            xhrFields: {withCredentials: true},
            success: data => {

                window.location.href = "/search.aspx";//redirect to Search Page

            },
            error: (xhr, textStatus, error) => {
                alert("Authentication Failed");
            }
        })
    });



});