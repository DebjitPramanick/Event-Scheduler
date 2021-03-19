import React, { useEffect, useState } from "react";
import "./Style.css";
import { days, months, dates } from "../Utils";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { IconButton } from "@material-ui/core";
import RestoreIcon from '@material-ui/icons/Restore';

const Calendar = ({setSchedules}) => {

    const curD = new Date().getUTCDay();
    const curM = new Date().getMonth();
    const today = new Date().getDate()
    const year = new Date().getFullYear();
    const f = new Date(year, curM, 1).getDay();

    const [month, setMonth] = useState(curM)
    const [allDates, setAllDates] = useState([]);
    const [gaps, setGaps] = useState(f)
    const [curDay, setCurDay] = useState(curD)
    const [selected, setSelected] = useState([])
    const [highlighted, sethigHlighted] = useState([])


    useEffect(() => {
        const numDays = new Date(year, month + 1, 0).getDate();

        setAllDates(dates.filter((x) => (x <= numDays))) // Generating all dates of particular month

        for (let i = 0; i < gaps; i++) {
            setAllDates(x => [' ', ...x]) // Generating start and end point of dates
        }
    }, [gaps, month]);



    // Methods ----------------------

    const handleLeft = () => {
        if (month > curM) {
            setMonth(month - 1);
            const newGaps = new Date(year, month - 1, 1).getDay();
            setGaps(newGaps);
            const newDay = new Date(year, month - 1, today).getDay();
            setCurDay(newDay)
        }
        else{
            alert("Not allowed.")
        }
    }

    const handleRight = () => {
        if (month < 11) {
            setMonth(month + 1);
            const newGaps = new Date(year, month + 1, 1).getDay();
            setGaps(newGaps);
            const newDay = new Date(year, month + 1, today).getDay();
            setCurDay(newDay)
        }
        else{
            alert("Not allowed.")
        }
    }

    const resetHandler = () => {
        setMonth(curM)
        setGaps(f)
        setCurDay(curD)
    }

    const handleSelect = (d) => {
        const sd = new Date(year, month, d).getDay();
        
        if(!highlighted.includes(d)){
            const obj = {
                date: d,
                month: months[month],
                year: year,
                day: days[sd]
            }
            console.log(obj)
            setSelected(x=>[...x,obj])
            sethigHlighted(x=>[...x,d])
        }
        else{
            const filter = selected.filter(x=>(x.date != d));
            const second_filter = highlighted.filter(x=>x!=d);
            setSelected(filter)
            sethigHlighted(second_filter)

        }
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
                                        onClick={() => handleSelect(d)}>{d}</p>
                                </div>
                            )
                        }
                        else if(highlighted.includes(d) && month === curM){
                            return (
                                <div>
                                    <p className="selected-date"
                                        onClick={() => handleSelect(d)}>{d}</p>
                                </div>
                            )
                        }
                        else if(d<today && d!==" " && month === curM){
                            return (
                                <div>
                                    <p className="invalid-date">{d}</p>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div>
                                    <p onClick={() => handleSelect(d)}>{d}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>


            {(selected.length !== 0) && (
                <button className="select-btn"
                onClick={()=>setSchedules(selected)}>
                    Select
                </button>
            )}


        </div>
    );
};

export default Calendar;
