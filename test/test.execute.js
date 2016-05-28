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

describe('Execute', ()=>{
  it('A basic compiled script should be callable', (done)=>{
    const c = new Coccycua({
        log(msg){
          if(msg==='done'){
            done();
          }
        }
      });
    const src = 'log("done");';
    const f = c.compile(src);
    expect(f).to.be.a.function();
    f();
  });

  it('Compiled scripts should be able to return values', (done)=>{
    const c = new Coccycua();
    const src = 'return \'value\'';
    const f = c.compile(src);
    expect(f).to.be.a.function();
    const value = f();
    expect(value).to.be.a.string().and.to.equal('value');
    done();
  });

  it('Should not be able to call code outside the scope', (done)=>{
    const c = new Coccycua();
    const src = 'require(\'../\');';
    const f = c.compile(src);
    expect(f).to.be.a.function();
    try{
      f();
    }catch(e){
      return done();
    }
    throw new Error('That should not have worked');
  });

  it('If allowed it should be able to require things in', (done)=>{
    const c = new Coccycua({require});
    const src = 'return require(\'../\');';
    const f = c.compile(src);
    expect(f).to.be.a.function();
    const lib = f();
    expect(lib.Coccycua).to.be.a.function();
    done();
  });

  it('Should be able to execute a function', (done)=>{
    const c = new Coccycua();
    const src = '(a, b)=>a+b';
    const f = c.compileFunction(src);
    expect(f).to.be.a.function();
    const out = f(1, 1);
    expect(out).to.be.a.number().and.to.equal(2);
    done();
  });

  it('Functions should be able to see scope values', (done)=>{
    const c = new Coccycua({test: 'value'});
    const src = '()=>test';
    const f = c.compileFunction(src);
    expect(f).to.be.a.function();
    const out = f();
    expect(out).to.be.a.string().and.to.equal('value');
    done();
  });

  it('Should be able to call functions from the scope', (done)=>{
    const c = new Coccycua({
      test(out){
        expect(out).to.be.a.number().and.to.equal(2);
        done();
      }
    });
    const src = '(a, b)=>test(a+b)';
    const f = c.compileFunction(src);
    expect(f).to.be.a.function();
    f(1, 1);
  });

  it('Should be able to execute a function with a callback', (done)=>{
    const c = new Coccycua();
    const src = `(a, b, callback)=>{
      setImmediate(()=>callback(null, a+b));
    }`;
    const f = c.compileFunction(src);
    expect(f).to.be.a.function();
    const out = f(1, 1, (err, out)=>{
      expect(err).to.be.null();
      expect(out).to.be.a.number().and.to.equal(2);
      done();
    });
  });
});
