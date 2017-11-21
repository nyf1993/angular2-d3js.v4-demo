import { Component, OnInit, Input } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-dynamic-scales',
  templateUrl: './dynamic-scales.component.html',
  styleUrls: ['./dynamic-scales.component.css']
})
export class DynamicScalesComponent implements OnInit {

  constructor() { }

  private svg: any;
  private width: any;
  private height: any;

  ngOnInit() {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    this.svg = d3.select("#line")
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    let width = +this.svg.attr("width") - margin.left - margin.right;
    let height = +this.svg.attr("height") - margin.top - margin.bottom;
    this.width = width;
    this.height = height;

    let g = this.svg.append("g").attr("transform", "translate( 50,20)");

 
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "x")

    g.append("g")
      .attr("class", "y")

    g.append("path")
      .attr("class", "path");

  }


  removeLine() {
    this.svg.select("g").remove()
  }



  @Input() data: any;
  updateY() {
    let data = this.data;
    // var data = [1, 2, 3, 4, 5, 6, 7]

    // var scale_y = d3.scaleLinear()
    //   .domain([0, 10])
    //   .range([463, 0])

    var scale_x = d3.scaleLinear()
      .domain([0, data.length - 1]) //输入范围(定义域),横坐标显示有几个数据则为几个数  
      .range([0, this.width])
      
    var scale_y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([this.height, 0])

    d3.select(".x")
      .transition()
      .duration(1000)
      .call(d3.axisBottom(scale_x));

    d3.select(".y")
      .transition()
      .duration(1000)
      .call(d3.axisLeft(scale_y));

    //绘制曲线  
    var line_generator = d3.line()
      .x(function (d, i) {
        return scale_x(i);
      })
      .y(function (d) {
        return scale_y(d);
      });
    console.log(line_generator)
    d3.select(".path")
      .datum(data)
      .transition()
      .duration(1000)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line_generator);
  }

}
