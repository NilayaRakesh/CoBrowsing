import React from 'react'
import styled from 'styled-components';
import {ipcStart,ipcStop} from "./serverManager";


const Button = styled.button`
    height: 40px;
    width: 150px;
    color: red;
    border-radius: 5px;
    border: none;
`
const Wrapper = styled.div`
    height: 100vh;
    align-items: center;
`
const Header = styled.div`
    height: 15vh;
    background-color: #b6e2fa;
    align-items: center;
    display:flex;
    justify-content: center;
`
const BodyWrapper = styled.div`
    height: 75vh;
    background-color: #f0f6fa;
    align-items: center;
    display:flex;
    justify-content: center;
`
const Footer = styled.div`
    height: 10vh;
    background-color: #b6e2fa;
`
const Form = styled.div`
    height: 100%;
`
const FormSection = styled.div`
    height: 10%;
    display:flex;
    justify-content: center;
    align-items: center;
`

function accountPage() {

  const onSubmit = () => {
    alert("Your account has been terminated");
  }
  window.onload = function() {
    console.log("window loaded");
    // ipcRenderer.on("uuid", (event, data) => {
    //     document.getElementById("code").innerHTML = data;
    // })
}

function startShare(){
   // ipcRenderer.send("start-share", {});
    ipcStart();
    // document.getElementById("start").style.display = "none";
    // document.getElementById("stop").style.display = "block";
}

function stopShare(){
    ipcStop();
   // ipcRenderer.send("stop-share", {});
    // document.getElementById("stop").style.display = "none";
    // document.getElementById("start").style.display = "block";
}
  
  return (
    <Wrapper>
        <Header>
            <h2>Customer Account Page</h2>
        </Header>
        <BodyWrapper>
            <Form>
                <FormSection>
                    Name : Sourav Singhania
                </FormSection>
                <FormSection>
                    Account Number : 1950032435495486965
                </FormSection>
                <FormSection>
                    Account Balance : 7000000000$
                </FormSection>
                <FormSection>
                    Active Loan : 9000000000$
                </FormSection>
                <FormSection>
                    Credit Card No : 5342-1223-4545-3435
                </FormSection>
                <FormSection>
                    <Button onClick={onSubmit}>Submit</Button>
                </FormSection>
                <FormSection>
                    <Button onClick={startShare}> Share Screen</Button>
                </FormSection>
                <FormSection>
                    <Button onClick={stopShare}> Stop Screen</Button>
                </FormSection>
            </Form>
        </BodyWrapper>
        <Footer>

        </Footer>
    </Wrapper>
  )
}

export default accountPage