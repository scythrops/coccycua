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
import {Coccycua} from '../';

describe('Import', ()=>{
  it('Should be able to be imported without a problem', (done)=>{
    expect(Coccycua).to.be.a.function();
    done();
  });
});
