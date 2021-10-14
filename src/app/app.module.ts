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

@NgModule({
  declarations: [
    AppComponent,
    ListeningWeekComponent,
    HeaderComponent,
    BarChartComponent,
    TopComponent,
    HighlightsComponent,
    DiscoveriesComponent
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
