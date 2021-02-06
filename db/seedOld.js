/* eslint-disable func-names, no-console  */
const mongoose = require('mongoose');
const { ShowCase } = require('./index.js');

const cities = [
  'Bangkok, Thailand',
  'Samut Prakan, Thailand',
  'Nonthaburi, Thailand',
  'Udon Thani, Thailand',
  'Chon Buri, Thailand',
  'Nakhon Ratchasima, Thailand',
  'Hat Yai, Thailand',
  'Pak Kret, Thailand',
  'Si Racha, Thailand',
  'Phra Pradaeng, Thailand',
  'Lampang, Thailand',
  'Chiang Mai, Thailand',
  'Khon Kaen, Thailand',
  'Surat Thani, Thailand',
  'Thanyaburi, Thailand',
];

const attractionTitles = [
  'Railay Beach',
  'Koh Phi Phi',
  'The Grand Palace',
  'Sunday Walking Street',
  'Pai',
  'Wild Elephants at Khao Yai National Park',
  'Sukhothai Old City',
  'Historic City of Ayutthaya',
  'Doi Suthep',
  'Floating Markets',
  'Phuphrabat Historical Park',
  'Phra That Phanom',
];

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

const addresses = [
  'Jalan Tpj2 Taman Perindustrian Jaya, Subang Jaya, Selangor, 47200',
  'Jalan Anggerik 25 Taman Johor Jaya, 81100',
  'Johor Malaysia, Johor Bahru, Johor, 81100',
  'Jalan Terolak 4, Taman Bamboo, Jalan, Ipoh, 51200',
  '203 SEKSYEN 51 46050, Petaling',
  'Jaya 46050 Malaysia',
  'Petaling Jaya, Selangor, 46050',
  '23 Tingkat Daruzzakah Lorong Haji Hussein Off Jalan Raja, 50007',
  'Muda Wilayah Persekutuan, Malaysia 50676',
  'Kuala Lumpur, Wilayah Persekutuan, 50676',
  'Jalan Perpaduan, Kampung Air, 88000',
];

const urlGen = function (id) {
  return `https://d3tteoxp56tq1d.cloudfront.net/images/tripadvisor_thailand_${id}.jpg`;
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

class Attraction {
  constructor(id) {
    this.attractionTitle = randomGenerator(null, attractionTitles);
    this.city = randomGenerator(null, cities);
    this.relativeRanking = [randomGenerator(1, 34), randomGenerator(35, 101)];
    this.ratio = this.relativeRanking[0] / this.relativeRanking[1];
    this.attractionType = randomGenerator(null, attractionTypes);
    this.reviews = randomGenerator(0, 3000);
    this.overview = {
      description: randomGenerator(null, descriptions),
      isOpen: randomGenerator(null, bools),
      suggestedDuration: randomGenerator(0, 200),
      address: randomGenerator(null, addresses),
    };
    this.imageUrl = [urlGen(id), ...picsListGen()];
    this.travelersChoiceAward = randomGenerator(null, bools);
    this.likedStatus = randomGenerator(null, bools);
    this.ticketPrice = randomGenerator(0, 500);
    this.averageRating = randomGenerator(0, 25) / 5;
  }
}

const seedData = [];

for (let i = 0; i < 100; i += 1) {
  const newAttraction = new Attraction(i);

  seedData.push(newAttraction);
}

ShowCase.find()
  .then((result) => {
    if (result.length === 0) {
      ShowCase.create(seedData)
        .then(() => {
          console.log('db seeded!');
          mongoose.connection.close();
        });
    } else {
      console.log('db already seeded');
      mongoose.connection.close();
    }
  })
  .catch((err) => console.log('error finding db', err));
