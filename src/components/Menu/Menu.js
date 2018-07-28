import React, { Component } from "react";
import "./Menu.css";

var d3ScaleChromatic = require("d3-scale-chromatic");
var colorSchemes = [
  {
    scheme: convertToStepScheme(d3ScaleChromatic.interpolateBlues, 6, [0, 1]),
    name: "interpolateBlues"
  },
  { scheme: d3ScaleChromatic.schemeCategory10, name: "schemeCategory10" },
  { scheme: d3ScaleChromatic.schemeAccent, name: "d3.schemeAccent" },
  { scheme: d3ScaleChromatic.schemeDark2, name: "d3.schemeDark2" },
  { scheme: d3ScaleChromatic.schemePaired, name: "d3.schemePaired" },
  { scheme: d3ScaleChromatic.schemePastel1, name: "d3.schemePastel1" },
  { scheme: d3ScaleChromatic.schemePastel2, name: "d3.schemePastel2" },
  { scheme: d3ScaleChromatic.schemeSet1, name: "d3.schemeSet1" },
  { scheme: d3ScaleChromatic.schemeSet2, name: "d3.schemeSet2" },
  { scheme: d3ScaleChromatic.schemeSet3, name: "d3.schemeSet3" }
];

/**
 * Returns an array of color steps through a d3-scale-chromatic continous interpolator.
 *
 *
 * @param {d3.interpolator} scheme  The d3 continuous interpolator
 * @param {int} steps               Indicates how many colors you want to return
 * @param {Array, len 2} [splice]   Optional variable, takes a subsection of [0,1] (ex: [0.8,1])
 */
function convertToStepScheme(scheme, steps, splice) {
  let step = 1 / steps;
  let a = [];
  let start = 0;
  let end = 1;
  // if splice was passed, validate
  if (splice) {
    if (splice.length === 2) {
      if (splice[0] < splice[1]) {
        start = splice[0];
        end = splice[1];
        step = (end - start) / steps;
      }
    }
  }

  // populate the array
  for (let i = start; i < end; i += step) {
    a.push(scheme(i));
  }

  // trim the array if necessary
  //  I'm shifting, but a better alternative could be used
  if (a.length > steps) a.shift();

  // return the array
  return a;
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { schemeIdx: 0, scheme: colorSchemes[0] };
    this.handleSchemeChange = this.handleSchemeChange.bind(this);
  }

  handleSchemeChange() {
    let idx = this.state.schemeIdx;
    idx = idx < colorSchemes.length - 1 ? idx : 0;

    this.setState({ schemeIdx: idx + 1 }, () => {
      this.setState({ scheme: colorSchemes[this.state.schemeIdx] });
    });
  }

  render() {
    return (
      <div className="Menu">
        <div className="Menu-upper">{this.state.scheme.name}</div>
        <div
          className="Menu-wrapper"
          style={{
            gridTemplateColumns: "repeat(" + this.state.scheme.length + ", 1fr)"
          }}
        >
          {this.state.scheme.scheme.map(color => {
            return (
              // let idx = this.state.scheme.indexOf(color);
              <div key={color.substr(1)} className="Menu-block">
                <div
                  className="Menu-block-upper"
                  style={{ backgroundColor: color }}
                  href="/"
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = "black";
                    e.target.style.color = color;
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = color;
                    e.target.style.color = "black";
                  }}
                >
                  {color.toUpperCase()}
                </div>
                <div
                  className="Menu-block-lower"
                  style={{ backgroundColor: color }}
                />
              </div>
            );
          })}
        </div>
        <button onClick={this.handleSchemeChange} className="button change">
          Change Color Scheme
        </button>
      </div>
    );
  }
}

export default Menu;
