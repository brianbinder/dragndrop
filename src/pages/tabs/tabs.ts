import { Component } from '@angular/core';
import { WordGraphMakerProvider } from '../../providers/wordGraphMaker';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { GeoPage } from '../geo/geo';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = GeoPage;

  constructor(private wordGraph: WordGraphMakerProvider) { }

  createWordGraph() {
    const width = window.innerWidth;
    const toolbarHeight = $('.toolbar').height();
    const tabbarHeight = $('.tabbar').height()
    const height = 0.85 * (window.innerHeight - toolbarHeight - tabbarHeight);
    this.wordGraph.makeDefault('#wordGraph', width, height);
  }
}
