import { Component, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-teammate-card',
  templateUrl: './teammate-card.component.html',
  styleUrls: ['./teammate-card.component.css']
})
export class TeammateCardComponent {

  @Input() oneUser!:User;

}
