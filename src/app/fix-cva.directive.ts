import {
  ChangeDetectorRef,
  Directive,
  Inject,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Directive({
  selector: '[fixCva]',
})
export class FixCvaDirective implements OnInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(NgControl)
    @Optional()
    private ngControl?: NgControl,
    @Optional()
    @Self()
    @Inject(NG_VALUE_ACCESSOR)
    private valueAccessors?: ControlValueAccessor[]
  ) {}

  control!: AbstractControl;

  ngOnInit(): void {
    if (
      !this.ngControl ||
      !this.valueAccessors ||
      this.valueAccessors.length !== 1
    ) {
      return;
    }

    const controls: AbstractControl[] = Object.values(
      this.valueAccessors[0]
    ).filter((v: unknown) => v instanceof AbstractControl);

    if (controls.length === 0) {
      console.log('CVA as no AbstractControl');
      return;
    }

    this.control = controls[0];

    if (this.ngControl?.control) {
        const parentMarkAllAsTouched = this.ngControl?.control?.markAllAsTouched;
        this.ngControl.control.markAllAsTouched = (): void => {
          console.log('markAllAsTouched');
          parentMarkAllAsTouched.bind(this.ngControl?.control)();
          this.control.markAllAsTouched();
          this.changeDetectorRef.markForCheck();
        };
    }
  }
}
