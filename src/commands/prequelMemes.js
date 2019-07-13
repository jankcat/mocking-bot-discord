const Fuse = require('fuse.js');
const { Attachment } = require('discord.js');

module.exports = async function(message, term) {
  const saniTerm = term.replace(/[^0-9a-z ]/gi, '').toLowerCase().trim();
  let fuse = new Fuse(memes, searchOptions);
  let result = fuse.search(saniTerm);
  
  if (!result || !result[0] || !result[0].item.url) {
    fuse = new Fuse(memes, secondSearchOptions);
    result = fuse.search(saniTerm);
  }

  if (result && result[0] && result[0].item.url) {
    const image = new Attachment(result[0].item.url);
    message.channel.send(image);
    console.log(`[${message.guild.name}][${message.channel.name}] ${message.author.username} prequel meme'd '${term}'.`);
  } else {
    message.channel.send(`Unable to find "${term}". Get good. Uninstall.`);
    console.log(`[${message.guild.name}][${message.channel.name}] ${message.author.username} prequel meme'd '${term}', to no avail.`);
  }
};

const searchOptions = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  includeScore: true,
  threshold: 0.6,
  location: 0,
  distance: 1000,
  maxPatternLength: 256,
  minMatchCharLength: 1,
  keys: [
    "terms"
  ]
};

