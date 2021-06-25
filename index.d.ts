// Type definitions for jest-when-xt <https://github.com/jonasholtkamp/jest-when-xt>
// Definitions by: @jonasholtkamp <https://github.com/jonasholtkamp>

export function when(fun: Function): When;

interface When {
  calledWith(...params: any[]): CalledWith,
  expectCalledWith(...params: any[]): CalledWith
}

interface CalledWith {
  mockReturnValue(value: any): WhenCalledWith,
  mockReturnValueOnce(value: any): WhenCalledWith,
  mockResolvedValue(value: any): WhenCalledWith,
  mockResolvedValueOnce(value: any): WhenCalledWith,
  mockRejectedValue(value: any): WhenCalledWith,
  mockRejectedValueOnce(value: any): WhenCalledWith,
}

interface WhenCalledWith extends When, CalledWith {

}