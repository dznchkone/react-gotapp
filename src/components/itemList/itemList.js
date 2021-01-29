import React, {Component} from 'react';
import {Card, ListGroup, ListGroupItem, Spinner} from 'reactstrap';
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";


class ItemList extends Component {
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
        const {data} = this.props
        const items = this.renderItems(data);

        return (
            <Card body className="p-3 rounded">
                <ListGroup>
                    {items}
                </ListGroup>
            </Card>
        );
    }
}

ItemList.defaultProps = {
    onItemSelected: () =>{}
}

const withData = (View, getData)=>{
    return class extends Component {
        state = {
            data: null,
            error: false
        }

        componentDidMount() {
            getData()
                .then((data)=>{
                    this.setState(
                        {
                            data
                        }
                    )
                })
                .catch(this.onError)
        }

        componentDidCatch() {
            this.setState({
                data: null,
                error: true
            })
        }

        onError = () =>{
            this.setState({
                data: null,
                error: true
            })
        }

        render() {
            const {data, error} = this.state

            if(!data&&error) {
                return <ErrorMessage message="Whoops...Can't loading characters list"/>
            } else if(!data) {
                return  <Spinner> </Spinner>
            }

            return <View {...this.props} data={data}/>
        }
    }
}

const {getAllCharacters} = new gotService();
export default withData(ItemList, getAllCharacters);