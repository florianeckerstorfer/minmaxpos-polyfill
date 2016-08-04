minmaxpos-polyfill
==================

> Adds min-left, max-left, min-right, max-right, min-top, max-top, min-bottom and max-bottom properties to CSS.

By [Florian Eckerstorfer](https://florian.ec) for [Kiweno](https://kiweno.com).

Install
-------

```shell
npm install minmaxpos-polyfill --save
```

Usage
-----

First, include [polyfill]() and [minmaxpos-polyfill] in your site

```html
<script src="node_modules/polyfill/dist/polyfill.js"></script>
<script src="node_modules/minmaxpos-polyfill/dist/minmaxpos.polyfill.js"></script>

<script>
    window.onload = MinMaxPosPolyfill;
</script>
```

Then you can use the new properties in yours CSS:

```css
.element {
    left: calc(10% - 100px);
    min-left: 0;
}
```

If `calc()` returns a negative value, the element will be position at `left: 0px`.
