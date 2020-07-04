import { Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChildren("field") field: ElementRef;
  cardForm!: FormGroup;
  acceptableDigitCount: number = 4;
  inputField = [];
  inputFieldCount: number = 4;
  maxDigitCount: number = 16;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inputField.length = this.inputFieldCount;
    this.cardForm = this.fb.group({
      f1: [null, [Validators.required]],
      f2: [null, [Validators.required]],
      f3: [null, [Validators.required]],
      f4: [null, [Validators.required]],
      f5: [null, [Validators.required]],
      f6: [null, [Validators.required]],
      f7: [null, [Validators.required]],
      f8: [null, [Validators.required]],
    });
  }

  onKeyUp = (event: Event, i: number) => {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const keys = digits.includes(event["key"]);
    if (event.target["value"].length == this.acceptableDigitCount && keys) {
      this.setFocus(i);
    } else if (
      event.target["value"].length == 0 &&
      event["key"] == "Backspace"
    ) {
      this.setFocus(i - 2);
    } else if (
      event.target["selectionEnd"] == 0 &&
      event["key"] == "ArrowLeft"
    ) {
      this.setFocus(i - 2);
    } else if (
      event.target["selectionEnd"] == this.acceptableDigitCount &&
      event["key"] == "ArrowRight"
    ) {
      this.setFocus(i);
    }
  };

  setFocus(index: number) {
    switch (index) {
      case 0:
        this.field["_results"][index].nativeElement.focus();
        break;
      case 1:
        this.field["_results"][index].nativeElement.focus();
        break;
      case 2:
        this.field["_results"][index].nativeElement.focus();
        break;
      case 3:
        this.field["_results"][index].nativeElement.focus();
        break;
    }
  }

  onPaste = (event: Event) => {
    let clipboardData = event["clipboardData"].getData("text");
    clipboardData = clipboardData.replace(/[^0-9]*/g, "");
    if (clipboardData.length <= this.maxDigitCount) {
      const n = this.acceptableDigitCount;
      let regExp = new RegExp(".{1," + this.acceptableDigitCount + "}", "g");
      let splittedData = clipboardData.match(regExp);
      this.cardForm.reset();
      setTimeout(() => {
        if (splittedData !== null) {
          this.setFocus(splittedData.length - 1);
          this.cardForm.setValue({
            f1: splittedData[0] || null,
            f2: splittedData[1] || null,
            f3: splittedData[2] || null,
            f4: splittedData[3] || null,
            f5: splittedData[4] || null,
            f6: splittedData[5] || null,
            f7: splittedData[6] || null,
            f8: splittedData[7] || null,
          });
        }
      }, 100);
    } else {
      setTimeout(() => {
        this.cardForm.reset();
        alert("Invalid! Card number exceeds 16 digits. ");
      }, 100);
    }
  };
}
