import {
  Card
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PasswordReset(){
    return(
        <>
            <Card className='p-2' style={{margin:"10%", display:'flex', alignSelf:'center'}}>
                <h4>
                    To reset your password:
                </h4>
                <p>
                    Email Jack at jack@inventium.com.au
                </p>
                <a href="/">Return to login page</a>
            </Card>
        </>
    )
}