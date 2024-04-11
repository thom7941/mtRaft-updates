import { Component, NgZone, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Group } from '../models/group';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.page.html',
  styleUrls: ['./groups-page.page.scss'],
})

export class GroupsPagePage implements OnInit {
  public eventList: Group[] = []; 
  public eventListHalf1: Group[] = [];
  public eventListHalf2: Group[] = [];

  constructor(private zone: NgZone) {}

  ngOnInit() {


    const db = getFirestore();
    const groupCollection = collection(db, 'groups');

    const view = document.getElementById("list-view");
    if(view) {
      // view.click(); -- doesnt work

      // view.click;   -- doesnt work

      // view.addEventListener("click", () => {
      //   console.log(view);
      //   console.log("hi");
      // }); -- performs action after button is clicked
    }
    
    onSnapshot(groupCollection, (snapshot) => {
      this.zone.run(() => {
        snapshot.forEach((doc) => {
          const currentGroup = doc.data();
          currentGroup['id'] = doc.id;

          let currentDescription = currentGroup['description'];
          let currentImg = currentGroup['img'];
          let currentTitle = currentGroup['title'];
          let currentId = currentGroup['id'];


          let gg = new Group(currentDescription, currentImg, currentTitle, currentId);
          // need to check for duplicates
          this.eventList.push(gg);

          // for grid view
          if(this.eventList.length % 2 == 0) {
            this.eventListHalf2.push(gg);
          } else {
            this.eventListHalf1.push(gg);
          }
        });
      });
    });
  }
}


// class Group {
//   // originally an interface but had trouble with firebase doc methods
//   // i needed to manually add each group in database to eventlist
  
//   description: string;
//   img: string;
//   title: string;
//   // participants: number;

//   constructor(description: string, img: string, title: string) {
//     this.description = description;
//     this.img = img;
//     this.title = title;
//   }


// }
