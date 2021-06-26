<?php

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $file_name="student".".json";
        function getData()
        {
            $file_name="student".".json";
            if(file_exists("$file_name"))
            {
                $prev_data = file_get_contents("$file_name");
                $array_data = json_decode($prev_data, true);
                $extra=array(
                    'Name' => $_POST['name'],
                    'Email' => $_POST['email'],
                    'Username' => $_POST['uname'],
                    'Password' => $_POST['password'],
                    'Course' => [],
                );
                $array_data[]=$extra;
                return json_encode($array_data);
            }
            else
            {
                $data=array();
                $data[]=array(
                    'Name' => $_POST['name'],
                    'Email' => $_POST['email'],
                    'Username' => $_POST['uname'],
                    'Password' => $_POST['password'],
                    'Course' => [],
                );
                return json_encode($data);
            }
            
        }
        $msg="";
        if(file_put_contents("$file_name",getData()))
        {
            $msg="Successfull";
            header("Location:./student.php?msg={$msg}");
        }
        else
        {
            $msg="Error";
            header("Location:/student.php?msg={$msg}");
        }
    
    }
    
?>