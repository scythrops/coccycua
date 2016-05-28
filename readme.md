Coccycua
---

Coccycua is a wrapper for generic compilation (via Babel) and execution of ES6.
It is being built as a part of Scythrops, but their is no reason other projects
couldn't make use of it.

**NOTE:** Coccycua is basically the equivalent of EVAL, so if you think EVAL would
be EVIL in your project, then don't use Coccycua.  It does provide a sandboxed
approach, but users could find a way to end around that and screw everything up
for you.  It is really only meant to be used in projects with a controlled
environment.

Usage
===

### Install:

```shell
npm install --save coccycua
```

Then in your project

```js
const {
  Coccycua
} = require('coccycua');

const globalScope = {
  DEFAULT_NAME: 'World'
};

const builder = new Coccycua(globalScope);
const source = 'console.log(`Hello ${DEFAULT_NAME}!`)'; // Console log exists by default
const funcSource = '(options = {})=>console.log(`Hello ${options.name||DEFAULT_NAME}!`)';

const f1 = builder.compile(source);
if(f1 instanceof Error){
  console.error(f);
  if(f1.stack){
    console.error(f1.stack);
  }
  process.exit(1);
}

const f2 = builder.compileFunction(funcSource);
if(f2 instanceof Error){
  console.error(f2);
  if(f2.stack){
    console.error(f2.stack);
  }
  process.exit(1);
}
f1(); // Console output: Hello World!

f2(); // Console output: Hello World!
f2({}); // Console output: Hello World!
f2({name: 'Test'}); // Console output: Hello Test!
```

API
===

### new Coccycua(GlobalScope, Options) -> Coccycua()

### Coccycua.compile(source, [callback]) -> Function() || Error()

### Coccycua.compileFunction(source, [callback]) -> Function() || Error()
