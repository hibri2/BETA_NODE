import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";

@Component({
  selector: 'VMS-index-dropdown',
  templateUrl: './index-dropdown.component.html',
  styleUrls: ['./index-dropdown.component.css']
})
export class IndexDropdownComponent implements AfterViewInit {
  dropdownPopoverShow = false;
  
  constructor(btnDropdownRef: ElementRef, popoverDropdownRef: ElementRef) {
    this.btnDropdownRef = btnDropdownRef;
    this.popoverDropdownRef = popoverDropdownRef
   }

  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef;
  @ViewChild("popoverDropdownRef", { static: false }) popoverDropdownRef;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event: any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
}