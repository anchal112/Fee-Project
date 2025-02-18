import React, { useEffect, useState } from 'react';
import { Baseurl } from './baseUrl';
import Loader from './Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './coinDetails.css';
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import Coinchart from './Coinchart';

const CoinDetails = () => {
    const [coin, setCoin] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [currency, setCurrency] = useState('inr');
    const currencySymbol = currency === 'inr' ? '₹' : '$';
    const profit = coin.market_data?.price_change_percentage_24h > 0;

    useEffect(() => {
        const getCoin = async () => {
            try {
                const { data } = await axios.get(`${Baseurl}/coins/${id}`);
                console.log(data);
                setCoin(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getCoin();
    }, [id]);

    const saveCoin = () => {
        let savedCoins = JSON.parse(localStorage.getItem('savedCoins')) || [];
        console.log('Saved coins before saving:', savedCoins); 
        if (!savedCoins.some(savedCoin => savedCoin.id === coin.id)) {
            savedCoins.push({ id: coin.id, name: coin.name, image: coin.image?.large });
            localStorage.setItem('savedCoins', JSON.stringify(savedCoins));
            alert('Coin saved successfully!');
        } else {
            alert('Coin is already saved.');
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className='coin-detail' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div className='coin-info'>
                        <div className='btn'>
                            <button onClick={() => setCurrency('inr')}>INR</button>
                            <button onClick={() => setCurrency('usd')}>USD</button>
                        </div>
                        <div className="time">
                            {coin.last_updated}
                        </div>
                        <div className="coin-image">
                            <img height={"150px"} src={coin.image?.large} alt="" />
                        </div>
                        <div className="coin-name">
                            {coin.name}
                        </div>
                        <div className="coin-price">
                            {currencySymbol} {coin.market_data.current_price[currency]}
                        </div>
                        <div className="coin-profit">
                            {profit ? <BiSolidUpArrow color='green' /> : <BiSolidDownArrow color='red' />}
                            {coin.market_data.price_change_percentage_24h}%
                        </div>
                        <div className="market-rank">
                            <IoPulseOutline color='orange' />
                            #{coin.market_cap_rank}
                        </div>
                        <div className="coin-desc">
                            <p>{coin.description['en'].split('.')[0]}</p>
                        </div>
                        <button onClick={saveCoin}>Save Coin</button>
                    </div>
                    <Coinchart currency={currency} />
                </div>
            )}
        </>
    );
};

export default CoinDetails;
