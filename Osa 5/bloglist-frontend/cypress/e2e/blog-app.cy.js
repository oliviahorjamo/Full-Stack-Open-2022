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

    it.only('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-field').type('Test Title')
      cy.get('#author-field').type('Test Author')
      cy.get('#url-field').type('Test Url')
      cy.get('#create-button').click()
      cy.contains('Test Title')
    })
  })
})