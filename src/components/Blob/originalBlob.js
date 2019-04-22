var BLOB_CANVAS_HEIGHT;
var BLOB_CANVAS_WIDTH;
var executeBlobLoad;

(function(){
    // Generic global fields
    var datasets = {
        "total": null
    }

    // Canvas object and dimensions
    var svg;

    // ALWAYS SET THIS TO FALSE BEFORE COMMITTING
    var DEBUG = false;

    // Total data fields
    var totalCount = 0;

    // Fields for circle svg
    var CIRCLE_RADIUS = 6;
    var SPACE_BETWEEN_CIRCLE_INITIAL = 10;

    // more negative is more force -> bigger space between circle
    var CHARGE_BETWEEN_CIRCLES = -10;

    // animation delays, duration, timings:
    var COUNTER_DURATION = 4300;

    var xInitCircle = [];
    var yInitCircle = [];

    // Styles
    var RED_COLOR = "#a42828";
    var BLACK_COLOR = "#808080";

    var RUN_ONCE = true;

    executeBlobLoad = function() {
        if (RUN_ONCE) {
            loadInitialData("prototype/15_total_gun_deaths_100.csv");
            RUN_ONCE = false;
        }
    }

    var loadInitialData = function (filePath) {
        d3.csv("../datasets/" + filePath, function(error, data) {
            if (error) {
                console.log(errors);
            } 
            datasets["total"] = data;
            for(var i = 0; i < data.length; i++){
                totalCount += parseInt(data[i]["count"]);
            }
            generateInitialViz();
        });
    };

    // Initial visualization, WIP
    var generateInitialViz = function() {
        svg = d3.select(".svg-blob-canvas");
        svg.selectAll("text").remove();

        var format = d3.format(",d");
        d3.select("#counter-label")
            .transition()
        .duration(COUNTER_DURATION)
            .tween("text", function () {
                var that = d3.select(this),
                    i = d3.interpolateNumber(that.text().replace(/,/g, ""), totalCount);
                return function (t) { that.text(format(i(t))); };
            });
            
        if (DEBUG) {
            svg.selectAll("circle")
                .data(datasets["total"])
                .enter()
                .append("circle")
                .attr("cx", function(d, i) {
                    return phyllotaxisX(SPACE_BETWEEN_CIRCLE_INITIAL, i);
                })
                .attr("cy", function(d, i) {
                    return phyllotaxisY(SPACE_BETWEEN_CIRCLE_INITIAL, i);
                })
                .attr("r", CIRCLE_RADIUS);
            return;
        }

        var nodes = [];
        var counter = 0;

        
        var simulation = d3.forceSimulation(nodes)
                            .force("charge", d3.forceManyBody().strength([CHARGE_BETWEEN_CIRCLES]))
                            .force("x", d3.forceX())
                            .force("y", d3.forceY())
                            .on("tick", ticked);
        
        function ticked() {
            counter++;
            svg.selectAll("circle")
                .attr("cx", function(d) {  return BLOB_CANVAS_WIDTH / 2 + d.x; })
                .attr("cy", function(d) {  return BLOB_CANVAS_HEIGHT / 2 + d.y; })
                .attr("fill", BLACK_COLOR);
            
            if (counter > datasets["total"].length - 100) {
                $('#blob-explanation h5').fadeTo(250, 1);
            }
            if (counter > datasets["total"].length) { 
                // view is done loading
                // show the navigation buttons
                simulation.stop();
                

                svg.selectAll("circle")
                   .transition()
                   .attr("fill", function(d, i) {
                        if (i >= 359 ) {
                            return "#EF3B2C";
                        } else {
                            return BLACK_COLOR;
                        }
                   })

                // get circles' coordinates
                svg.selectAll("circle")
                    .attr("cx", function(d, i) { 
                        xInitCircle[i] = BLOB_CANVAS_WIDTH / 2 + d.x; 
                        return BLOB_CANVAS_WIDTH / 2 + d.x; 
                    })
                    .attr("cy", function(d, i) { 
                        yInitCircle[i] = BLOB_CANVAS_HEIGHT / 2 + d.y; 
                        return BLOB_CANVAS_HEIGHT / 2 + d.y; });

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
                .attr("r", CIRCLE_RADIUS)
                .attr("fill", RED_COLOR);
                
            if (nodes.push(d) >= datasets["total"].length) {
                clearInterval(interval);
            };

            // Rebind nodes and reset speed
            simulation.nodes(nodes);
            simulation.alpha(1);
        }, 10);
    };
})();

/* blob html
<div class="slide blob">
    <div class="blob-header">
        <div id="canvas-wrapper">
            <div id="counter-header">
                In 2015, <span id="counter-label">0</span>Americans died from gun related injuries
            </div>
            <div id="circle-unit">
            <h5>Each</h5>
            <svg width="12" height="12"><circle r="6" cx="6" cy="6" fill="#808080"></circle></svg>
            <h5>represents 100 deaths</h5>
            </div>
            <div id="blob-canvas">
            <svg class="svg-blob-canvas"></svg>
            </div>
            <div id="blob-explanation">
            <h5>Out of the 36,252 deaths caused by gun-violence, <span style="color:#EF3B2C">334</span> of these deaths occured in a mass shooting.</h2>
            </div>
        </div>
    </div>
    <div class="scroll-down"><span></span>Scroll</div>
</div> 
*/
/* blob css
  #counter-label {
    color: #a42828;
  }
  
  .blob-header h5, #blob-legend {
    display: inline;
  }
  
  .blob-header {
    margin-bottom: 90px;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .svg-blob-canvas {
    width: 100%;
    height: 60vh;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  
  #counter-header {
    font-size: 2em;
    text-align: center;
  }
  
  #counter-label {
    font-size: 3em;
    width: 111px;
    margin: 0;
  }
  
  #blob-explanation {
    font-size: 1.3em;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  
  #blob-explanation>h5 {
    opacity: 0;
  }
*/