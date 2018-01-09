import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role, PrivilegeUdt } from '../../model/role.model';

@Component({
    moduleId: module.id,
    selector: 'generic-modal',
    templateUrl: 'generic-modal.component.html',
    styleUrls: ['generic-modal.component.scss']
})
export class GenericModalComponent {

  constructor(private dialogRef: MatDialogRef<GenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {}

    message: any;
    subject: any;
    isAllowed: boolean;

  ngOnInit() {
    this.message = this.data.message;
    this.subject = this.data.subject;
    this.isAllowed = this.data.isAllowed;
  }
}
