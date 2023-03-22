import { Component, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUserService } from 'src/app/shared/backend-user.service';
import { ErrorHandllingService } from 'src/app/shared/error-handlling.service';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css'],
})
export class EntryPageComponent {
  constructor(private userAuth:BackendUserService, private router:Router,private errorHandler: ErrorHandllingService ) {

  }
  ngOnInit() {
    
      
      try {
        const isLoged = localStorage.getItem("logedIn")
      const token = localStorage.getItem("token")
        if (!token) return
        if(!isLoged) return
        const decoded = this.userAuth.checkTokenExpiration(token) as{exp:number,   iat:number,
          id
          : string,          login
          : string}
        const currentUnixTime = Math.floor(Date.now() / 1000);
        
          if (decoded.exp > currentUnixTime) {
            localStorage.setItem('localUserId',decoded.id)
            this.userAuth.userLoggedIn();
            this.router.navigate(['/board/main']);
          } else {
            localStorage.removeItem("token")
          }
        
      
    
      } catch (error) {
        this.errorHandler.generateError(error)
        
      }
    }
}
