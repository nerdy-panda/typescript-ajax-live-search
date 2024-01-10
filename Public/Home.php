<?php require_once dirname(__DIR__)."/Includes/Bootstrap.php"; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search</title>
    <link rel="stylesheet" href="Css/Pages/Home.css" type="text/css">
    <script src="Js/Pages/Home/launcher.js" type="module"></script>
</head>
<body>
    <form>
        <input type="text" id="search" name="search" placeholder="enter anything...">
        <div id="loading">
            <img src="img/loading.svg" alt="">
        </div>
        <div id="result"></div>
    </form>

</body>
</html>