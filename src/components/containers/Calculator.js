import React, { useEffect, useState } from "react";
import "../../styles/Calculator.css";
import { BsFillPersonFill } from "react-icons/bs";

export const Calculator = () => {
    const [bill, setBill] = useState(0);

    const [tip, setTip] = useState(0);
    const [custom, setCustom] = useState(0);

    const [people, setPeople] = useState(0);
    const [isError, setIsError] = useState(false);

    const [result, setResult] = useState({ tipResult: 0, totalResult: 0 });

    const billHandler = (e) => {
        setBill(e.target.value);
    };

    const customTipHandler = (e) => {
        setCustom(e.target.value);
    };

    const peopleHandler = (e) => {
        setPeople(e.target.value);
    };

    function calculate() {
        if (bill > 0 && people > 0) {
            if (tip > 0 || custom > 0) {
                let tip_result = 0;
                let total_result = 0;

                if (tip > 0) {
                    tip_result = (parseFloat(bill) * parseFloat(tip)) / 100;
                } else if (custom > 0) {
                    tip_result = (parseFloat(bill) * parseFloat(custom)) / 100;
                }

                tip_result = tip_result / parseFloat(people);

                if (tip_result > 0) {
                    total_result =
                        parseFloat(bill) / parseFloat(people) + tip_result;
                }

                setResult({
                    tipResult: tip_result.toFixed(2),
                    totalResult: total_result.toFixed(2),
                });
            } else {
                setResult({
                    tipResult: 0.0,
                    totalResult: 0.0,
                });
            }
        } else {
            setResult({
                tipResult: 0.0,
                totalResult: 0.0,
            });
        }
    }

    useEffect(() => {
        calculate();
        // eslint-disable-next-line
    }, [bill, tip, custom, people]);

    const resetAll = () => {
        setBill(0);
        setTip(0);
        setCustom(0);
        setPeople(0);
        setResult({ tipResult: 0, totalResult: 0 });
    };

    return (
        <div className="calculator">
            <div className="control-panel">
                <div className="bill">
                    <h1 className="field-name">Bill</h1>
                    <div className="bill-input-container">
                        <h3 className="dollar">$</h3>
                        <input
                            type="number"
                            className="bill-input inputs"
                            onChange={billHandler}
                            value={bill}
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="select-panel">
                    <h1 className="field-name">Select Tip %</h1>
                    <div className="selects">
                        <div
                            className={`select-items ${
                                tip === 5 && "active-select"
                            }`}
                            onClick={() => setTip(5)}
                        >
                            5%
                        </div>
                        <div
                            className={`select-items ${
                                tip === 10 && "active-select"
                            }`}
                            onClick={() => setTip(10)}
                        >
                            10%
                        </div>
                        <div
                            className={`select-items ${
                                tip === 15 && "active-select"
                            }`}
                            onClick={() => setTip(15)}
                        >
                            15%
                        </div>
                        <div
                            className={`select-items ${
                                tip === 25 && "active-select"
                            }`}
                            onClick={() => setTip(25)}
                        >
                            25%
                        </div>
                        <div
                            className={`select-items ${
                                tip === 50 && "active-select"
                            }`}
                            onClick={() => setTip(50)}
                        >
                            50%
                        </div>
                        <input
                            type="number"
                            onFocus={() => setTip(0)}
                            onChange={customTipHandler}
                            value={custom}
                            className="select-input inputs"
                            placeholder="Custom"
                        />
                    </div>
                </div>

                <div className="people">
                    <div className="people-fields">
                        <h1 className="field-name">Number of People</h1>
                        {isError && people <= 0 && (
                            <h1 className="people-error">Can't be zero</h1>
                        )}
                    </div>
                    <div className="people-input-container">
                        <BsFillPersonFill className="person" />
                        <input
                            type="number"
                            onFocus={() => setIsError(true)}
                            onChange={peopleHandler}
                            value={people}
                            className="people-input inputs"
                            placeholder="0"
                        />
                    </div>
                </div>
            </div>

            <div className="result-panel">
                <div className="result">
                    <div className="tip-result">
                        <div className="tip-fields">
                            <h1>Tip Amount</h1>
                            <h3>/ person</h3>
                        </div>
                        <div className="tip-result-field">
                            <h1>$</h1>
                            <h1 className="tip">
                                {result.tipResult > 0
                                    ? result.tipResult
                                    : "0.00"}
                            </h1>
                        </div>
                    </div>

                    <div className="total-result">
                        <div className="tip-fields">
                            <h1>Total</h1>
                            <h3>/ person</h3>
                        </div>
                        <div className="total-result-field">
                            <h1>$</h1>
                            <h1 className="total">
                                {result.totalResult > 0
                                    ? result.totalResult
                                    : "0.00"}
                            </h1>
                        </div>
                    </div>
                </div>

                <button className="reset-btn" onClick={resetAll}>
                    RESET
                </button>
            </div>
        </div>
    );
};
