const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Placeholder for mongoose'
  },

  issue_title: String,
  issue_text: String,
  created_by: String,

  // optionals:
  assigned_to: String,
  status_text: String,

  // server controlled:
  created_on: String,
  updated_on: String,

  open: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('fcc-backend-issue-topic', IssueSchema);
