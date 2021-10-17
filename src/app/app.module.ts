import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule  } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListeningWeekComponent } from './listening-week/listening-week.component';
import { HeaderComponent } from './header/header.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { TopComponent } from './top/top.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { DiscoveriesComponent } from './discoveries/discoveries.component';
import { TopCardComponent } from './top-card/top-card.component';
import { NextCardComponent } from './next-card/next-card.component';
import { SectionTitleComponent } from './section-title/section-title.component';
import { HighlightsCardComponent } from './highlights-card/highlights-card.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeningWeekComponent,
    HeaderComponent,
    BarChartComponent,
    TopComponent,
    HighlightsComponent,
    DiscoveriesComponent,
    TopCardComponent,
    NextCardComponent,
    SectionTitleComponent,
    HighlightsCardComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
