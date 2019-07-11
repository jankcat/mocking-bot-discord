const Fuse = require('fuse.js');
const { Attachment } = require('discord.js');

module.exports = async function(message, term) {
  const fuse = new Fuse(memes, searchOptions);
  const result = fuse.search(term);

  if (result && result[0] && result[0].item.url) {
    const image = new Attachment(result[0].item.url);
    message.channel.send(image);
  } else {
    message.channel.send(`Unable to find "${term}". Get good. Uninstall.`);
  }
};

const searchOptions = {
  shouldSort: true,
  includeScore: true,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  threshold: 0.6,
  location: 0,
  distance: 1000,
  maxPatternLength: 256,
  minMatchCharLength: 1,
  keys: [
    "terms"
  ]
};

const memes = [
  { terms: ['I must say you\'re here sooner than expected', 'I must say youre here sooner than expected'], url: "https://i.imgur.com/ZXW62ch.png" },
  { terms: ['yep'], url: "https://i.imgur.com/CAxQxyc.png" },
  { terms: ['no no no, nothing too fancy'], url: "https://i.imgur.com/1mvcKJ3.jpg" },
  { terms: ['lies, deception'], url: "https://i.imgur.com/OSLtEye.png" },
  { terms: ['ironic'], url: "https://i.imgur.com/sV4IVKY.jpg" },
  { terms: ['diplomatic solution', 'aggressive negotiations'], url: "https://i.imgur.com/krau0MZ.png" },
  { terms: ['it\'ts treason then', 'itts treason then'], url: "https://i.imgur.com/4LLa8Te.jpg" },
  { terms: ['i shouldn\'t', 'i shouldnt'], url: "https://i.imgur.com/T5LulqF.jpg" },
  { terms: ['use my knowledge, i beg you'], url: "https://i.imgur.com/570NAsX.jpg" },
  { terms: ['oh, i dont think so', 'oh, i don\'t think so'], url: "https://i.imgur.com/zu3V6vS.jpg" },
  { terms: ['this is where the fun begins'], url: "https://i.imgur.com/QBSrolW.jpg" },
  { terms: ['you assume too much'], url: "https://i.imgur.com/5JAEQf4.jpg" },
  { terms: ['we\'ll see', 'well see'], url: "https://i.imgur.com/zchtkJg.png" },
  { terms: ['Im just a simple man trying to make his way in the universe', 'I\'m just a simple man trying to make his way in the universe'], url: "https://i.imgur.com/Rze1sUb.jpg" },
  { terms: ['just like the simulations'], url: "https://i.imgur.com/nn5w5f9.jpg" },
  { terms: ['now we\'re really picking up speed'], url: "https://i.imgur.com/S7nMlKq.jpg" },
  { terms: ['what about the droid attack on the wookies'], url: "https://i.imgur.com/fE08xyg.jpg" },
  { terms: ['visibly surprised'], url: "https://i.imgur.com/cOFXW1u.png" },
  { terms: ['at last we are getting results'], url: "https://i.imgur.com/0hOHV9j.png?1" },
  { terms: ['I\'ve been looking forward to this'], url: "https://i.imgur.com/66n2UJa.jpg" },
  { terms: ['I\'ve become more powerful than any Jedi has ever dreamed of'], url: "https://i.imgur.com/Jp6tBiv.png" },
  { terms: ['I want more, and I know I shouldn\'t'], url: "https://i.imgur.com/6cOgsiP.jpg" },
  { terms: ['What is going on down there?'], url: "https://i.imgur.com/YvUQCq6.jpg" },
  { terms: ['Looks pretty bad'], url: "https://i.imgur.com/Fy0Gw2s.jpg" },
  { terms: ['Time to abandon ship!'], url: "https://i.imgur.com/cp6DZmO.png" },
  { terms: ['Impossible, perhaps the archives are incomplete'], url: "https://i.imgur.com/VgK1xyF.jpg" },
  { terms: ['We were on the verge of greatness', 'We were this close!'], url: "https://i.imgur.com/bCjWvay.png" },
  { terms: ['possibly'], url: "https://i.imgur.com/asReGB6.jpg" },
  { terms: ['This had nothing to do with me, I assure you'], url: "https://i.imgur.com/ass2WmB.png" },
  { terms: ['we stand here amidst my achievements, not yours'], url: "https://i.imgur.com/fdksuzN.png" },
  { terms: ['The attempt on my life has left me scarred and deformed'], url: "https://i.imgur.com/ANbSv2W.jpg" },
  { terms: ['don\'t worry, I\'ve given up trying to argue with you'], url: "https://i.imgur.com/PQEWoBj.jpg" },
  { terms: ['I don\'t know'], url: "https://i.imgur.com/UtXqmQK.jpg" },
  { terms: ['this is outrageous, it\'s unfair'], url: "https://i.imgur.com/TyhtJV6.jpg" },
  { terms: ['all too easy'], url: "https://i.imgur.com/coKR0s0.png" },
  { terms: ['not. yet.'], url: "https://i.imgur.com/ihmizjX.jpg" },
];
