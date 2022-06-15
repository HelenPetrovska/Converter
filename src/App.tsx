import React, { useEffect, useState } from 'react';
import { getCours } from './api';
import './App.scss';

interface Course {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

export const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [currencyFirst, setCurrencyFirst] = useState('UAH');
  const [currencySecond, setCurrencySecond] = useState('USD');
  const [amount, setAmount] = useState<number | string>('');
  const [currentAmount, setCurrentAmount] = useState<number | string>('');

  useEffect(() => {
    const coursesAll = async () => {
      const coursesApi = await getCours();
      const coursesNeed = [
        ...coursesApi,
        {
          ccy: 'UAH',
          base_ccy: 'UAH',
          buy: '1',
          sale: '1',
        },
      ];

      setCourses(coursesNeed);
    };

    coursesAll();
  }, []);

  const usd = courses.find(rate => rate.ccy === 'USD');
  const eur = courses.find(rate => rate.ccy === 'EUR');

  const changeCurrencyFirst = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencyFirst(event.target.value);
  };

  const changeCurrencySecond = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencySecond(event.target.value);
  };

  const changeСurrentAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rateBuy = courses.find(el => el.ccy === currencyFirst)?.buy || 0;
    const rateSale = courses.find(el => el.ccy === currencySecond)?.sale || 0;
    const rate = +rateSale / +rateBuy;

    setCurrentAmount(+event.target.value);

    if (currencyFirst === currencySecond) {
      setAmount(+event.target.value);
    } else {
      setAmount(+event.target.value * rate);
    }
  };

  const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rateBuy = courses.find(el => el.ccy === currencyFirst)?.buy || 0;
    const rateSale = courses.find(el => el.ccy === currencySecond)?.sale || 0;
    const rate = +rateBuy / +rateSale;

    setAmount(+event.target.value);

    if (currencyFirst === currencySecond) {
      setCurrentAmount(+event.target.value);
    } else {
      setCurrentAmount(+event.target.value * rate);
    }
  };

  // eslint-disable-next-line no-console
  console.log(courses, amount, currentAmount);

  return (
    <div className="converter">
      <h1 className="converter__title">Converter</h1>
      <div className="converter-header">
        <div className="converter-header__item">
          <div className="currency">
            <div className="currency__title">
              {usd && usd.ccy}
            </div>
            <div className="currency__exchange">
              {usd && Math.floor(+usd.buy * 100) / 100}
              {usd && Math.floor(+usd.sale * 100) / 100}
            </div>
          </div>
        </div>

        <div className="converter-header__item">
          <div className="currency">
            <div className="currency__title">
              {eur && eur.ccy}
            </div>
            <div className="currency__exchange">
              {eur && Math.floor(+eur.buy * 100) / 100}
              {eur && Math.floor(+eur.sale * 100) / 100}
            </div>
          </div>
        </div>
      </div>

      <div className="converter__selecters selecters">
        <select
          name="courses"
          value={currencyFirst}
          onChange={changeCurrencyFirst}
        >
          {courses.map(currency => (
            <option
              key={currency.ccy}
              value={currency.ccy}
            >
              {currency.ccy}
            </option>
          ))}
        </select>

        <label htmlFor="exchange-input-first">
          <input
            type="number"
            id="exchange-input-first"
            value={Math.floor(+amount * 100) / 100}
            onChange={changeAmount}
          />
        </label>

        <select
          name="courses"
          value={currencySecond}
          onChange={changeCurrencySecond}
        >
          {courses.map(currency => (
            <option
              key={currency.ccy}
              value={currency.ccy}
            >
              {currency.ccy}
            </option>
          ))}
        </select>

        <label htmlFor="exchange-input-second">
          <input
            type="number"
            id="exchange-input-second"
            value={Math.floor(+currentAmount * 100) / 100}
            onChange={changeСurrentAmount}
          />
        </label>
      </div>
    </div>
  );
};
