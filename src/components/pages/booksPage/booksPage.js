import  React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from "../../errorMessage";
import RowBlock from "../../rowBlock";

import gotService from "../../../services/gotService";

export default class BooksPage extends Component {
    gotService = new gotService();

    state = {
        selectedItem: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error:true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    render () {
        if(this.state.error){
            return <ErrorMessage message="Whoops... Something goes wrong in characters page"/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name, numberOfPages})=>`
                Title: ${name} 
                |
                pages: ${numberOfPages}
                 `}/>
        );

        const bookDetails = (
            <ItemDetails itemId={this.state.selectedItem} getDetails={this.gotService.getBook}>
                <Field field='numberOfPages' label='Number Of Pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>

        );

        return(
            <RowBlock left={itemList} right={bookDetails}/>
        )
    }
}