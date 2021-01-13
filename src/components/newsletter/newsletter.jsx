import styles from './newsletter.module.scss';
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [state, setState] = useState("IDLE");
    const [errorMessage, setErrorMessage] = useState(null);

    const subscribe = async () => {
        setState("LOADING");
        setErrorMessage(null);
        try {
            const response = await axios.post("/api/newsletter", { email });
            setState("SUCCESS");
        } catch (e) {
            setErrorMessage(e.response.data.error);
            setState("ERROR");
        }
    };

    return (
        <div className={styles.newsletterBox}>
            <div className={styles.ribbon}><span>Sign Up</span></div>

            <div className={styles.newsletterBoxWrap}>
                <h4 className="header-two">Join Our Newsletter</h4>
                <p><small>Get Notified About The Next Update</small></p>

                <form action="">
                    <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
                    <input
                        type="text"
                        placeholder="Enter Your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {/* <button type="button" onClick={subscribe}> Subscribe </button> */}
                    <button
                        className={`${state === "LOADING" ? "btnLoading" : ""}`}
                        type="button"
                        disabled={state === "LOADING"}
                        onClick={subscribe}
                    >
                        Subscribe
                   </button>
                    {state === "ERROR" && <p className={styles.errorMsg}><small>{errorMessage}</small> </p>}
                    {state === "SUCCESS" && <p className={styles.thankMsg}><small>Thanks For Subscribe!!</small></p>}
                </form>
            </div>
        </div>
    );
};
export default Newsletter
