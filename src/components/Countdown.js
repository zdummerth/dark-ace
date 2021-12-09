import React, { useState, useEffect } from 'react';

function Countdown() {

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        let difference = +new Date(`2021-12-10T07:00:00`) - +new Date();

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hr: Math.floor((difference / (1000 * 60 * 60)) % 24),
                min: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval}>
                {/* {timeLeft[interval]}{interval === 'secs' ? '' : ':'} */}
                {timeLeft[interval]} {interval} {interval === 's' ? '' : ' : '}
            </span>
        );
    });
    return (
        <div>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    )
}

export default Countdown;