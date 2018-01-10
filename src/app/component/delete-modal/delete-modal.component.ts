import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role, PrivilegeUdt } from '../../model/role.model';

@Component({
    moduleId: module.id,
    selector: 'delete-modal',
    templateUrl: 'delete-modal.component.html',
    styleUrls: ['delete-modal.component.scss']
})
export class DeleteModalComponent {

  constructor(private dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {}

    entity: string;
    message: string;

  ngOnInit() {
    this.entity = this.data.entity;
    this.message = this.data.message;
  }
}
