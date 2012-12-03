(function($, window) {

    var iris = window.iris;

    var _cacheVersion, _cache;

    function _init() {
        var currentEnv = iris.env();
        _cache = true;
        if(iris.config().hasOwnProperty("environments-nocache")) {
            var envNocache = iris.config()["environments-nocache"].split(",");
            for(var f = 0, F = envNocache.length; f < F; f++) {
                if(envNocache[f] === currentEnv) {
                    _cache = false;
                    break;
                }
            }
        }
    }

    function _getObjectValue(p_obj, p_label) {
        var value;
        if(p_label.indexOf(".") > -1) {
            var labels = p_label.split(".");
            var f, F = labels.length;
            for(f = 0; f < F; f++) {
                if(p_obj !== undefined) {
                    p_obj = p_obj[labels[f]];
                } else {
                    break;
                }
            }
            value = p_obj;
        } else {
            value = p_obj[p_label];
        }
        return value;
    }

    function _formatCurrency(p_value) {
        var settings = iris.regional("currency");

        var val = Number(p_value);
        var format = (val >= 0) ? settings.formatPos : settings.formatNeg;

        var decimal = val % 1;
        var num = String(Math.abs(val - decimal));

        decimal = String(Math.abs(decimal).toFixed(settings.precision));
        decimal = decimal.substr(2);

        for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + settings.thousand + num.substring(num.length - (4 * i + 3));
        }

        return format.replace("n", num + settings.decimal + decimal);
    }


    function _formatDate(p_date, p_format) {
        if(!p_format) {
            p_format = iris.regional("dateFormat");
        }

        if(typeof p_date !== "object") {
            p_date = new Date(Number(p_date));
        }

        var dateFormat = "";
        for(var f = 0, F = p_format.length; f < F; f++) {
            dateFormat += _formatDateChar(p_format[f], p_date);
        }
        return dateFormat;
    }

    function _leadingZero(p_number) {
        return(p_number < 10) ? "0" + p_number : p_number;
    }

    function _formatDateChar(p_formatChar, p_date) {
        var regional = iris.regional();
        switch(p_formatChar) {
        case "y":
            return String(p_date.getFullYear()).substring(2);
        case "Y":
            return p_date.getFullYear();
        case "m":
            var m = p_date.getMonth() + 1;
            return _leadingZero(m);
        case "n":
            return p_date.getMonth() + 1;
        case "M":
            return regional.monthNames[p_date.getMonth()].substring(0, 3);
        case "b":
            return regional.monthNames[p_date.getMonth()].substring(0, 3).toLowerCase();
        case "F":
            return regional.monthNames[p_date.getMonth()];
        case "d":
            var d = p_date.getDate();
            return _leadingZero(d);
        case "D":
            return regional.dayNames[p_date.getDay()].substring(0, 3);
        case "l":
            return regional.dayNames[p_date.getDay()];
        case "s":
            var s = p_date.getSeconds();
            return _leadingZero(s);
        case "i":
            var i = p_date.getMinutes();
            return _leadingZero(i);
        case "H":
            var h = p_date.getHours();
            return _leadingZero(h);
        case "h":
            var hour = p_date.getHours();
            hour = (hour % 12) === 0 ? 12 : hour % 12;
            return _leadingZero(hour);
        case "a":
            return(p_date.getHours() > 12) ? "p.m." : "a.m.";
        case "A":
            return(p_date.getHours() > 12) ? "PM" : "AM";
        case "U":
            return Math.floor(p_date.getTime() * 0.001);
        default:
            return p_formatChar;
        }
    }

    function _setCacheVersion(p_value) {
        _cacheVersion = p_value;
    }

    function _ajax(p_settings) {
        return $.ajax(p_settings);
    }

    function _setOrGetCache(p_value) {
        if(p_value !== undefined) {
            _cache = p_value;
        } else {
            return _cache;
        }
    }

    iris.ajax = _ajax;
    iris.cache = _setOrGetCache;
    iris.cacheVersion = _setCacheVersion;
    iris.date = _formatDate;
    iris.currency = _formatCurrency;
    iris.val = _getObjectValue;

    _init();

})(jQuery, window);