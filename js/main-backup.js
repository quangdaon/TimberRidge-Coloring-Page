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
(function() {

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
            info.parentNode.removeChild(info);
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
            resetBoxContainer.setAttribute('class', 'reset-confirm-wrap dialog-wrap');
            resetBoxContainer.setAttribute('id', 'reset-confirm');

            var resetBox = document.createElement('div');
            resetBox.setAttribute('class', 'reset-confirm dialog');

            var resetHeader = document.createElement('h3');
            resetHeader.appendChild(document.createTextNode('Timber Ridge Coloring Page'));

            var resetWarning = document.createElement('p');
            resetWarning.appendChild(document.createTextNode('Are you sure you want to reset the colors?'));

            var resetCancelButton = document.createElement('button');
            resetCancelButton.setAttribute('class', 'reset-confirm-cancel');
            resetCancelButton.appendChild(document.createTextNode('No. Sowiezz'));

            var resetConfirmButton = document.createElement('button');
            resetConfirmButton.setAttribute('class', 'reset-confirm-submit');
            resetConfirmButton.appendChild(document.createTextNode('Yesh pweez c:'));

            resetBox.appendChild(resetHeader);
            resetBox.appendChild(resetWarning);
            resetBox.appendChild(resetCancelButton);
            resetBox.appendChild(resetConfirmButton);

            resetBoxContainer.appendChild(resetBox);

            document.querySelector('.content').appendChild(resetBoxContainer);


            document.querySelector('button.reset-confirm-cancel').addEventListener('click', function() {
                var reset = document.querySelector('.reset-confirm-wrap');
                reset.parentNode.removeChild(reset);
            });

            document.querySelector('button.reset-confirm-submit').addEventListener('click', function() {
                resetColors();
                var reset = document.querySelector('.reset-confirm-wrap');
                reset.parentNode.removeChild(reset);
            });
        });
    }

    function paintArea(ev, el, color) {
        var type = 'area';
        if (classie.has(el, 'paint-area--text')) {
            type = 'text';
        }

        if (type === 'area') {
            // create SVG element
            el.setAttributeNS(null, 'fill', color);
            var dummy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            dummy.setAttributeNS(null, 'version', '1.1');
            dummy.setAttributeNS(null, 'width', '100%');
            dummy.setAttributeNS(null, 'height', '100%');
            dummy.setAttributeNS(null, 'class', 'paint');

            var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttributeNS(null, 'transform', 'translate(' + Number(ev.pageX - getOffset(el).left) + ', ' + Number(ev.pageY - getOffset(el).top) + ')');

            var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttributeNS(null, 'cx', 0);
            circle.setAttributeNS(null, 'cy', 0);
            circle.setAttributeNS(null, 'r', Math.sqrt(Math.pow(el.offsetWidth, 2) + Math.pow(el.offsetHeight, 2)));
            circle.setAttributeNS(null, 'fill', color);

            dummy.appendChild(g);
            g.appendChild(circle);
            el.appendChild(dummy);
        }

        setTimeout(function() {
            classie.add(el, 'paint--active');

            if (type === 'text') {
                el.style.color = color;
                var onEndTransCallbackFn = function(ev) {
                    if (ev.target != this) return;
                    this.removeEventListener(transEndEventName, onEndTransCallbackFn);
                    classie.remove(el, 'paint--active');
                };

                el.addEventListener(transEndEventName, onEndTransCallbackFn);
            } else {
                var onEndTransCallbackFn = function(ev) {
                    if (ev.target != this || ev.propertyName === 'fill-opacity') return;
                    this.removeEventListener(transEndEventName, onEndTransCallbackFn);
                    // set the color
                    el.style.backgroundColor = color;
                    // remove SVG element
                    el.removeChild(dummy);

                    setTimeout(function() {
                        classie.remove(el, 'paint--active');
                    }, 25);
                };

                circle.addEventListener(transEndEventName, onEndTransCallbackFn);
            }
        }, 25);
    }

    function resetColors(elem) {
        [].slice.call(document.querySelectorAll('.paint-area')).forEach(function(el) {
            el.style[classie.has(el, 'paint-area--text') ? 'color' : 'background-color'] = '';
            el.setAttributeNS(null, 'fill', '#FFFFFF');
        });
    }

    init();

})();

for (var i = 0; i <= $(".color-swatch").length; i++) {
    var colorParent = $(".color-swatch")[i];
    var fillColor = function() {
        return $(colorParent).find(".drag-element").data("color")
    }
    $(colorParent).css("background-color", fillColor());
    $(colorParent).find(".cno").css("background-color", fillColor());
};

$('body').keyup(function(event) {
    if (event.keyCode == 13) {
        $(".info-close").click();
    }
});

$('.paint-area').dblclick(function() {
    // clrColor(this);
    this.setAttributeNS(null, 'fill', '#f00');
});

clrColor = function(pathElement) {
    pathElement.setAttributeNS(null, 'fill', "#FFFFFF");
    $(".paint-area").removeClass("paint--active");
}
