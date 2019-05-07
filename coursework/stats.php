<!DOCTYPE html>
<html lang="en">
<!-- Head section inlcuding jQuery 3.3.1 for use with scripts -->
<!-- Includes a script to resize the Navigation to Nav when the screen shrinks -->
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>School 2 Uni | Statistics</title>
    <?php include 'includes/styles.php'; ?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <?php include 'includes/navLabelResize.php'; ?>

</head>
<!-- Body section containing flexible columns displaying data, data is displayed from include files to allow for modularity -->
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
    <!-- Section containing the flexible columns -->
    <section class="columns">

        <div class="column" id="left">
            <h2>Popular Searches</h2>
            <input type="search" name="searchInput" id="inputChoice" placeholder="Enter search term">
            <p></p>
            <script src="database/storeData.js"></script>
            <?php include 'includes/wordCloud.php'; ?>
        </div>

        <div class="column" id="main">
            <h2>Statistics Content</h2>
            <form><input type="search" name="search" placeholder="Search within list">
                <input type="submit">
            </form>
            <p style="font-weight:bold">If the below link displays 👩‍💻 and 👨‍💻 then there is information available for both sexes.</p>
            <p style="font-style: italic">Links marked with ⏳⌛️ will be available in the future.</p>
            <ol>
                <li><a href="chart_allPrograms.php">Number of students in tertiary education</a> 👩‍💻📊</li>
                <li><a href="chart_ITComms.php">Percentage of students enrolled in Information and Communication Technologies programmes</a> 👩‍💻👨‍💻📊</li>
                <li><a href="chart_Argiculture.php">Percentage of students in tertiary education enrolled in Agriculture programmes, both sexes (%)</a> 👩‍💻👨‍💻📊</li>
                <li><a href="chart_Education.php">Percentage of students in tertiary education enrolled in Education programmes, both sexes (%)</a> 👩‍💻👨‍💻📊</li>
                <li><a href="chart_Engineering.php">Percentage of students in tertiary education enrolled in Engineering, Manufacturing and Construction programmes, both sexes (%)</a> 👩‍💻👨‍💻📊</li>
                <li><a href="chart_Humanities.php">Percentage of students in tertiary education enrolled in Humanities and Arts programmes, both sexes (%)</a> 👩‍💻👨‍💻📊</li>
                <li><a href="chart_Social.php">Percentage of students in tertiary education enrolled in Social Sciences, Business and Law programmes, both sexes (%)</a> 👩‍💻👨‍💻📊</li>
                <li><a href="#" id="deadLink">Percentage of students in tertiary education enrolled in Services programmes, both sexes (%)</a> ⏳⌛️</li>
                <li><a href="#" id="deadLink">Percentage of students in tertiary education enrolled in Science programmes, both sexes (%)</a> ⌛️⏳</li>
                <li><a href="#" id="deadLink">Percentage of students in tertiary education enrolled in Health and Welfare programmes, both sexes (%)</a> ⏳⌛️</li>
            </ol>
        </div>

        <div class="column" id="right">
            <h2>Quick Links A-Z</h2>
            <p>
                <script src="scripts/sidebar_QuickList.js"></script>
            </p>
        </div>
    </section>
    <!-- Script for adding a class to the navigation bar to allow it to restyle be responsive -->
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
    <!-- Footer -->
    <?php 
    include 'includes/footer.php'; 
    ?>
</body>

</html>
