<?php require_once dirname(__DIR__,2).'/Includes/Bootstrap.php' ; ?>
<?php
    sleep(rand(1,5)); 
    header("Content-Type:Application/Json");
 ?>
<?php /** @var PDO $connection */?>
<?php 
    $search = $_GET["search"];
    $search = trim($search);
?>
<?php
    $query = "select `title` , `describe` , `thumbnail` , created_at from `products` 
              where `title` like :pattern
             or `describe` like :pattern 
             or `body` like :pattern ;";

    $statement = $connection->prepare($query);
    $statement->bindValue("pattern","%".$search."%");
    $executed = $statement->execute();
    $products = $statement->fetchAll();
    objectsCreatedAtToJalaliDate($products);
    $response = [
        "count" => sizeof($products) , 
        "products" => $products ,
    ];
    echo json_encode($response);
