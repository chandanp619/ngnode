import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {
  userData:any;
  constructor(private router:Router, private activeRoute:ActivatedRoute, private _http:HttpClient) {

    var uid = this.activeRoute.snapshot.params.id;
    this._http.get('/api/deleteUser/'+uid).subscribe((response) => {
      this.userData = response;
      if(this.userData.status == 'Success'){
        console.log(this.userData);
        this.router.navigateByUrl('/dashboard/users');
      }
    });

   }

  ngOnInit() {

    

  }

}
