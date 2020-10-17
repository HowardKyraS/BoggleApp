/**
 Kyra Swift
 @02852494 */

// https://cecilia-sister-3000.codio.io

 exports.findAllSolutions = function(dictionary){
   let solutions = [];
   let solutionSet = new Set();
   
   // Generate Random Grid
   let grid = RandomGrid();
   
   // Check Input Param (return [] if incorrect)
   if(grid == null || dictionary == null){
     return solutions;
   }
   
   // Check the length of grid (2x2)
   let Row = grid.length;
   let Col = grid[0].length;
   
   // 3. Check to make sure columns equal rows
    for (let i=0; i<Row; i++){
      if(grid[i].length != Row)
        return solutions;
    }
   
   // 4. Convert grid and dictionary to same case
   convertToLowerCase(grid, dictionary);
   
   // 5. Set up data structures (i.e solutions, visited, dictionary (Trie | Hash))
   let trie = new Set(dictionary);
   
   // Iterate over entire grid and find all words that begin w the grid[y][x]
   for(let y=0; y<Row; y++){
     for(let x=0; x<Row; x++){   
       let word = [];  

       // Set up visited array
       let visited = new Array(Row).fill(false).map(()=> Array(Col).fill(false));
       
       findWords(word, grid, trie, y, x, visited, solutionSet);
     }
   }
   
   // Return Words
   solutions = Array.from(solutionSet);
   return solutions
 };



// Generates Random Grid
function RandomGrid() {
  const dice = ["AAAFRS", "AAEEEE", "AAFIRS", "ADENNN", "AEEEEM",
                "AEEGMU", "AEGMNN", "AFIRSY", "BJKQXZ", "CCNSTW",
                "CEIILT", "CEILPT", "CEIPST", "DHHNOT", "DHHLOR",
                "DHLNOR", "DDLNOR", "EIIITT", "EMOTTT", "ENSSSU",
                "FIPRSY", "GORRVW", "HIPRRY", "NOOTUW", "OOOTTU"];
  let chars = dice.map(cube => cube[Math.floor(Math.random() * cube.length)]);
  chars.sort(() => Math.random() - 0.5); // Shuffle the letters.

  const SIZE = 5;
  let grid = [];
  for (let row = 0; row < SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < SIZE; ++col) {
      grid[row][col] = chars[SIZE * row + col];
      if (grid[row][col] === "Q") grid[row][col] = "Qu";
    }
  }
  return grid;
}



// Find words that exist in the dictionary
function findWords(word, grid, trie, y, x, visited, solutionSet){  
  const adjacent_char = [ [-1,-1],
                         [-1,0],
                         [-1,1],
                         [0,1], 
                         [1,1], 
                          [1,0] ,
                         [1, -1],
                         [0,-1]];
  
  
  // Base Case: 
  // 1. y,x out of bounds  
  // 2. if index is already visited
   if( y < 0 || y >= grid.length || x >= grid.length || x < 0 || visited[y][x] == true )
     return;
  
  // 1. Append grid[y][x] to word
  word += grid[y][x];
  
  // 2. Test to see if prefix, If true mark visited
  if (isPrefix(trie, word)){
    visited[y][x] = true;  
    
  // 2b. Test to see if this is an actual word
    if(isWord(trie, word)){
          solutionSet.add(word);  // If word is found, add word to solutionSet  
    }
   
  // 2c. call findWords recursively, try each tile adjacent grid location
  for(let i=0; i<8; i++){
    findWords(word, grid, trie, y + adjacent_char[i][0], x + adjacent_char[i][1], visited, solutionSet);
    }
  }
  
  // 3. Unmark all visited[y][x]
  visited[y][x] = false;
  }


// Return true if prefix is in trie; false otherwise
function isPrefix(trie, word){  
  for(let temp_word of trie){
    if( temp_word.substr(0, word.length) == word){
      return true;
    }
  }
  return false;  
}

// Check if Temp_word is actual Word
function isWord(trie, word){
  for(let temp_word of trie){
    if( temp_word == word && word.length >= 3){
      return true;
    }
  }
  return false;
}


// Converts Grid and Dictionary to all lowercase
function convertToLowerCase(grid, dictionary){
  for( let i=0; i<grid.length; i++){
    for(let j=0; j<grid[i].length; j++){
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }
  
  for(let i =0; i<dictionary.length; i++){
    dictionary[i] = dictionary[i].toLowerCase();
  }
}

const dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log(exports.findAllSolutions(dictionary));
