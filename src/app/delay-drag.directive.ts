import { Directive, ElementRef, HostListener, Input, OnInit, HostBinding } from '@angular/core';

@Directive({ selector: `[delayDrag]` })
export class DelayDragDirective {
  @Input('delayDrag')
  public dragDelay: number;

  private touchTimeout: any;

  @HostBinding('class.delay-drag-lifted')
  private draggable: boolean = false;

  get delay() {
    // if it's a string, that's because we didn't pass a value (<div delayDragLift></div>)
    return (typeof this.dragDelay === 'number')
      ? this.dragDelay
      : 200;
  }

  @HostListener('touchstart', ['$event'])
  private onTouchStart(evt: Event): void {
    this.touchTimeout = setTimeout(() => { this.draggable = true; }, this.delay);
  }

  @HostListener('touchmove', ['$event'])
  private onTouchMove(evt: Event): void {
    if (!this.draggable) { evt.stopPropagation(); clearTimeout(this.touchTimeout); }
  }

  @HostListener('touchend', ['$event'])
  private onTouchEnd(evt: Event): void {
    clearTimeout(this.touchTimeout);
    this.draggable = false;
  }
}
