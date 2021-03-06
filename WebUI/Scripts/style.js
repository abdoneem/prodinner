﻿        $(function () {
            setFocusOnFirst();
            applyjqcolors();
        });

        function styleup() {
            var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
            $("select,fieldset,input:text,input:password,.ae-lookup-multidisplay, .dinner, .thumb, .mealitem, .sthumb, .meal, .thumbhead").addClass("ui-corner-all");
            $("input:text, input:password,.ae-lookup-multidisplay").addClass('ui-widget-content');
            $("input[type=submit], .file_upload").addClass("abtn");
            $(".atbl thead").addClass("ui-state-default");
            
            $(".ae-lookup-list > li:even, .ae-lookup-list li:odd").removeClass('ui-widget-content ui-state-highlight');
            $(".ae-lookup-list > li:even").addClass("ui-widget-content"); 
            $(".ae-lookup-list > li:odd").addClass("ui-state-highlight");

            $(".atbl tbody tr:even, tbody tr:odd").removeClass("ui-widget-content ui-state-highlight");
            $(".atbl tbody tr:even").addClass("ui-widget-content");
            $(".atbl tbody tr:odd").addClass("ui-state-highlight");            
           
            $('.ui-state-highlight a').css('color', $('.ui-state-default').css('color'));
            $('.thumbhead').addClass('ui-widget-header');

            //mybutton is from awesome.js, almost the same as jquery ui .button()
            $ae.mybutton(".abtn");            
            $ae.mybutton(".ae-lookup-morebtn");

            $(".validation-summary-errors li").addClass('ui-state-error ui-corner-all');

            $('.field-validation-error').each(function () {
                $(this).after('<div class="err" data-msg="' + $(this).html() + '"></div>').remove();
            });

            $(".err").each(function () {
                $(this).tooltip({ bodyHandler: function () { return $(this).data('msg'); } });
            });


            if(!is_chrome)
            $(".input-validation-error").addClass('ui-state-error');

            $(".dinner").addClass("ui-widget-content");

            $(".stext").forceNumeric();
           
        }

        function applyjqcolors() {
            $.fx.speeds._default = 300;            
            $(window).bind("resize", function (e) { $("#main-container").css("min-height", ($(window).height() - 120) + "px"); });
            $("#main-container").css("min-height", ($(window).height() - 120) + "px").addClass("ui-widget-content");

            styleup();
            $(document).ajaxComplete(styleup);
            $(document).bind("awesome", styleup);
            $(document).bind('dialogopen', function () { $('.ui-dialog').addClass('transparent'); });
        }

        function setFocusOnFirst() {
            $("input:text:visible:first").focus();
        }

        jQuery.fn.forceNumeric = function () {

            return this.each(function () {
                $(this).keydown(function (e) {
                    var key = e.which || e.keyCode;

                    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                    // numbers   
                         key >= 48 && key <= 57 ||
                    // Numeric keypad
                         key >= 96 && key <= 105 ||
                    // comma, period and minus
                        key == 190 || key == 188 || key == 109 ||
                    // Backspace and Tab and Enter
                        key == 8 || key == 9 || key == 13 ||
                    // Home and End
                        key == 35 || key == 36 ||
                    // left and right arrows
                        key == 37 || key == 39 ||
                    // Del and Ins
                        key == 46 || key == 45)
                        return true;

                    return false;
                });
            });
        }