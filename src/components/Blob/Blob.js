import React, { Component } from "react";
import { select } from "d3-selection";
import { forceSimulation, forceManyBody, forceX, forceY } from "d3-force";

export default class Blob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasHeight: 300,
            canvasWidth: 300,
            executeBlobLoad: null,
            totalCount: 0,
            circleRadius: 6,
            space: 10,
            charge: -10,
            counterDuration: 4300,
            xInitCircle: [],
            yInitCircle: [],
            runOnce: true,
            defaultColor: "#808080",
            dataColor: "#a42828",
        };
    }

    generateInitialViz = () => {
        var svg = select(".svg-blob-canvas");
        svg.selectAll("text").remove();

        /*
        var format = d3.format(",d");
        d3.select("#counter-label")
        .transition()
        .duration(this.state.counterDuration)
            .tween("text", function () {
                var that = d3.select(this),
                    i = d3.interpolateNumber(that.text().replace(/,/g, ""), totalCount);
                return function (t) { that.text(format(i(t))); };
            });
        */
        var nodes = [];
        var counter = 0;

        
        var simulation = forceSimulation(nodes)
                            .force("charge", forceManyBody().strength([this.state.charge]))
                            .force("x", forceX())
                            .force("y", forceY())
                            .on("tick", ticked);
        
        function ticked() {
            counter++;
            svg.selectAll("circle")
                .attr("cx", function(d) {  return this.state.canvasWidth / 2 + d.x; })
                .attr("cy", function(d) {  return this.state.canvasHeight / 2 + d.y; })
                .attr("fill", this.state.defaultColor);
            /*
            if (counter > datasets["total"].length - 100) {
                $('#blob-explanation h5').fadeTo(250, 1);
            }*/
            if (counter > 10) {//datasets["total"].length) { 
                // view is done loading
                // show the navigation buttons
                simulation.stop();
                

                svg.selectAll("circle")
                   .transition()
                   .attr("fill", function(d, i) {
                        if (i >= 359 ) {
                            return "#EF3B2C";
                        } else {
                            return this.state.defaultColor;
                        }
                   })

                // get circles' coordinates
                svg.selectAll("circle")
                    .attr("cx", function(d, i) { 
                        this.state.xInitCircle[i] = this.state.canvasWidth / 2 + d.x; 
                        return this.state.canvasWidth / 2 + d.x; 
                    })
                    .attr("cy", function(d, i) { 
                        this.state.yInitCircle[i] = this.state.canvasHeight / 2 + d.y; 
                        return this.state.canvasHeight / 2 + d.y; });

            }
        }
        
        var interval = setInterval(function () {
            var d = {
                x: 2 * Math.random() - 1,
                y: 2 * Math.random() - 1
            }; 

            svg.append("circle")
                .data([d])
                .attr("r", 1e-6)
                .transition()
                .ease(Math.sqrt)
                .attr("r", this.state.circleRadius)
                .attr("fill", this.state.dataColor);
                
            if (nodes.push(d) >= 10) {//datasets["total"].length) {
                clearInterval(interval);
            };

            // Rebind nodes and reset speed
            simulation.nodes(nodes);
            simulation.alpha(1);
        }, 10);
    };

    render() {

        
        return (
            <div className="slide blob">
                <div className="blob-header">
                    <div id="canvas-wrapper">
                        <div id="counter-header">
                            In (year), (number of outages) happened due to (reason).
                        </div>
                        <div id="circle-unit">
                        <h5>Each </h5>
                        <svg width="12" height="12"><circle r="6" cx="6" cy="6" fill="#808080"></circle></svg>
                        <h5> represents 100 people effected</h5>
                        </div>
                        <div id="blob-canvas">
                        <svg className="svg-blob-canvas"></svg>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}
