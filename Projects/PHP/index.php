<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Alkon hinnasto</title>
    </head>
    <body>
        
        <?php
        error_reporting(0);
        //STYLES
        echo "<link rel='stylesheet' type='text/css' href='./styles.css' />";
        
        //DB variables
        $servername = "localhost";
        $username = "a0440433_root";
        $password = "LABTunnu5";
        $dbname = "a0440433_alko";
        $results_per_page = 25;

        //DB connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        $conn->set_charset("utf8");
        if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
        }

        if (isset($_GET["page"])) {
          $page = $_GET["page"];
        } else {
          $page = 1;
        }

        if (isset($_POST['submit'])) {
            $start_from = ($page - 1) * $results_per_page;

            //FILTER arvot
            $tyyppi = $_POST['tyyppi'];
            $maa = $_POST['maa'];
            $koko = $_POST['koko'];
            $hintaMin = $_POST['hintaMin'];
            $hintaMax = $_POST['hintaMax'];
            $energiaMin = $_POST['energiaMin'];
            $energiaMax = $_POST['energiaMax'];

            //SQL KYSELY
            $query = "SELECT * FROM `hinnasto` 
            WHERE `Tyyppi` LIKE '%".$tyyppi."%' 
            AND `Valmistusmaa` LIKE '%".$maa."%' 
            AND `Pullokoko` LIKE '%".$koko."%' 
            AND (`Hinta` BETWEEN $hintaMin AND $hintaMax) 
            AND (`Energia` BETWEEN $energiaMin AND $energiaMax) 
            LIMIT $start_from, " . $results_per_page;

            $search_result = filterTable($query);
        }
        else {
            $start_from = ($page - 1) * $results_per_page;
            $query = "SELECT * FROM hinnasto LIMIT $start_from, ".$results_per_page;
            $search_result = filterTable($query);
        }

        //FILTER
        function filterTable($query)
        {
            global $conn;
            $filter_Result = mysqli_query($conn, $query);
            return $filter_Result;
        }

echo "<h2><div><a href='/index.php' class='button'>Home</a></div>  <div class='headertext'>Alko price list 15.09.2020 (Total items 10577)</div></h2>";

//FORM
echo "<div class='filter-wrap'>";
echo "<form action='index.php' method='post'>
        <div>
        <label for='tyyppi'>Type: </label>
        <input type='text' name='tyyppi' value='$tyyppi' placeholder='esim: viskit'>
        </div>
        <div>
        <label for='maa'>Country: </label>
        <input type='text' name='maa' value='$maa' placeholder='esim: Belgia'>
        </div>
        <div>
        <label for='koko'>Size: </label>
        <input type='text' name='koko' value='$koko' placeholder='esim: 0,5'>
        </div>
        <div>
        <label for='hinta'>Price (from min to max): </label>
        <input type='text' name='hintaMin' value='0' placeholder='esim: 5' required>
        <input type='text' name='hintaMax' value='999999' placeholder='esim: 100' required>
        </div>
        <div>
        <label for='energia'>Energy kcal/100 ml (from to ja max): </label>
        <input type='text' name='energiaMin' value='0' placeholder='esim: 50' required>
        <input type='text' name='energiaMax' value='999999' placeholder='esim: 250' required>
        </div>
        <div>
        <input class='filter-button' type='submit' name='submit' value='Filter'> 
        </div>
        </form>";
echo "</div>";


echo "<table>";
//TABLE HEADERS
echo "<tr>
        <th>Number</td>
        <th>Name</td>
        <th>Manufacturer</th>
        <th>Size</th>
        <th>Price</th>
        <th>Price/l</th>
        <th>Type</th>
        <th>Country</th>
        <th>Year</th>
        <th>Alcohol-%</th>
        <th>Energy kcal/100 ml</th>
    </tr>";

        //TABLE CONTENT
        while($row = mysqli_fetch_array($search_result)) {
            echo "<tr>
            <td>$row[Numero]</td>" .
            "<td>$row[Nimi]</td>" .
            "<td>$row[Valmistaja]</td>" .
            "<td>$row[Pullokoko]</td>" .
            "<td>$row[Hinta]</td>" .
            "<td>$row[Litrahinta]</td>" .
            "<td>$row[Tyyppi]</td>" .
            "<td>$row[Valmistusmaa]</td>" .
            "<td>$row[Vuosikerta]</td>" .
            "<td>$row[Alkoholi]</td>" .
            "<td>$row[Energia]</td>
                </tr>";
        }
        echo "</table>";
        
        //PAGES
        if (isset($_POST['submit'])) {
            $sql = "SELECT COUNT(Nimi) AS total FROM `hinnasto` 
            WHERE `Tyyppi` LIKE '%".$tyyppi."%' 
            AND `Valmistusmaa` LIKE '%".$maa."%' 
            AND `Pullokoko` LIKE '%".$koko."%' 
            AND (`Hinta` BETWEEN $hintaMin AND $hintaMax) 
            AND (`Energia` BETWEEN $energiaMin AND $energiaMax) 
            LIMIT $start_from, " . $results_per_page;

            $result = $conn->query($sql);
            $row = $result->fetch_assoc();
            $total_pages = ceil($row["total"] / $results_per_page);

            echo "<div class='a-wrap'>";
            for ($i=1; $i<=$total_pages; $i++) {  
                echo "<div class='a'><a href='index.php?page=".$i."'";
                if ($i==$page) {
                    echo " class='curPage'"; 
                }; 
                echo ">".$i."</a> </div>";
            }
            echo "</div>";
        } else {
            $sql = "SELECT COUNT(Nimi) AS total FROM hinnasto";
            $result = $conn->query($sql);
            $row = $result->fetch_assoc();
            $total_pages = ceil($row["total"] / $results_per_page);

            echo "<div class='a-wrap'>";
            for ($i=1; $i<=$total_pages; $i++) {  
                echo "<div class='a'><a href='index.php?page=".$i."'";
                if ($i==$page) {
                    echo " class='curPage'"; 
                }; 
                echo ">".$i."</a> </div>";
            }
            echo "</div>";
        }
        ?>

    </body>
</html>
