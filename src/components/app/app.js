import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from "../charcaterPage";
import ErrorMessage from "../errorMessage";



export default class App extends Component {
    state = {
        showRandomChar: true,
        error: null
    }

    componentDidCatch() {
        this.setState({
            error:true
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
                    <CharacterPage/>
                </Container>
            </>
        );
    }
};
