import { Component, NgZone, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.page.html',
  styleUrls: ['./groups-page.page.scss'],
})

export class GroupsPagePage implements OnInit {
  public eventList: Group[] = []; 
  constructor(private zone: NgZone) {}

  ngOnInit() {
    const db = getFirestore();
    const groupCollection = collection(db, 'groups');

    onSnapshot(groupCollection, (snapshot) => {
      this.zone.run(() => {
        
        snapshot.forEach((doc) => {
          let desc = doc.data()['description'];
          let gimg = doc.data()['img'];
          let tit = doc.data()['title'];
  
          let gg = new Group(desc,gimg,tit);
          this.eventList.push(gg);
        });
      });
      // console.log(this.eventList);
    });
  }
}

class Group {
  // originally an interface but had trouble with firebase doc methods
  // i needed to manually add each group in database to eventlist
  
  description: string;
  img: string;
  title: string;
  // participants: number;

  constructor(description: string, img: string, title: string) {
    this.description = description;
    this.img = img;
    this.title = title;
  }


}
