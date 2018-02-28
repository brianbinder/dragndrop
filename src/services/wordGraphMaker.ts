import * as d3 from 'd3';
import * as cloud from 'd3-cloud';
import { Injectable } from '@angular/core'

@Injectable()
export class WordGraphMaker {
  makeDefault(targetSelector: string, width: number, height: number): void {
    d3.select(targetSelector).html('');
    var colors = d3.schemeCategory10;
    function fill(i, vector) {
      return vector[i % vector.length];
    }

    var data = [
          {text:"Hola",              size: 10 + Math.random() * 30},
          {text:"Mundo",             size: 10 + Math.random() * 30},
          {text:"esto",              size: 10 + Math.random() * 30},
          {text:"es",                size: 10 + Math.random() * 30},
          {text:"un",                size: 10 + Math.random() * 30},
          {text:"word cloud",        size: 10 + Math.random() * 30},
          {text:"tag cloud",         size: 10 + Math.random() * 30},
          {text:"d3",                size: 10 + Math.random() * 30},
          {text:"layout-algorithm",  size: 10 + Math.random() * 30},
          {text:"gracias",           size: 10 + Math.random() * 30},
          {text:"Jason Davies",      size: 10 + Math.random() * 30},
          {text:"nube de palabras",  size: 50}
    ];
      
    var layout = cloud()
        .size([width, height])
        .words(data)     
        .padding(10)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw);

    layout.start();

    function draw(words) {
      d3.select(targetSelector).append("svg")
          .attr("width", layout.size()[0])
          .attr("height", layout.size()[1])
        .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", function(d: any) { return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i,colors); })
          .attr("text-anchor", "middle")
          .attr("transform", function(d: any) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d: any) { return d.text; });
    }
  }
}