const secondSearchOptions = {
  shouldSort: true,
  findAllMatches: true,
  includeScore: true,
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
  { terms: ['I must say youre here sooner than expected'], url: "https://i.imgur.com/WjZPrw3.png" },
  { terms: ['yep'], url: "https://i.imgur.com/ObCjmIA.png" },
  { terms: ['no no no nothing too fancy'], url: "https://i.imgur.com/p1pyC5D.jpg" },
  { terms: ['lies deception'], url: "https://i.imgur.com/Oszl5B9.png" },
  { terms: ['ironic'], url: "https://i.imgur.com/YON60zD.png" },
  { terms: ['diplomatic solution', 'aggressive negotiations'], url: "https://i.imgur.com/j1L74yz.png" },
  { terms: ['its treason then'], url: "https://i.imgur.com/YJGyyaP.jpg" },
  { terms: ['i shouldnt'], url: "https://i.imgur.com/fRCMFLC.jpg" },
  { terms: ['use my knowledge i beg you'], url: "https://i.imgur.com/aBS8M0j.jpg" },
  { terms: ['oh i dont think so'], url: "https://i.imgur.com/hQ60R3B.jpg" },
  { terms: ['this is where the fun begins'], url: "https://i.imgur.com/wcSAUzH.jpg" },
  { terms: ['you assume too much'], url: "https://i.imgur.com/tBrIgWl.jpg" },
  { terms: ['well see'], url: "https://i.imgur.com/o1WxmrT.png" },
  { terms: ['Im just a simple man trying to make my way in the universe'], url: "https://i.imgur.com/0d9tP6x.jpg" },
  { terms: ['just like the simulations'], url: "https://i.imgur.com/RBikN4M.jpg" },
  { terms: ['now were really picking up speed'], url: "https://i.imgur.com/6qccFuF.jpg" },
  { terms: ['what about the droid attack on the wookies'], url: "https://i.imgur.com/7rJaVP7.jpg" },
  { terms: ['visibly surprised'], url: "https://i.imgur.com/os7QyvE.png" },
  { terms: ['at last we are getting results'], url: "https://i.imgur.com/uEwIG8i.jpg" },
  { terms: ['Ive been looking forward to this'], url: "https://i.imgur.com/ix1ggrJ.jpg" },
  { terms: ['Ive become more powerful than any Jedi has ever dreamed of'], url: "https://i.imgur.com/K8CXWHG.png" },
  { terms: ['I want more and I know I shouldnt'], url: "https://i.imgur.com/IMQIzgP.jpg" },
  { terms: ['What is going on down there?'], url: "https://i.imgur.com/HIp5nrO.jpg" },
  { terms: ['Looks pretty bad'], url: "https://i.imgur.com/Fyy0fyv.jpg" },
  { terms: ['Time to abandon ship!'], url: "https://i.imgur.com/TbrPu8x.png" },
  { terms: ['Impossible perhaps the archives are incomplete'], url: "https://i.imgur.com/3DTXTfE.jpg" },
  { terms: ['We were on the verge of greatness', 'We were this close'], url: "https://i.imgur.com/hk3I4oI.png" },
  { terms: ['possibly'], url: "https://i.imgur.com/5pfmHIR.jpg" },
  { terms: ['This had nothing to do with me I assure you'], url: "https://i.imgur.com/eOuh6Tw.png" },
  { terms: ['we stand here amidst my achievements not yours'], url: "https://i.imgur.com/BCmiWTw.png" },
  { terms: ['The attempt on my life has left me scarred and deformed'], url: "https://i.imgur.com/7V05JZs.jpg" },
  { terms: ['dont worry, Ive given up trying to argue with you'], url: "https://i.imgur.com/2qdFi69.jpg" },
  { terms: ['I dont know'], url: "https://i.imgur.com/McKGjOD.jpg" },
  { terms: ['this is outrageous, its unfair', 'thats not fair'], url: "https://i.imgur.com/FcIcleZ.jpg" },
  { terms: ['all too easy'], url: "https://i.imgur.com/ltKwerj.png" },
  { terms: ['not. yet.', 'not yet'], url: "https://i.imgur.com/UgE9RHg.jpg" },
  { terms: ['i object there is no proof', 'i object! there is no proof!'], url: "https://i.imgur.com/TPRzLlD.jpg" },
  { terms: ['are you threatening me master jedi', 'are you threatening me, master jedi?'], url: "https://i.imgur.com/bBWlfB0.jpg" },
  { terms: ['not to worry we are still flying half a ship'], url: "https://i.imgur.com/1HDOs8H.jpg" },
  { terms: ['hold on this whole operation was your idea'], url: "https://i.imgur.com/IRj03c6.jpg" },
  { terms: ['ah, victory', 'ahh, victory'], url: "https://i.imgur.com/j5MLR2S.jpg" },
  { terms: ['your clones are very impressive, you must be very proud'], url: "https://i.imgur.com/hhcC5TN.png" },
  { terms: ['it ought to be here but it isnt'], url: "https://i.imgur.com/jpB8VmH.jpg" },
  { terms: ['its a trick send no reply'], url: "https://i.imgur.com/kW9REwx.jpg" },
  { terms: ['well, whaddya know?', 'well, what do you know?', 'well, whatdaya know?', 'well, whattaya know?', 'well, whadaya know?'], url: "https://i.imgur.com/HnizbkC.jpg" },
  { terms: ['i must be frank your majesty'], url: "https://i.imgur.com/j3Q8lhm.png" },
  { terms: ['i cant watch anymore'], url: "https://i.imgur.com/BXpn08U.jpg" },
  { terms: ['sector clear', 'not clear! not clear!'], url: "https://i.imgur.com/tsemlGl.png" },
  { terms: ['execute order 66'], url: "https://i.imgur.com/ltVYTui.jpg" },
  { terms: ['general kenobi', 'general kenobi you are a bold one', 'you are a bold one'], url: "https://i.imgur.com/oLVWWFk.jpg" },
  { terms: ['theres always a bigger fish'], url: "https://i.imgur.com/G8rn77l.jpg" },
  { terms: ['the ability to speak does not make you intelligent'], url: "https://i.imgur.com/VMMqd8D.png" },
  { terms: ['always on the move'], url: "https://i.imgur.com/aEdJ2IZ.png" },
  { terms: ['this is getting out of hand. now there are two of them'], url: "https://i.imgur.com/SGvuevl.jpg" },
  { terms: ['i dont want to hear anymore about obi-wan'], url: "https://i.imgur.com/8ZMNIxM.jpg" },
  { terms: ['i sense a trap'], url: "https://i.imgur.com/rb9ikvY.png" },
  { terms: ['i have to admit that without the clones it would not have been a victory'], url: "https://i.imgur.com/bDs9sZR.png" },
  { terms: ['hello there'], url: "https://i.imgur.com/78pYuOv.jpg" },
  { terms: ['do it', 'dewit'], url: "https://i.imgur.com/wZGNNI0.png" },
  { terms: ['dont try it', 'dont try it anakin'], url: "https://i.imgur.com/W3SjuEz.jpg" },
  { terms: ['oh, this is going to be easy'], url: "https://i.imgur.com/Gf3caK8.jpg" },
  { terms: ['thats why im here'], url: "https://i.imgur.com/2eoHyTp.jpg" },
  { terms: ['this will make a fine addition to my collection'], url: "https://i.imgur.com/ojnOZPT.jpg" },
  { terms: ['good call my young padawan'], url: "https://i.imgur.com/eeYHLrS.jpg" },
  { terms: ['i dont like sand', 'i hate sand'], url: "https://i.imgur.com/csl3348.jpg" },
  { terms: ['another happy landing'], url: "https://i.imgur.com/5bug1GB.jpg" },
  { terms: ['credits will do fine', 'no they wont'], url: "https://i.imgur.com/M0k6g2v.png" },
  { terms: ['it is critical we send an attack group there immediately'], url: "https://i.imgur.com/AUQqt5N.png" },
  { terms: ['this effort is no longer profitable'], url: "https://i.imgur.com/2GvJD2j.jpg" },
  { terms: ['calm down anakin'], url: "https://i.imgur.com/3LWG9rN.jpg" },
  { terms: ['its working', 'its working its working'], url: "https://i.imgur.com/IVz2wXj.jpg" },
  { terms: ['it will be tricky'], url: "https://i.imgur.com/m1ohiRV.jpg" },
  { terms: ['i killed them all not just the men but the women and the children too', 'not just the men'], url: "https://i.imgur.com/1BcTktI.jpg" },
  { terms: ['we wont be seeing him again', 'we wont see him again'], url: "https://i.imgur.com/faigbfP.jpg" },
  { terms: ['you were right about one thing master the negotiations were short', 'the negotiations were short'], url: "https://i.imgur.com/w985AU3.jpg" },
  { terms: ['your thoughts dwell on your mother'], url: "https://i.imgur.com/5VPOew4.jpg" },
  { terms: ['did you ever hear the tragedy of darth plagueis the wise', 'darth plagueis'], url: "https://i.imgur.com/lHfWXzn.png" },
  { terms: ['i was hoping for kenobi why are you here'], url: "https://i.imgur.com/BzrnXn4.jpg" },
  { terms: ['he is in my behind'], url: "https://i.imgur.com/WW86mcx.png" },
  { terms: ['oh no im not brave enough for politics'], url: "https://i.imgur.com/PiqcDSN.jpg" },
  { terms: ['farming really man of your talents', 'farming really a man of your talents'], url: "https://i.imgur.com/bULgvvI.png" },
  { terms: ['i am the member of senate'], url: "https://i.imgur.com/EW4rCsR.png" },
  { terms: ['only a sith deals in absolutes'], url: "https://i.imgur.com/EfVlenc.jpg" },
  { terms: ['we will watch your career with great interest'], url: "https://i.imgur.com/LZxir7I.png" },
  { terms: ['you have become the very thing you swore to destroy'], url: "https://i.imgur.com/BGiXgIy.jpg" },
  { terms: ['i always at wait for this day'], url: "https://i.imgur.com/otsfl0r.png" },
  { terms: ['if what youve told me is true you will have gained my trust'], url: "https://i.imgur.com/bFiFdXT.png" },
  { terms: ['general reposti you are an old one'], url: "https://i.imgur.com/j9e0u3N.jpg" },
  { terms: ['my goodness youve grown', 'pedopadme'], url: "https://i.imgur.com/gu59Mla.jpg" },
  { terms: ['well i guess im in charge now'], url: "https://i.imgur.com/zGbAPuI.png" },
  { terms: ['its treason then', 'treason'], url: "https://i.imgur.com/iiKHBLk.jpg" },
  { terms: ['jedi business go back to your drinks', 'jedi business'], url: "https://i.imgur.com/9Axsx2H.png" },
  { terms: ['midichlorians', 'what are midichlorians', 'midichlorians are the powerhouse of the cell'], url: "https://i.imgur.com/XyRpzz4.jpg" },
  { terms: ['unlimited power', 'unlimmited power', 'unlimitted power', 'unlimmitted power'], url: "https://i.imgur.com/tcRl1GT.jpg" },
  { terms: ['visible confusion'], url: "https://i.imgur.com/y2NNF5J.jpg" },
  { terms: ['worried laughter'], url: "https://i.imgur.com/mahm7bg.jpg" },
  { terms: ['i have brought peace freedom justice and security to my new empire'], url: "https://i.imgur.com/1FQSiVH.jpg" },
  { terms: ['a surprise to be sure but a welcome one'], url: "https://i.imgur.com/eA46WaD.jpg" },
  { terms: ['oh well its my programming'], url: "https://i.imgur.com/NoXCqa9.png" },
  { terms: ['this is never gonna work', 'this is never gunna work', 'this is never going to work'], url: "https://i.imgur.com/adwMx83.png" },
  { terms: ['is it possible to learn this power'], url: "https://i.imgur.com/qqTJAqO.jpg" },
  { terms: ['i see through the lies of the jedi'], url: "https://i.imgur.com/9EUWQRt.png" },
  { terms: ['were just clones sir were meant to be expendable', 'not to me'], url: "https://i.imgur.com/h7BhjdQ.png" },
  { terms: ['from my point of view the jedi are evil'], url: "https://i.imgur.com/Hwtzl9k.png" },
  { terms: ['i was just made by the presbyterian church'], url: "https://i.imgur.com/Pdnauux.png" },
  { terms: ['i saw a security hologram of him killing younglings'], url: "https://i.imgur.com/GpsEnvz.png" },
  { terms: ['i think were going to have to accept federation control for the time being'], url: "https://i.imgur.com/vfckuMw.png" },
  { terms: ['its over anakin i have the high ground', 'i have the high ground'], url: "https://i.imgur.com/hLdZXi4.jpg" },
  { terms: ['so uncivilized', 'so uncivilised'], url: "https://i.imgur.com/L9zdDXs.jpg" },
  { terms: ['200,000 units are ready with a million more well on the way'], url: "https://i.imgur.com/uwhqOrC.png" },
  { terms: ['if youre not with me then youre my enemy'], url: "https://i.imgur.com/TZpQXCb.png" },
  { terms: ['if one is to understand the great mystery one must study all its aspects'], url: "https://i.imgur.com/QFmLUKP.jpg" },
  { terms: ['i hate it when he does that'], url: "https://i.imgur.com/bkmOPZd.jpg" },
  { terms: ['i love democracy', 'i love the republic'], url: "https://i.imgur.com/9gM2pmD.jpg" },
  { terms: ['my powers have doubled', 'my powers have doubled since the last time we met count'], url: "https://i.imgur.com/KufehuH.png" },
  { terms: ['he doesnt seem to take a hint this guy'], url: "https://i.imgur.com/iUufAhy.png" },
  { terms: ['my allegiance is to the republic to democracy'], url: "https://i.imgur.com/B3i9RfV.png" },
  { terms: ['twice the pride double the fall'], url: "https://i.imgur.com/lLUGGhb.png" },
  { terms: ['pack your things were leaving'], url: "https://i.imgur.com/w12l0v5.png" },
  { terms: ['roger roger'], url: "https://i.imgur.com/fUXBNjJ.png" },
  { terms: ['nervous chuckle', 'nervous laughter', 'nervous'], url: "https://i.imgur.com/LmWXHfm.jpg" },
  { terms: ['we are pirates we dont even know what that means'], url: "https://i.imgur.com/71jds5Y.png" },
  { terms: ['congratulations you are being rescued', 'please do not resist'], url: "https://i.imgur.com/k5wOFxy.jpg" },
  { terms: ['what have i done'], url: "https://i.imgur.com/akk0P10.png" },
  { terms: ['well then you are lost'], url: "https://i.imgur.com/nbuiFjq.png" },
  { terms: ['your new empire?'], url: "https://i.imgur.com/M6423sJ.png" },
  { terms: ['she cant do that shoot her or something'], url: "https://i.imgur.com/Fv8Ttc5.png" },
  { terms: ['they have shield generators'], url: "https://i.imgur.com/n4CelGR.png" },
  { terms: ['i am the senate'], url: "https://i.imgur.com/ecLoARq.png" },
  { terms: ['im sorry sir its time for you to leave'], url: "https://i.imgur.com/anGwpz7.png" },
  { terms: ['ill try spinning thats a good trick', 'spinning'], url: "https://i.imgur.com/5QuKC75.png" },
  { terms: ['you are strong and wise and i am very proud of you'], url: "https://i.imgur.com/ZllAfdc.png" },
  { terms: ['i dont think the system works'], url: "https://i.imgur.com/5lT7umj.png" },
  { terms: ['im too weak'], url: "https://i.imgur.com/rTnEGxd.png" },
  { terms: ['did you heard of the tragedy that reach the man'], url: "https://i.imgur.com/aY8SG3u.png" },
  { terms: ['truly wonderful the mind of a child is'], url: "https://i.imgur.com/O4EGKcG.png" },
  { terms: ['stop using the standard attacks use the unorthodox'], url: "https://i.imgur.com/ywsYLkL.png" },
  { terms: ['now this is podracing'], url: "https://i.imgur.com/lOVB8sX.png" },
  { terms: ['this is tense'], url: "https://i.imgur.com/Mig2vo5.png" },
  { terms: ['visible happiness'], url: "https://i.imgur.com/YFSK2oW.png" },
  { terms: ['where is padme is she safe is she alright'], url: "https://i.imgur.com/YFSK2oW.png" },
  { terms: ['you are on this council but we do not grant you the rank of master'], url: "https://i.imgur.com/dLesXwK.png" },
  { terms: ['take a seat', 'have a seat'], url: "https://i.imgur.com/lbO46Oe.jpg" },
  { terms: ['i have a bad eel', 'oh i have a bad feeling about this'], url: "https://i.imgur.com/5zIHSZl.png" },
  { terms: ['you underestimate my power'], url: "https://i.imgur.com/oV3WsRy.png" },
  { terms: ['wait a minute how did this happen were smarter than this', 'apparently not'], url: "https://i.imgur.com/DXqty5O.png" },
  { terms: ['game time started'], url: "https://i.imgur.com/B4T3OEw.jpg" },
  { terms: ['the disgusting thing came'], url: "https://i.imgur.com/xnqrGQj.jpg" },
  { terms: ['they want to know him at fuck'], url: "https://i.imgur.com/6gyFh6q.png" },
  { terms: ['you are already at full cock now'], url: "https://i.imgur.com/h5DYUb5.png" },
  { terms: ['good as new maybe even a little better'], url: "https://i.imgur.com/1dptJ08.jpg" },
  { terms: ['this assignment is not to be on record'], url: "https://i.imgur.com/FHEmqQI.png" },
  { terms: ['we dont we make a bigger mess that cancels out the first one'], url: "https://i.imgur.com/k7D4GU1.jpg" },
  { terms: ['then you will die braver than most'], url: "https://i.imgur.com/0gtIZfy.jpg" },
  { terms: ['the role of master comes easily to me'], url: "https://i.imgur.com/3rQ2WRO.jpg" },
  { terms: ['unfortunately for you history will not see it that way'], url: "https://i.imgur.com/QfqHSeD.jpg" },
  { terms: ['good soldiers follow orders'], url: "https://i.imgur.com/2PDCFWb.jpg" },
  { terms: ['sometimes things are just that important'], url: "https://i.imgur.com/iEl5ErR.png" },
  { terms: ['the task is only impossible because you have deemed it so'], url: "https://i.imgur.com/8uWbldx.jpg" },
  { terms: ['thats the last time i borrow a ship from you'], url: "https://i.imgur.com/MflSPYU.png" },
  { terms: ['good news would indeed be a surprise'], url: "https://i.imgur.com/NicDvL3.jpg" },
  { terms: ['i was going to study that'], url: "https://i.imgur.com/OBmPvu2.jpg" },
  { terms: ['we should not have made this bargain'], url: "https://i.imgur.com/za7j1e7.jpg" },
  { terms: ['come on theres three of us and only one of him', 'it wont matter'], url: "https://i.imgur.com/2CIvxWY.jpg" },
  { terms: ['its blowing up from the inside'], url: "https://i.imgur.com/ccBLIAq.jpg" },
  { terms: ['its my duty sir'], url: "https://i.imgur.com/ben1vxs.png" },
  { terms: ['as you see my jedi powers are far beyond yours'], url: "https://i.imgur.com/QzpDg8H.jpg" },
  { terms: ['im in control i make the rules now'], url: "https://i.imgur.com/1LJjOdE.jpg" },
  { terms: ['ew', 'eww', 'ewww', 'ewwww', 'ewwwww'], url: "https://i.imgur.com/joG88rZ.jpg" },
  { terms: ['well conceived plan however theres great risk'], url: "https://i.imgur.com/Li7AMdq.jpg" },
  { terms: ['thought we were in trouble there for a second but its fine'], url: "https://i.imgur.com/rcHC91v.jpg" },
  { terms: ['i only wanted to do my duty'], url: "https://i.imgur.com/FJM5LzQ.png" },
  { terms: ['traitor scum im so proud but so betrayed'], url: "https://i.imgur.com/R7wgCHd.png" },
  { terms: ['lets try the bad news laced with a little optimism'], url: "https://i.imgur.com/ZZmoYZX.png" },
  { terms: ['its settled then'], url: "https://i.imgur.com/AOIjihF.jpg" },
  { terms: ['what i love is you', 'i loved you'], url: "https://i.imgur.com/JF2lMhP.jpg" },
  { terms: ['the dark side of the force is a pathway to many abilities some consider to be unnatural'], url: "https://i.imgur.com/CyQGq1T.jpg" },
  { terms: ['this is an odd play for the trade federation'], url: "https://i.imgur.com/PPcaZ1e.jpg" },
  { terms: ['oh not good'], url: "https://i.imgur.com/bQQ8WdO.jpg" },
  { terms: ['well thats wonderful', 'thats great', 'im pregnant'], url: "https://i.imgur.com/4njy522.jpg" },
  { terms: ['are you an angel'], url: "https://i.imgur.com/ofVCM6O.jpg" },
  { terms: ['they are still coming through'], url: "https://i.imgur.com/x2aEk7I.jpg" },
  { terms: ['thats good news'], url: "https://i.imgur.com/YRnYyVr.png" },
  { terms: ['ah yes the negotiator', 'ahh yes the negotiator'], url: "https://i.imgur.com/3dBPEns.jpg" },
  { terms: ['surely you can do better'], url: "https://i.imgur.com/bovSgUy.png" },
  { terms: ['i dont sense anything'], url: "https://i.imgur.com/BGo7bE5.jpg" },
  { terms: ['hes right its a system we cannot afford to lose'], url: "https://i.imgur.com/x46kBiV.png" },
  { terms: ['written and directed by george lucas'], url: "https://i.imgur.com/JkRfgMx.jpg" },
  { terms: ['you think youre some kind of jedi waving your hand around like that'], url: "https://i.imgur.com/89JDVyy.png" },
  { terms: ['so this is how liberty dies with thunderous applause'], url: "https://i.imgur.com/QKA14AI.png" },
  { terms: ['the negotiations never took place'], url: "https://i.imgur.com/0Cjrye3.png" },
  { terms: ['you were the chosen one'], url: "https://i.imgur.com/HXi4CJl.jpg" },
  { terms: ['for a senator i mean', 'grown more beautiful i mean'], url: "https://i.imgur.com/yVayEYO.jpg" },
  { terms: ['i have waited a long time for this moment my little green friend'], url: "https://i.imgur.com/Cch0XZy.png" },
  { terms: ['i will make it legal'], url: "https://i.imgur.com/hYok5ig.jpg" },
  { terms: ['be careful not to choke on your aspirations director'], url: "https://i.imgur.com/xy6MNdO.png" },
  { terms: ['you should have gone for the head'], url: "https://i.imgur.com/q7zmiS7.jpg" },
  { terms: ['visibly twirls mustache'], url: "https://i.imgur.com/vjuuoKP.jpg" },
  { terms: ['theyve gone up the ventilation shaft'], url: "https://i.imgur.com/Xo7q4Hp.jpg" },
  { terms: ['if into the security recordings you go only pain you will find'], url: "https://i.imgur.com/SRpHrCr.jpg" },
  { terms: ['a communications disruption can mean only one thing invasion'], url: "https://i.imgur.com/IoGoXsr.png" },
  { terms: ['do you have a plan b'], url: "https://i.imgur.com/rl1SOWG.jpg" },
  { terms: ['then im sorry old friend'], url: "https://i.imgur.com/zb2318J.png" },
  { terms: ['how many other lies have i been told by the council'], url: "https://i.imgur.com/gBrvhJe.png" },
  { terms: ['hes too dangerous to be left alive'], url: "https://i.imgur.com/XZvljO1.jpg" },
  { terms: ['your negotiations seem to have failed'], url: "https://i.imgur.com/MeauYTk.png" },
  { terms: ['something wonderful has happened'], url: "https://i.imgur.com/9kLwLh2.png" },
  { terms: ['i guess i was wrong there was no danger at all'], url: "https://i.imgur.com/YE1Z6Bx.png" },
  { terms: ['that wasnt very republic credits of you'], url: "https://i.imgur.com/ufUbdck.jpg" },
  { terms: ['we need to be going up not down'], url: "https://i.imgur.com/SVxcC7p.png" },
  { terms: ['this is an unexpected move for her its too aggressive'], url: "https://i.imgur.com/mPTFvEh.png" },
  { terms: ['this is so wizard', 'thats so wizard'], url: "https://i.imgur.com/0AwGpvy.png" },
  { terms: ['you catch on pretty quick'], url: "https://i.imgur.com/XXRB0OD.png" },
  { terms: ['brave but foolish my old friend youre impossibly outnumbered'], url: "https://i.imgur.com/5OTMReG.jpg" },
  { terms: ['wipe them out all of them'], url: "https://i.imgur.com/hVteu5G.png" },
  { terms: ['is that legal', 'my lord is that legal'], url: "https://i.imgur.com/6upHb0G.jpg" },
  { terms: ['this will work to our advantage'], url: "https://i.imgur.com/KJOEJCD.jpg" },
  { terms: ['no need to report that to him until we have something to report'], url: "https://i.imgur.com/uuLgMji.jpg" },
  { terms: ['deleted scene roger roger'], url: "https://i.imgur.com/1pLdXSN.gif" },
  { terms: ['deleted scene mustache twirl'], url: "https://i.imgur.com/MG8nvEF.gif" },
];
