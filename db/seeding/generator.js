/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const fs = require('fs');
const faker = require('faker');

const attractionsLines = 10000000;
const imagesLines = 10000000;
const picturesLines = 30000000;
const attractionsFileName = './db/seeding/attractions.csv';
const imagesFileName = './db/seeding/images.csv';
const picturesFileName = './db/seeding/pictures.csv';
const attractionsStream = fs.createWriteStream(attractionsFileName);
const imagesStream = fs.createWriteStream(imagesFileName);
const picturesStream = fs.createWriteStream(picturesFileName);

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

const bools = [true, false];

const createAttraction = (i) => {
  const location = faker.address.city();

  const attractionId = i + 1;
  const attractionTitle = faker.commerce.productName();
  const city = location;
  const reviews = randomGenerator(0, 3000);
  const relativeRanking1 = randomGenerator(1, 34);
  const relativeRanking2 = randomGenerator(35, 101);
  const ratio = relativeRanking1 / relativeRanking2;
  const attractionType = randomGenerator(null, attractionTypes);
  const description = randomGenerator(null, descriptions);
  const isOpen = randomGenerator(null, bools);
  const suggestedDuration = randomGenerator(0, 200);
  const address = `${faker.address.streetAddress()}, ${location}, ${faker.address.zipCode()}, ${faker.address.country()}`;
  const travelersChoiceAward = randomGenerator(null, bools);
  const likedStatus = randomGenerator(null, bools);
  const ticketPrice = randomGenerator(0, 500);
  const averageRating = randomGenerator(0, 25) / 5;

  return `${attractionId},${attractionTitle},${city},${reviews},${relativeRanking1},${relativeRanking2},${ratio},${attractionType},"${description}",${isOpen},${suggestedDuration},"${address}",${travelersChoiceAward},${likedStatus},${ticketPrice},${averageRating}\n`;
};

// Create 1 guaranteed picture per attraction
let id = 1;
const createImage = (i) => {
  const pictureId = i + 1;
  const attractionId = id;
  const imageUrl = urlGen(randomGenerator(1, 1000));

  id += 1;

  return `${pictureId},${attractionId},${imageUrl}\n`;
};
// Create random # of additional images for attractions
const createPicture = (i) => {
  const pictureId = i + 10000001;
  const attractionId = randomGenerator(1, 10000000);
  const imageUrl = urlGen(randomGenerator(1, 1000));
  return `${pictureId},${attractionId},${imageUrl}\n`;
};

const startWritingAttractions = (writeStream, encoding, done) => {
  let i = attractionsLines;
  function writing() {
    const canWrite = true;
    do {
      i -= 1;
      const attraction = createAttraction(i);
      if (i === 0) {
        writeStream.write(attraction, encoding, done);
      } else {
        writeStream.write(attraction, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

const startWritingImages = (writeStream, encoding, done) => {
  let i = imagesLines;
  function writing() {
    const canWrite = true;
    do {
      i -= 1;
      const image = createImage(i);
      if (i === 0) {
        writeStream.write(image, encoding, done);
      } else {
        writeStream.write(image, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

const startWritingPictures = (writeStream, encoding, done) => {
  let i = picturesLines;
  function writing() {
    const canWrite = true;
    do {
      i -= 1;
      const picture = createPicture(i);
      if (i === 0) {
        writeStream.write(picture, encoding, done);
      } else {
        writeStream.write(picture, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

attractionsStream.write('attractionId,attractionTitle,city,reviews,relativeRanking1,relativeRanking2,ratio,attractionType,description,isOpen,suggestedDuration,address,travelersChoiceAward,linkedStatus,ticketPrice,averageRating\n', 'utf-8');
startWritingAttractions(attractionsStream, 'utf-8', () => {
  attractionsStream.end();
});

imagesStream.write('pictureId,attractionId,imageUrl\n', 'utf-8');
startWritingImages(imagesStream, 'utf-8', () => {
  imagesStream.end();
});

picturesStream.write('pictureId,attractionId,imageUrl\n', 'utf-8');
startWritingPictures(picturesStream, 'utf-8', () => {
  picturesStream.end();
});
