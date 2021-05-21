import styled from "styled-components";
import { Link } from "react-router-dom";
import {useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressContext from "../contexts/ProgressContext";

export default function Menu(){
  const {progress} = useContext(ProgressContext);

    return(
<>
<Container>

<Link to="/habitos"><span>Hábitos</span></Link>
<Link to="/hoje"><button>
<CircularProgressbar
            value={progress}
            text="Hoje"
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#52B6FF",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
            })}
          />
</button> </Link>
<Link to="/historico"><span>Histórico</span></Link>
</Container>

</>

    );

}

const Container= styled.div  `
font-family: Lexend Deca;
position:fixed;
width:100vw;
height: 70px;
left: 0;
bottom:0;
background: #FFFFFF;
display:flex;
justify-content:space-between;
align-items:center;
padding-right:36px;
padding-left:36px;
padding-bottom:10px;
span{
font-size: 17.976px;
line-height: 22px;
text-align: center;
color: #52B6FF;
}

button{
width: 91px;
height: 91px;
background: #52B6FF;
border:none;
border-radius:50px;
margin-bottom:30px;
font-size: 17.976px;
line-height: 22px;
text-align: center;
color: #FFFFFF
}
`;