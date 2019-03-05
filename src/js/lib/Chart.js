import d3 from './utils/d3';
import ChartComponent from './base/ChartComponent';
import unemployment from './data/data.json';

class ModuleNicar2019Chart extends ChartComponent {
  defaultProps = {
    filterState: 'Illinois',
  }

  draw() {
    const props = this.props();
    let stateData = unemployment.filter(a => a.State === 'National')[0];
    if (props.filterState !== null) {
      stateData = unemployment.filter(a => a.State === props.filterState)[0];
    }

    const node = this.selection().node();
    const { width } = node.getBoundingClientRect();
    const height = 400;

    const str = props.filterState === null ? 'the United States' : stateData.State;
    this.selection().appendSelect('h2', 'state-name')
      .html('Unemployment in ' + str);

    const lineData = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const years = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

    months.map(month => {
      years.map(year => {
        lineData.push({
          'date': new Date(`${month} 1, 20${year}`),
          'value': stateData[`${year}-${month}`],
        });
      });
    });

    lineData.sort((a, b) => a.date - b.date);

    const xScale = d3.scaleLinear()
      .domain(d3.extent(lineData.map(a => a.date)))
      .range([50, width - 50]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(lineData.map(a => a.value))])
      .range([height - 50, 50]);

    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const g = this.selection()
      .appendSelect('svg') // see docs in ./utils/d3.js
      .attr('width', width)
      .attr('height', height);

    // Color scale
    const color = d3.scaleThreshold()
      .domain([1, 2, 3, 4, 5, 6, 7])
      .range(['#FFE5D8', '#FFC1AA', '#F59E82', '#E37E61', '#CC5F44', '#B2422C', '#972516', '#7A0001']);

    g.appendSelect('g', 'x-axis')
      .attr('transform', 'translate(0,' + (height - 50) + ')')
      .call(d3.axisBottom(xScale)
        .tickFormat(a => d3.timeFormat('%b %y')(a))
        .tickSizeInner(-height + 100)
      );

    g.appendSelect('g', 'y-axis')
      .attr('transform', 'translate(50, 0)')
      .call(d3.axisLeft(yScale)
        .tickFormat(a => a + '%')
        .tickSizeInner(-width + 100)
      )
      .selectAll('text')
      .attr('transform', 'translate(-10, 0)');

    g.appendSelect('path', 'data-line')
      .datum(lineData)
      .attr('d', line)
      .style('stroke', color(lineData[lineData.length - 1].value));

    return this;
  }
}

export default ModuleNicar2019Chart;
