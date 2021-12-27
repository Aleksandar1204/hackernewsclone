
import '../App.css';
import './ContentCard.css'

import { useState } from 'react';
import React, { useEffect, useRef } from 'react';

import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { MdAccessTime } from 'react-icons/md';




function ContentCard(props) {

    var days = props.time.days;
    var hours = props.time.hours;
    var minutes = props.time.minutes;
    var seconds = props.time.seconds;
    var url = props.url;

    if (url != undefined) {
        var pathArray = url.split('/');
        var protocol = pathArray[0];
        var host = pathArray[2];
        var url1 = protocol + '//' + host;
    }

    //console.log(url1)
    return (
        <div id="cardcontainer">
            <div id="card">
                <h3>{props.title}</h3>
                <ul>
                    <AiOutlineHeart /><li>{`${props.score} points`}</li>
                    <HiOutlineUser /><li>{props.by}</li>
                    <MdAccessTime /><li>{days > 1 ? days + "days ago"
                        : hours > 24 && days === 1 ? days + "day ago"
                            : minutes >= 60 ? hours + "hours ago" : hours === 1 ? hours + "hour ago"
                                : minutes === 1 ? minutes + "minute ago" : seconds >= 60 ? minutes + "minutes ago"
                                    : "now"}</li>
                    <li><a href={props.url} target="_blank">{url1}</a></li>
                </ul>
                <p>{props.text}</p>
            </div>
        </div>
    )
}


export default ContentCard;