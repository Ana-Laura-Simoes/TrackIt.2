import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

export default function RegisterPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  function register(e) {
    e.preventDefault();
    const body = {email, name, image, password};

    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      body
    );

    setLoading(true);

    request.then((response) => {
      console.log(response);
      history.push("/");
    });

    request.catch(() => {
      alert("Falha no cadastro, preencha os campos novamente!");
      setLoading(false);
    });
  }
    

  return (
    <Container >

      <img src="img/Logo.png" alt="LogoRegister"></img>

      <form onSubmit={register}>
      
        <input type="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading}/>
    
        <input type="password" required placeholder="senha" value={password} onChange={(p) => setPassword(p.target.value)} disabled={loading}/>
     
        <input type="name" required placeholder="nome" value={name} onChange={(n) => setName(n.target.value)} disabled={loading}/>
   
        <input type="picture" required placeholder="foto" value={image} onChange={(i) => setImage(i.target.value)} disabled={loading}/>
     
        <button type="submit" required isDisabled={loading} ><span> {!loading ? "Cadastrar" : <Loader type="ThreeDots" color="#FFF" height={45} width={50}/>}</span>
      </button> 
    
      </form>

      <Link to="/">
        <Login>
          <span>Já tem uma conta? Faça login!</span>
        </Login>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left:36px;
  pading-right:36px;
  img {
    margin-top: 70px;
    margin-bottom: 32px;
  }

  input {
    width: 303px;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    margin-bottom: 8px;
    ::placeholder {
      font-family: "Lexend Deca";
      color: #dbdbdb;
      font-size: 20px;
      padding-left: 5px;
    }
    :focus {
      box-shadow: 0 0 0 0;
      outline: 0;
    }
  }

  button{
    font-family: "Lexend Deca";
    background: #52b6ff;
    border-radius: 4.63636px;
    border: none;
    width: 303px;
    height: 45px;
    opacity: ${props => props.isDisabled ? 0.5 : 1}; 
    span {
      color: #ffffff;
      font-size: 20px;
    }
  }
`;

const Login = styled.div`
  span {
    display: block;
    color: #52b6ff;
    font-size: 14px;
    padding-top: 25px;
    text-decoration: underline;
  }
`;