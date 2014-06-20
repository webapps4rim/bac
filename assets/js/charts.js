(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var drawAxis = function (canvas, scale, position, className) {
    var axis = d3.svg.axis()
        .scale(scale)
        .orient(position);

    return canvas.append("g")
        .attr("class", "axis " + className)
        .call(axis);
};
        // .attr("transform", "translate(0," + this.height + ")")

var chartTypes = {
    bar: function() {},
    line: function() {
        // x scale
        var xValues = this.series.x.data;
        var xScale = d3.scale.ordinal()
            .rangePoints([0, this.width], 1)
            .domain(xValues);

        drawAxis(this.canvas, xScale, 'bottom', 'x')
            .attr("transform", "translate(0," + this.height + ")");

        var yScale = this.getYScale();

        drawAxis(this.canvas, yScale, 'left', 'y').selectAll('text').style('text-anchor', 'start');

        var line = d3.svg.line()
            .x(function(d, i) {
                return xScale(xValues[i]);
            });

        _.each(this.series, function (s, key) {
            if (key === 'x') { return; }

            this.canvas.append("path")
                .datum(s.data)
                .attr("class", "line " + key)
                .attr("d", line.y(function(d) {
                    return yScale(d);
                }));

        }, this);
    }
};

var legend = function () {//require('./legend');
    var legends = this.canvas.append('g').attr('class', 'legends');
    var legendWidth = this.$el.data('legend-width') || 10;
    var legendHeight = this.$el.data('legend-height') || 10;
    var x = 0;

    _.each(this.series, function (serie, key) {
        if (key === 'x') { return; }

        var legend = legends.append('g').attr('class', key);

        var text = legend.append('text').text(serie.title);

        legend.append('rect').attr('width', legendWidth).attr('height', legendHeight).attr('x', text.node().getBBox().width + 3);

        x -= legend.node().getBBox().width;

        legend.attr('transform', 'translate(' + x + ',0)');

        x -= 15;
    }, this);

    legends.attr('transform', 'translate('+ (this.width) + ', -20)');
};

function Chart(el) {
    this.$el = $(el);

    this.series = window[this.$el.data('series')];

    this.$el.on('resized', this.resize.bind(this));
}

Chart.prototype = {
    getAllYData: function () {
        return _.chain(this.series).omit('x').pluck('data').flatten().value();
    },
    getMax: function () {
        return _.max(this.getAllYData());
    },
    getMin: function () {
        return _.min(this.getAllYData());
    },
    getXScale: function () {
        return d3.scale.domain(this.series.xData);
    },
    getYScale: function () {
        return d3.scale.linear().domain([0, this.getMax()]).range([this.height, 0]);
    },
    render: function() {
        var drawFn = chartTypes[this.$el.data('chart')];

        this.$el.html('');

        this.$el.height(this.$el.width() / 2);

        // setting up the canvas
        var margin = {
            top: this.$el.data('top-margin') || 40,
            right: this.$el.data('right-margin') || 20,
            bottom: this.$el.data('bottom-margin') || 30,
            left: this.$el.data('left-margin') || 50
        };

        this.outerWidth = this.$el.width();
        this.outerHeight = this.$el.height();

        this.width = this.outerWidth - margin.left - margin.right;
        this.height = this.outerHeight - margin.top - margin.bottom;

        this.canvas = d3.select(this.$el[0]).append('svg')
            .attr('width', this.outerWidth).attr('height', this.outerHeight)
            .append("g").attr("class", "canvas")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // calling plugin
        drawFn.call(this);


        // if (this.$el.data('legend')) {
            legend.call(this);
        // }
    },
    resize: function() {
        this.render();
    }
};

module.exports = Chart;
},{}],2:[function(require,module,exports){
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
},{"./charts":1}]},{},[2])