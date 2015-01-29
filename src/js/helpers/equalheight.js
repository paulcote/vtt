var $ = require('jquery');
var _ = require('lodash');
var waitForImages = require('waitforimages');

module.exports = (function() {

    var identifiers = [];

    $(window).on('resize', _.debounce(function() {
        $('[data-equalheight]').each(function() {
            var id = $(this).data('equalheight');
            if (!_.contains(identifiers, id)) identifiers.push(id);
        });

        identifiers.forEach(function(id) {
            var height = 0,
                elements = $('[data-equalheight=' + id + ']');

            elements.waitForImages(function() {
                elements.each(function() {
                    var $this = $(this),
                        currentHeight = 0;

                    $this.css('height', 'auto');
                    currentHeight = $this.outerHeight();
                    height = (currentHeight > height ? currentHeight : height);
                });
                elements.outerHeight(height);
            });
        });
    }, 100)).trigger('resize');

}());
