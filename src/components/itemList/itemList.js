import React, {Component} from 'react';
import PropTypes from 'prop-types';


import {Card, ListGroup, ListGroupItem, Spinner} from 'reactstrap';
import ErrorMessage from "../errorMessage";


export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    static defaultProps = {
        onItemSelected: () =>{}
    }

    static propTypes = {
        onItemSelected: PropTypes.func
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList)=>{
                this.setState(
                    {
                        itemList
                    }
                )
            })
            .catch(this.onError)
    }

    componentDidCatch() {
        this.setState({
            itemList: null,
            error: true
        })
    }

    onError = () =>{
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr){
        return arr.map((item)=>{
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <ListGroupItem
                    key = {id}
                    style={{cursor: 'pointer'}}
                    onClick={() =>{this.props.onItemSelected(item.id)}}
                >
                    {label}
                </ListGroupItem >
            )
        })
    }

    render() {
        const {itemList, error} = this.state

        let temp = null;
        if(!itemList&&error) {
            temp = <ErrorMessage message="Whoops...Can't loading characters list"/>
        } else if(!itemList) {
            temp =  <Spinner> </Spinner>
        }
        const items = !itemList ? null : this.renderItems(itemList);

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

ItemList.defaultProps = {
    onItemSelected: () =>{}
}