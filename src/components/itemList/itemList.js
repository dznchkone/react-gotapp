import React, {Component} from 'react';
import gotService from "../../services/gotService";

import {Card, ListGroup, ListGroupItem, Spinner} from 'reactstrap';
import ErrorMessage from "../errorMessage";


export default class ItemList extends Component {
    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList)=>{
                this.setState(
                    {
                        charList
                    }
                )
            })
            .catch(this.onError)
    }

    componentDidCatch() {
        this.setState({
            charList: null,
            error: true
        })
    }

    onError = () =>{
        this.setState({
            charList: null,
            error: true
        })
    }

    renderItems(arr){
        return arr.map((item)=>{
            return (
                <ListGroupItem
                    key = {item.id}
                    style={{cursor: 'pointer'}}
                    onClick={() =>{this.props.onCharSelected(item.id)}}
                >
                    {item.name}
                </ListGroupItem >
            )
        })
    }

    render() {
        const {charList, error} = this.state

        let temp = null;
        if(!charList&&error) {
            temp = <ErrorMessage message="Whoops...Can't loading characters list"/>
        } else if(!charList) {
            temp =  <Spinner> </Spinner>
        }
        const items = !charList ? null : this.renderItems(charList);

        return (
            <Card body className="p-3 rounded">
                <ListGroup>
                    {temp}
                    {items}
                </ListGroup>
            </Card>
        );
    }
}