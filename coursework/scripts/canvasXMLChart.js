	var dataPoints = [];

	$.ajax({
	    type: "GET",
	    url: "https://api.worldbank.org/v2/countries/gbr/indicators/UIS.FOSEP.56.F600?format=xml",
	    cache: false,
	    dataType: "xml",
	    success: function (data) {
	        console.log(data);
	        $(data).find("wb\\:data").each(function () {
	            var $dataPoint = $(this);
	            var x = $dataPoint.find("wb\\:date").text();
	            console.log(x);
	            var y = $dataPoint.find("wb\\:value").text();
	            dataPoints.push({
	                label: (x),
	                y: parseFloat(y)
	            });

	        });

	        var chart = new CanvasJS.Chart("chartContainer", {
	            title: {
	                text: "Chart Using XML Data",
	            },
	            data: [{
	                type: "column",
	                dataPoints: dataPoints,
	      }]
	        });

	        chart.render();
	    }
	});