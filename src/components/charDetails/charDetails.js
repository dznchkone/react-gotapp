import React, {Component} from 'react';

import {ListGroup, ListGroupItem, Card, CardTitle} from 'reactstrap';

export default class CharDetails extends Component {

    render() {
        return (
            <Card body className="p-3 rounded">
                <CardTitle tag="h4" className="text-center mb-3">John Snow</CardTitle>
                <ListGroup flush className="border-top-0">
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Gender</span>
                        <span>male</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Born</span>
                        <span>1783</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Died</span>
                        <span>1820</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Culture</span>
                        <span>First</span>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        );
    }
}