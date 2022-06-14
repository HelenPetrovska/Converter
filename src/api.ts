export const BASE_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

export const getCours = async () => {
  const response = await fetch(BASE_URL);

  return response.json();
};
