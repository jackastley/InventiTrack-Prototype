
import React from "react"
import SliderVariableBlock from "./react-components/SliderVariableBlock";
import { Button } from "react-bootstrap";
import {
    Container,
    Row,
    Col
} from 'react-bootstrap'


class TrackPageToRender extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.allVariables
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInternalSelection = this.handleInternalSelection.bind(this)
    }

    renderSliderVariable(vCode, range, title, measureUnit, minLab, maxLab) {
        return <SliderVariableBlock
            variableCode={vCode}
            sliderRange={range}
            title={title}
            measureUnit={measureUnit}
            sliderChange={this.handleInternalSelection}
            minLab={minLab || ""}
            maxLab={maxLab || ""} />
    }


    async handleSubmit(event) {
        event.preventDefault();
        try {
            this.setState({ showButton: false })
            let trackDataToPost = this.state;
            trackDataToPost.token = sessionStorage.getItem('token');
            trackDataToPost.userID = sessionStorage.getItem('userID');
            delete trackDataToPost.showButton;
            delete trackDataToPost.showSubmitError;
            let res = await fetch("http://" + process.env.REACT_APP_EXTERNAL_IP + ":9000/api", {
                method: "POST",
                body: JSON.stringify(trackDataToPost),
                headers: { "Content-Type": "application/json" }
            })
            const jsonResponse = await res.json();
            if (jsonResponse.inserted) {
                window.location.href = "http://" + process.env.REACT_APP_EXTERNAL_IP + ":3000/dashboard";
            }
            else {
                this.setState({ showButton: true })
                this.setState({ showSubmitError: true })
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    handleInternalSelection(varAndValJson) {
        this.setState({ [varAndValJson.variable]: varAndValJson.value }, () => {
        })
    }

    submitButton() {
        return <Button style={{ marginBottom: '20px' }} type="submit" value="Submit" id="submit-responses" variant="success">Submit</Button>
    }

    loadingSymbol() {
        return <div class="lds-facebook"><div></div><div></div><div></div></div>
    }

    submitError() {
        return <p class="submit-error">You have already tracked your progress today.</p>
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Container fluid>
                    <Row>
                        <Col className='survey-item-col'>

                            {this.renderSliderVariable(
                                'sleep',
                                [0, 16],
                                'How many hours of sleep did you get last night?',
                                'hours'
                            )}

                            {this.renderSliderVariable(
                                'work_time',
                                [0, 16],
                                'How long did you work (or do you estimate you will work) today?',
                                'hours'
                            )}

                            {this.renderSliderVariable(
                                'exercise',
                                [0, 120],
                                'How long did you exercise today?',
                                'minutes'
                            )}

                            {this.renderSliderVariable(
                                'healthy_food',
                                [1, 7],
                                'Rate how healthy your food was today.',
                                '',
                                'Very unhealthy',
                                'Very healthy'
                            )}

                            {this.renderSliderVariable(
                                'productivity',
                                [1, 7],
                                'Rate how productive you were today.',
                                '',
                                'Could barely get anything done',
                                'Completed everything very efficiently'
                            )}

                            {this.renderSliderVariable(
                                'stress',
                                [1, 7],
                                'Rate how stressed you were today.',
                                '',
                                'Not stressed at all',
                                'Extremely stressed'
                            )}

                            {this.renderSliderVariable(
                                'happy',
                                [1, 7],
                                'Rate how happy you were today.',
                                '',
                                'Not happy at all',
                                'Extremely happy'
                            )}


                            {this.state.showSubmitError ? this.submitError() : null}
                            {this.state.showButton ? this.submitButton() : null}
                            {!this.state.showButton ? this.loadingSymbol() : null}

                        </Col>
                    </Row>
                </Container>
            </form>
        );
    }

}


function TrackPage() {
    return (
        <TrackPageToRender allVariables={
            {
                sleep: '8',
                work_time: '8',
                exercise: '60',
                healthy_food: '4',
                productivity: '4',
                stress: '4',
                happy: '4',
                showButton: true,
                showSubmitError: false
            }
        } />
    );
}

export default TrackPage
