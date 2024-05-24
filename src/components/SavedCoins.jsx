import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './savedCoins.css';

const SavedCoins = () => {
    const [savedCoins, setSavedCoins] = useState([]);

    useEffect(() => {
        const coins = JSON.parse(localStorage.getItem('savedCoins')) || [];
        console.log('Saved coins:', coins); 
        setSavedCoins(coins);
    }, []);

    return (
        <div>
            <h1>Saved Coins</h1>
            {savedCoins.length === 0 ? (
                <p>No saved coins yet.</p>
            ) : (
                <div className='saved-coins-list'>
                    {savedCoins.map((coin, i) => (
                        <div key={i} className='saved-coin-card'>
                            <div className='image'>
                                <img height={"80px"} src={coin.image} alt="" />
                            </div>
                            <div className='name'>
                                <Link to={`/coins/${coin.id}`} style={{ color: "white", textDecoration: 'none' }}>
                                    {coin.name}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedCoins;
