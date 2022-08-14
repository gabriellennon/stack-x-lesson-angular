import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/users/users.service';
import { IUserData } from 'src/app/shared/models/dataUser';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = true;
  error = false;
  dataUser: IUserData[] = [];

  constructor(
    private matDialog: MatDialog,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    try {
      this.userService.getUsers('10').subscribe({
        next: res => this.dataUser = res.results,
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.error = true;
        },
        complete: () => {
          this.loading = false;
        }
      })
    } catch (error) {
        console.log(error);
    }
  }

  openModal() {
    const dialogRef = this.matDialog.open(ModalComponent,{
      minWidth: 500,
      data:{
        message: 'HelloWorld',
        buttonText: {
          cancel: 'Done'
        }
      },
    });
  }

}
