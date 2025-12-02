import User from "./user";
import UserClass from "./userclass";
const AboutUs_IMG = new URL('../../images/AboutUs_IMG.png', import.meta.url);
const About = () => {
    return (
        <div className="About">
            <h1>ABOUT US</h1>
            <div className="About-container">
                <div className="About-Left">Rapid-Feast started with a simple idea: food is a universal language of comfort, celebration, and connection. We're a team of passionate foodies who grew tired of compromising on mealtime. We believed that getting a delicious, high-quality meal delivered should be an easy and joyful experience. From late-night cravings to family dinners, we wanted to build a platform that brings the best local restaurants right to your fingertips, because a good meal can make any day better.</div>
                <div className="About-Right">
                    <img className="About_IMG" src={AboutUs_IMG}/>
                </div>
            </div>
        </div>

    )
}

export default About;