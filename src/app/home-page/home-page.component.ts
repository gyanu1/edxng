import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Data} from '../../models/data.model';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
   data: Observable<Data>;

  constructor(private http: HttpClient ) {
    this.data = this.http.get<Data>('../../assets/barData.json');
  }

  ngOnInit() {
 
  }
  
  ngAfterContentInit(){
    let data = [{x:100, y: 100},
      {x:200, y: 200},
    {x: 300, y:300}];
    const circle = d3.select('.piechart').append('svg')
    .attr('width', '400').attr('height','400');
    
    circle.selectAll('circle').data(data).enter().append('circle')
    .attr("cx", function(d:any){return d.x})
    .attr("cy", function(d:any){ return d.y}) 
    .attr("r", 40);
  }
}
