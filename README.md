# jest-when-xt

[![build status](https://travis-ci.org/jonasholtkamp/jest-when-xt.svg?branch=master)](https://travis-ci.org/jonasholtkamp/jest-when-xt)
[![codecov](https://codecov.io/gh/jonasholtkamp/jest-when-xt/branch/master/graph/badge.svg)](https://codecov.io/gh/jonasholtkamp/jest-when-xt)
[![GitHub license](https://img.shields.io/github/license/jonasholtkamp/jest-when-xt.svg)](https://github.com/jonasholtkamp/jest-when-xt/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/jest-when-xt.svg)](https://www.npmjs.com/package/jest-when-xt)

A fork from [@timkindberg](https://github.com/timkindberg/)'s [jest-when](https://github.com/timkindberg/jest-when).

An extended, sugary way to mock return values for specific arguments only

### Features
`jest-when-xt` allows you to use a set of the original
[Jest mock functions](https://facebook.github.io/jest/docs/en/mock-function-api) in order to train
your mocks only based on parameters your mocked function is called with.

An example statement would be as follows:

```javascript
when(fn).calledWith(1).mockReturnValue('yay!')
```

The trained mock function `fn` will now behave as follows -- assumed no other trainings took place:
* return `yay!` if called with `1` _as first parameter_
* return `undefined` if called with _any other first parameter_ than `1`

For extended usage see the examples below.

The supported set of mock functions is:
* `mockReturnValue`
* `mockReturnValueOnce`
* `mockResolvedValue`
* `mockResolvedValueOnce`
* `mockRejectedValue`
* `mockRejectedValueOnce`

### Usage

#### Installation
```bash
npm i --save-dev jest-when-xt
```

#### Basic usage:
```javascript
import { when } from 'jest-when-xt'

const fn = jest.fn()
when(fn).calledWith(1).mockReturnValue('yay!')

expect(fn(1)).toEqual('yay!')
```

#### Supports chaining of mock trainings:
```javascript
when(fn)
  .calledWith(1).mockReturnValue('yay!')
  .calledWith(2).mockReturnValue('nay!')

expect(fn(1)).toEqual('yay!')
expect(fn(2)).toEqual('nay!')
```
Thanks to [@fkloes](https://github.com/fkloes).

```javascript
when(fn)
  .calledWith(1)
  .mockReturnValueOnce('yay!')
  .mockReturnValue('nay!')

expect(fn(1)).toEqual('yay!')
expect(fn(1)).toEqual('nay!')
```
Thanks to [@danielhusar](https://github.com/danielhusar).

#### Supports replacement of mock trainings:
```javascript
when(fn).calledWith(1).mockReturnValue('yay!')
expect(fn(1)).toEqual('yay!')

when(fn).calledWith(1).mockReturnValue('nay!')
expect(fn(1)).toEqual('nay!')
```
This replacement of the training does only happen for mock functions _not_ ending in `*Once`.
Trainings like `mockReturnValueOnce` are removed after a matching function call anyway.

Thanks to [@fkloes](https://github.com/fkloes).

#### Supports multiple args with partial argument matching:
```javascript
when(fn).calledWith(1, true).mockReturnValue('yay!')

expect(fn(1, true)).toEqual('yay!')
expect(fn(1, true, 'foo')).toEqual('yay!')
```

#### Supports training for single calls
```javascript
when(fn).calledWith(1, true, 'foo').mockReturnValueOnce('yay!')
when(fn).calledWith(1, true, 'foo').mockReturnValueOnce('nay!')

expect(fn(1, true, 'foo')).toEqual('yay!')
expect(fn(1, true, 'foo')).toEqual('nay!')
expect(fn(1, true, 'foo')).toBeUndefined()
```

#### Supports Promises, both resolved and rejected
```javascript
when(fn).calledWith(1).mockResolvedValue('yay!')
when(fn).calledWith(2).mockResolvedValueOnce('nay!')

await expect(fn(1)).resolves.toEqual('yay!')
await expect(fn(1)).resolves.toEqual('yay!')

await expect(fn(2)).resolves.toEqual('nay!')
expect(await fn(2)).toBeUndefined()


when(fn).calledWith(3).mockRejectedValue(new Error('oh no!'))
when(fn).calledWith(4).mockRejectedValueOnce(new Error('oh no, an error again!'))

await expect(fn(3)).rejects.toThrow('oh no!')
await expect(fn(3)).rejects.toThrow('oh no!')

await expect(fn(4)).rejects.toThrow('oh no, an error again!')
expect(await fn(4)).toBeUndefined()
```

#### Supports jest matchers:
```javascript
when(fn).calledWith(
  expect.anything(),
  expect.any(Number),
  expect.arrayContaining(false)
).mockReturnValue('yay!')

const result = fn('whatever', 100, [true, false])
expect(result).toEqual('yay!')
```

#### Supports compound declarations:
```javascript
when(fn).calledWith(1).mockReturnValue('no')
when(fn).calledWith(2).mockReturnValue('way?')
when(fn).calledWith(3).mockReturnValue('yes')
when(fn).calledWith(4).mockReturnValue('way!')

expect(fn(1)).toEqual('no')
expect(fn(2)).toEqual('way?')
expect(fn(3)).toEqual('yes')
expect(fn(4)).toEqual('way!')
expect(fn(5)).toEqual(undefined)
```

#### Assert the args:

Use `expectCalledWith` instead to run an assertion that the `fn` was called with the provided
args. Your test will fail if the jest mock function is ever called without those exact
`expectCalledWith` params.

Disclaimer: This won't really work very well with compound declarations, because one of them will
always fail, and throw an assertion error.
```javascript
when(fn).expectCalledWith(1).mockReturnValue('x')

fn(2); // Will throw a helpful jest assertion error with args diff
```

### Contributors (in order of contribution)
* [@timkindberg](https://github.com/timkindberg/) (original author)
* [@fkloes](https://github.com/fkloes)
* [@danielhusar](https://github.com/danielhusar)