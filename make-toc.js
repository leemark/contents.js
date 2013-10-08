// object.create polyfill
if(typeof Object.create !== 'function'){
    Object.create = function( obj ){
        function F(){}
        F.protoype = obj;
        return new F();
    };
}

(function( $, window, document, undefined ){
    
    var TOC = {
        init: function( options, el ){
            var self = this;
            self.el = el;
            self.$el = $( el );
            if (typeof options === 'string') {
                self.tocEl = options;
            } else{
                self.tocEl = options.tocEl;
                self.options = $.extend( {}, $.fn.makeTOC.options, options );
            }
            self.makeHeadingList(self.$el, self.tocEl);
            if(self.options.smoothScroll){
                self.makeSmoothScroll(self.$el, self.tocEl);  
            }
        },
        makeHeadingList: function($el, tocEl){
            $("<ul/>").appendTo(tocEl);
            $el.find(':header').each(function(){
                var $this = $(this);
                var htxt = $this.text();
                var hidtxt = htxt.replace(/\W/g,'');
                var hclass = 'toc-' + $this.prop('tagName').toLowerCase();
                $this.attr('id', hidtxt);
                $('<li/>', {addClass: hclass}).html('<a href="#' + hidtxt + '">' + htxt + '</a>').appendTo(tocEl+' ul');
            });
        },
        makeSmoothScroll: function($el, tocEl){
            $(tocEl).find('a').on('click', function(e) {
                $el.find(':header').removeClass('targeted');   
                var target = $(this).attr('href'); 
                $('html, body').animate({
                    scrollTop: $(target).offset().top -20
                }, 700);
                $(target).addClass('targeted');
                e.preventDefault();
            });  
        }    
    };
    
    $.fn.makeTOC = function( options ){
        return this.each(function(){
            var toc = Object.create( TOC );
            toc.init( options, this );
        });   
    };
    
    $.fn.makeTOC.options = {
        tocEl: 'body',
        smoothScroll: false
    };
    
})( jQuery, window, document );