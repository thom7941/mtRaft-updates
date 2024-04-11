import { Component, NgZone, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Group } from '../models/group';

@Component({
  selector: 'app-groups-admin',
  templateUrl: './groups-admin.page.html',
  styleUrls: ['./groups-admin.page.scss'],
})
export class GroupsAdminPage implements OnInit {
  public eventList: Group[] = []; 
  constructor(private zone: NgZone) {}

  ngOnInit() {
    const db = getFirestore();
    const groupCollection = collection(db, 'groups');

    onSnapshot(groupCollection, (snapshot) => {
      this.zone.run(() => {
        snapshot.forEach((doc) => {
          console.log("were in admin");
          const currentGroup = doc.data();
          currentGroup['id'] = doc.id;

          let currentDescription = currentGroup['description'];
          let currentImg = currentGroup['img'];
          let currentTitle = currentGroup['title'];
          let currentId = currentGroup['id'];

          let gg = new Group(currentDescription, currentImg, currentTitle, currentId);
          this.eventList.push(gg);
        });
      });
    });
  }
}

