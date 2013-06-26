describe("jquery.simpletabs", function()
{
    var frag;

    beforeEach(function(){
        frag = $( readFixtures('fragment.html') );
    });

    it('Should exist as jQuery Plugin', function()
    {
      //expect( $.fn.SimpleTabs ).toBeDefined() );
      expect( $.fn.SimpleTabs ).toBeDefined();
    });

    it('Should be chainable', function()
    {
        expect( frag.SimpleTabs() ).toBe(frag);
    });

    it("Should have first tab active", function()
    {
        frag.SimpleTabs();

        expect( frag.find('.tab-view').first() ).toHaveClass('active');
    });

    it("Should indicate first tab nav active", function() {
        frag.SimpleTabs();

        expect( frag.find('.tab-nav li').first().find('a') ).toHaveClass('active');
    });

    it("Should switch classes on click", function() {

        frag.SimpleTabs();

        frag.find('.tab-nav li').eq(1).find('a').click();

        expect( frag.find('.tab-nav li').eq(1).find('a') ).toHaveClass('active');
        expect( frag.find('.tab-view').eq(1)).toHaveClass('active');

    });

    it("Should store tab on clicked object", function() {

        frag.SimpleTabs();

        frag.find('.tab-nav li').eq(1).find('a').click();

        expect( frag.find('.tab-nav li').eq(1).find('a') ).toHaveData('tab');

    });

    it("Should dispatch tab:change event", function() {

        frag.SimpleTabs();

        var spyEvent = spyOnEvent( frag, 'tab:change' )

        frag.find('.tab-nav li').eq(1).find('a').click();

        expect( spyEvent ).toHaveBeenTriggered();

    });

    describe("Plugin Options", function()
    {

        it('Should allow custom tab nav "active" classes', function()
        {

            var custom = 'some-class';
            frag.find('.tab-nav .active').removeClass('active').addClass(custom);
            frag.SimpleTabs({ tabBtnActiveClass: custom });
            frag.find('.tab-nav li').eq(1).find('a').trigger('click');

            expect(  frag.find('.tab-nav li').eq(1).find('a') ).toHaveClass(custom);
        });

        it('Should allow custom tab "active" classes', function()
        {
            var custom = 'some-class';
            frag.find('.tab-view.active').removeClass('active').addClass(custom);
            frag.SimpleTabs({ tabActiveClass: custom });
            frag.find('.tab-nav li').eq(1).find('a').trigger('click');

            expect( frag.find('.tab-view').eq(1) ).toHaveClass(custom);
        });

    });



});