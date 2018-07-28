const express         = require('express'),
      app             = express(),
      path            = require('path'),
      helmet          = require('helmet'),
      mongoose        = require('mongoose'),
      bodyParser      = require('body-parser'),
      methodOverride  = require('method-override');

const Issue       = require('./models/Issue');

require('dotenv').config();

app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  directives: {
    defaultSrc: ["self"],
    scriptSrc: ["self"]
  }
}));


mongoose.connect(process.env.DATABASE);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname + '/public')));


app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/issues', (req, res) => {
  Issue.find({}, (err, issues) => {
    if (err) {
      console.log(err);
      res.redirect('/')
    } else {
      res.render('issues', { issues })
    }
  })
});

app.get('/api/issues', (req, res) => {
  Issue.find({...req.query}, (err, issues) => {
    if (err) {
      console.log(err);
      res.json({ err });
    } else {
      console.log(req.query);
      res.json({ issues })
    }
  })
});

app.get('/issues/new', (req, res) => {
  res.render('issues/new')
})

app.post('/api/issues', (req, res) => {
  const newIssue = req.body.newIssue;
  if (!/\w/g.test(newIssue.assigned_to)) {
    newIssue.assigned_to = null;
  }
  if (!/\w/g.test(newIssue.status_text)) {
    newIssue.status_text = null;
  }
  newIssue.created_on = new Date();
  newIssue.updated_on = null;
  Issue.create(newIssue, (err, createdIssue) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err });
    } else {
      res.status(200).json({ issue: createdIssue });
    }
  });
});

app.get('/issues/:id/update', (req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('issues/edit', { issue });
    }
  })
})

app.put('/api/issues/:id', (req, res) => {
  var update = Object.assign({}, req.body.editIssue, { updated_on: new Date() });
  Issue.findByIdAndUpdate(req.params.id, update, (err, updatedIssue) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.status(200).json({ issue: updatedIssue });
    }
  })
})

app.delete('/api/issues', (req, res) => {
  res.status(400).json({ error: '_id error' });
});

app.delete('/api/issues/:id', (req, res) => {
  Issue.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ failed: `could not delete ${req.params.id}` });
    } else {
      res.status(200).json({ success: `deleted ${req.params.id}` });
    }
  })
})



var server = app.listen(
  process.env.PORT,
  () => console.log(`${new Date().toLocaleTimeString()}: Server initialized on port: ${process.env.PORT}`)
);
