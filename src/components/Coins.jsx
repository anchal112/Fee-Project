import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Baseurl } from './baseUrl';
import Loader from './Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('inr');
  const [search, setSearch] = useState('');
  const currencySymbol = currency === 'inr' ? '₹' : '$';

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`, {
          cancelToken: source.token,
        });
        setCoins(data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }
    };

    getCoinsData();

    return () => {
      source.cancel('Component unmounted, request canceled.');
    };
  }, [currency]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Search Your Coins'
              style={{
                height: '2rem',
                width: '20rem',
                position: 'absolute',
                top: '1%',
                left: '35%',
                paddingLeft: '5px',
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className='btns'>
            <button onClick={() => setCurrency('inr')}>INR</button>
            <button onClick={() => setCurrency('usd')}>USD</button>
          </div>
          {coins
            .filter((data) => {
              if (search === '') {
                return data;
              } else if (data.name.toLowerCase().includes(search.toLowerCase())) {
                return data;
              }
              return null;
            })
            .map((coindata, i) => {
              return <CoinCard key={i} coindata={coindata} i={i} id={coindata.id} currencySymbol={currencySymbol} />;
            })}
        </>
      )}
    </>
  );
};

const CoinCard = ({ coindata, i, currencySymbol, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link to={`/coins/${id}`} style={{ color: 'white', textDecoration: 'none' }}>
      <div key={i} className='ex-cards'>
        <div className='image'>
          <img height={'80px'} src={coindata.image} alt='' />
        </div>
        <div className='name'>{coindata.name}</div>
        <div className='price'>
          {currencySymbol}
          {coindata.current_price.toFixed(0)}
        </div>
        <div style={profit ? { color: 'green' } : { color: 'red' }} className='rank'>
          {profit ? '+' + coindata.price_change_percentage_24h.toFixed(2) : coindata.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default Coins;
