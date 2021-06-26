<?php

    if($_SERVER['REQUEST_METHOD']=='POST')
    {
        $file_name="teacher".".json";
        function getData()
        {
            $file_name="teacher".".json";
            if(file_exists("$file_name"))
            {
                $prev_data = file_get_contents("$file_name");
                $json_data = json_decode($prev_data, true);
                $user = $_POST['uname'];
                $password = $_POST['password'];
                foreach($json_data as $arr)
                {
                    foreach($arr as $key => $val)
                    {
                        if($key=='Username')
                        {
                            if($val==$user)
                            {
                                if($arr['Password']==$password)
                                return $arr['Name'];
                                else
                                return null;
                            }
                        }
                    }
                }
                
                return null;
            }
            else
            {
                return null;
            }
            
        }
        $msg="";
        $name = getData();
        if(!is_null($name))
        {
            $msg="Successfull";
            header("Location:./teacherdashboard.php?name={$name}");
        }
        else
        {
            $msg="Error";
            header("Location:./teacherlogin.php?msg={$msg}");
        }
    
    }
    
?>