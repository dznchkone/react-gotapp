import React, {Component} from 'react';

import {ListGroup, ListGroupItem, Card, CardTitle} from 'reactstrap';

export default class RandomChar extends Component {

    render() {

        return (
            <Card body className="p-3 rounded mb-5">
                <CardTitle tag="h4" className="text-center mb-3">Random Character: John</CardTitle>
                <ListGroup flush className="border-top-0">
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Gender </span>
                        <span>male</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Born </span>
                        <span>11.03.1039</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Died </span>
                        <span>13.09.1089</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Culture </span>
                        <span>Anarchy</span>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        );
    }
}
