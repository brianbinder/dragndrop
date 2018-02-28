import { Component } from '@angular/core';
import { WordGraphMaker } from '../../services/wordGraphMaker';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private wordGraph: WordGraphMaker) { }

  createWordGraph() {
    const width = window.innerWidth;
    const toolbarHeight = $('.toolbar').height();
    const tabbarHeight = $('.tabbar').height()
    const height = 0.85 * (window.innerHeight - toolbarHeight - tabbarHeight);
    this.wordGraph.makeDefault('#wordGraph', width, height);
  }
}
