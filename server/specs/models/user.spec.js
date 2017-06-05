var expect = require('chai').expect;
var User = require('../../db/models/User');


describe('User Model', function(){
  beforeEach(function() {
   return User.sync({force: true});
  });

  describe('Virtuals', function(){

    beforeEach(function() {
      return User.create({
        name: 'John Doe',
        email: 'john@doe.com',
        address: '5 hannover Sq., NY',
        isAdmin: true,
        googleId: 'supersecretGoogleId',
        facebookId: 'supersecretFacebookId',
        password: 'plainTextPassword',
        salt: 'saltySalt'
      });
    });

  describe('User details', function(){
    it('Should create the user with proper details',function(){
        return User.findOne({
          where: {
            email: 'john@doe.com'
          }
        })
        .then(function(user) {
          expect(user.name).to.equal('John Doe');
          expect(user.address).to.equal('5 hannover Sq., NY');
          expect(user.isAdmin).to.equal(true);
          expect(user.googleId).to.equal('supersecretGoogleId');
          expect(user.facebookId).to.equal('supersecretFacebookId');
          expect(user.password).to.not.equal('plainTextPassword');
          expect(user.salt).to.not.equal('saltySalt');
        });
      });
    });

    describe('renderedContent', function(){
      xit('should render the content into HTML', function(){
        return User.findOne({
          where: {
            title: 'Hello World'
            }
          })
          .then(function(page){
            expect(page.renderedContent).to.equal('<p>content is here</p>\n');
          });
      });
    });
  });

  describe('Static - Class Methods', function() {
    beforeEach(function() {
      return User.create({
        title: 'Hello World',
        content: 'content is here',
        tags: ['hello', 'YOLO', 'World', 'Academy']
      })
      .then(function(){
        return User.create({
          title: 'Goodbye World',
          content: 'content is here',
          tags: ['Goodbye', 'LOL', 'Fullstack', 'YOLO']
        })
      })
    })
    describe('findByTag', function() {
      xit('should find one page for one tag', function(){
        return User.findByTag(['Goodbye'])
        .then(function(pages){
          expect(pages[0].title).to.equal('Goodbye World');
        })
      })
      xit('should find one page for multiple tags', function(){
        return User.findByTag(['Goodbye', 'Nothing'])
        .then(function(pages){
          expect(pages[0].title).to.equal('Goodbye World');
        })
      })
      xit('should find multiple pages for one tag', function(){
        return User.findByTag(['YOLO'])
        .then(function(pages){
          expect(pages).to.have.length.of(2);
        })
      })
      xit('should find no pages for no coincidence tag', function(){
        return User.findByTag(['Nothing'])
        .then(function(pages){
          expect(pages).to.have.length.of(0);
        })
      })
      xit('should find multiple pages for multiple tags', function(){
        return User.findByTag(['hello', 'Goodbye'])
        .then(function(pages){
          expect(pages).to.have.length.of(2);
        })
      })
    })
  })

  describe('Instance Method', function(){
    beforeEach(function(){
      return User.bulkCreate([
        {
          title: 'Hello',
          content: 'Hello',
          tags: ['Hello', 'LOL'],
          urlTitle: 'Hello'
        },
        {
          title: 'Bye',
          content: 'Bye',
          tags: ['Bye'],
          urlTitle: 'Bye'

        },
        {
           title: 'Hello2',
          content: 'Hello2',
          tags: ['Hello'],
          urlTitle: 'Hello2'
        }
      ])
    })

    xit("should not find pages if it doesn't have similar tags", function(){
      return User.findOne({
        where: {
          title: 'Bye'
        }
      })
      .then(function(page){
        return page.findSimilar()
      })
      .then(function(similarUsers){
        expect(similarUsers).to.have.length.of(0);
      })
    })

    xit("should find pages if it has similar tags", function(){
      return User.findOne({
        where: {
          title: 'Hello'
        }
      })
      .then(function(page){
        return page.findSimilar()
      })
      .then(function(similarUsers){
        expect(similarUsers).to.have.length.of(1);
        expect(similarUsers[0].title).to.equal('Hello2')
      })
    })

  })

  describe('Validators', function(){

    describe('Title', function(){
      xit('Should throw an error if not a String', function(){
        var page = User.build({
          title: [],
          content: 'Hello2',
          urlTitle: 'hello'
        })
        return page.validate()
        .then(function(error){
          expect(error.message).to.be.equal('string violation: title cannot be an array or an object');
        })
      })
        xit('Should throw an error if no title defined', function(){
        var page = User.build({
          title: null,
          content: 'Hello2',
          urlTitle: 'hello'
        })
        return page.validate()
        .then(function(error){
          expect(error.message).to.be.equal('notNull Violation: title cannot be null');
        })
      })
       xit('Shouldn\'t throw an error if it is a String', function(){
        var page = User.build({
          title: 'hello',
          content: 'Hello2',
          urlTitle: 'hello'
        })
        return page.validate()
        .then(function(error){
          expect(error).to.be.equal(null);
        })
      })
    })
    describe('urlTitle', function(){
      xit('Should throw an error if not a String', function(){
        var page = User.build({
          title: 'hello',
          content: 'Hello2',
          urlTitle: []
        })
        return page.validate()
        .then(function(error){
          expect(error.message).to.be.equal('string violation: urlTitle cannot be an array or an object');
        })
      })
        xit('Should throw an error if no urlTitle defined', function(){
        var page = User.build({
          title: 'hello',
          content: 'hello'
        })
        return page.validate()
        .then(function(error){
          expect(error.message).to.be.equal('notNull Violation: urlTitle cannot be null');
        })
      })
        xit('Shouldn\'t throw an error if it is a String', function(){
        var page = User.build({
          title: 'hello',
          content: 'Hello2',
          urlTitle: 'hello'
        })
        return page.validate()
        .then(function(error){
          expect(error).to.be.equal(null);
        })
      })
    })
    describe('content', function(){
      xit('Should throw an error if not a String', function(){
        var page = User.build({
          title: 'hello',
          content: [],
          urlTitle: 'hello'
        })
        return page.validate()
        .then(function(error){
          expect(error.message).to.be.equal('string violation: content cannot be an array or an object');
        })
      })
        xit('Should throw an error if no content defined', function(){
        var page = User.build({
          title: 'hello',
          urlTitle: 'hello',
        })
        return page.validate()
        .then(function(error){
          expect(error.message).to.be.equal('notNull Violation: content cannot be null');
        })
      })
        xit('Shouldn\'t throw an error if it is a String', function(){
        var page = User.build({
          title: 'hello',
          content: 'Hello2',
          urlTitle: 'hello'
        })
        return page.validate()
        .then(function(error){
          expect(error).to.be.equal(null);
        })
      })
    })

     describe('status', function(){
      xit('Should throw an error if not a valid value', function(){
        var page = User.build({
          title: 'hello',
          content: 'hello',
          urlTitle: 'hello',
          status: 'hello'
        })
        return page.validate()
        .then(function(error){
          expect(error.message).to.be.equal('Validation error: Validation isIn failed');
        })
      })
        xit('Shouldn\'t throw an error if it is a valid value', function(){
        var page = User.build({
          title: 'hello',
          content: 'Hello2',
          urlTitle: 'hello',
          status: 'open'
        })
        return page.validate()
        .then(function(error){
          expect(error).to.be.equal(null);
        })
      })
    })
    describe('tags', function(){
      xit('Should throw an error if not a valid array', function(){
        var page = User.build({
          title: 'hello',
          content: 'hello',
          urlTitle: 'hello',
          tags: 'hello'
        })
        return page.validate()
        .then(function(error){
          expect(error.message).to.be.equal('Validation error: arr.forEach is not a function');
        })
      })
       xit('Should throw an error if not a valid array of strings', function(){
        var page = User.build({
          title: 'hello',
          content: 'hello',
          urlTitle: 'hello',
          tags: [[],[]]
        })
        return page.validate()
        .then(function(error){
          expect(error.message).to.be.equal('Validation error: Should be an Array of Strings');
        })
      })
        xit('Shouldn\'t throw an error if it is a valid array of strings', function(){
        var page = User.build({
          title: 'hello',
          content: 'Hello2',
          urlTitle: 'hello',
          tags: ['hello']
        })
        return page.validate()
        .then(function(error){
          expect(error).to.be.equal(null);
        })
      })
    })
  })
  describe('Hooks', function() {
    describe('UrlTitle', function(){
      xit('should create a proper urlTitle after validating the page', function(){
        return User.create({
          title: 'Hello World!',
          content: 'blah blah'
        })
        .then(function(page){
          expect(page.urlTitle).to.exist;
          expect(page.urlTitle).to.equal('Hello_World_');
        })
      })
    })
  })
})