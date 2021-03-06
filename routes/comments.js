const express       = require('express'),
      router        = express.Router({mergeParams: true}),
      passport      = require('passport'),
      Campground    = require('../models/campground'),
      Comment       = require('../models/comment'),
      middleware    = require('../middleware');

router.get('/new', middleware.isLoggedIn,(req,res)=>{
  Campground.findById(req.params.id,(err,campgraund) => {
    if(err){
      console.log(err);
    } else {
      res.render("comment/new", {campground: campgraund});
    }
  });
});

router.post('/', middleware.isLoggedIn, (req,res) => {
  //lookup campground using ID
  Campground.findById(req.params.id, (err,campground) => {
    if(err){
      console.log(err);
      res.redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err){
          req.flash('error','Oops!! Sorry,Database error...');
          console.log(err);
        } else {
          //Add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash('success','Successfully added comment.');
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  })
});

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if(err) {
      res.redirect('back');
    }else {
      res.render('comment/edit', { campground_id: req.params.id, comment: foundComment });
    }
  });
});

router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updateComment) => {
    if(err) {
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  })
});

// Comment DESTROY route:
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if(err){
      res.redirect('back');
    } else {
      req.flash('success',"Comment deleted.");
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

module.exports = router;