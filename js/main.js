/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, Codrops
 * http://www.codrops.com
 */


var colorsList = [
    "hsl(0,0%,10%)",
    "hsl(25,100%,25%)",
    "hsl(0,100%,65%)",
    "hsl(25,100%,65%)",
    "hsl(45,100%,65%)",
    "hsl(90,100%,65%)",
    "hsl(180,100%,65%)",
    "hsl(225,100%,65%)",
    "hsl(270,100%,65%)",
    "#A3A3A3",
    "#FFFFFF"
];

(function() {

    $("#coloring-page").load("coloring-pages/" + $(".page-selector").val() + ".svg", function() {
        $(this).find(".paint-area").dblclick(function() {
            clrColor(this);
            // this.setAttributeNS(null, 'fill', '#f00');
        });
    });
    $("#coloring-page").addClass($(".page-selector").val());

    genColorSwatches();
    setColors();

    // $(".color-slider").change(function() {
    //     var red = $("#red-slider").val();
    //     var green = $("#green-slider").val();
    //     var blue = $("#blue-slider").val();
    //     $(".drag-element").attr("data-color", "rgb(" + red + "," + green + "," + blue + ")");
    //     setColors();
    // });

    var docElem = window.document.documentElement,
        // transition end event name
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

    function scrollX() {
        return window.pageXOffset || docElem.scrollLeft;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    function getOffset(el) {
        var offset = el.getBoundingClientRect();
        return {
            top: offset.top + scrollY(),
            left: offset.left + scrollX()
        };
    }

    function dragMoveListener(event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.transform = target.style.webkitTransform = 'translate(' + x + 'px, ' + y + 'px)';
        target.style.zIndex = 10000;

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    function revertDraggable(el) {
        el.style.transform = el.style.webkitTransform = 'none';
        el.style.zIndex = 1;
        el.setAttribute('data-x', 0);
        el.setAttribute('data-y', 0);
    }

    function init() {



        document.querySelector('button.info-close').addEventListener('click', function() {
            var info = document.querySelector('.info-wrap');
            // alert(info.parentNode);
            $(info).animate({
                "opacity": 0
            }, 50, function() {
                info.parentNode.removeChild(info);
            });
        });

        // target elements with the "drag-element" class
        interact('.drag-element').draggable({
            // enable inertial throwing
            inertia: true,
            // call this function on every dragmove event
            onmove: dragMoveListener,
            onend: function(event) {
                if (!classie.has(event.target, 'drag-element--dropped') && !classie.has(event.target, 'drag-element--dropped-text')) {
                    revertDraggable(event.target);
                }
            }
        });

        // enable draggables to be dropped into this
        interact('.paint-area').dropzone({
            // only accept elements matching this CSS selector
            accept: '.drag-element',
            // Require a 75% element overlap for a drop to be possible
            overlap: 0.75,
            ondragenter: function(event) {
                classie.add(event.target, 'paint-area--highlight');
                $('path').css('stroke', event.relatedTarget.getAttribute('data-color'));
            },
            ondragleave: function(event) {
                classie.remove(event.target, 'paint-area--highlight');
            },
            ondrop: function(event) {
                var type = 'area';
                if (classie.has(event.target, 'paint-area--text')) {
                    type = 'text';
                }

                var draggableElement = event.relatedTarget;

                classie.add(draggableElement, type === 'text' ? 'drag-element--dropped-text' : 'drag-element--dropped');

                var onEndTransCallbackFn = function(ev) {
                    this.removeEventListener(transEndEventName, onEndTransCallbackFn);
                    if (type === 'area') {
                        paintArea(event.dragEvent, event.target, draggableElement.getAttribute('data-color'));
                    }
                    setTimeout(function() {
                        revertDraggable(draggableElement);
                        classie.remove(draggableElement, type === 'text' ? 'drag-element--dropped-text' : 'drag-element--dropped');
                    }, type === 'text' ? 0 : 250);
                };
                if (type === 'text') {
                    paintArea(event.dragEvent, event.target, draggableElement.getAttribute('data-color'));
                }
                draggableElement.querySelector('.drop').addEventListener(transEndEventName, onEndTransCallbackFn);
            },
            ondropdeactivate: function(event) {
                // remove active dropzone feedback
                classie.remove(event.target, 'paint-area--highlight');
            }
        });

        // reset colors


        document.querySelector('button.reset-button').addEventListener('click', function() {
            // alert("The code broke :p");
            var resetBoxContainer = document.createElement('div');
            $(resetBoxContainer).addClass('reset-confirm-wrap dialog-wrap');
            resetBoxContainer.setAttribute('id', 'reset-confirm');

            var resetBox = document.createElement('div');
            $(resetBox).addClass('reset-confirm dialog');

            var resetHeader = document.createElement('h3');
            resetHeader.appendChild(document.createTextNode('Timber Ridge Coloring Page'));

            var resetWarning = document.createElement('p');
            resetWarning.appendChild(document.createTextNode('Are you sure you want to reset the colors?'));

            var resetCancelButton = document.createElement('button');
            $(resetCancelButton).addClass('reset-confirm-cancel');
            $(resetCancelButton).addClass('cancel-button');
            resetCancelButton.appendChild(document.createTextNode('No. Sowiezz'));

            var resetConfirmButton = document.createElement('button');
            $(resetConfirmButton).addClass('reset-confirm-submit');
            resetConfirmButton.appendChild(document.createTextNode('Yesh pweez c:'));

            resetBox.appendChild(resetHeader);
            resetBox.appendChild(resetWarning);
            resetBox.appendChild(resetCancelButton);
            resetBox.appendChild(resetConfirmButton);

            resetBoxContainer.appendChild(resetBox);
            resetBoxContainer.style.opacity = 0;
            document.querySelector('.content').appendChild(resetBoxContainer);

            $(resetBoxContainer).animate({
                opacity: 1
            }, 50);




            document.querySelector('button.reset-confirm-cancel').addEventListener('click', function() {
                var reset = document.querySelector('.reset-confirm-wrap');

                $(reset).animate({
                    opacity: 0
                }, 50, function() {
                    reset.parentNode.removeChild(reset);
                });
            });

            document.querySelector('button.reset-confirm-submit').addEventListener('click', function() {
                resetColors();
                var reset = document.querySelector('.reset-confirm-wrap');
                $(reset).animate({
                    opacity: 0
                }, 50, function() {
                    reset.parentNode.removeChild(reset);
                });
            });
        });
    }

    function paintArea(ev, el, color) {
        el.setAttributeNS(null, 'fill', color);
    }

    function resetColors(elem) {
        [].slice.call(document.querySelectorAll('.paint-area')).forEach(function(el) {
            el.style[classie.has(el, 'paint-area--text') ? 'color' : 'background-color'] = '';
            el.setAttributeNS(null, 'fill', '#FFFFFF');
        });
    }

    init();

})();


function setColors() {
    for (var i = 0; i <= $(".color-swatch").length; i++) {
        var colorParent = $(".color-swatch")[i];
        var fillColor = function() {
            return $(colorParent).find(".drag-element").data("color")
        }
        $(colorParent).css("background-color", fillColor());
        $(colorParent).find(".cno").css("background-color", fillColor());
    };
}

$('body').keyup(function(event) {
    if (event.keyCode == 13) {
        $(".info-close").click();
    }
});

$('body').keypress(function(event) {
    console.log(event.keyCode);
    if (event.keyCode == 96) {
        window.location.href = "./docs/tutorial.html";
    }
});


$(".page-selector").change(function() {

    var pageChangeBoxContainer = document.createElement('div');
    $(pageChangeBoxContainer).addClass('pageChange-confirm-wrap dialog-wrap');
    pageChangeBoxContainer.setAttribute('id', 'pageChange-confirm');

    var pageChangeBox = document.createElement('div');
    $(pageChangeBox).addClass('pageChange-confirm dialog');

    var pageChangeHeader = document.createElement('h3');
    pageChangeHeader.appendChild(document.createTextNode('Timber Ridge Coloring Page'));

    var pageChangeWarning = document.createElement('p');
    pageChangeWarning.appendChild(document.createTextNode('Are you sure you want to change the page? This well reset all your work.'));

    var pageChangeCancelButton = document.createElement('button');
    $(pageChangeCancelButton).addClass('pageChange-confirm-cancel');
    $(pageChangeCancelButton).addClass('cancel-button');
    pageChangeCancelButton.appendChild(document.createTextNode('No. Sowiezz'));

    var pageChangeConfirmButton = document.createElement('button');
    $(pageChangeConfirmButton).addClass('pageChange-confirm-submit');
    pageChangeConfirmButton.appendChild(document.createTextNode('Yesh pweez c:'));

    pageChangeBox.appendChild(pageChangeHeader);
    pageChangeBox.appendChild(pageChangeWarning);
    pageChangeBox.appendChild(pageChangeCancelButton);
    pageChangeBox.appendChild(pageChangeConfirmButton);

    pageChangeBoxContainer.appendChild(pageChangeBox);
    pageChangeBoxContainer.style.opacity = 0;
    document.querySelector('.content').appendChild(pageChangeBoxContainer);

    $(pageChangeBoxContainer).animate({
        opacity: 1
    }, 50);

    document.querySelector('button.pageChange-confirm-cancel').addEventListener('click', function() {
        var pageChange = document.querySelector('.pageChange-confirm-wrap');

        $(pageChange).animate({
            opacity: 0
        }, 50, function() {
            pageChange.parentNode.removeChild(pageChange);
        });
        $(".page-selector").val($("#coloring-page").attr("class"));
    });

    document.querySelector('button.pageChange-confirm-submit').addEventListener('click', function() {
        $("#coloring-page").removeClass();
        $("#coloring-page").addClass($(".page-selector").val());
        $("#coloring-page").html("");
        $("#coloring-page").load("coloring-pages/" + $(".page-selector").val() + ".svg", function() {
            $(this).find(".paint-area").dblclick(function() {
                clrColor(this);
                // this.setAttributeNS(null, 'fill', '#f00');
            });
        });
        var pageChange = document.querySelector('.pageChange-confirm-wrap');
        $(pageChange).animate({
            opacity: 0
        }, 50, function() {
            pageChange.parentNode.removeChild(pageChange);
        });
        $(".page-selector").val($("#coloring-page").attr("class"));
    });

});

function genColorSwatches() {
    for (var i = 0; i < colorsList.length; i++) {
        // console.log("%c  ", "border: 1px solid #000; background: " + colorsList[i]);
        var colorSwatch = document.createElement('li');
        $(colorSwatch).addClass('color-swatch');
        $(colorSwatch).addClass('cno');

        var dragElem = document.createElement('div');
        $(dragElem).addClass('drag-element');
        $(dragElem).attr('data-color', colorsList[i]);
        // $(dragElem).data('color', colorsList[i]);

        var drop = document.createElement('div');
        $(drop).addClass('drop');
        $(drop).addClass('cno');
        $(dragElem).append(drop);

        for (var r = 1; r <= 4; r++) {
            var dropHelper = document.createElement('i');
            $(dropHelper).addClass('drop-helper-' + r);
            $(dropHelper).addClass('cno');
            $(dragElem).append(dropHelper);
        };

        $(colorSwatch).append(dragElem);

        // alert($(colorSwatch).html());
        $(".color-tool").append(colorSwatch);
    };

    var resetContainer = document.createElement('li');
    var resetButton = document.createElement('button');
    $(resetButton).addClass('reset-button');
    $(resetButton).attr('title', 'Reset Colors');
    $(resetButton).append(document.createTextNode('Reset Colors'));
    $(resetContainer).append(resetButton);
    $(".color-tool").append(resetContainer);
}

clrColor = function(pathElement) {
    pathElement.setAttributeNS(null, 'fill', "#FFFFFF");
}
