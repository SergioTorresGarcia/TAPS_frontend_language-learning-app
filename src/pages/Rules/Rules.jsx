
import "./Rules.css";
import { useState } from "react";


// PAGE TO BE UPDATED!
export const Rules = () => {

    const [isShowComments, setIsShowComments] = useState(false)

    const showComments = () => {
        setIsShowComments(!isShowComments)
    }


    return (
        <>
            <div className="rulesDesign">
                <div className="box">
                    <div className="border" onClick={() => showComments()}>
                        {isShowComments && (
                            <div className="showComments" onClick={() => showComments()}>
                                These are the RULES OF THE GAME!
                            </div>
                        )}
                        <span className="cButtonDesign2">1</span>
                        <span>Take your time to learn the word</span>
                        <span>Memorise symbol, EN, JP and romanji words</span>
                        <br />
                        <span className="cButtonDesign2">2</span>
                        <span>Choose the option that matches the center</span>
                        <br />
                        <span className="cButtonDesign2">3</span>
                        <span>Choose if the offered pair is correct or not</span>
                        <br />
                        <span className="cButtonDesign2">4</span>
                        <span>Pass one level at a time!</span>
                    </div>
                </div>
            </div >
        </>
    );
};