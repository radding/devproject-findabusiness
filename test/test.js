const assert = require('assert')
const chai = require('chai')

validateSearch = (email, phone, postalCode) => {
  return Boolean(email)
}

// See? You can use Mocha and Chai

describe('BusinessSearchService', () => {
  describe('#validateSearch()', () => {
    it('should not allow empty emails', () => {
      chai.expect(validateSearch('', '3133737844', '48226')).to.equal(false)
      chai.expect(validateSearch('tech@waymark.com', '3133737844', '48226')).to.equal(true)
    })
  })
})