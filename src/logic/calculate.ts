import Big from "big.js";

import operate from "./operate";
import isNumber from "../utils/isNumber";

export interface Values {
  total: string | null;
  next: string | null;
  operation: string | null;
}

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export default function calculate(obj: Values, buttonName: string): Values {
  console.log("obj: ", obj);
  console.log("buttonName: ", buttonName);

  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return {
        total: null,
        next: null,
        operation: null,
      };
    }
    // If there is an operation, update next
    if (obj.operation) {
      if (obj.next) {
        return { ...obj, next: obj.next + buttonName };
      }
      return { ...obj, next: buttonName };
    }
    // If there is no operation, update next and clear the value
    if (obj.next) {
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      return {
        next,
        total: null,
        operation: null,
      };
    }
    return {
      next: buttonName,
      total: null,
      operation: null,
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: Big(result).div(Big("100")).toString(),
        next: null,
        operation: null,
      };
    }
    if (obj.next) {
      return {
        next: Big(obj.next).div(Big("100")).toString(),
        total: null,
        operation: null,
      };
    }
    return {
      next: null,
      total: null,
      operation: null,
    };
  }

  if (buttonName === ".") {
    if (obj.next) {
      // ignore a . if the next number already has one
      if (obj.next.includes(".")) {
        return {
          total: null,
          next: null,
          operation: null,
        };
      }
      return {
        total: null,
        next: obj.next + ".",
        operation: null,
      };
    }
    return {
      total: null,
      next: "0.",
      operation: null,
    };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      };
    } else {
      // '=' with no operation, nothing to do
      return {
        next: null,
        total: null,
        operation: null,
      };
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return {
        total: null,
        next: (-1 * parseFloat(obj.next)).toString(),
        operation: null,
      };
    }
    if (obj.total) {
      return {
        next: null,
        total: (-1 * parseFloat(obj.total)).toString(),
        operation: null,
      };
    }
    return {
      next: null,
      total: null,
      operation: null,
    };
  }

  // Button must be an operation

  // When the user presses an operation button without having entered
  // a number first, do nothing.
  // if (!obj.next && !obj.total) {
  //   return {};
  // }

  // User pressed an operation button and there is an existing operation
  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
    };
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!obj.next) {
    return {
      next: null,
      total: null,
      operation: buttonName,
    };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  };
}
