import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-help',
  templateUrl: './registration-help.component.html',
  styleUrls: ['./registration-help.component.scss']
})
export class RegistrationHelpComponent implements OnInit {
  public data: Array<Object> = [];
  constructor() { }

  ngOnInit() {
    this.data = this.getMockHelp();
  }

  public getMockHelp(): Array<Object> {
    return [
      {
        title: 'Need help?',
        icon: 'fa fa-question-circle',
        description: 'Vestibulum eu odio. Fusce fermentum. Morbi nec metus.'
      },
      {
        title: 'Why register?',
        icon: 'fa fa-heartbeat',
        description: 'Vestibulum eu odio. Fusce fermentum. Morbi nec metus.'
      },
      {
        title: 'What people are saying...',
        icon: 'fa fa-smile-o',
        description: 'Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.'
      }
    ];
  }
}
