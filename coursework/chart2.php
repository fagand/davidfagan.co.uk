<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>School 2 Uni | Statistics</title>
    <meta name="description" content="">
    <?php include 'includes/styles.php'; ?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <?php include 'includes/navLabelResize.php'; ?>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

</head>

<body>
    <?php include 'includes/header.php'; ?>
    <div class="navigation" id="topnav">
        <a id="navLabel">Navigation</a>
        <a href="index.php" class="inactive">Home</a>
        <a href="uni.php" class="inactive">Universities</a>
        <a href="stats.php" class="active">Statistics</a>
        <a href="careers.php" class="inactive">Careers</a>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i class="fa fa-bars"></i>
        </a>
    </div>

    <section class="columns">

        <div class="column" id="left">
            <h2>Popular Searches</h2>
            <?php include 'includes/wordCloud.php'; ?>
        </div>

        <div class="column" id="main">
            <h2>Statistics Content</h2>
            <form><input type="search" name="search" placeholder="Search within list">
                <input type="submit">
            </form>
            <div id="chartContainer" style="width=100%";></div>
            <script src="scripts/canvasXMLChart.js"></script>
        </div>

        <div class="column" id="right">
            <h2>Top Universities</h2>
            <p><?php include 'scripts/ajax.php'; ?></p>
        </div>
    </section>
    <script>
        /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
        function myFunction() {
            var x = document.getElementById("topnav");
            if (x.className === "navigation") {
                x.className += " responsive";
            } else {
                x.className = "navigation";
            }
            console.log("responsive script ran");
        }
    </script>
    <?php 
    include 'includes/footer.php'; 
    ?>
</body>
</html>