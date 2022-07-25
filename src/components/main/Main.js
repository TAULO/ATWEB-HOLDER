import React from "react";
import About from "../about/about";
import MainImages from "../HomepageImages/MainImages";
import SubscribeForm from "../subscribeForm/SubscribeForm";

function Main() {
    return (
        <div>
            <MainImages></MainImages>
            <About></About>
            <SubscribeForm></SubscribeForm>
        </div>
    )
}

export default Main