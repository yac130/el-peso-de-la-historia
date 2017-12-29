function queryString() {
    var a = new Date,
        b = a.getMinutes() > 29 ? "30" : "00",
        c = [a.getFullYear(), "0" + (a.getMonth() + 1), a.getDate(), a.getHours(), b];
    return c.join("")
}
var dkey = '1HVoeG24TVcWz2faFbluURp3hKWcSa2C1VdrYN79o8VI',
    url = "https://docs.google.com/spreadsheets/d/" + dkey + "/pub?output=csv&date=" + queryString(),
    yql = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22" + encodeURIComponent(url) + "%22&format=json",
    isScrolling = false;

/*
$.ajax({
    cache: !0,
    url: yql,
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback: "cbResults"
});

function cbResults(b) {
    if (b.query && b.query.results) {
        $('#loading').css('height', $(window).height() * 1.5);

        var o = {};
        var tabs = $('.tab');
        tabs.each(function () {
            var id = $(this).attr('id');
            o[id] = [];
        });

        var c = b.query.results;
        c = c.body ? c.body : [];
        var d = d3.csvParse(c);
        compact = d;

        var e = compact.length;
        console.log(e);

        d.forEach(function (b) {
            if (o[b.personaje]) {
                o[b.personaje].push({
                    name: b.nombre,
                    value: b.puntos_contra
                });
            }
        });

        for (var index in o) {
            var tbody = $('#' + index).find('tbody');
            o[index].sort(compare);
            for (var i = 0; i < o[index].length; i++) {
                tbody.append('<tr><td>' + o[index][i].name + '</td><td>' + o[index][i].value + '</td></tr>');
            }
        }

        $("#loading").remove()
    } else location.reload()
}
*/
$('#characters a').on('click', function (e) {
    e.preventDefault();
    $('#characters span').removeClass('active');
    $(this).parent().find('span').addClass('active');
    $('.tab').addClass('hide');
    var target = $(this).attr('data-target');
    $('#' + target).removeClass('hide');

    if (isScrolling)
        return;

    isScrolling = true;

    $('html, body').animate({
        scrollTop: $("#" + target).offset().top
    }, 500, function () {
        isScrolling = false;
    });
})

function compare(a, b) {
    if (a.value < b.value)
        return -1;
    if (a.value > b.value)
        return 1;
    return 0;
}

$(document).ready(function() {
    Tabletop.init({
        key: "https://docs.google.com/spreadsheets/d/" + dkey + "/pubhtml",
            callback: function(b) {
                $('#loading').css('height', $(window).height() * 1.5);

        var o = {};
        var tabs = $('.tab');
        tabs.each(function () {
            var id = $(this).attr('id');
            o[id] = [];
        });

        var compact = b;

        var e = compact.length;
        console.log(e);

        compact.forEach(function (b) {
            if (o[b.personaje]) {
                o[b.personaje].push({
                    name: b.nombre,
                    value: b.puntos_contra
                });
            }
        });

        for (var index in o) {
            var tbody = $('#' + index).find('tbody');
            o[index].sort(compare);
            for (var i = 0; i < o[index].length; i++) {
                tbody.append('<tr><td>' + o[index][i].name + '</td><td>' + o[index][i].value + '</td></tr>');
            }
        }

        $("#loading").remove()
                },
                simpleSheet: !0
    })
});
