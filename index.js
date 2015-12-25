/**
 * nw-playground - Quick experiments with NW.js
 *
 * index.js - Main file
 *
 * @author Alexandre Bintz <alexandre@bintz.io>
 * 12/2015
 */

'use strict';


module.exports = function(document, hljs) {

  var scriptTagClassName = 'nw-playground-script';

  function convertOne(element, callback) {

    element.setAttribute('contentEditable', 'true');
    element.className += ' nw-playground-editor';

    // make tab key insert a tab character instead of changing focus

    element.addEventListener('keydown', function(e) {
      if (e.which === 9) { // tab
        e.preventDefault();
        document.execCommand('insertHTML', false, '\t');
      }
    });

    if (hljs !== undefined) {
      hljs.highlightBlock(element);
      element.addEventListener('blur', function() {
        hljs.highlightBlock(element);
      });
    }

    var container = document.createElement('div');
    container.className = 'nw-playground';

    var parent = element.parentElement;
    parent.insertBefore(container, element);

    element = parent.removeChild(element);
    container.appendChild(element);

    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Run'));
    btn.className += ' nw-playground-button-run';
    container.appendChild(btn);

    btn.addEventListener('click', function() {

      var dom; while (dom = document.querySelector('.' + scriptTagClassName)) {
        document.body.removeChild(dom);
      }

      var scriptTag = document.createElement('script');
      scriptTag.className = scriptTagClassName;

      var code = '(function(){' + element.innerText + '})();';
      scriptTag.appendChild(document.createTextNode(code));

      document.body.appendChild(scriptTag);
    });

    if (callback !== undefined) {
      callback(element, container);
    }
  }

  function convertAll(callback) {

    var elements = document.querySelectorAll('pre');
    for (var i = 0, l = elements.length; i < l; i++) {
      convertOne(elements[i], callback);
    }
  }

  return {
    convertOne: convertOne,
    convertAll: convertAll,
  };
};
