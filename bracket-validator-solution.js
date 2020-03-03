function isValid(code) {

  let stack = [];
  // Determine if the input code is valid
  let i;
  let barCount = 0;
  for(i = 0; i < code.length; i++) {
    let currentChar = code[i];
    if(currentChar === '(' || currentChar === '[' || currentChar === '{') {
      stack.push(currentChar)
    }
    else if(currentChar === ')') {
      let head = stack.pop();
      if(head !== '('){
        return false;
      }
    }
    else if(currentChar === ']') {
      let head = stack.pop();
      if(head !== '['){
        return false;
      }
    } 
    else if(currentChar === '}') {
      let head = stack.pop();
      if(head !== '{'){
        return false;
      }
    }
    else if(currentChar === '|') {
      barCount++;
      if(barCount % 2 === 1) {
        stack.push(currentChar);
      }
      else{
        let head = stack.pop();
        if(head !== '|'){
          return false;
        }
      }
    }
    else {
      // invalid char
      return false;
    }
  }
  if(stack.length === 0){
    return true;
  }

  return false;
}


















// Tests
let desc = 'test valid |'
assertEqual(isValid('|()|{}'), true, desc);

desc = 'test invalid |'
assertEqual(isValid('|()||{}'), false, desc);

desc = 'valid short code';
assertEqual(isValid('()'), true, desc);

desc = 'valid longer code';
assertEqual(isValid('([]{[]})[]{{}()}'), true, desc);

desc = 'mismatched opener and closer';
assertEqual(isValid('([][]}'), false, desc);

desc = 'missing closer';
assertEqual(isValid('[[]()'), false, desc);

desc = 'extra closer';
assertEqual(isValid('[[]]())'), false, desc);

desc = 'empty string';
assertEqual(isValid(''), true, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
