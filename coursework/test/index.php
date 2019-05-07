<html>
<!-- https://steemit.com/utopian-io/@sogata/how-to-update-data-mysql-from-php-without-reload-page-using-jquery-ajax -->
<head>
    <title>Update Data</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>

<body>
    <center>
        <h3>UPDATE DATA</h3>
        <?php
        $conn = new mysqli(
            'localhost', 
            'root', 
            'root', 
            'search');
        $sql = "SELECT * FROM searches where id=1";
        $result = $conn->query($sql);
        while ( $row=mysqli_fetch_assoc($result)) {       
           echo  'Moderator :<input type="text" id="mod" value="'.$row['search'].'">';         
           echo  'Id :<input type="text" id="ctgr" value="'.$row['id'].'">';
        }?>
        <button type="submit" id="update">UPDATE</button>
    </center>
    <script>
        $(document).ready(function() {
            $("#update").click(function() {
                var name = $("#mod").val();
                var ctgr = $("#ctgr").val();
                $.ajax({
                    url: 'update.php',
                    method: 'POST',
                    data: {
                        name: name,
                        ctgr: ctgr
                    },
                    success: function(response) {
                        alert(response);
                    }
                });
            });
        });

    </script>
</body>

</html>
