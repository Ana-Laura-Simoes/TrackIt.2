 ///*
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { TrashOutline } from 'react-ionicons'

export default function MYHabits(){
    const { user } = useContext(UserContext);
    const [listOfHabits,setListOfHabits]=useState([]);
    const [clicked,setClicked]=useState(false);
    const [habitName,setHabitName]=useState("");
    const [loading, setLoading] = useState(false);
    const [weekDay,setWeekDay]=useState([]);

    const ArrayweekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  
    useEffect(() => {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
    
        const request = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
          config
        );
        request.then((response) => {
          setListOfHabits(response.data);
          console.log(response.data);
        });
    
        request.catch((error) => {
          console.log(error);
        });
      }, [user.token]);




      function addWeekDays(e, day) {

        if (loading) {
            return
        }
    
        e.stopPropagation();

        if (weekDay.includes(day)) {
          const newDays = weekDay.filter((d) => d!== day );
          setWeekDay([...newDays]);
        } else {
          const newDays = [...weekDay, day];
          setWeekDay(newDays);
        }
      }



      function saveHabit() {
        if (weekDay.length < 1) {
            alert("Você esqueceu de selecionar os dias para seu hábito!")
            return
        }
        setLoading(true);
        const body = {
            name: habitName,
            days: weekDay,
          };
    
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
    
        const request = axios.post(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
          body,
          config
        );

        request.then((response) => {
          setListOfHabits([...listOfHabits, response.data]);
          console.log(response.data);
          setLoading(false);
          setHabitName("");
          setWeekDay([]);
          setClicked(false);
        });
        
        request.catch(() => {
            setLoading(false);
            alert("Falha ao salvar hábito!");
        });            
      }



      function deleteHabit(id) {
        const areUsure= window.confirm("Excluir o hábito?");
        if (!areUsure) { 
            return 
        }
    
        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
        };
    
        const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config)
        request.then(() => {
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
            promise.then((response) => {
                setListOfHabits(response.data)
                console.log("sucesso")
            })        
        }) 
        
        
        request.catch(() => console.log("erro"))    
        console.log(listOfHabits);  
      }




      return (
        <Container>
          <Title>Meus hábitos
          <button onClick={() => setClicked(true)}><span>+</span></button>
          </Title>
    
          <AddNewHabit show={clicked}>
            <input value={habitName} disabled={loading} onChange={(e) => setHabitName(e.target.value)} placeholder="nome do hábito"></input>
            
            <ButtonsWeekdayWrapper>
              
            {ArrayweekDays.map((w, index)=>(
              <ButtonWeekday key={index} className={weekDay.includes(index) ? "selected" : ""} onClick={(e) => addWeekDays(e,index)}>
              <span>{w}</span>
            </ButtonWeekday>
            ))
        }
            </ButtonsWeekdayWrapper>

            <ButtonsWrapper>
              <CancelButton disabled={loading} onClick={() => (setClicked(false))}>
                <span>Cancelar</span>
              </CancelButton>
              <SaveButton disabled={loading} onClick={saveHabit}>
                <span>Salvar</span>
              </SaveButton>
            </ButtonsWrapper>

          </AddNewHabit>

          {listOfHabits.length === 0 ? 
          <EmptyHabits>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </EmptyHabits> :   
           listOfHabits.map((i) => (
        <Habit key={i.id}>
          <div>{i.name}
          <TrashOutline
           height="18px"
           width="18px"
           onClick={() => deleteHabit(i.id)}/></div>
          <ButtonsWeekdayWrapper>
            {ArrayweekDays.map((w, index) => (              
                <ButtonWeekday key={index} className={i.days.includes(index) ? "selected" : ""}>
                  <span>{w}</span>
                </ButtonWeekday>              
            ))}
          </ButtonsWeekdayWrapper>         
        </Habit>
      )) }
        </Container>
      );
    }
    
    const Container = styled.div`
      margin-top:70px;
      background: #f2f2f2;
      height: 100vh;
      width: 100vw;  
      padding:17px;
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

    button{
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border:none;
    border-radius: 5px
    }
    span{
        font-size: 26.976px;    
        text-align: center;
        color: #FFFFFF;
    }
    `;

    const AddNewHabit = styled.div`
      width: 340px;
      height: 180px;
      background: #fff;
      border-radius: 5px;
      margin-top: 22px;
      margin-bottom:29px;
      padding:18px;
      display: ${(props) => (props.show === true ? "flex" : "none")};
      flex-direction: column;

      input {
        width: 303px;
        height: 45px;
        border: 1px solid #d5d5d5;
        border-radius: 5px;
        font-family: "Lexend Deca";
        ::placeholder {
          font-family: "Lexend Deca";
          color: #dbdbdb;
          font-size: 20px;
          padding-left: 5px;
        }
      }
    `;

    const ButtonsWeekdayWrapper = styled.div`
    margin-top:8px;
    width:80%;
    `;
    

    const ButtonWeekday = styled.button`
    width: 30px;
    height: 30px;
    margin-right: 4px;
    background: #fff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    span {
        color: #dbdbdb;
        font-family: "Lexend Deca";
        font-size: 20px;
      }

    &.selected {
      background: #CFCFCF;
      
      span {
          color: white;
      }
    }

  `;
  
    const Habit = styled.div`
    width: 340px;
    height: 91px;
    margin-bottom:10px;
    background: #FFFFFF;
    border-radius: 5px;
    padding:15px;
    font-family: Lexend Deca;

    div{
    font-size: 19.976px;
    color: #666666;
    display:flex;
    justify-content:space-between;

    }
  `;



    const EmptyHabits = styled.div`
      color: #666666;
      font-size: 18px;
      margin-top: 20px;
      margin-left: 17px;
    `;
        
    const ButtonsWrapper = styled.div`
      display: flex;
      margin-top:30px;
      align-items:center;
      justify-content:flex-end;
    `;
    
   
    
    const CancelButton = styled.button`
      width: 85px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      font-family: "Lexend Deca";
      background: #fff;
      font-size: 16px;
      color: #52b6ff;
      margin-right:10px;
      
    `;
    const SaveButton = styled.button`
    background: #52b6ff;
    width: 85px;
    height: 35px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-family: "Lexend Deca";
      color: white;
      font-size: 16px;
  `;  

//*/
