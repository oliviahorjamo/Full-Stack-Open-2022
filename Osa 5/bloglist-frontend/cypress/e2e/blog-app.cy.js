describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
    const user = {
      name: 'Tina Tester',
      username: 'tester',
      password: 'secret'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.get('#username-field').type('tester')
      cy.get('#password-field').type('secret')
      cy.get('#login-button').click()
      cy.contains('Logged in as Tina Tester')
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-field').type('tester')
      cy.get('#password-field').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'tester', password: 'secret'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-field').type('Test Title')
      cy.get('#author-field').type('Test Author')
      cy.get('#url-field').type('Test Url')
      cy.get('#create-button').click()
      cy.contains('Test Title')
    })

    describe('When there is initally a blog', function() {
      beforeEach(function() {
        const blog = {
          title: 'First test title',
          author: 'First test author',
          url: 'wwww.testurl.com'
        }
        cy.createBlog(blog)
        cy.contains('First test title')
        })

      it('user can like a blog', function() {
        cy.contains('First test title')
          .contains('show')
          .click()
        cy.get('.like-button').click()
        cy.contains('likes 1')
      })

      it('the user who created the blog can delete it', function() {
        cy.contains('First test title')
          .contains('show')
          .click()
        cy.get('.delete-button').click()
        cy.on('window:confirm', () => true)
        cy.get('html').should('not.contain', 'First test title')
      })
    })

    describe('when there are initially multiple blogs', function () {
      // tähän usean blogin lisääminen
      beforeEach(function() {
        const blog1 = {
          title: 'Blog with least likes',
          author: 'Least likes Author',
          url: 'wwww.testurl.com',
          likes: 1
        }

        const blog2 = {
          title: 'Blog with the second most likes',
          author: 'Decent Author',
          url: 'www.testurl.com',
          likes: 2
        }

        const blog3 = {
          title: 'Blog with the most likes',
          author: 'Best Author',
          url: 'www.testurl.com',
          likes: 3
        }

        cy.createBlog(blog1)
        // don't add in the same order as the likes so that
        // you know that they are not in the order of addition
        cy.createBlog(blog3)
        cy.createBlog(blog2)
        })

        it('the blogs are sorted in accordance to the number of likes', function () {
          cy.get('.blog').eq(0).should('contain', 'Blog with the most likes')
          cy.get('.blog').eq(1).should('contain', 'Blog with the second most likes')
          cy.get('.blog').eq(2).should('contain', 'Blog with least likes')
        })
    })
  })
})