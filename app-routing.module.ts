import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'events',
    loadChildren: () => import('./events-page/events-page.module').then( m => m.EventsPagePageModule)
  },
  {
    path: 'resources',
    loadChildren: () => import('./resources-page/resources-page.module').then( m => m.ResourcesPagePageModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups-page/groups-page.module').then( m => m.GroupsPagePageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./chats-page/chats-page.module').then( m => m.ChatsPagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
