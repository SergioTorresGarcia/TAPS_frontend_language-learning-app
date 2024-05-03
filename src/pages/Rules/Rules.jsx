import { Footer } from "../../common/Footer/Footer";
import { Header } from "../../common/Header/Header";
import "./Rules.css";

export const Rules = () => {
    return (
        <>
            <Header />
            <div className="rulesDesign">
                <p className="text">General rules</p>
                <p>
                    Learn the word - EN / JP / drawing
                    <br />
                    Choose the one that fits
                    <br />
                    Choose if the offered pair is correct or not
                </p>

            </div >
            <Footer />
        </>
    );
};