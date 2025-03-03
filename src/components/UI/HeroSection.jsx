import { FaArrowRight } from "react-icons/fa6";
import FlagQuiz from "../Layout/FlagQuiz";


export const HeroSection = () => {
    return (
         <main className="hero-section main">
              <div className="container grid grid-two-cols">
                <div className="hero content">
                    <h1 className="heading-xl">
                        Welcome to our World Atlas!
                        <br />
                        Discover the world, One Country At A Time...
                    </h1>
                    <p className="paragraph"> 
                        Our mission is to provide you with an in-depth exploration of each country, highlighting its unique features, history, and culture. We invite you to join us on this journey and discover the world.
                    </p>
                    <button className="btn btn-darken btn-inline bg-white-box">
                    Start Exploring <FaArrowRight />
                  </button>
                </div>
                <div className="hero image">
                    <img src="/images/world1.png" alt="world beauty" className="banner-image"/>
                </div>
              </div>
              <div>
                <h1 className="game">Are you a flag master? Time to find out!</h1>
              </div>
              <div className="App">
               <FlagQuiz />
               </div>
              
      
      
         </main>
    );
}
