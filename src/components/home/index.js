import React from 'react'
import { connect } from 'react-redux'
import { increment } from "../../Action/count"
import { Container, Row, Col } from 'reactstrap';
import { image } from '../tm.png'

function Home(props) {
    console.log(props)
    return (
        <Container>
            <Row>
                <img src={image} alt="tm image" />
            </Row>
        </Container>
        // <div>

        //     {/*Redux*/}
        //     Display state from redux store - {props.count}
        //     <button onClick={() => { props.dispatch(increment()) }}>Up</button>
        // </div>
    )
}

const mapStateToProps = state => {
    return {
        count: state.count
    }
}


export default connect(mapStateToProps)(Home)