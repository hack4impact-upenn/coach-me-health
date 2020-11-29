const containsNumber = (input: string): boolean => {
  return (/\b\d{2}\b/.test(input) || /\b\d{3}\b/.test(input))
}

const containsMany = (input: string):boolean => {
  const rex = /-?\d(?:[\d]*\.\d+|[\d]*)/g;
  let match;
  let nums = 0;
  while ((match = rex.exec(input)) !== null) {
    nums++
    if (nums > 1) { 
      return true
    }
  }
  return false
}
  
// regex function to get the number from the string (use in conjunction with contains)
// check for 2 digit number and if null check for 3 digit number
const getNumber = (input_s: string): any => {
  if (input_s.match(/\b\d{3}\b/g) != null)
  {
    return input_s.match(/\d{3}/g)
  }
  else {
      return input_s.match(/\b\d{2}\b/g)
  }
}

// classify numeric user responses. We do not use spacing for the inequalities to be consistent, mostly for the mapping
// currently, we have this as a switch statement but ultimately we want to create some sort of data structure for this as well
const classifyNumeric = (input:string):string => {
    var number : number = parseInt(input)
    if (number < 70) {
    return "toolow"
    }
    else if (70 <= number &&  number <= 79) {
    return "<80"
    }
    else if (80 <= number &&  number <= 130){
    return "green"
    }
    else if (131 <= number && number <= 180){
    return "yellow"
    }
    else if (181 <= number && number <= 300){
    return "red"
    }
    else {
    return ">=301"
    }
}

export { containsNumber, getNumber, classifyNumeric, containsMany};