/* eslint-disable func-names */
const fs = require('fs');
const { argv } = require('yargs');

const lines = argv.lines || 100;
const filename = argv.output || './db/seeding/pictures.csv';
const stream = fs.createWriteStream(filename);

const urlGen = function (id) {
  return `https://awsm-hr.s3.us-east-2.amazonaws.com/showcaseImages/images/image${id}.jpg`;
};

const randomGenerator = function (min, list) {
  if (typeof list === 'number') {
    return (Math.floor(Math.random() * list) + min);
  }
  return list[Math.floor(Math.random() * list.length)];
};

const createImage = (i) => {
  const attractionId = randomGenerator(1, 10000000);
  const imageUrl = urlGen(i);

  return `${attractionId},${imageUrl}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    const canWrite = true;
    do {
      i -= 1;
      const post = createImage(i);
      if (i === 0) {
        writeStream.write(post, encoding, done);
      } else {
        writeStream.write(post, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

stream.write('attractionId,imageUrl\n', 'utf-8');
startWriting(stream, 'utf-8', () => {
  stream.end();
});
