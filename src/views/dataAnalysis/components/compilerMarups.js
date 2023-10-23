export const preMarkup = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Monthly Rainfall Line Chart</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    /* Add any CSS styling here */
    #chart{
      height: 90vh;
      width: 100%;
    }
  </style>
</head>

<body>
  <div id="d3-container"></div>
  <canvas id="chart"></canvas>
  <script>
`;
export const postMarkup = "</script></body></html>";
export const testMarkup = `
<html>

<head>
    <meta charset="utf-8">
    <!-- Include NVD3 CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.6/nv.d3.min.css" />

    <!-- Include D3.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.min.js"></script>
    <script defer>
        // fish eye  
        (function () {
            d3.fisheye = {
                scale: function (scaleType) {
                    return d3_fisheye_scale(scaleType(), 3, 0);
                },
                circular: function () {
                    var radius = 200,
                        distortion = 2,
                        k0,
                        k1,
                        focus = [0, 0];

                    function fisheye(d) {
                        var dx = d.x - focus[0],
                            dy = d.y - focus[1],
                            dd = Math.sqrt(dx * dx + dy * dy);
                        if (!dd || dd >= radius) return { x: d.x, y: d.y, z: 1 };
                        var k = k0 * (1 - Math.exp(-dd * k1)) / dd * .75 + .25;
                        return { x: focus[0] + dx * k, y: focus[1] + dy * k, z: Math.min(k, 10) };
                    }

                    function rescale() {
                        k0 = Math.exp(distortion);
                        k0 = k0 / (k0 - 1) * radius;
                        k1 = distortion / radius;
                        return fisheye;
                    }

                    fisheye.radius = function (_) {
                        if (!arguments.length) return radius;
                        radius = +_;
                        return rescale();
                    };

                    fisheye.distortion = function (_) {
                        if (!arguments.length) return distortion;
                        distortion = +_;
                        return rescale();
                    };

                    fisheye.focus = function (_) {
                        if (!arguments.length) return focus;
                        focus = _;
                        return fisheye;
                    };

                    return rescale();
                }
            };

            function d3_fisheye_scale(scale, d, a) {

                function fisheye(_) {
                    var x = scale(_),
                        left = x < a,
                        v,
                        range = d3.extent(scale.range()),
                        min = range[0],
                        max = range[1],
                        m = left ? a - min : max - a;
                    if (m == 0) m = max - min;
                    return (left ? -1 : 1) * m * (d + 1) / (d + (m / Math.abs(x - a))) + a;
                }

                fisheye.distortion = function (_) {
                    if (!arguments.length) return d;
                    d = +_;
                    return fisheye;
                };

                fisheye.focus = function (_) {
                    if (!arguments.length) return a;
                    a = +_;
                    return fisheye;
                };

                fisheye.copy = function () {
                    return d3_fisheye_scale(scale.copy(), d, a);
                };

                fisheye.nice = scale.nice;
                fisheye.ticks = scale.ticks;
                fisheye.tickFormat = scale.tickFormat;
                return d3.rebind(fisheye, scale, "domain", "range");
            }
        })();
    </script>

    <!-- Include NVD3 JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.6/nv.d3.min.js"></script>


</head>

<body>
    <style>
        #chart svg {
            height: 400px;
            display: block;
            width:100%
        }
    </style>


    <div id="chart">
        <svg>
        </svg>
    </div>
    <script defer>
    const dataset = [
        {
          product: "Widget A",
          revenue: 1000,
          unitsSold: 50,
          date: "2023-10-01",
        },
        {
          product: "Widget B",
          revenue: 750,
          unitsSold: 30,
          date: "2023-10-01",
        },
        {
          product: "Widget A",
          revenue: 1200,
          unitsSold: 60,
          date: "2023-10-02",
        },
        {
          product: "Widget B",
          revenue: 800,
          unitsSold: 35,
          date: "2023-10-02",
        },
        {
          product: "Widget C",
          revenue: 500,
          unitsSold: 25,
          date: "2023-10-03",
        },
      ];
    // Process the dataset for nvd3 chart library
function processData() {
  // Extract the required fields from the dataset
  const processedData = dataset.map(item => ({
    date: new Date(item.date),
    revenue: item.revenue,
    unitsSold: item.unitsSold
  }));

  // Sort the data by date in ascending order
  processedData.sort((a, b) => a.date - b.date);

  return processedData;
}

// Render a line chart using nvd3 library
function renderLineChart() {
  // Prepare the data for the chart
  const data = processData();

  // Create the chart
  nv.addGraph(function() {
    const chart = nv.models.lineChart();

    // Set the chart options
    chart.xAxis
      .axisLabel('Date')
      .tickFormat(function(d) {
        return d3.time.format('%Y-%m-%d')(new Date(d));
      });

    chart.yAxis.axisLabel('Revenue / Units Sold');

    // Bind the data to the chart
    d3.select('#chart svg')
      .datum(data)
      .transition()
      .duration(500)
      .call(chart);

    // Update the chart when window resizes
    nv.utils.windowResize(chart.update);

    return chart;
  });
}

// Call the function to render the line chart
renderLineChart();

    </script>
</body>

</html>
`;
