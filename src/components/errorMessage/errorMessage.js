import React from 'react';
import {Card, CardTitle, CardText, CardImg} from 'reactstrap';

import errorImg from './error.jpg';

const ErrorMessage = (props) => {
    return (
        <>
            <Card body outline color="danger">
                <CardImg width="100%" src={errorImg} alt="Error image"/>
                <CardTitle tag="h5" className="badge-danger">Error!</CardTitle>
                <CardText >{props.message}</CardText>
            </Card>
        </>
    )
}

export default ErrorMessage;