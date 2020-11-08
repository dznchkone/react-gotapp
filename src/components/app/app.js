import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from "../errorMessage";



export default class App extends Component {
    state = {
        showRandomChar: true,
        selectedChar: 130,
        error: null
    }

    componentDidCatch() {
        console.log('Error');
        this.setState({
            error:true
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    onToggleRandomCharacter = () =>{
        this.setState((state)=>{
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }



    render() {
        const randomCharacter = this.state.showRandomChar ? <RandomChar/>: null;

        if(this.state.error){
            return <ErrorMessage message="Whoops... Something goes wrong"/>
        }

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomCharacter}
                            <Button
                                onClick={this.onToggleRandomCharacter}
                                className="mb-3"
                                color="secondary"
                            >
                                Toggle random character
                            </Button >
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onCharSelected={this.onCharSelected} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};
