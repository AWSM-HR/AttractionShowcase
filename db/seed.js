/* eslint-disable func-names */
const fs = require('fs');
const faker = require('faker');
const argv = require('yargs').argv

const lines = argv.lines || 10;
const filename = argv.output || 'posts.csv';
const writeStream = fs.createWriteStream(filename);

const attractionTypes = [
  'National Park',
  'Sacred & Religious Sites',
  'Beaches',
  'Points of interest & Landmarks',
  'Monuments & Statues',
  'Historic Sites',
  'Architectural Buildings',
  'Mysterious Sites',
  'Ancient Ruins',
  'Scenic Walking Areas',
];

const descriptions = [
  'Reef cackle fruit spanker ballast lugsail boatswain walk the plank overhaul long boat jury mast scuppers Brethren of the Coast pinnace skysail plunder hogshead quarter bilge rat black spot hulk.',
  'Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin',
  'grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters',
  'Furl brig Arr mutiny keel spyglass pressgang reef deadlights lateen sail hands Jack Ketch line barque gunwalls lad nipper parley overhaul bring a spring upon her cable.',
  'Shrouds boatswain main sheet run a rig weigh anchor black spot league broadside skysail draft transom ballast American Main port',
  'Jolly Roger me bring a spring upon her cable dead men tell no tales plunder to go on account',
  'Come on up and see me urchins. Wanna shiver me timbers? So, tell me, why do they call ye, “Cap’n Feathersword?”',
  'Even pirates, before they attack another ship, hoist a black flag. The Code is more like guidelines, really.',
  'Yes, that is a hornpipe in my pocket and I am happy to see you. They don’t call me Long John because my head is so big.',
  'You can always trust the untrustworthy because you can always trust that they will be untrustworthy.',
  'Its the trustworthy you can’t trust. Not all treasure is silver and gold Where there is a sea there are pirates.',
  'Damnation seize my soul if I give you quarters, or take any from you. It’s not everyday you get to do a pirate movie, you might as well go for it.',
  'How much does the pirate pay for an ear piercing?',
];

const urlGen = function (id) {
  return `https://awsm-hr.s3.us-east-2.amazonaws.com/showcaseImages/images/image${id}.jpg`;
};

const randomGenerator = function (min, list) {
  if (typeof list === 'number') {
    return (Math.floor(Math.random() * list) + min);
  }
  return list[Math.floor(Math.random() * list.length)];
};

const picsListGen = function () {
  const pics = [];
  const max = Math.floor(Math.random() * 30) + 1;
  for (let i = 0; i < max; i += 1) {
    pics.push(urlGen(randomGenerator(0, 100)));
  }
  return pics;
};

const bools = [true, false];

const createAttraction = (id) => {
  const location = faker.address.city();
  const attractionTitle = faker.commerce.productName;
  const city = location;
  const reviews = randomGenerator(0, 3000);
  const relativeRanking = [randomGenerator(1, 34), randomGenerator(35, 101)];
  const ratio = relativeRanking[0] / relativeRanking[1];
  const attractionType = randomGenerator(null, attractionTypes);
  const description = randomGenerator(null, descriptions);
  const isOpen = randomGenerator(null, bools);
  const suggestedDuration = randomGenerator(0, 200);
  const address = `${faker.address.streetAddress()}, ${location}, ${faker.address.zipCode}, ${faker.address.country}`;
  const imageUrl = [urlGen(id), ...picsListGen()];
  const travelersChoiceAward = randomGenerator(null, bools);
  const likedStatus = randomGenerator(null, bools);
  const ticketPrice = randomGenerator(0, 500);
  const averageRating = randomGenerator(0, 25) / 5;

  return `${attractionTitle},${city},${reviews},${relativeRanking},${ratio},${attractionType},${description},${isOpen},${suggestedDuration},${address},${imageUrl},${travelersChoiceAward},${likedStatus},${ticketPrice},${averageRating}\n`
};