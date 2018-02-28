import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';
import { Injectable } from '@angular/core'


//Tutorial found at:
//https://medium.freecodecamp.org/d3-and-canvas-in-3-steps-8505c8b27444


const colorToNode = {};
let nextCol = 1;
function genColor(){ 
  
  var ret = [];
  if(nextCol < 16777215){ 
    
    ret.push(nextCol & 0xff); // R 
    ret.push((nextCol & 0xff00) >> 8); // G 
    ret.push((nextCol & 0xff0000) >> 16); // B
    nextCol += 1; 
    
    }
  var col = "rgb(" + ret.join(',') + ")";
  return col;
}

@Injectable()
export class Grid {
  private mainCanvas;
  private hiddenCanvas;
  private context;
  private customBase;
  private custom;
  private width;
  private height;

  private size(): void {
    this.width = window.innerWidth;
    const toolbarHeight = $('.toolbar').height();
    const tabbarHeight = $('.tabbar').height()
    this.height = 0.85 * (window.innerHeight - toolbarHeight - tabbarHeight);
  }

  private dataBind(data: any[]) {
    const groupSpacing = 4;
    const cellSpacing = 2;
    const offsetTop = this.height / 5;
    const cellSize = Math.floor((this.width - 11) / 100) - cellSpacing;
    const colorScale = d3.scaleSequential(d3Chromatic.interpolateSpectral)
      .domain(d3.extent(data, d => d.value));

    const join = this.custom.selectAll('custom.rect')
      .data(data);

    const enterSel = join.enter()
      .append('custom')
      .attr('class', 'rect')
      .attr('x', (d, i) => {
        let x0 = Math.floor(i / 100) % 10;
        let x1 = Math.floor(i % 10);
        return groupSpacing * x0 + (cellSpacing + cellSize) * (x1 + x0 * 10);
      })
      .attr('y', (d, i) => {
        let y0 = Math.floor(i / 1000);
        let y1 = Math.floor(i % 100 / 10);
        return groupSpacing * y0 + (cellSpacing + cellSize) * (y1 + y0 * 10);
      })
      .attr('width', 0)
      .attr('height', 0);

    join.merge(enterSel)
      .transition()
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('fillStyle', d => colorScale(d.value))
      .attr('fillStyleHidden', function(d) {
        if (!d.hiddenCol) {
          d.hiddenCol = genColor();
          colorToNode[d.hiddenCol] = d;
        }
        return d.hiddenCol;
      })

    const exitSel = join.exit()
      .transition()
      .attr('width', 0)
      .attr('height', 0)
      .remove();
  }

  private draw(canvas, hidden) {
    //clear the mainCanvas
    const context = canvas.node().getContext('2d');
    context.clearRect(0, 0, this.width, this.height) 

    //Draw the individual elements
    //grab all elements bound to data in the databind function
    const elements = this.custom.selectAll('custom.rect');
    elements.each(function(d, i) {
      //for each virtual/custom element we will:
      const node = d3.select(this); //we can use context in the d3.each callback
      //retrieve the stored color from the custom element
      context.fillStyle = hidden ? node.attr('fillStyleHidden') : node.attr('fillStyle'); 
      //retrieve the custom element position and apply it to the fillRect
      context.fillRect(node.attr('x'), node.attr('y'), node.attr('width'), node.attr('height'));
    });

  }

  make() {
    this.customBase = document.createElement('custom');
    this.custom = d3.select(this.customBase);
    this.size();
    this.mainCanvas = d3.select('#canvasContainer')
      .append('canvas')
      .classed('mainCanvas', true)
      .attr('width', this.width)
      .attr('height', this.height);

    //add .hiddenCanvas { display: none: } to SCSS file in order to hide the shadow canvas
    this.hiddenCanvas = d3.select('#canvasContainer')
      .append('canvas')
      .classed('hiddenCanvas', true)
      .attr('width', this.width)
      .attr('height', this.height);

    

    let data = [];
    d3.range(8000).forEach((value) => {
      data.push({ value });
    });

    this.dataBind(data);

    var t = d3.timer(elapsed => {
      this.draw(this.mainCanvas, false);
      if (elapsed > 300) t.stop();
    });
    const that = this;

    //Our listener
    //Add touch detection here!!!!!!!
    d3.select('.mainCanvas').on('mousemove', function() {
      that.draw(that.hiddenCanvas, true); //Draw the hidden canvas
      const mouseX = d3.event.layerX || d3.event.offsetX;
      const mouseY = d3.event.layerY || d3.event.offsetY;

      const hiddenCtx = that.hiddenCanvas.node().getContext('2d');
      const col = hiddenCtx.getImageData(mouseX, mouseY, 1, 1).data;
      const colKey = `rgb(${col[0]},${col[1]},${col[2]})`;
      const nodeData = colorToNode[colKey];

      if (nodeData) {
        d3.select('#tooltip')
          .style('opacity', 0.8)
          .style('top', d3.event.pageY + 5 + 'px')
          .style('left', d3.event.pageX + 5 + 'px')
          .html(nodeData.value);
      } else {
        //hide the tooltip when no nodeData is found
        d3.select('#tooltip').style('opacity', 0);
      }
    });
  }
}












