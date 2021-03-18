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
    const [curDay, setCurDay] = useState(curD)


    useEffect(() => {
        function daysInMonth(month, year) {
            const days = new Date(year, month, 0).getDate();
            return days;
        }
        setNum(daysInMonth(month+1, year)) // Setting the number of days in a month

        setAllDates(dates.filter((x) => (x <= num))) // Generating all dates of particular month

        for (let i = 0; i < gaps; i++) {
            setAllDates(x => [' ', ...x]) // Generating start and end point of dates
        }
    }, [num, gaps, month]);



    // Methods ----------------------

    const handleLeft = () => {
        if (month > 0) {
            setMonth(month - 1);
            const newGaps = new Date(year, month - 1, 1).getDay();
            setGaps(newGaps);
            const newDay = new Date(year, month-1, today).getDay();
            setCurDay(newDay)
        }
    }

    const handleRight = () => {
        if (month < 11) {
            setMonth(month + 1);
            const newGaps = new Date(year, month + 1, 1).getDay();
            setGaps(newGaps);
            const newDay = new Date(year, month+1, today).getDay();
            setCurDay(newDay)
        }
    }

    const resetHandler = () => {
        setMonth(curM)
        setGaps(f)
        setCurDay(curD)
    }

    const handleDate = (d) =>{
        const newDay = new Date(year, month, d).getDay();
        console.log(d,months[month],year,days[newDay])
    }

    return (
        <div className="calendar-container">
            <IconButton className="restore"
                onClick={resetHandler}>
                <RestoreIcon />
            </IconButton>

            <p className="show-year">{year}</p>


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
                        if (days[curDay] === d) {
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
                                    <p className="cur-date"
                                    onClick={() => handleDate(d)}>{d}</p>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div>
                                    <p onClick={() => handleDate(d)}>{d}</p>
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
