import React from 'react';

import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Container
} from 'reactstrap';

import PersonForm from "./components/person-form";

import BackgroundImg from '../common/images/background1.jpg';



const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${BackgroundImg})`,
    blurAmount:3,
    blurRadius:5,
};
const textStyle = {color: 'white', fontFamily:"Serif"};

const headerStyle = {color: 'white', fontFamily:"Serif", fontWeight:"bold", padding:"20px"};

class AdminContainer extends React.Component {
    render() {

        return (

            <div style = {backgroundStyle}>
                    <h2 style ={headerStyle}>Administrator</h2>
                    <Container fluid >
                    <Modal 
                    //     isOpen={this.state.selected} toggle={this.toggleForm}
                    //    className={this.props.className} size="lg"
                       >
                        <ModalHeader> Add User: </ModalHeader>
                        <ModalBody>
                            <PersonForm />
                        </ModalBody>
                    </Modal>


                    </Container>
               

            </div>
        )
    };
}
export default AdminContainer;