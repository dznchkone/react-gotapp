import  React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from "../errorMessage";
import RowBlock from "../rowBlock";

import gotService from "../../services/gotService";

export default class HousesPage extends Component {
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
                getData={this.gotService.getAllHouses}
                renderItem={({name})=>`House name: ${name}`}/>
        );

        const charDetails = (
            <ItemDetails itemId={this.state.selectedItem} getDetails={this.gotService.getHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>

        );

        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}

