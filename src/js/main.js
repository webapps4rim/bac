var Chart = require('./charts');

function initChart () {
    var chart = new Chart(this);
    chart.render();
}

$(function () {
    var $charts = $('[data-chart]').each(initChart);

    $(window).on('resize', function () {
        $charts.trigger('resized');
    });
});