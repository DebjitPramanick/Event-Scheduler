import React, { useEffect, useState } from "react";
import "./Style.css";
import { days, months, dates } from "../Utils";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { IconButton } from "@material-ui/core";

const Calendar = () => {

    const curD = new Date().getUTCDay();
    const curM = new Date().getMonth();
    const today = new Date().getDate()
    const year = new Date().getFullYear();
    const f = new Date(year, curM, 1).getDay();

    const [num, setNum] = useState(0);
    const [month, setMonth] = useState(curM)
    

    useEffect(() => {
        function daysInMonth(month, year) {
            const days = new Date(year, month, 0).getDate();
            return days;
        }
        setNum(daysInMonth((curM + 1), year))
    }, []);

    const thisMonth = dates.filter((x) => (x <= num))
    for (let i = 0; i < f; i++) {
        thisMonth.unshift(' ');
    }

    // Methods ----------------------

    const handleLeft = () => {
        if(month>0){
            setMonth(month-1);
        }
    }
    const handleRight = () => {
        if(month<11){
            setMonth(month+1);
        }
        
    }

    return (
        <div className="calendar-container">
            <div className="header">Date Picker</div>

            <div className="months">
                <div className="left">
                    <IconButton onClick={handleLeft}>
                        <ArrowLeftIcon />
                    </IconButton>
                </div>


                <p>{months[month]}</p>


                <div className="right">
                    <IconButton onClick={handleRight}>
                        <ArrowRightIcon />
                    </IconButton>
                </div>
            </div>


            <div className="container">
                <div className="days">
                    {days.map((d) => {
                        if (days[curD] === d) {
                            return <p className="cur-day">{d.slice(0, 3)}</p>;
                        } else {
                            return <p>{d.slice(0, 3)}</p>;
                        }
                    })}
                </div>

                <div className="dates">

                    {thisMonth.map((d) => {
                        if (today === d) {
                            return (
                                <div>
                                    <p className="cur-date">{d}</p>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div>
                                    <p>{d}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>


        </div>
    );
};

export default Calendar;
