drag-highlight
==============

Minimalistic jQuery plugin to style HTML5 Drag&amp;Drop easily.

TL;DR
-----

This plugin aims to:

- Highlight all droppable areas as soon as the user starts dragging a file over the browser.
- Activate a droppable area when the user is hovering over it.
- Prevent the browser from opening the content in a separate page if the user misses the drop area.

Usage
-----

Just include the script right after jQuery. The `body` will have the `dragging` class whenever the
user starts dragging a file over the browser. You can then highlight all droppable areas with:

```css
body.dragging .droppable {
  border: 1px solid blue;
}
```

When the user drags a file over a droppable area (with class `droppable`), you can style it:

```css
.droppable.dragging {
  border: 1px solid red;
}
```

How does it work ?
------------------

HTML5 Drag&Drop APIs are notoriously bad. They fire tons of events (`dragenter`, `dragover`, `dragleave`, `drop`),
and the default actions make no sense. To give you an idea, let's assume we have this:

```html
<div class="droppable">
  <span>Drop files here</span>
</div>
```

If you enter the droppable, you will get a `dragenter` followed by tons of `dragover`. You will predictably get a
`dragleave` if you drag outside of the div. However, you will also get a `dragleave` if you go over the span. As soon
as the element is not the immediate target of the drag&drop, you get a `dragleave`.

Now, what the plugin does is simply use the Data API to count the number of `dragenter`/`dragleave` events received by
droppables and their descendants. If the number is 1, then dragging is occuring.

It will also prevent the default drop action: open the dropped content in the browser. Yeah, by default, if you miss the
drop target, the browser navigates away and you lose everything you were doing.
