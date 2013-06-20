/*

/-- CSS ------------------------------------- /

.tab-container .tab-holder .tab-view { display: none; }
.tab-container .tab-holder .tab-view.active { display: block; }

/-- SCSS ------------------------------------ /

.tab-container
{
    .tab-holder
    {
        .tab-view
        {
            display: none;

            &.active
            {
                display: block;
            }
        }
    }
}

/-- HTML ------------------------------------ /

<div class="YOURPARENTCONTAINER">
    <div class="tab-container">
        <div class="tab-nav">
            <ul>
                <li><a href="#" data-tabid="tab-01" class="active">Tab 1</a></li>
                <li><a href="#" data-tabid="tab-02">Tab 2</a></li>
                <li><a href="#" data-tabid="tab-03">Tab 3</a></li>
            </ul>
        </div>
        <div class="tab-holder">
            <div data-tabid="tab-01" class="tab-view active">
                Tab Content 01
            </div>
            <div data-tabid="tab-02" class="tab-view">
                Tab Content 02
            </div>
            <div data-tabid="tab-03" class="tab-view">
                Tab Content 03
            </div>
        </div>
    </div>
</div>

/-- JS ------------------------------------ /

    $('.YOURPARENTCONTAINER').SimpleTabs();

If you like you can override the active classes
using the options:

    $('.YOURPARENTCONTAINER').SimpleTabs(
    {
        tabActiveClass: "tab-viewable",
        tabBtnActiveClass: "btn-on"
    });

You can also run functions when a tab has changed by
listening to the custom 'tab:change' class.

*/

"use strict";

;(function ($, window, document, undefined) {

    // our plugin constructor
    var SimpleTabs = function (elem, options)
    {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
    };

    // the plugin prototype
    SimpleTabs.prototype =
    {
        defaults:
        {
            tabActiveClass : "active",
            tabBtnActiveClass : "active"
        },

        init: function ()
        {
            var _self = this;

            this.config = $.extend( {}, this.defaults, this.options, this.metadata);

            _self.$elem.on('click', '.tab-container .tab-nav a', function( e )
            {
                e.preventDefault();

                var $this, $parent, $tab;

                $this           = $(this);
                $parent         = $this.parents('.tab-container');

                // check if parent has it's tab data ( this is basically selector cacheing )
                if( $parent.data('tabs') === undefined )
                {
                    $parent.data('tabs', $parent.find('.tab-holder > .tab-view'));
                }

                // get the target tab to show from the item
                $tab = $this.data('tab') || $parent.data('tabs').filter('[data-tabid="'+ $this.data('tabid') +'"]');

                // save the tab as a data obj on the button so we don't have to run selectors again
                if( $this.data('tab') === undefined )
                {
                    $this.data('tab', $tab);
                }

                $parent.data('tabs').removeClass( _self.config.tabActiveClass );
                $this.data('tab').addClass( _self.config.tabActiveClass );

                $parent.find('.tab-nav a').removeClass( _self.config.tabBtnActiveClass );
                $this.addClass( _self.config.tabBtnActiveClass );

                _self.$elem.trigger( 'tab:change', $this.data('tab') );

            });

            return this;
        }
    };

    SimpleTabs.defaults = SimpleTabs.prototype.defaults;

    $.fn.SimpleTabs = function (options)
    {
        return this.each(function ()
        {
            new SimpleTabs(this, options).init();
        });
    };

})(jQuery, window, document);