import React from 'react';

type Props = {
  usdBuy: string,
  euroBuy: string,
  usdSale: string,
  euroSale: string,
};

export const Header: React.FC<Props> = ({
  usdBuy,
  euroBuy,
  usdSale,
  euroSale,
}) => {
  return (
    <>
      {usdBuy}
      {euroBuy}
      {usdSale}
      {euroSale}
    </>
  );
};
