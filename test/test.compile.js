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
const {Coccycua} = require('../');

describe('Compile', ()=>{
  it('Should be able to create a compiler with no scope', (done)=>{
    const c = new Coccycua();
    expect(c).to.be.an.object();
    done();
  });

  it('Should be able to create a compiler with a scope', (done)=>{
    const c = new Coccycua({foo: 'bar'});
    expect(c).to.be.an.object();
    expect(c.scope.foo).to.be.a.string().and.to.equal('bar');
    done();
  });

  it('Should be able to compile a basic script', (done)=>{
    const c = new Coccycua();
    const src = 'log("done");';
    const f = c.compile(src);
    expect(f).to.be.a.function();
    done();
  });

  it('Should be able to compile a function', (done)=>{
    const c = new Coccycua();
    const src = '()=>1+1';
    const f = c.compileFunction(src);
    expect(f).to.be.a.function();
    done();
  });
});
