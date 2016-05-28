const babel = require('babel-core');

const DEFAULT_BABEL_OPTIONS = {
  "presets": ["es2015", "stage-2"],
};

export class Coccycua{
  constructor(scope = {}, options = {}){
    this.scope = scope;
    this.babelOptions = options.babel || DEFAULT_BABEL_OPTIONS;
  }

  set scope(newScope){
    this._scope = Object.assign({}, newScope);
    this._scopeNames = Object.keys(this._scope);
    this._scopeValues = this._scopeNames.map((name)=>this._scope[name]);
  }

  get scope(){
    return this._scope;
  }

  compile(source, callback){
    try{
      const scopeNames = this._scopeNames;
      const src = babel.transform(`(${scopeNames.join(',')})=>{${source}}`, this.babelOptions);
      const scope = this._scope;
      const scopeValues = this._scopeValues;
      const raw = src.code.replace(/^('|"|`)use strict('|"|`);{0,1}/, '').trim();
      const segments = raw.split('\n');
      const real = segments.slice(1, segments.length-1);
      const code = real.join('\n');
      const f = new Function(this._scopeNames, code);
      const handler = function(){
        return f(...scopeValues);
      };
      if(typeof(callback)==='function'){
        return setImmediate(()=>callback(null, handler));
      }
      return handler;
    }catch(e){
      if(typeof(callback)==='function'){
        return setImmediate(()=>callback(e));
      }
      return e;
    }
  }

  compileFunction(source, callback){
    try{
      const src = babel.transform(source, this.babelOptions);
      const scopeNames = this._scopeNames;
      const scopeValues = this._scopeValues;
      const raw = src.code.replace(/^('|"|`)use strict('|"|`);{0,1}/, '').trim();
      const f = new Function(scopeNames, `return ${raw}`);
      if(typeof(callback)==='function'){
        return setImmediate(()=>callback(null, f(...scopeValues)));
      }
      return f(...scopeValues);
    }catch(e){
      if(typeof(callback)==='function'){
        return setImmediate(()=>callback(e));
      }
      return e;
    }
  }
}
