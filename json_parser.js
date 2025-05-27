function getTokens(input) {
    const tokens = [];
    let i = 0;
    while (i < input.length) {
        let char = input[i];
        if (char === ' ' || char === '\n' || char === '\t') {
            i++;
            continue;
        }
        if (char === '{' || char === '}' || char === ':' || char === ',' || char === '[' || char === ']') {
            tokens.push(char);
            i++;
        }
        else if (char === '"') {
            let str = '"';
            i++;
            while (i < input.length && input[i] !== '"') {
                str += input[i];
                i++;
            }
            str += '"';
            tokens.push(str);
            i++;
        }
        else if (char === '-' || (char >= '0' && char <= '9')) {
            let num = char;
            i++;
            while (i < input.length && ((input[i] >= '0' && input[i] <= '9') || input[i] === '.')) {
                num += input[i];
                i++;
            }
            tokens.push(num);
        }
        else if (input.slice(i, i+4) === 'true') {
            tokens.push('true');
            i += 4;
        }
        else if (input.slice(i, i+5) === 'false') {
            tokens.push('false');
            i += 5;
        }
        else if (input.slice(i, i+4) === 'null') {
            tokens.push('null');
            i += 4;
        }
        else {
            console.log('Invalid JSON: Bad character');
            return [];
        }
    }
    return tokens;
}

function checkJSON(input) {
    const tokens = getTokens(input);
    if (tokens.length === 0) return 1;
    
    let pos = 0;
    
    function checkValue() {
        if (tokens[pos] === '{') {
            checkObject();
        } else if (tokens[pos] === '[') {
            checkArray();
        } else if (tokens[pos].startsWith('"') || !isNaN(tokens[pos]) || 
                   tokens[pos] === 'true' || tokens[pos] === 'false' || tokens[pos] === 'null') {
            pos++;
        } else {
            console.log('Invalid JSON: Bad value');
            throw 1;
        }
    }
    
    function checkObject() {
        if (tokens[pos] !== '{') return;
        pos++;
        
        while (pos < tokens.length && tokens[pos] !== '}') {
            if (!tokens[pos].startsWith('"')) {
                console.log('Invalid JSON: Key must be a string');
                throw 1;
            }
            pos++;
            
            if (tokens[pos] !== ':') {
                console.log('Invalid JSON: Missing :');
                throw 1;
            }
            pos++;
            
            checkValue();
            
            if (pos < tokens.length && tokens[pos] === ',') {
                pos++;
            } else {
                break;
            }
        }
        
        if (pos >= tokens.length || tokens[pos] !== '}') {
            console.log('Invalid JSON: Missing }');
            throw 1;
        }
        pos++;
    }
    
    function checkArray() {
        if (tokens[pos] !== '[') return;
        pos++;
        
        while (pos < tokens.length && tokens[pos] !== ']') {
            checkValue();
            if (pos < tokens.length && tokens[pos] === ',') {
                pos++;
            } else {
                break;
            }
        }
        
        if (pos >= tokens.length || tokens[pos] !== ']') {
            console.log('Invalid JSON: Missing ]');
            throw 1;
        }
        pos++;
    }
    
    try {
        checkObject();
        if (pos !== tokens.length) {
            console.log('Invalid JSON: Extra stuff at end');
            return 1;
        }
        console.log('Valid JSON');
        return 0;
    } catch (e) {
        return 1;
    }
}

// Run some examples
console.log('Example Tests:');
checkJSON('{"key": {"nested": "value"}, "array": [1, 2, 3]}');
checkJSON('{"key": "value"}');
checkJSON('{"key": bad}');


