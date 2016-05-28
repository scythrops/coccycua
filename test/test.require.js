const Code = require('code');
const {
  expect,
} = Code;
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const {
  describe,
  it,
  before,
  after,
} = lab;

describe('Require', ()=>{
  it('Should be able to be requried without a problem', (done)=>{
    const {Coccycua} = require('../');
    expect(Coccycua).to.be.a.function();
    done();
  });
});
