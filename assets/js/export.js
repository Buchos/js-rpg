// To store JavaScript objects in cookies, use JSON stringify.

(function(){
   var myObject = {name:"Legolas", gender:"male"};
   console.log(myObject);
   var e = 'Mon Jun 22 2020 15:00:00';
   console.log(e);
   document.cookie = 'myObj='+ JSON.stringify(myObject) +';expires=' + e;
})()