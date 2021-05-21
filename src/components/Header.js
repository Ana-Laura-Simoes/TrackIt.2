 
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

 export default function Header(){
    const { user} = useContext(UserContext);
     return(
<Container>
<Logo><img src="img/HeaderLogo.png" alt="LogoHeader"/></Logo>
<Profile><img src={user.image} alt="ProfileImg"/></Profile> 
   
</Container>
     );
 }

 
const Container = styled.div`
position:fixed;
width: 100vw;
height: 70px;
left: 0px;
top: 0px;
background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
display:flex;
justify-content:space-between;
align-items:center;
padding:10px;
`;

const Logo = styled.div `
img{
    width:97px;
    height:40px;
}
margin-left:10px;
`;
const Profile = styled.div `
img{
    width:51px;
    height:51px;
    border-radius: 98.5px;
}
margin-right:10px;
`;
