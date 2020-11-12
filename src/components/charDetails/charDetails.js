import React, {Component} from 'react';
import gotService from "../../services/gotService";
import ErrorMessage from "../errorMessage";

import {ListGroup, ListGroupItem, Card, CardTitle, Spinner} from 'reactstrap';

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            this.setState({
                loading: false
            })
            return;
        }

        this.setState({
            loading: true
        })

        this.gotService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) =>{
        this.setState({
            char,
            loading: false
        })
    }

    onError = () =>{
        this.setState({
            char:null,
            error: true,
            loading: false
        })
    }


    render() {

        const {loading, error, char} = this.state;

        const errorMessage = error ? <ErrorMessage message="Something goes wrong"/> : null;
        const spinner = loading ? <Spinner className="m-auto"/>: null;
        let content = null;//!(loading || error) ?  <View char={char}/>: null;
        if(!this.state.char&&!(loading||error)) {
            const message = '<- Please select a character';
            content = <span className="select-error text-dark"> {message}</span>;
        } else if(!(loading||error)){
            content = <View char={char}/>
        }

        return (
            <Card body className="p-3 rounded">
                {errorMessage}
                {spinner}
                {content}
            </Card>
        );
    }
}

const View = ({char}) =>{
    const {name, gender , born , died , culture} = char;

    return(
        <>
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
        </>
    )
}