import React, { useEffect, useState } from "react";
import "./Style.css";
import { days, months, dates } from "../Utils";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { IconButton } from "@material-ui/core";
import RestoreIcon from '@material-ui/icons/Restore';

const Calendar = () => {

    const curD = new Date().getUTCDay();
    const curM = new Date().getMonth();
    const today = new Date().getDate()
    const year = new Date().getFullYear();
    const f = new Date(year, curM, 1).getDay();

    const [num, setNum] = useState(0);
    const [month, setMonth] = useState(curM)
    const [allDates, setAllDates] = useState([]);
    const [gaps, setGaps] = useState(f)
    

    useEffect(() => {
        function daysInMonth(month, year) {
            const days = new Date(year, month, 0).getDate();
            return days;
        }
        setNum(daysInMonth(4, year)) // Setting the number of days in a month
    
        setAllDates(dates.filter((x) => (x <= num))) // Generating all dates of particular month

        for (let i = 0; i < gaps; i++) {
            setAllDates(x=>[' ',...x]) // Generating start and end point of dates
        }
    }, [num,gaps]);


    // Methods ----------------------

    const handleLeft = () => {
        if(month>0){
            setMonth(month-1);
            const newGaps = new Date(year, month-1, 1).getDay();
            setGaps(newGaps);
        }
    }
    const handleRight = () => {
        if(month<11){
            setMonth(month+1);
            const newGaps = new Date(year, month+1, 1).getDay();
            setGaps(newGaps);
        }
    }

    const resetHandler = () =>{
        setMonth(curM)
    }

    return (
        <div className="calendar-container">
            <IconButton className="restore"
            onClick={resetHandler}>
                <RestoreIcon />
            </IconButton>
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

                    {allDates.map((d) => {
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
