import React, {Component} from 'react';

import {ListGroup, ListGroupItem} from 'reactstrap';
export default class ItemList extends Component {


    render() {
        return (
            <ListGroup>
                <ListGroupItem style={{cursor: 'pointer'}}>
                    John Snow
                </ListGroupItem >
                <ListGroupItem style={{cursor: 'pointer'}}>
                    Brandon Stark
                </ListGroupItem>
                <ListGroupItem style={{cursor: 'pointer'}}>
                    Geremy
                </ListGroupItem>
            </ListGroup>
        );
    }
}