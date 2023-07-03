const apiKey = process.env.currency_api_key;

const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair`;

const exchange = async (from, to, amount = 1) => {
  const url = `${baseUrl}/${from}/${to}/${amount}`;

  const responseRaw = await fetch(url);
  const response = await responseRaw.json();

  return response.conversion_result;
};

const exchangeAll = async (items) => Promise.all(items.map(({ from, to, amount }) => exchange(from, to, amount)));

export {
  exchange,
  exchangeAll,
};

export default exchangeAll;
