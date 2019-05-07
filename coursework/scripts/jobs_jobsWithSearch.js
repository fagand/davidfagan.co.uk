/* 
Function for getting input from input boxes and displaying relevant information, validation includes making sure the input boxes are not empty and that the age number is acceptable 
--
There is a problem in the code with that the chart delays when displaying information within the blur and 'enter pressed' functions. I belive this is due to the soc variable not being provided fast enough as it involves the data being searched to get the value. I have tried to use timeouts which worked but were clunky so got rid. I think a callback or similar on the variable would fix it but I'm unsure how to implement that.
*/
$(function () {
    $.ajax({
        url: "http://api.lmiforall.org.uk/api/v1/soc/search?q=computing",
        type: "get",
        dataType: "jsonp",
        success: function (data) {
            // Variables creating fields
            var list = $("<ul/>", {
                "id": "titles"
            });
            var details = $("<div/>", {
                "id": "details"
            });
            var graph = $("<div/>", {
                "id": "graph"
            });

            var arrayLength = data.length;
            var outputString = '';
            var year;
            var estpay;

            for (var i = 0; i < arrayLength; i++) {
                outputString = data[i].title;

                var listItem = $("<li/>", {
                    id: i,
                    text: outputString
                });

                list
                    .append(listItem);
            }

            $("#unimain")
                .append(list)
                .append(details)
                .append(graph)
// When the list item is clicked, display the chart below with pay
            $("body").on("click", "li", function () {
                var ageInput = $("#inputAge").val();
                var age = parseInt(ageInput);
                if (ageInput.length <= 1) {
                    alert("Please enter a valid age value");
                } else if (age <= 19) {
                    alert("Please enter an age greater than 19");
                } else {
                    var i = parseInt(this.id);
                    var soc = data[i].soc;
                    var title = data[i].title;
                    $.ajax({
                        url: "http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=" + soc + "&age=" + age + "&coarse=false",
                        type: "get",
                        dataType: "jsonp",
                        success: function (data) {
                            chartdata = [];
                            var arrayL = data.series.length;
                            for (var i = 0; i < arrayL; i++) {
                                chartdata.push([data.series[i].year, (data.series[i].estpay)]);
                            }
                            year = data.series[0].year;
                            estpay = data.series[0].estpay;

                            $("#details").html(function () {
                                return "Please see the below chart showing average weekly pay per year for the chosen field";
                            });
                            $("#graph").html(function () {
                                zingchart.render({
                                    id: 'graph',
                                    data: {
                                        type: 'bar',
                                        title: {
                                            fontSize: 15,
                                            text: "Chart showing average weekly salary, per year for <br>" + String(title)
                                        },
                                        series: [{
                                            values: chartdata,
      }]
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }
    });
});
// When the jobInput input field looses focus
$("#jobInput").on("blur", function () {
    var choice = $(this).val();
    // if input value is not less than 2 characters. This could have been written as >=2 but I'm going to roll with it the way it is.
    if (!(choice.length <= 2)) {
        var req = $.ajax({
            url: "http://api.lmiforall.org.uk/api/v1/soc/search?q=" + choice,
            dataType: "jsonp"
        });
        req.done(function (data) {
            console.log(data);
            // Variables creating fields
            var list = $("<ul/>", {
                "id": "titles"
            });
            var details = $("<div/>", {
                "id": "details"
            });
            var graph = $("<div/>", {
                "id": "graph"
            });

            var arrayLength = data.length;
            var outputString = '';

            for (var i = 0; i < arrayLength; i++) {
                outputString = data[i].title;
                console.log(outputString);
                var listItem = $("<li/>", {
                    id: i,
                    text: outputString
                });

                list
                    .append(listItem);
            }
            $("#titles")
                .replaceWith(list)
            $("#graph")
                .replaceWith(graph)
            $("#details").html(function () {
                return ""
            });
            //            $("#graph").html(function () {
            //                return ""
            //            });

            $("body").on("click", "li", function () {
                var ageInput = $("#inputAge").val();
                var age = parseInt(ageInput);
                if (ageInput.length <= 1) {
                    alert("Please enter a valid age value");
                } else if (age <= 19) {
                    alert("Please enter an age greater than 19");
                } else {
                    var i = parseInt(this.id);
                    // This 'soc' variable is the problem because it has to research the data to get the SOC it causes a delay.
                    var soc = data[i].soc;
                    console.log(soc);
                    var title = $(this).text();
                    console.log(title);
                    $.ajax({
                        url: "http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=" + soc + "&age=" + age + "&coarse=false",
                        type: "get",
                        dataType: "jsonp",
                        success: function (data) {
                            chartdata = [];
                            var arrayL = data.series.length;
                            for (var i = 0; i < arrayL; i++) {
                                chartdata.push([data.series[i].year, (data.series[i].estpay)]);
                            }
                            year = data.series[0].year;
                            estpay = data.series[0].estpay;

                            $("#details").html(function () {
                                return "Please see the below chart showing average weekly pay per year for the chosen field";
                            });
                            $("#graph").html(function () {
                                zingchart.render({
                                    id: 'graph',
                                    data: {
                                        type: 'bar',
                                        title: {
                                            fontSize: 15,
                                            text: "Chart showing average weekly salary, per year for <br>" + String(title)
                                        },
                                        series: [{
                                            values: chartdata,
      }]
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }); //end of req done function
    } /*end of if*/
    else if (choice == 0) {
        return null;
    } else {
        alert("Please enter more than 2 characters to search");
    }
}); //end of blur function

// When the return key is press in the jobInput input box.
$("#jobInput").keypress(function (e) {
    // If key pressed is enter (13)
    if (e.which === 13) {
            var choice = $(this).val();
    // if input value is not less than 2 characters. This could have been written as >=2 but I'm going to roll with it the way it is.
    if (!(choice.length <= 2)) {
        var req = $.ajax({
            url: "http://api.lmiforall.org.uk/api/v1/soc/search?q=" + choice,
            dataType: "jsonp"
        });
        req.done(function (data) {
            console.log(data);
            // Variables creating fields
            var list = $("<ul/>", {
                "id": "titles"
            });
            var details = $("<div/>", {
                "id": "details"
            });
            var graph = $("<div/>", {
                "id": "graph"
            });

            var arrayLength = data.length;
            var outputString = '';

            for (var i = 0; i < arrayLength; i++) {
                outputString = data[i].title;
                console.log(outputString);
                var listItem = $("<li/>", {
                    id: i,
                    text: outputString
                });

                list
                    .append(listItem);
            }
            $("#titles")
                .replaceWith(list)
            $("#graph")
                .replaceWith(graph)
            $("#details").html(function () {
                return ""
            });
            //            $("#graph").html(function () {
            //                return ""
            //            });

            $("body").on("click", "li", function () {
                var ageInput = $("#inputAge").val();
                var age = parseInt(ageInput);
                if (ageInput.length <= 1) {
                    alert("Please enter a valid age value");
                } else if (age <= 19) {
                    alert("Please enter an age greater than 19");
                } else {
                    var i = parseInt(this.id);
                    console.log(i);
                    var soc = data[i].soc;
                    console.log(soc);
                    console.log("Data after click"+data);
                    var title = $(this).text();
                    console.log(title);
                    $.ajax({
                        url: "http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=" + soc + "&age=" + age + "&coarse=false",
                        type: "get",
                        dataType: "jsonp",
                        success: function (data) {
                            console.log(data);
                            chartdata = [];
                            var arrayL = data.series.length;
                            for (var i = 0; i < arrayL; i++) {
                                chartdata.push([data.series[i].year, (data.series[i].estpay)]);
                            }
                            console.log(chartdata);
                            year = data.series[0].year;
                            estpay = data.series[0].estpay;
                            console.log(data);
                            console.log(data.series[0].year);
                            console.log(data.series[0].estpay);

                            $("#details").html(function () {
                                return "Please see the below chart showing average weekly pay per year for the chosen field";
                            });
                            $("#graph").html(function () {
                                zingchart.render({
                                    id: 'graph',
                                    data: {
                                        type: 'bar',
                                        title: {
                                            fontSize: 15,
                                            text: "Chart showing average weekly salary, per year for <br>" + String(title)
                                        },
                                        series: [{
                                            values: chartdata,
      }]
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }); //end of req done function
    } /*end of if*/
    else if (choice == 0) {
        return null;
    } else {
        alert("Please enter more than 2 characters to search");
    }
    }
});
