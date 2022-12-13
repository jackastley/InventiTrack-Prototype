import React from "react";
import { Card } from "react-bootstrap";

class SliderVariableBlock extends React.Component {

    constructor(props) {
        super(props);
        this.changeValueState = this.changeValueState.bind(this);
        this.state = {
            currentSliderVal: Math.ceil(this.props.sliderRange[1] / 2)
        }
    }


    changeValueState() {
        // RENDERING
        let x = document.getElementById(this.props.variableCode + '-slider-val');
        x.innerHTML = document.getElementById(this.props.variableCode + 'range').value + " " + this.props.measureUnit;

        //SET STATE
        this.setState(
            { currentSliderVal: document.getElementById(this.props.variableCode + 'range').value },
            () => {
                this.props.sliderChange({
                    variable: this.props.variableCode,
                    value: this.state.currentSliderVal
                })
            }
        )
    }

    render() {
        return (
            <Card className={this.props.variableCode + " shadow-sm"} name='variable-block'>
                <h5 className="sliderTitle"> {this.props.title} </h5>
                <div className="slidecontainer">
                    <div className="labelSlideContainer">
                        <label htmlFor={this.props.variableCode + 'range'} className="sliderEndLabel">{this.props.minLab}</label>
                        <input type="range" min={this.props.sliderRange[0]} max={this.props.sliderRange[1]} className="slider" id={this.props.variableCode + 'range'} onInput={this.changeValueState} value={this.state.currentSliderVal} onChange={this.changeValueState} required></input>

                        <label htmlFor={this.props.variableCode + 'range'} className="sliderEndLabel">{this.props.maxLab}</label>
                    </div>

                    <p id={this.props.variableCode + '-slider-val'}> {this.state.currentSliderVal.toString() + " " + this.props.measureUnit} </p>

                </div>

            </Card>
        );
    }
}

export default SliderVariableBlock