import React, { useEffect, useState } from 'react';
import { getCours } from './api';
import './App.scss';
import { CurrencyExchange } from './components/CurrencyExchange/CurrencyExchange';
import { Header } from './components/Header';

interface Cours {
  ccy: string,
  base_ccy: string,
  buy: string,
  sale: string,
}

export const App: React.FC = () => {
  const [usdBuy, setUsdBuy] = useState('');
  const [euroBuy, setEuroBuy] = useState('');

  const [usdSale, setUsdSale] = useState('');
  const [euroSale, setEuroSale] = useState('');

  useEffect(() => {
    const coursesAll = async () => {
      const courses = await getCours();

      const usdCours = courses.find((el: Cours) => el.ccy === 'USD');

      setUsdBuy(usdCours.buy);
      setUsdSale(usdCours.sale);

      const euroCours = courses.find((el: Cours) => el.ccy === 'EUR');

      setEuroBuy(euroCours.buy);
      setEuroSale(euroCours.sale);
    };

    coursesAll();
  }, []);

  return (
    <div className="starter">
      <Header
        usdBuy={usdBuy}
        euroBuy={euroBuy}
        usdSale={usdSale}
        euroSale={euroSale}
      />

      <CurrencyExchange
        usdBuy={usdBuy}
        euroBuy={euroBuy}
        usdSale={usdSale}
        euroSale={euroSale}
      />
    </div>
  );
};
