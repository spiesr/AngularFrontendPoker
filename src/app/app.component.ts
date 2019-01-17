import { Component, ViewEncapsulation } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Hand } from './hand';
import { Message } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public constructor(private http: HttpClient) {}

  title = 'Frontend for Poker App';

  // A set of three objects for the player hands
  hand1: Hand = {
    player: 'Robert',
    cards: ['7H','3S','7C','7S','6D']
  };
  hand2: Hand = {
    player: 'John',
    cards: ['3C','4C','5C','6C','7C']
  };
  hand3: Hand = {
    player: 'Jane',
    cards: ['AS','5H','6S','6D','TS']
  };

  // The JSON object to submit
  submissions: Hand[] = [this.hand1, this.hand2, this.hand3];
  submission: any = {
    hands: this.submissions
  };

  // HTTP Service
  url: string = 'https://cors-anywhere.herokuapp.com/http://mycoolapi-env.diup3pmcgh.us-east-1.elasticbeanstalk.com/api/winner';

  // A result space to store the JSON response body
  result: Message;
  response: string = "Nobody yet";

  // Function to invoke the HTTP service and get the winner
  submit() {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
	'Accept': 'application/json'
      })
    };
    this.http.post<Message>(this.url, this.submission, options)
      .subscribe((data: Message) => {
	this.result = { ...data };
	this.response = this.result.message;
      }); 
  }
}
