import React from 'react';

import BackgroundImg from '../common/images/background1.jpg';


import {Button, Container, Jumbotron} from 'reactstrap';

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

class Home extends React.Component {


    render() {

        return (

            <div style = {backgroundStyle}>
                    <Container fluid >
                        <h1 className="display-3" style={textStyle}>Smart Devices Monitoring Platform</h1>
                        <p className="lead" style={textStyle}> <b>Enabling real time monitoring of devices energy consumption, for a better management of resources consuption, for a better greener future.</b> </p>
                        <hr className="my-2"/>

                        {/* <p className="lead">
                            <Button color="primary" onClick={() => window.open('http://coned.utcluj.ro/~salomie/DS_Lic/')}>Learn
                                More</Button>
                        </p> */}
                    </Container>
               

            </div>
        )
    };
}

export default Home
