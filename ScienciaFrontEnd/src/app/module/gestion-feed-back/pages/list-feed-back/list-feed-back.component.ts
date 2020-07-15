import { FeedBackService } from './../../services/feed-back.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FeedBack } from './../../../../model/feed-back';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-feed-back',
  templateUrl: './list-feed-back.component.html',
  styleUrls: ['./list-feed-back.component.scss']
})
export class ListFeedBackComponent implements OnInit {

 
  timeStamp = (new Date()).getTime();


  feedBacks: FeedBack[];
  searchText = "";


  

  constructor(private titleService: Title, private router: Router, private feedBackService: FeedBackService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gestion de FeedBack - Sciencia");
    this.getAllFeedBack();
  }


  async getAllFeedBack() {
    await this.feedBackService.getAll().subscribe((data: FeedBack[]) => {
      console.log("All FeedBacks", data);
      this.feedBacks = data;
    });
  }



  public getLinkPicture(imagename) {
    if (this.timeStamp) {
      return "http://localhost:3000/image_user/" + imagename + '?' + this.timeStamp;
    }
    return "http://localhost:3000/image_user/" + imagename;
  }
  changeSource(event) {
    event.target.src = "../../../../../assets/profile photo.png";
  }
}
