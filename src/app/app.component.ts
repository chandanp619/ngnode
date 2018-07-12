import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular6 Application';
  articles;
  constructor( private _http: HttpClient ) {

    this._http.get ('https://www.e-arc.com/wp-json/wp/v2/posts').subscribe( res => {
      const mapped = Object.keys(res).map(key => ({type: key, value: res[key]}));
  // console.log(mapped);
      this.articles = mapped;
      console.log(this.articles);
    } );
  }
}
