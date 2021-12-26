
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import React, { useEffect , useRef} from 'react';
import ContentCard from './ContentCard/ContentCard';
import HackerNews from './assets/HackerNews.png'
import { AiOutlineArrowUp } from 'react-icons/ai';



function App(props) {
 
  var [data, setData]= useState([]);
  var [filterClicked, setFilter]= useState(false);
  var [popularityClicked, setPopularity]= useState(false);
  var [textClicked, setText]= useState(false);
  var [searchTerm, setSearchTerm]= useState("");
  var [mode, setMode] = useState('online');
  var [filterOption, setOption]= useState("");
  var [popularityOption, setPopularityOption]= useState("");
  var i=0;
  var items = [];
  var timeArr = [];
 const getDatas = async () => {
   axios.all([
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json').then(response=>{
      
     
    response.data.map(itemId=>{  
      return  axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`).then(response=>{
      
      
       
     if(i<=50){
      
     
        const oneDay = 24 * 60 * 60 * 1000;
        var firstDate = new Date(response.data.time *1000);
        var secondDate = new Date();
        var days = Math.round(Math.abs((secondDate - firstDate) / oneDay));
        var hours = Math.round(Math.abs(secondDate - firstDate) / 36e5);
        var minutes = hours * 60;
        var seconds = minutes * 60;
     //console.log(hours)
     
      timeArr[i] = {days,hours,minutes,seconds}
      items[i]=[response.data,timeArr[i]];
     
      
       i++;    
       if(i === 50){
         setData(items)
       localStorage.setItem("items",JSON.stringify(items));
       }
     }        
       }) 
       
   })
     
    }),
    
  
   ]).catch(err=>{
     setMode('offline')
     let collection = localStorage.getItem("items");
     setData(JSON.parse(collection));
     
     
   })  
  }
 
  useEffect(() => {  
    getDatas()
   
},[]);

function filterHandler () {
  setText(false)
  setFilter(true)
setPopularity(false)
}

function popularitYHandler ()  {

  
  setText(false)
  setFilter(false)
  setPopularity(true)
}

function textHandler ()  {

  setText(true)
  
  setFilter(false)
  setPopularity(false)
}
function searchHandler (event)  {
setSearchTerm(event.target.value)
event.preventDefault();
}
// console.log(filterOption)
var lastHours = [];

data.map(dat=>{
  return dat[1].hours <=24 ? lastHours.push(dat):null
})
//console.log(arr)
  

if(filterClicked){
  
  console.log(filterOption)
  
lastHours.sort(function(a,b){

       return b[1].hours-a[1].hours;
     
     
     
   })

  }
  
  var popularPosts = [];
  data.map(dat=>{
    return popularPosts.push(dat)
  })

if(popularityClicked){
  console.log(popularityOption)
    popularPosts.sort(function(a,b){
       return b[0].score-a[0].score;
     }  
     )
     //console.log(popularPosts);
     //popularityClicked =false;
  }

  var textPosts = [];
  data.map(dat=>{
    if(dat[0].text !=undefined){
      return textPosts.push(dat)
    }
    
  })
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };

console.log(data)



      return (
        <div className="App">
          <div >
            {
              mode==="offline" ? <div id="offlinediv">You are in offline mode</div>
              :null
            }
          </div>

          <div id="searchcontainer">
            <div id="hackcontent">
            <img id="hackerimg" src={HackerNews}></img>
          <span id="imgtextspan">
            <p>Search</p>
            <p>Hacker News</p>
          </span>
            </div>
          <input id="search" type="text" placeholder="Search stories by title, url or author" onChange={(e)=>searchHandler(e)}/>
          </div>
          
         <div id="navbar">
                  <p id="hottitle">Hot</p>
                <span className="spanbuttons">in </span><button className="buttons" onClick={()=>textHandler()}>Stories</button>
                <span className="spanbuttons">by </span><button className="buttons" onClick={()=>popularitYHandler()}>Popularity</button>
                <span className="spanbuttons">for </span><button className="buttons" onClick={()=>filterHandler()}>Last 24h</button>
              
                </div>
          <div className="App-header">
          
          {popularityClicked === true ? popularPosts.filter((val)=>{
            if(searchTerm===""){
              return val
            }else if (val[0].by.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }else if (val[0].url!=undefined &&  val[0].url.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }
            else if (val[0].title!=undefined &&  val[0].title.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }
          }).map((dat)=>(
            <ContentCard key={dat[0].id} title={dat[0].title} score={dat[0].score} by={dat[0].by} url={dat[0].url} text={dat[0].text != undefined ? dat[0].text :""}
            time={dat[1]}
              />
          )):
          filterClicked === true ? lastHours.filter((val)=>{
            if(searchTerm===""){
              return val
            }else if (val[0].by.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }else if (val[0].url!=undefined &&  val[0].url.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }else if (val[0].title!=undefined &&  val[0].title.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }
          }).map((dat)=>(
            <ContentCard key={dat[0].id} title={dat[0].title} score={dat[0].score} by={dat[0].by} url={dat[0].url} text={dat[0].title != undefined ? dat[0].text :""}
            time={dat[1] }
              />
          )):textClicked === true ? textPosts.filter((val)=>{
            if(searchTerm===""){
              return val
            }else if (val[0].by.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }else if (val[0].url!=undefined &&  val[0].url.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }else if (val[0].title!=undefined &&  val[0].title.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }
          }).map((dat)=>(
            <ContentCard key={dat[0].id} title={dat[0].title} score={dat[0].score} by={dat[0].by} url={dat[0].url} text={dat[0].text != undefined ? dat[0].text :""}
            time={dat[1] }
              />
          )):data.filter((val)=>{
            if(searchTerm===""){
              return val
            }else if (val[0].by.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }else if (val[0].url!=undefined &&  val[0].url.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }else if (val[0].title!=undefined &&  val[0].title.toLowerCase().includes(searchTerm.toLowerCase())){
              return val;
            }
          }).map((dat)=>(
            <ContentCard key={dat[0].id} title={dat[0].title} score={dat[0].score} by={dat[0].by} url={dat[0].url} text={dat[0].text != undefined ? dat[0].text :""} 
            time={dat[1]}
              />
          ))
           }
          </div>
          <div id="scrollcontainer"><span id="scrollbtntext">Back to top </span><button onClick={scrollToTop}  className="back-to-top">
          <AiOutlineArrowUp size={20}/>
        </button></div>
          
        </div>
      );
 
    }
  
    


export default App;