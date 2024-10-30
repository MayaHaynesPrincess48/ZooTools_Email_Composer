import React from "react";
import styled from "styled-components";

const ContentBtnComponent = styled.div`
    width: 100%;
    height: 66px;
    background: #f5f5f5;
    margin-top: 30px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 16px 20px;
    box-sizing: border-box;
`

const MailContentBtn = () => {
    return(
        <ContentBtnComponent className="flexEnd">123123</ContentBtnComponent>
    )
}

export default MailContentBtn