# WARNING

**This code hasn't been updated to `ng2-dragula` version 2. Please follow the [migration guide](https://github.com/valor-software/ng2-dragula/tree/master/MIGRATION-v2.md) if you are blindly copying this into a project. Or, help out by submitting a PR that updates this to v2.**

# Dragula Touch Demo

**[demo here](https://dist-qipwlhpznt.now.sh/)**

A working example of using [dragula](https://github.com/bevacqua/dragula) on a touchscreen! Includes:

* [`DelayDragDirective`](https://github.com/cormacrelf/dragula-touch-demo/blob/master/src/app/delay-drag.directive.ts):
  `[delayDrag]="200"` will force dragula's touchmove handler to wait 200ms
  before it reacts. Before that time, if you move your finger at all during that
  delay, touchscreens will interpret it as scrolling, and dragula will never see
  your drag. `delayDrag` by itself uses a default value of 200.

* A helper CSS class, `.delay-drag-lifted` that is added after the delay.
  Dragula's own `.gu-mirror` isn't added until you move, so this can help you
  style things appropriately. See
  [`app.component.ts`](https://github.com/cormacrelf/dragula-touch-demo/blob/master/src/app/app.component.ts#L56)
  for an example of using it to apply styles to both classes (but not the
  `.gu-transit` left behind).

* An example use of
  [`dom-autoscroller`](https://github.com/hollowdoor/dom_autoscroller). This is
  a bit jagged on touchscreens, but it works.

* A normal child element, with no touchmove handler. You might find if you
  disable `dom-autoscroller` (see below) you have issues with iOS Safari
  dragging and scrolling at the same time. There's a child element *with*
  a touchmove handler for comparison.

Created in response to [ng2-dragula/597](https://github.com/valor-software/ng2-dragula/issues/597)

## Try it out

Run `yarn install` or `npm install`.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

