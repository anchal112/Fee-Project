import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Baseurl } from './baseUrl'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const Coinchart = ({currency}) => {
    const [chartData,setChartData]=useState([])
    const {id} = useParams()
    const [days,setDays]=useState(1)
    const CoinChartData=async()=>{
      try{
        const {data} =await axios.get(`${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
        setChartData(data.prices)
        // console.log(data.prices)
    }catch (error){
        console.log(error)
    }
      }
    useEffect(()=>{
        CoinChartData()
    },[currency,id,days])

  const myData={
    labels:chartData.map((value)=>{
        const date=new Date(value[0])
        const time=date.getHours()>12 
        ? `${date.getHours()-12} : ${date.getMinutes()} PM`
        : `${date.getHours()} : ${date.getMinutes()} AM`
        return days===1 ? time : date.toLocaleDateString();
    }),
    datasets:[
        {
            label:`Price in Past days ${days} in ${currency} `,
            data:chartData.map((value)=>value[1]),
            borderColor:'orange',
            borderWidth:'3'

        }
    ]

  }
  const saveCoin = async (id, currency) => {
    let savedCoins = JSON.parse(localStorage.getItem('savedCoins'));
  
    if (!savedCoins) {
      savedCoins = [];
    }
  
    const coin = {
      id,
      currency,
      name: await getCoinName(id), // Optional: Fetch coin name if needed
    };
  
    // Check for duplicates before saving
    const alreadySaved = savedCoins.find((savedCoin) => savedCoin.id === id);
    if (!alreadySaved) {
      savedCoins.push(coin);
      localStorage.setItem('savedCoins', JSON.stringify(savedCoins));
      console.log(`Coin (ID: ${id}, Currency: ${currency}) saved successfully!`);
    } else {
      console.log(`Coin (ID: ${id}) already saved.`);
    }
  };

  const getCoinName = async (id) => {
    // Replace with your API call to fetch coin name based on ID
    const response = await axios.get(`${Baseurl}/coins/${id}`);
    return response.data.name;
  };


  return (
    <>
    {
        chartData.length===0 ? (<Loader/>) : (
            <div>
      {/* <Line data={myData}/> */}
      <Line data={myData} options={{
        elements:{
            point:{
                radius:1,
            }
        }
      }} style={{marginTop:"5rem",width:"60rem"}} />
      <div className='btn' style={{marginTop:"30px"}}>
                    <button onClick={()=>setDays(1)}>24 HOURS</button>
                    <button onClick={()=>setDays(30)}>1 MONTH</button>
                    <button onClick={()=>setDays(365)}>1 YEAR</button>
                    {/* <button onClick={() => saveCoin(id, currency)}>Save Coin</button> */}
      </div>
    </div>
        )
    }
    </>
  )
}

export default Coinchart
