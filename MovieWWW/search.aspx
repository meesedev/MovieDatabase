<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="search.aspx.cs" Inherits="MovieWWW.search" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Search Movie Database</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="js/search.js?version=<%=DateTime.Now.ToString("yyyyMMddhhmmss") %>"></script>
    <link href="css/search.css?version=<%=DateTime.Now.ToString("yyyyMMddhhmmss") %>" rel="stylesheet" />
    <link href="css/site.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,400italic,800" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">

        <div id="criteraWrapper">
            <div>
                <h2>Search</h2>
                <label for="searchText">Search : </label>
                <input type="text" id="searchText" name="searchText" value="own" maxlength="100" /><br />
                <label for="resultsPerPage">Results/Page : </label>
                <input type="text" id="resultsPerPage" name="resultsPerPage" value="10" maxlength="4" />
            </div>
            <div>
                <h2>Filter</h2>
                <label for="filterTitle">Title : </label>
                <input type="text" id="filterTitle" name="filterTitle" value="" maxlength="100" /><br />
                <label for="filterActors">Actors : </label>
                <input type="text" id="filterActors" name="filterActors" value="" maxlength="100" />
            </div>
            <div>
                <h2>Sort</h2>
                <input type="radio" id="radSort_Title" class="sort" name="sortBy" value="title" checked="checked"  />
                <label for="sortBy">By Title</label><br />
                <input type="radio" id="radSort_ReleaseDate" class="sort" name="sortBy" value="release_date"   />
                <label for="sortBy">By Release Date</label>
                
            </div>
            <div>
                <h2>Genre Filter</h2>
                <div id="chkGenres"></div>
            </div>
        </div>

        <div id="searchWrapper">
            <div id="totalRecords"></div>
            <div id="btnSearch" class="btn">Search</div>
        </div>

        <div class="pager"></div>
        <div id="movieDataList"></div>
        <div class="pager"></div>
    </form>
</body>
</html>
