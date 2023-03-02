export const convertPLNToUSD = (PLN) => {
  if (typeof PLN === 'string' || PLN instanceof String || PLN === undefined) {
    return NaN;
  }

  if (typeof PLN != 'string' && typeof PLN != 'number') {
    return 'Error';
  }

  let PLNtoUSD = PLN / 3.5;
  if (PLNtoUSD <= 0) {
    PLNtoUSD = 0;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
};
