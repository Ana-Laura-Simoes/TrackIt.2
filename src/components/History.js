import styled from "styled-components";

export default function History(){

    return(

        <Container>
        <Title>Histórico</Title>
        <span>
        Em breve você poderá ver o histórico dos seus hábitos aqui!
        </span>
        </Container>
    )

}

const Container = styled.div`
height: 100vh;
width: 100vw; 
margin-top:70px;
background: #f2f2f2
padding-left:17px;
padding-right:17px;
font-family: Lexend Deca;
`;
const Title = styled.div`
margin-bottom:20px;
font-size: 22.976px;
color: #126BA5;
display:flex;
justify-content:space-between;
align-items:center;
`;