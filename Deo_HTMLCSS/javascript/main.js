    
//Prompt User for name    
   function namecall(){
       var n = prompt("What is your name, friend?");
       var a = document.getElementById("result");
       a.innerHTML = "\<h1> Welcome " + n + " to the Spaghetti zone! </h1>";
    }

    function testing(){
        var a = document.getElementById("testbar");
        a.addEventListener('click',function(){

            var b = prompt("How many ingredients does it take to make pasta from scratch?","0");
            var c = parseInt(b);
            if(c === 4){
                alert("You are correct");
            }
            else{
                alert("You are wrong :(");
            }
            
        })
    }
    
    namecall();
    testing();