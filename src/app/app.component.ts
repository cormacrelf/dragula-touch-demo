import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import dragula from 'dragula';
import autoScroll from 'dom-autoscroller';

@Component({
  selector: 'app-root',
  template: `
    <h1>
      Delay dragging for <code>(ng2-)dragula</code>
    </h1>
    <p>
      The delayDrag divs will be draggable on touchscreens after 200 milliseconds.
    </p>
    <p>
      The touchmove handler on the green one does nothing, but having one prevents iOS from scrolling while dragging.
    </p>

<p>
    <label>
      <input type="checkbox" name="colours" [(ngModel)]="colours"/>
      Show colours for different states
    </label>
    </p>

    <div class="parent" [dragula]="'bag'">
      <div [class.colours]="colours" class="child ddl" delayDrag >1 delayDrag</div>
      <div [class.colours]="colours" class="child ddl" delayDrag >2 delayDrag</div>
      <div [class.colours]="colours" class="child ddl" delayDrag >3 delayDrag</div>
      <div [class.colours]="colours" class="child ddl" delayDrag >4 delayDrag</div>
      <div [class.colours]="colours" class="child ddl" delayDrag >5 delayDrag</div>
      <div [class.colours]="colours" class="child ddl" delayDrag >6 delayDrag</div>
      <div [class.colours]="colours" class="child" >normal</div>
      <div [class.colours]="colours" class="child tm" (touchmove)="touchmove()" >normal with touchmove handler</div>
    </div>
  `,
  styles: [`
    .parent { background: #eeeeee; padding: 10px; }
    .child  { background: #FAD214; padding: 5px; line-height: 100px; text-align: center; }
    .parent > .child:not(:last-child) { margin-bottom: 10px; }

    .tm { background: #BFCD86; }
    .ddl { background: #83C8F7; }

    /* target child you've pressed long enough but not for the gu-transit copy left in the original spot
     * probably not very useful, only shows up on touchscreens. */
    .colours.delay-drag-lifted.child:not(.gu-transit) { background-color: #FFC8BC; }
    /* target child only when it's being dragged around
     * note the !important, it's because the not(.gu-transit) makes the previous rule more specific */
    .colours.gu-mirror.child { background-color: #FF817D !important; }

    /* target a child when you pick it up
     * - equivalent to .gu-mirror.child (ie onmousemove) on desktops
     * - equivalent to any press longer than delayDrag's delay on touchscreens
     * this is probably the most useful rule here */
    .gu-mirror.child, .delay-drag-lifted.child:not(.gu-transit) {
      /* zoom an element when you 'pick it up' */
      transform: scale(1.1);

      /* nice big box-shadow. may have a performance impact when dragging in some browser, try before you buy. */
      /* box-shadow: 0 14px 28px rgba(0,0,0,0.18), 0 10px 10px rgba(0,0,0,0.15); */

      /* you'd probably want to delete the original opacity filters in .gu-mirror rather than do this */
      /* opacity: 1; */

      /* or whatever you want. */
      /* background-color: #FF817D; */
    }

    /**
     * user-select: none is vital if your child elems have text in them,
     * it's so annoying when you're trying to drag around and iphone text selection kicks in. */
    @media screen and (max-width: 768px) {
      .child {
        -webkit-touch-callout: none; /* may be useful if your child is an anchor you can otherwise click */
        -webkit-user-select: none !important; /* Disable selection/copy in UIWebView */
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
    }

    .gu-mirror.child:after { content: ".gu-mirror"; }
    .delay-drag-lifted.child:after { content: ".delay-drag-lifted"; }
    .gu-mirror.delay-drag-lifted.child:after { content: ".delay-drag-lifted.gu-mirror"; }
  `]
})
export class AppComponent implements OnInit, OnDestroy {

  colours = true;
  scroll: any;

  constructor(private ds: DragulaService) {
  }

  ngOnInit() {
    // create the drake manually so we can refer to it's dragging property
    let drake = dragula();
    this.ds.add('bag', drake);

    this.scroll = autoScroll(
      // can also be an array of elements if they're { overflow: auto; max-height: XXpx } containers.
      // i.e. [someViewChild.nativeElement]
      window,
      {
        margin: 30, maxSpeed: 25, scrollWhenOutside: true,
          
        autoScroll: function () { // don't use () => {} syntax, we want to keep the 'this'
          // Only scroll when the pointer is down, and there is a child being dragged. 
          return this.down && drake.dragging;
        }
      });
  }

  touchmove() {
    // do nothing
  }

  ngOnDestroy() {
    this.ds.destroy('bag');
    this.scroll.destroy();
  }
}
