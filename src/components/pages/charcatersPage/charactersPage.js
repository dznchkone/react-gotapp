import  React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from "../../errorMessage";
import RowBlock from "../../rowBlock";

import gotService from "../../../services/gotService";

export default class CharactersPage extends Component {
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
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender})=>`${name} (${gender})`}/>
        );

        const charDetails = (
            <ItemDetails itemId={this.state.selectedItem} getDetails={this.gotService.getCharacter}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>

        );

        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}