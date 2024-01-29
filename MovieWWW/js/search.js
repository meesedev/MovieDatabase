$(document).ready(function () {

    var gtotalRecords = 0;
    var gresultsPerPage = 0;
    var gselectedPage = 1;



    function LoadGenres() {

        $.ajax({
            type: "GET",
            url: "https://movieapi.meesey.com/api/Movies/getGenres",
            contentType: "application/json,charset=utf-8",
            contentType: "application/json",
            dataType: "json",
            xhrFields: { withCredentials: true },
            success: function (response) {

                $("#chkGenres").empty();
                var ListValue = "";
                var i;
                for (i = 0; i < response.length; ++i) {
                    ListValue += "<div><input name='grpGenreButtons' class='genre' type='checkbox' value='" + response[i].Genre + "' />" + response[i].Genre + "</div>";
                }
                $("#chkGenres").append(ListValue);

            },
            failure: function (response) {
                alert("Failure");
            },
            error: function (response) {
                alert("Error");
            }
        })
    }

    function GeneratePager() {
        $("#totalRecords").html('(Total Records : '+gtotalRecords+')');

        var pageCount = Math.ceil(gtotalRecords / gresultsPerPage);
        $(".pager").empty();
        
        for (var i = 0; i < pageCount; i++) {
            $(".pager").append('<li data-page=' + (i + 1) + '>' + (i + 1)+'</li>');
        }
        $(".pager li[data-page=" + gselectedPage + "]").addClass('selectedPage');

    }

    function getSearchResults() {
        var searchText = $('#searchText').val();
        var resultsPerPage = $('#resultsPerPage').val();
        var filterTitle = $('#filterTitle').val();
        var filterActors = $('#filterActors').val();
        var sortBy = $('input[name="sortBy"]:checked').val();

        //Generate Genres List
        var SelectedGenres = $.map($(':checkbox[name=grpGenreButtons]:checked'), function (n, i) {
            return '"'+n.value+'"';
        }).join(' OR ');


        $.ajax({
            type: "GET",
            url: "https://movieapi.meesey.com/api/Movies/searchMovies",
            contentType: "application/json,charset=utf-8",
            contentType: "application/json",
            dataType: "json",
            data: {
                "searchText": searchText,
                "resultsPerPage": resultsPerPage,
                "filterTitle": filterTitle,
                "filterActors": filterActors,
                "sortBy": sortBy,
                "SelectedGenres": SelectedGenres,
                "pageNumber": gselectedPage
            },
            xhrFields: { withCredentials: true },
            success: function (DataSet) {

                var dsSearchData = DataSet["dsData"];//Contains information relating to the search criteria
                var dsMovieData = DataSet["dsData1"];//Contains Movie Data based on the criteria

                //Generate Simple List of Movie Data based on search criteria
                $("#movieDataList").empty();
                var ListValue = "";
                var i;
                for (i = 0; i < dsMovieData.length; ++i) {
                    ListValue += "<li><div><img width=100px src='" + dsMovieData[i].Poster_Url + "'></div>";
                    ListValue += "<div>" + dsMovieData[i].Title + "</div>";
                    ListValue += "<div>" + dsMovieData[i].DisplayDate + "</div>";
                    ListValue += "<div>" + dsMovieData[i].Genre + "</div>";
                    ListValue += "<div>" + dsMovieData[i].Overview + "</div>";
                }
                $("#movieDataList").append(ListValue);

                //Generate Pager
                gtotalRecords = dsSearchData[0].TotalRecords;
                gresultsPerPage = resultsPerPage;

                GeneratePager();

            },
            error: function (response) {
                if (response.responseText == 'No Records'){
                    $("#movieDataList").empty();
                    alert('No Records Found');
                }
            }
        });

    }



    $(document).on('click', '.pager li', function () {
        gselectedPage = $(this).attr('data-page');
        getSearchResults(gselectedPage);
    });

    $(document).on('click', '#btnSearch', function () {
        gselectedPage = 1;
        getSearchResults();
    });

    $(document).on('click', '.sort', function () {
        getSearchResults();
    });
    $(document).on('click', '.genre', function () {
        gselectedPage = 1;
        getSearchResults();
    });


    LoadGenres();

});