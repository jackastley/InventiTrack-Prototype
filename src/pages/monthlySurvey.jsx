
import React, { useState } from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap'
import MultipleChoice from './react-components/multipleChoice';
import SliderVariableBlock from './react-components/SliderVariableBlock';
import CommentBox from './react-components/commentBox';
import 'bootstrap/dist/css/bootstrap.min.css';

function MonthlySurvey() {
    const [sliderChange, setSliderChange] = useState({});

    const developmentCheck = () => {
        if (process.env.REACT_APP_DEVELOP == 'true') {
            return false
        }
        else {
            console.log(process.env.REACT_APP_DEVELOP)
            return true
        }
    }

    return (
        <>
            {(developmentCheck() &&
                <Container fluid>
                    <Row>
                        <Col className='survey-item-col'>
                            <MultipleChoice
                                title={'First Variable'}
                                optionsArray={['Disagree', 'Neutral', 'Agree']}
                                variable={'FirstVar'}
                            ></MultipleChoice>

                            <MultipleChoice
                                title={'1.5 Variable'}
                                optionsArray={['Disagree', 'Neutral', 'Agree']}
                                variable={'1.5Var'}
                            ></MultipleChoice>

                            <SliderVariableBlock
                                variableCode="SecondVar"
                                sliderRange={[0, 100]}
                                title={"Second Var"}
                                measureUnit='Points'
                                sliderChange={setSliderChange} />

                            <CommentBox title="Third Var" classN={'ThirdVar'}></CommentBox>

                        </Col>
                    </Row>
                </Container>
            ) || <>
                    <h4 style={{"padding":"20px"}}>This page is still in development.</h4>
                    <p style={{"padding":"20px"}}>We'll keep you posted!</p>
                </>
            }
        </>
    )
}

export default MonthlySurvey