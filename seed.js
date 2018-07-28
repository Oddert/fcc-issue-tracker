const mongoose = require('mongoose');

const Issue    = require('./models/Issue');

console.log('Seed file running...');

require('dotenv').config();

mongoose.connect(process.env.DATABASE);

console.log('DB connection established');

const SampleData = [
  {
    name: 'Placeholder for mongoose',
    issue_title: 'Kikat mug coffee',
    issue_text: 'It lacks the coffee, fill it up',
    created_by: 'Oddert',
    created_on: new Date(),
    updated_on: new Date(),
    assigned_to: 'Elliot',
    status_text: 'Stil got squat',
    open: true
  },
  {
    name: 'Placeholder for mongoose',
    issue_title: 'Too hot',
    issue_text: 'Even now, we are melting. hlep',
    created_by: 'Mr Robot',
    created_on: new Date(),
    updated_on: new Date(),
    assigned_to: 'Oddert',
    status_text: 'Need a bigger fan',
    open: true
  },
  {
    name: 'Placeholder for mongoose',
    issue_title: 'broken fcc challenges',
    issue_text: '',
    created_by: 'Oddert',
    created_on: new Date(),
    updated_on: new Date(),
    assigned_to: 'Elliot',
    status_text: 'Stil got squat',
    open: true
  }
]

Issue.remove({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Items removed');
    SampleData.forEach((each, index) => {
      Issue.create(each, (err, createdIssue) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Issue number ${index} created...`);
        }
      })
    })
  }
});
