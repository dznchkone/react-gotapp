import React, {Component} from 'react';

import {ListGroup, ListGroupItem, Card, CardTitle} from 'reactstrap';
import gotService from "../../services/gotService";

export default class CharDetails extends Component {
    gotService = new gotService();

    state = {
        char: null
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char)=>{
                this.setState(
                    {char}
                )
            })
    }


    render() {

        if(!this.state.char){
            return <span className="select-error">Please select a character</span>
        }

        const {name, gender, born, died, culture} = this.state.char

        return (
            <Card body className="p-3 rounded">
                <CardTitle tag="h4" className="text-center mb-3">{name}</CardTitle>
                <ListGroup flush className="border-top-0">
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Gender</span>
                        <span>{gender}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Born</span>
                        <span>{born}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Died</span>
                        <span>{died}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="font-weight-bold">Culture</span>
                        <span>{culture}</span>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        );
    }
}