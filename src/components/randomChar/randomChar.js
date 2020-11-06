import React, {Component} from 'react';
import gotService from '../../services/gotService';
import ErrorMessage from "../errorMessage";


import {ListGroup, ListGroupItem, Card, CardTitle, Spinner} from 'reactstrap';

export default class RandomChar extends Component {

    constructor() {
        super();
        this.updateChar();
    }

    gotService = new gotService();
    state  = {
        char: {},
        loading: true,
        error: false
    };

    onCharLoaded = (char) =>{
        this.setState({
            char,
            loading: false
        })
    }

    onError = () =>{
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar () {
        const id = Math.floor(Math.random()*140+25); // 25 - 140
        this.gotService.getCharacter(13000000)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }


    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage message="Something goes wrong"/> : null;
        const spinner = loading ? <Spinner className="m-auto"/>: null;
        const content = !(loading || error) ?  <View char={char}/>: null;


        return (
            <Card body className="p-3 rounded mb-5">
                {errorMessage}
                {spinner}
                {content}
            </Card>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <CardTitle tag="h4" className="text-center mb-3">Random Character: {name}</CardTitle>
            <ListGroup flush className="border-top-0">
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="font-weight-bold">Gender </span>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="font-weight-bold">Born </span>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="font-weight-bold">Died </span>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="font-weight-bold">Culture </span>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </>
    )
}


