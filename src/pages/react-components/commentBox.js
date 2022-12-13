import { Card } from "react-bootstrap"

export default function CommentBox(props) {
    const title = props.title
    const classN = props.classN

    return (
        <>
            <Card className="survey-var shadow-sm">

                <h5>{title}</h5>
                <textarea rows="5" cols="60" name="description">
                </textarea>

            </Card>
        </>
    )
}