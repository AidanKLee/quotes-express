const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const createId = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let id = Array(4).fill('');
  id = id.map(part => {
    for (let i = 0; i < 5; i++) {
      const randomI = Math.floor(Math.random() * characters.length);
      part = part + characters[randomI]
    }
    return part
  }).join('-')
  return id;
}

const isCopy = ({ quote }, array) => {
  let copy = false;
  array.forEach(q => {
    if (q.quote.toLowerCase() === quote.toLowerCase() || q.quote.toLowerCase().includes(quote.toLowerCase()) || quote.toLowerCase().includes(q.quote.toLowerCase())) {
      copy = true
    }
  })
  return copy;
}

module.exports = {
  getRandomElement,
  createId,
  isCopy
};
