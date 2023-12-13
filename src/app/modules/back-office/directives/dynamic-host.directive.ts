import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicPhoneInput]',
})
export class DynamicHostDirective {
  constructor(public _viewContainerRef: ViewContainerRef) {}
}
