import  React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import {withRouter} from 'react-router-dom';


import gotService from "../../services/gotService";

class BooksPage extends Component {
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


    render () {
        if(this.state.error){
            return <ErrorMessage message="Whoops... Something goes wrong in characters page"/>
        }

        return(
            <ItemList
                onItemSelected={(itemId)=>{
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name, numberOfPages})=>`
                Title: ${name} 
                |
                pages: ${numberOfPages}
                 `}
            />
        )
    }
}

export default withRouter(BooksPage);