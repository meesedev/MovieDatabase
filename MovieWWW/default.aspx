<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="MovieWWW._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login to Movies Database</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="js/login.js"></script>
    <link href="css/site.css" rel="stylesheet" />
    <link href="css/login.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,400italic,800" rel="stylesheet" />

</head>
<body>
    <form id="form1" runat="server">
   
        <div id="loginWrapper">
            <div id="pnl-login">
                <h1>Log into the Movie Database</h1>
                <div class="r1">
                    <label for="email">Email : </label>
                    <input type="text" id="email" name="email" value="user1@meesey.com" />
                </div>
                <div class="r1">
                    <label for="email">Password : </label>
                    <input type="password" name="password" id="password" value="pass123" />
                </div>
                <div class="r1"style="justify-content:flex-end;">
                    <div id="login" class="btn">login</div>
                </div>
            </div>
        </div>

    </form>
</body>
</html>
