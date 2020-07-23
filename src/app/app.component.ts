import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TodoService } from './providers/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Acompanhamento CPFL',
      url: '/attendance',
      icon: 'reader',
    },
    {
      title: 'To Do',
      url: '/todo',
      icon: 'checkbox',
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: TodoService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.db
        .createDatabase()
        .then(() => {
          this.splashScreen.hide();
        })
        .catch(() => {
          this.splashScreen.hide();
        });
    });
  }

  ngOnInit() {
    const path = window.location.pathname;
    if (path) {
      this.selectedIndex = this.appPages.findIndex(page => path.toLowerCase().indexOf(page.url.toLowerCase()) !== -1);
    }
  }
}
