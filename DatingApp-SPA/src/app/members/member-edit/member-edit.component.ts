import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivationEnd, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

  user: User;

  @HostListener('window:beforeunload', ['$event'])
  // tslint:disable-next-line: typedef
  unloadNotification($event: any){
    if (this.editForm.dirty){
      $event.returnValue = true;
    }
  }


  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user']
    });
  }

  // tslint:disable-next-line: typedef
  updateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next =>{
      this.alertify.success('Profile Updated Successfully.');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });

  }

}