# nw-playground

## Install

```
npm install nw-playground
```

## Usage

Quick experiments with NW.js :

```javascript
require('nw-playground')(document).convertAll();
```

This will turn all code that looks like this :

```html
<pre>
  console.log('hello');
</pre>
```

Into this :

```html
<div class="nw-playground">
  <pre class="nw-playground-editor" contentEditable="true">
    console.log('hello');
  </pre>
  <button class="nw-playground-button-run">
    Run
  </button>
</div>
```

User will be able to edit the content of the `<pre>` tag.
Clicking the `Run` button will create a `<script>` tag containing the code currently inside the `<pre>` tag nested inside a closure, and append it at the end of the `<body>` :

```html
<body>
  <!-- ... -->
  <script>
    (function() {
      console.log('hello');
    })();
  </script>
</body>
```

Clicking again will remove previous `<script>` tag before creating a new one
(this will not stop the code !).


## Advanced usage

### Convert custom elements

```javascript
require('nw-playground')(document).convertOne(
  document.querySelector('#myElement')
);
```


### Callback

You can pass a callback that will be called after a playground has been created :

```javascript
// here the callback is called after the given element has been turned into a
// playground
require('nw-playground')(document).convertOne(
  element,
  function(element, container) {
    /* ... */
  }
);

// here the callback is called once for each converted element
require('nw-playground')(document).convertAll(
  function(element, container) {
    /* ... */
  }
);
```

The `element` argument is the original element that has been converted (class `nw-playground-editor`) and `container` is the top level wrapper element of the corresponding playground (class `nw-playground`).

You can use this to customize the generated HTML to suit your needs.


### Syntax highlighting with Highlight.js

You can pass the main [Highlight.js](https://highlightjs.org) object to color the code inside the playgrounds :

```html
<head>
  <!-- ... -->
  <!-- load Highlight.js -->
  <link rel="stylesheet" href="highlight/styles/default.css">
  <script src="highlight/highlight.pack.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
</head>
<body>
  <!-- ... -->
  <script>
    hljs.configure(/* ... */);
    require('nw-playground')(document, hljs).convertAll();
  </script>
</body>
```

Code inside each playground will be highlighted on load and when the element
looses focus.


## Reference

### init(document[, hljs])

```javascript
var init = require('nw-playground');
init(/* ... */);
```

- `document` : the DOM document (required)
- `hljs` : main [Highlight.js](https://highlightjs.org) object (optional)


### convertAll([callback])

Convert all `<pre>` tags to a playground.

- `callback` : function called once for each element that has been converted.
Receives following parameters :
- `element` : the original element that has been converted (class `nw-playground-editor`)
- `container` : the top level wrapper element of the corresponding playground (class `nw-playground`)


### convertOne(element[, callback])

Convert given element to a playground.

- `callback` : function called after the element has been converted.
Receives following parameters :
- `element` : the original element that has been converted (class `nw-playground-editor`)
- `container` : the top level wrapper element of the corresponding playground (class `nw-playground`)


## License

The MIT License (MIT) - Copyright (c) 2015 Alexandre Bintz <alexandre@bintz.io>  
See [LICENSE](LICENSE) file for full text.
