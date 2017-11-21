import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import * as d3 from 'd3';
var { spawn } = require('child_process');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app works!';
  ngOnInit() {

    const bat = spawn('cmd.exe', ['/c', 'my.bat']);

    bat.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    bat.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    bat.on('exit', (code) => {
      console.log(`Child exited with code ${code}`);
    });


    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    d3.select('body')
      .append('ul')
      .selectAll('li')
      .data(['angular', 'd3', 'c3'])
      .enter()
      .append('li')
      .text(d => d);
  }

  testData: any = [];
  @ViewChild('dynamicScales') dynamicScales: any;
  ngAfterViewInit() {
    let svg = d3.select("svg");
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = +svg.attr("width") - margin.left - margin.right;
    let height = +svg.attr("height") - margin.top - margin.bottom;
    let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let parseTime = d3.timeParse("%d-%b-%y");

    let x = d3.scaleTime()
      .rangeRound([0, width]);



    let y = d3.scaleLinear()
      .rangeRound([height, 0]);
    let line = d3.line().x(function (d) { return x(d.date); }).y(function (d) { return y(d.close); });
    d3.tsv('data.tsv', function (d) {
      d.date = parseTime(d.date); d.close = +d.close;
      return d
    }, function (error, data) {
      if (error) throw error;

      x.domain(d3.extent(data, function (d) { return d.date; }));
      y.domain(d3.extent(data, function (d) { return d.close; }));

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

      g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ");
      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line)

    })

    setInterval(() => {
      this.testData.push(Math.random() * 100);
      this.dynamicScales.updateY();
    }, 1000)

  }


}
