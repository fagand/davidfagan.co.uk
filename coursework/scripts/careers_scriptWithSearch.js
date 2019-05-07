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
            var tasks = $("<div/>", {
                "id": "tasks"
            });
            var quals = $("<div/>", {
                "id": "quals"
            });

            var arrayLength = data.length;
            var outputString = '';

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
                .append(tasks)
                .append(quals);

            $("body").on("click", "li", function () {
                var i = parseInt(this.id);
                $("#details").html(function () {
                    return "Details about: <br>" + data[i].description;
                });
                $("#tasks").html(function () {
                    return "Tasks Involved: <br>" + data[i].tasks;
                });
                $("#quals").html(function () {
                    return "Qualifications Required: <br>" + data[i].qualifications;
                });
            });
        }
    });
});
$("#jobInput").on("blur", function () {
    var choice = $(this).val();
    // if input value is not less than 2 characters. This could have been written as >=2 but I'm going to roll with it the way it is.
    if (!(choice.length <= 2)) {
        var req = $.ajax({
            url: "http://api.lmiforall.org.uk/api/v1/soc/search?q=" + choice,
            dataType: "jsonp"
        });
        req.done(function (data) {
            // Variables creating fields
            var list = $("<ul/>", {
                "id": "titles"
            });
            var details = $("<div/>", {
                "id": "details"
            });
            var tasks = $("<div/>", {
                "id": "tasks"
            });
            var quals = $("<div/>", {
                "id": "quals"
            });

            var arrayLength = data.length;
            var outputString = '';

            for (var i = 0; i < arrayLength; i++) {
                outputString = data[i].title;
                var listItem = $("<li/>", {
                    id: i,
                    text: outputString
                });

                list
                    .append(listItem);
            }
            $("#titles")
                .replaceWith(list)
            $("#details").html(function () {
                return ""
            });
            $("#tasks").html(function () {
                return ""
            });
            $("#quals").html(function () {
                return ""
            });


            $("body").on("click", "li", function () {
                console.log(data);
                var i = parseInt(this.id);
                $("#details").html(function () {
                    return "Details about: <br>" + data[i].description;
                });
                $("#tasks").html(function () {
                    return "Tasks Involved: <br>" + data[i].tasks;
                });
                $("#quals").html(function () {
                    return "Qualifications Required: <br>" + data[i].qualifications;
                });
            });
        });
    } else if (choice == 0) {
        return null;
    } else {
        alert("Please enter more than 2 characters to search");
    }
});
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
                // Variables creating fields
                var list = $("<ul/>", {
                    "id": "titles"
                });
                var details = $("<div/>", {
                    "id": "details"
                });
                var tasks = $("<div/>", {
                    "id": "tasks"
                });
                var quals = $("<div/>", {
                    "id": "quals"
                });

                var arrayLength = data.length;
                var outputString = '';

                for (var i = 0; i < arrayLength; i++) {
                    outputString = data[i].title;
                    var listItem = $("<li/>", {
                        id: i,
                        text: outputString
                    });

                    list
                        .append(listItem);
                }
                $("#titles")
                    .replaceWith(list)
                $("#details").html(function () {
                    return ""
                });
                $("#tasks").html(function () {
                    return ""
                });
                $("#quals").html(function () {
                    return ""
                });


                $("body").on("click", "li", function () {
                    var i = parseInt(this.id);
                    $("#details").html(function () {
                        return "Details about: <br>" + data[i].description;
                    });
                    $("#tasks").html(function () {
                        return "Tasks Involved: <br>" + data[i].tasks;
                    });
                    $("#quals").html(function () {
                        return "Qualifications Required: <br>" + data[i].qualifications;
                    });
                });
            });
        } else {
            alert("Please enter more than 2 characters to search");
        }
    }
});
