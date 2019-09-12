(function(e) {
    var t = [63, 6, 91, 79, 102, 109, 125, 7, 127, 111];
    e("<style type='text/css'>" + ".sevenSeg-svg {fill: rgba(170,170,170,1); overflow: hidden; stroke-width: 0; margin-left: 6px; margin-top: 14px; height: 60%; 60%; background-color: #eee}" + ".sevenSeg-segOn {fill: Red}" + "</style>").prependTo("head");
    e.widget("bw.sevenSeg", {
        options: {
            value: 64,
            colorOn: null,
            colorOff: null,
            colorBackground: null,
            slant: 0,
            decimalPoint: false
        },
        _create: function() {
            this.jqSvgElement = e("<svg/>", {
                "class": this.widgetName + "-svg",
                viewBox: "0 0 57 80",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:xlink": "http://www.w3.org/1999/xlink"
            }).css({
                fill: this.options.colorOff,
                "background-color": this.options.colorBackground
            });
            e("<defs/>").append(e("<polyline/>", {
                id: "h-seg",
                points: "11 0, 37 0, 42 5, 37 10, 11 10, 6 5"
            })).append(e("<polyline/>", {
                id: "v-seg",
                points: "0 11, 5 6, 10 11, 10 34, 5 39, 0 39"
            })).appendTo(this.jqSvgElement);
            this.jqSegments = e("<g/>", {
                "class": this.widgetName + "-segGroup"
            }).prepend(e("<use/>", {
                "xlink:href": "#h-seg",
                x: "0",
                y: "0"
            })).prepend(e("<use/>", {
                "xlink:href": "#v-seg",
                x: "-48",
                y: "0",
                transform: "scale(-1,1)"
            })).prepend(e("<use/>", {
                "xlink:href": "#v-seg",
                x: "-48",
                y: "-80",
                transform: "scale(-1,-1)"
            })).prepend(e("<use/>", {
                "xlink:href": "#h-seg",
                x: "0",
                y: "70"
            })).prepend(e("<use/>", {
                "xlink:href": "#v-seg",
                x: "0",
                y: "-80",
                transform: "scale(1,-1)"
            })).prepend(e("<use/>", {
                "xlink:href": "#v-seg",
                x: "0",
                y: "0"
            })).prepend(e("<use/>", {
                "xlink:href": "#h-seg",
                x: "0",
                y: "35"
            })).appendTo(this.jqSvgElement);
            if (this.options.slant) {
                this.jqSegments.attr("transform", "skewX(" + -this.options.slant + ")")
            }
            if (this.options.decimalPoint) {
                e("<circle/>", {
                    cx: "52",
                    cy: "75",
                    r: "5"
                }).appendTo(this.jqSvgElement)
            }
            this.jqSvgElement.appendTo(this.element);
            this.element.append(this.jqSvgElement);
            this.element.html(this.element.html());
            this.jqSvgElement = this.element.find("svg");
            this.jqSegments = this.jqSvgElement.find("." + this.widgetName + "-segGroup");
            if (this.options.value) {
                this.displayValue(this.options.value)
            }
        },
        _destroy: function() {
            this.jqSvgElement.remove()
        },
        _setOption: function(e, t) {
            this.options[e] = t;
            switch (e) {
                case "value":
                    this.displayValue(t);
                    break
            }
        },
        displayValue: function(t, n) {
            var r = this;
            r.options.value = t;
            var i = r._getSegments(t);
            r._setSvgElementFill(r.jqSvgElement.find("circle"), n);
            r.jqSegments.children().each(function(n, i) {
                r._setSvgElementFill(e(i), t & 128 >> n + 1)
            })
        },
        _getSegments: function(e) {
            if (e === "-") return 64;
            return t[e]
        },
        _setSvgElementFill: function(e, t) {
            e.attr("class", t && this.widgetName + "-segOn");
            e.css("fill", t && this.options.colorOn || "")
        }
    });
    if (ko && ko.bindingHandlers) {
        ko.bindingHandlers.sevenSeg = {
            init: function(t, n, r, i, s) {
                e(t).sevenSeg(ko.toJS(n()))
            },
            update: function(t, n, r, i, s) {
                e(t).sevenSeg("option", ko.toJS(n()))
            }
        }
    }
    e.widget("bw.sevenSegArray", {
        options: {
            value: null,
            digits: 1,
            segmentOptions: null
        },
        _create: function() {
            this.aJqDigits = [];
            var t = 100 / this.options.digits + "%";
            for (var n = 0; n < this.options.digits; ++n) {
                this.aJqDigits[n] = e("<div/>", {
                    style: "display: inline-block; height: 100%;"
                }).css("width", t).sevenSeg(this.options.segmentOptions).appendTo(this.element)
            }
            this.aJqDigits.reverse();
            if (this.options.value) {
                this.displayValue(this.options.value)
            }
        },
        _destroy: function() {
            e.each(this.aJqDigits, function(e, t) {
                t.sevenSeg("destroy");
                t.remove()
            })
        },
        _setOption: function(e, t) {
            this.options[e] = t;
            switch (e) {
                case "value":
                    this.displayValue(t);
                    break
            }
        },
        displayValue: function(t) {
            var n = this;
            var r = t.toString();
            var i = r.indexOf(".");
            var s = r.length - 1;
            e.each(n.aJqDigits, function(e, t) {
                var n = i >= 0 && s === i;
                if (n) {
                    --s
                }
                var o = r[s];
                t.sevenSeg("displayValue", o, n);
                --s
            })
        }
    });
    if (ko && ko.bindingHandlers) {
        ko.bindingHandlers.sevenSegArray = {
            init: function(t, n, r, i, s) {
                e(t).sevenSegArray(ko.toJS(n()))
            },
            update: function(t, n, r, i, s) {
                e(t).sevenSegArray("option", ko.toJS(n()))
            }
        }
    }
})(jQuery);