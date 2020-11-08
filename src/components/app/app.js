import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';



export default class App extends Component {
    state = {
        showRandomChar: true,
        selectedChar: 130
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
