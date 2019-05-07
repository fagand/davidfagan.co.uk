<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<script>
 $(function() {
  $.ajax({
   url: "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json",
   type: "get",
   dataType: "json",
   success: function(data) {
    console.log(data.name);
    for (i = 0; i < 10; i++) {
     name = data[i].name;
     country = data[i].country;
     domain = data[i].domains;

     var a = document.createElement('a');
     a.setAttribute('href', domain);
     a.innerHTML = domain;

     var paragraph = $("<p />", {
      text: name
     });
     $("#right").append(paragraph);
    }
   }
  });
 });

</script>
