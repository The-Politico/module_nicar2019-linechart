![POLITICO](https://www.politico.com/interactives/cdn/images/badge.svg)

# module-nicar2019-chart

A reusable chart module made with ❤️.

![](preview.png)

### Install
```bash
$ yarn add git+ssh://git@github.com:The-Politico/module-nicar2019-chart
```

### Use

##### In the browser

Include any dependencies, your stylesheet and the minified bundle, which defines a global chart object, `ModuleNicar2019Chart`.

```html
<!-- head -->
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="chart.min.js"></script>
<link rel="stylesheet" type="text/css" href="styles.css">

<!-- body -->
<div id="ModuleNicar2019Chart-container"></div>

<script type="text/javascript">
var myChart = new ModuleNicar2019Chart();

myChart
  .selection('#ModuleNicar2019Chart-container')
  .data(data)
  .draw();
</script>
```
##### As a module

To use as a module, simply import the chart object:
```javascript
import ModuleNicar2019Chart from 'module-nicar2019-chart';
```


```javascript
const myChart = new ModuleNicar2019Chart();

// To create your chart, pass a selector string to the chart's selection method,
// as well as any props or data to their respective methods. Then call draw.
myChart
  .selection('#chart')
  .data([1, 2, 3])
  .props({ stroke: 'orange' })
  .draw();

// You can call any method again to update the chart.
myChart
  .data([3, 4, 5])
  .draw();

// Or just call the draw function alone, which is useful for resizing the chart.
myChart.draw();
```

To apply this chart's default styles when using SCSS, simply define the variable `$ModuleNicar2019Chart-container` to represent the ID or class of the chart's container(s) and import the `_chart.scss` partial.

```CSS
$ModuleNicar2019Chart-container: '#chart';

@import '~module-nicar2019-chart/src/scss/chart';
```


### Developing the chart

Start developing:
```bash
$ yarn start
```

Build for production:
```bash
$ yarn build
```

Read [DEVELOPING](DEVELOPING.md) for more information on using this chart module pattern.
