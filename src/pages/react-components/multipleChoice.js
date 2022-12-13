import { useState } from "react";
import { Card } from "react-bootstrap";

export default function MultipleChoice(props) {
    const[buttonChange, setButtonChange] = useState("")

    let opts = props['optionsArray'];

    function constructLabels() {
        return (
            <tr>
                {opts.map(i => {
                    return (
                        <th>
                            <label htmlFor={i}>{i}</label>
                        </th>
                    )
                })}
            </tr>
        )
    }
    function constructCheckBoxes() {
        return (
            <tr>
                {opts.map(i => {
                    return (
                        <th>
                            <input type="radio" className={"radio-"+props['variable']} onChange={handleOn} id={props.variable + "_"+ i} required />
                        </th>
                    )
                })}
            </tr>
        )
    }

    //TURN OFF OTHER RADIO BUTTONS IF BUTTON SELECTED
    function handleOn(event){
        const allButtons = document.getElementsByClassName("radio-" + props['variable'])
        for(let buttonNumber = 0; buttonNumber<allButtons.length;buttonNumber++){
            allButtons[buttonNumber].checked = false
        }
        setButtonChange(event.target.id)
        document.getElementById(event.target.id).checked=true
    }

    return (
        <>
        <Card className='survey-var shadow-sm'>
            <h5>{props['title']}</h5>
            <table className={"survey-var-tab"}>
                {constructLabels()}
                {constructCheckBoxes()}
            </table>
        </Card>
        </>
    )
}