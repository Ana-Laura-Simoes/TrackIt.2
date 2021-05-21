
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import ProgressContext from "../contexts/ProgressContext";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import calendar from "dayjs/plugin/calendar";
import {CheckmarkSharp } from 'react-ionicons'

export default function TodayHabits(props) {
  dayjs.extend(calendar);
  const { user } = useContext(UserContext);  
  const {progress, setProgress} = useContext(ProgressContext);
  const [listOfHabits, setListOfHabits] = useState([]);  
    
  function CalculateProgress() {
    const percentage = listOfHabits.reduce((acc, item) => item.done ? acc+1 : acc, 0);
    return ((percentage/listOfHabits.length).toFixed(2)*100)        
  }


  setProgress(CalculateProgress);



  //console.log(user)

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    promise.then((response) => {
      setListOfHabits(response.data);
  
    });

    promise.catch((error) => {
      console.log(error);
    }); 
  }, [user.token]);


  function attStatusHabit(habit, done, id) {

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    
    const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${done ? "uncheck" : "check"}`, {}, config);
    request.then(() => attListOfHabits(config));
    request.catch(() => console.log("falhou"))
  }



  
  function attListOfHabits() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };


    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    promise.then((response) => {
      setListOfHabits(response.data);
      console.log(response.data);
    });

    promise.catch((error) => {
      console.log(error);
    }); 
  }

  return (
    <Container>
  
      <Day>{dayjs().locale("pt").format("dddd").replace("-feira", "")}, {dayjs().calendar(dayjs("2019-09-21"),{sameElse: "DD/MM"})}</Day>
      <DaySubtitle>{progress>0?<span className="HabitCompleted">{progress}% dos hábitos concluídos</span>:<span>Nenhum hábito concluído ainda</span>}</DaySubtitle>
      {listOfHabits.map((i) => (
        <Habit key={i.id}>
          <div>
          <span>{i.name}</span>
        
        <CardInfo>
          <Frequency>{i.done?<span className="HabitCompleted">Sequência atual:{i.currentSequence++} dias</span>:<span className="NotCompleted">Sequência atual:{i.currentSequence} dias</span>}</Frequency>
          <Record>{i.highestSequence!==0 && i.currentSequence>=i.highestSequence?<span className="HabitCompleted">Seu recorde: {i.highestSequence++} dias</span>:<span className="NotCompleted">Seu recorde: {i.highestSequence} dias</span>}</Record>
        </CardInfo>
          </div>


          <Button onClick={() => attStatusHabit(i, i.done, i.id)} done={i.done}>
          <CheckmarkSharp
           height="50px"
           width="50px"
           color="#FFFFFF"
          />
          </Button>
        </Habit>
      )).reverse()}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  margin-top:70px;
  margin-bottom:70px;
  display:flex;
  flex-direction:column;
  background: #f2f2f2;
  padding:17px;
  font-family: Lexend Deca;
`;

const Day = styled.div`
margin-top:28px;
font-size: 22.976px;
color: #126BA5;
`;

const DaySubtitle = styled.div`  

  margin-top: 5px;

  span{
    color: #bababa;
    font-size: 18px;

    &.HabitCompleted{
      color:#8FC549
    }
  }


`;

const Habit = styled.div`
  margin-top:28px;
  width: 340px;
  height: 94px;
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  span {
    color: #666666;
    font-size: 20px;
  }
`;

const CardInfo = styled.div`
    margin-top: 10px;
`;

const Frequency = styled.div`
    margin-bottom: 5px;
    
    span{
      font-size: 12.976px;

      &.NotCompleted{
        color: #666666;
      }
    
      &.HabitCompleted{
        color:#8FC549
      }
    }
    
`;

const Record = styled.div`    
span{
  font-size: 12.976px;

  &.NotCompleted{
    color: #666666;
  }

  &.HabitCompleted{
    color:#8FC549
  }
}
`;

const Button = styled.div`    
    width: 70px;
    height: 70px;
    margin: 10px;
    background: ${props => props.done ? '#8FC549' : "#EBEBEB"};
    border: 1px solid #E7E7E7;    
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 35px;
        height: 28px;
        
    }
`;