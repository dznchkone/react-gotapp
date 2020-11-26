import React, {Component} from 'react';

import ErrorMessage from "../errorMessage";

import {ListGroup, ListGroupItem, Card, CardTitle, Spinner} from 'reactstrap';

const Field = ({item, field, label}) =>{
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <span className="font-weight-bold">{label}</span>
            <span>{item[field]}</span>
        </ListGroupItem>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    }
    componentDidCatch(error, errorInfo) {
        console.error(error);
    }

    updateItem = () => {
        const {itemId} = this.props;
        if (!itemId) {
            this.setState({
                loading: false
            })
            return;
        }

        this.setState({
            loading: true
        })

        this.props.getDetails(itemId)
            .then(this.onItemLoaded)
            .catch(this.onError);
    }

    onItemLoaded = (item) =>{
        this.setState({
            item,
            loading: false
        })
    }

    onError = (e) =>{
        console.error(e);
        this.setState({
            item:null,
            error: true,
            loading: false
        })
    }


    render() {

        const {loading, error, item} = this.state;

        const errorMessage = error ? <ErrorMessage message="Something goes wrong"/> : null;
        const spinner = loading ? <Spinner className="m-auto"/>: null;
        let content = null;
        if(!this.state.item&&!(loading||error)) {
            const message = '<- Please select an item';
            content = <span className="select-error text-dark"> {message}</span>;
        } else if(!(loading||error)){
            content = <View name={item.name} fields={React.Children.map(this.props.children, child => {
                return React.cloneElement(child, {item})
            })}/>
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

const View = ({name, fields}) =>{
    return(
        <>
            <CardTitle tag="h4" className="text-center mb-3">{name}</CardTitle>
            <ListGroup flush className="border-top-0">
                {fields}
            </ListGroup>
        </>
    )
}