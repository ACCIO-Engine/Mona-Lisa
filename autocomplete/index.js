const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const wordsFile = `${__dirname}/../public/words.txt`;

dotenv.config({ path: './config.env' });
console.log('MONGO_URL:', process.env.MONGO_URL);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    extractWords();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define the schema for the words collection
const wordSchema = new mongoose.Schema({
  word: String
});

// Create the model for the words collection
const Word = mongoose.model('Word', wordSchema);

// Function to extract the word field from each document
async function extractWords() {
  try {
    const words = await (await Word.find({}, 'word')).map((doc) => doc.word).filter((word) => word.length > 0);
    fs.writeFileSync(wordsFile, words.join('\n'));
    console.log('Words:', words);
  } catch (err) {
    console.error('Error extracting words:', err);
  } finally {
    // Close the connection after extraction
    mongoose.connection.close();
  }
}
