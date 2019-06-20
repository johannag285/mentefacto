import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  title = 'D3 Barchart with Ionic 4';
  width: number;
  height: number;
  margin = { top: 20, right: 120, bottom: 20, left: 120 };
  x: any;
  y: any;
  svg: any;
  g: any;


  i = 0;
  duration = 750;
  rectW = 60;
  rectH = 30;
  zm: any;
  redraw: any;
  root = {
    "name": "flare",
    "children": [{
      "name": "analytics",
      "children": [{
        "name": "cluster",
        "children": [{
          "name": "AgglomerativeCluster",
          "size": 3938
        }]
      }]

    }]
  };



  collapse: any;
  tree: any;
  nodes: any;
  links: any;

  constructor(private dragulaService: DragulaService, private toastController: ToastController) {
    this.dragulaService.drag('bag')
      .subscribe(({ name, el, source }) => {
        el.setAttribute('color', 'danger');
      });

    this.width = 960 - this.margin.right - this.margin.left;
    this.height = 800 - this.margin.top - this.margin.bottom;
/*

    this.tree = d3.layout.tree().nodeSize([70, 40]);
    var diagonal = d3.svg.diagonal()
      .projection(function (d) {
        return [d.x + this.rectW / 2, d.y + this.rectH / 2];
      });

    this.svg = d3.select("#body").append("svg").attr("width", 1000).attr("height", 1000)
      .call(this.zm = d3.behavior.zoom().scaleExtent([1, 3]).on("zoom", this.redraw)).append("g")
      .attr("transform", "translate(" + 350 + "," + 20 + ")");

    //necessary so that zoom knows where to zoom and unzoom from
    this.zm.translate([350, 20]);

    //this.root = 0;
    //this.root = this.height / 2;

    d3.select("#body").style("height", "800px");



    // Update the nodes…
    var node = this.svg.selectAll("g.node")
      .data(this.nodes, function (d) {
        return d.id || (d.id = ++this.i);
      });
*/


  }

  ngOnInit() { }

  q1 = [
    { value: 'Buy Milk', color: 'primary' },
    { value: 'Write new Post', color: 'primary' }
  ];
  q2 = [
    { value: 'Schedule newsletter', color: 'secondary' },
    { value: 'Find new Ionic Academy topics', color: 'secondary' }
  ];
  q3 = [
    { value: 'Improve page performance', color: 'tertiary' },
    { value: 'Clean the house', color: 'tertiary' }
  ];
  q4 = [
    { value: 'Unimportant things', color: 'warning' },
    { value: 'Watch Netflix', color: 'warning' }
  ];

  todo = { value: '', color: '' };
  selectedQuadrant = 'q1';

  addTodo() {
    switch (this.selectedQuadrant) {
      case 'q1':
        this.todo.color = 'primary';
        break;
      case 'q2':
        this.todo.color = 'secondary';
        break;
      case 'q3':
        this.todo.color = 'tertiary';
        break;
      case 'q4':
        this.todo.color = 'warning';
        break;
    }
    this[this.selectedQuadrant].push(this.todo);
    this.todo = { value: '', color: '' };
  }




  colllapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(this.collapse);
      d.children = null;
    }
  }


  update(source) {

    // Compute the new tree layout.
    this.nodes = this.tree.nodes(this.root).reverse(),
      this.links = this.tree.links(this.nodes);

    // Normalize for fixed-depth.
    this.nodes.forEach(function (d) {
      d.y = d.depth * 180;
    });

  }

  updateRoot() {
    this.root.children.forEach(this.collapse);
    // update(this.root);
  }


  updateNodes() {
    // Update the nodes…
    var node = this.svg.selectAll("g.node")
      .data(this.nodes, function (d) {
        return d.id || (d.id = ++this.i);
      });
  }


  // Toggle children on click.
  click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    //update(d);
  }

  //Redraw for zoom
  redraww() {
    //console.log("here", d3.event.translate, d3.event.scale);
    this.svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
  }

}
