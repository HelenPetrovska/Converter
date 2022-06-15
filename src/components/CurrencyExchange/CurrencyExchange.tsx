import React, { useState } from 'react';

type Props = {
  usdBuy: string,
  euroBuy: string,
  usdSale: string,
  euroSale: string,
};

export const CurrencyExchange: React.FC<Props> = ({
  usdBuy,
  euroBuy,
  usdSale,
  euroSale,
}) => {
  const [currencyFirst, setCurrencyFirst] = useState('UAH');
  const [currencySecond, setCurrencySecond] = useState('USD');
  const [amount, setAmount] = useState<number>();
  const [currentAmount, setCurrentAmount] = useState<number>();

  const changeCurrencyFirst = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencyFirst(event.target.value);
  };

  const changeCurrencySecond = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencySecond(event.target.value);
  };

  const changeСurrentAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currencyFirst === 'UAH' && currencySecond === 'USD') {
      setCurrentAmount(+event.target.value / +usdBuy);
    }

    if (currencyFirst === 'USD' && currencySecond === 'UAH') {
      setCurrentAmount(+event.target.value * +usdBuy);
    }

    if (currencyFirst === 'UAH' && currencySecond === 'EURO') {
      setCurrentAmount(+event.target.value / +euroBuy);
    }

    if (currencyFirst === 'EURO' && currencySecond === 'UAH') {
      setCurrentAmount(+event.target.value * +euroBuy);
    }

    if (currencyFirst === currencySecond) {
      setCurrentAmount(+event.target.value);
    }

    if (currencyFirst === 'USD' && currencySecond === 'EURO') {
      setCurrentAmount((+event.target.value / +euroBuy) * +usdSale);
    }

    if (currencyFirst === 'EURO' && currencySecond === 'USD') {
      setCurrentAmount((+event.target.value / +usdBuy) * +euroSale);
    }

    setAmount(+event.target.value);
  };

  const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currencyFirst === 'UAH' && currencySecond === 'USD') {
      setAmount(+event.target.value * +usdBuy);
    }

    if (currencyFirst === 'USD' && currencySecond === 'UAH') {
      setAmount(+event.target.value / +usdBuy);
    }

    if (currencyFirst === 'UAH' && currencySecond === 'EURO') {
      setAmount(+event.target.value * +euroBuy);
    }

    if (currencyFirst === 'EURO' && currencySecond === 'UAH') {
      setAmount(+event.target.value / +euroBuy);
    }

    if (currencyFirst === currencySecond) {
      setAmount(+event.target.value);
    }

    if (currencyFirst === 'USD' && currencySecond === 'EURO') {
      setAmount((+event.target.value * +euroBuy) / +usdSale);
    }

    if (currencyFirst === 'EURO' && currencySecond === 'USD') {
      setAmount((+event.target.value * +usdBuy) / +euroSale);
    }

    setCurrentAmount(+event.target.value);
  };

  return (
    <>
      <select
        name="courses"
        value={currencyFirst}
        onChange={changeCurrencyFirst}
      >
        <option value="USD">USD</option>
        <option value="EURO">EURO</option>
        <option value="UAH">UAH</option>
      </select>
      <label htmlFor="exchange-input-first">
        <input
          type="number"
          id="exchange-input-first"
          value={amount}
          onChange={changeСurrentAmount}
        />
      </label>

      <select
        name="courses"
        value={currencySecond}
        onChange={changeCurrencySecond}
      >
        <option value="USD">USD</option>
        <option value="EURO">EURO</option>
        <option value="UAH">UAH</option>
      </select>
      <label htmlFor="exchange-input-second">
        <input
          type="number"
          id="exchange-input-second"
          value={currentAmount}
          onChange={changeAmount}
        />
      </label>
    </>
  );
};
