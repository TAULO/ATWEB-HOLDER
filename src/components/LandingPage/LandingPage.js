import React from "react";
import About from "../about/about";
import LandingImages from "../HomepageImages/LandingImages";
import MainImages from "../HomepageImages/MainImages";
import SubscribeForm from "../subscribeForm/SubscribeForm";

function Main() {
    return (
        <div>
            {/* <MainImages></MainImages> */}
            <LandingImages></LandingImages>
            <About></About>
            <SubscribeForm></SubscribeForm>
        </div>
    )
}

export default Main