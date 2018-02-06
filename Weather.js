//var request = require('request');
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();



$(function(){

$('#inpt_search').keyup(function(e){
    if(e.keyCode === 13 ){
    
    sunProgress();
    var city = $("#inpt_search").val();
    $("#display").text(city);
    $("#inpt_search").val(' ');
    e.preventDefault();
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+ city +'%2C%20%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

    makeAjaxCall(url, "GET", processUserDetailsResponse);

    

   



}
});

$("#inpt_search").on('focus', function () {
  $(this).parent('label').addClass('active');
});

$("#inpt_search").on('blur', function () {
  if($(this).val().length == 0)
    $(this).parent('label').removeClass('active');
});

})


  
function makeAjaxCall(url, methodType,callback){
   var xhr = new XMLHttpRequest();
   xhr.open(methodType, url, true);
   xhr.send();
   xhr.onreadystatechange = function(){
     if (xhr.readyState === 4){
        if (xhr.status === 200){
           console.log("xhr done successfully");
           var resp = xhr.responseText;
           var respJson = JSON.parse(resp);
          callback(respJson);
        } else {
          console.log("xhr failed");
        }
     } else {
        console.log("xhr processing going on");
     }
  }
  console.log("request sent succesfully");

}


  
    
    function processUserDetailsResponse(userData){
      //var xDate = new Date();
      //console.log(typeof xDate);
    var date = userData.query.results.channel.item.condition.date
    console.log(date);
    xDate=date;
    console.log();
    var sRise = userData.query.results.channel.astronomy.sunrise;
    var sSet = userData.query.results.channel.astronomy.sunset;
    
    $('.rValue').text(sRise);
    $('.sValue').text(sSet);
    $('#inpt_search').text("");
 
    }
    

    function sunProgress(){
      
      $(".progress").each(function(){
  
      var bar = $(this).find(".bar");
      var img = $(this).find(".barSun");
      var val = new Date().getHours();
      
    
      $({p:0}).animate({p:val}, {
        duration: 5000,
        easing: "swing",
        step: function(p) {
          bar.css({
            transform: "rotate("+ (45+(p*7.5)) +"deg)", // 100%=180° so: ° = % * 1.8
            // 45 is to add the needed rotation to have the green borders at the bottom
          });
          
        }
      });


      $("#b").animate({/*left: "+="+perc*/},{
        duration: 5000,
        easing:"swing"
      });
    });
  };

 














