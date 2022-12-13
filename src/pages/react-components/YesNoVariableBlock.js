import React from "react";

class YesNoVariableBlock extends React.Component {
    constructor(props) {
        super(props);
        this.handleOn = this.handleOn.bind(this);
        this.state = {
            buttonOn: ''
        }
    }


    handleOn(event) {
        this.setState({ buttonOn: event.target.id });
    }

    render() {
        return (
            <div className={this.props.variableCode} name='variable-block'>
                <h4>{this.props.title}</h4>
                <table>
                    <tr>
                        <th>
                            <label htmlFor={this.props.variableCode + '-no-option'}>No</label>
                        </th>
                        <th>
                            <label htmlFor={this.props.variableCode + '-yes-option'}>Yes</label>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <input type="radio" name={this.props.variableCode + "yesno-option"} id={'no'} onClick={this.handleOn} required />
                            <span className="checkmark"></span>
                        </th>
                        <th>
                            <input type="radio" name={this.props.variableCode + "yesno-option"} id={'yes'} onClick={this.handleOn} required />
                            <span className="checkmark"></span>
                        </th>
                    </tr>
                </table>
            </div>
        );
    }

}

export default YesNoVariableBlock