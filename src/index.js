module.exports = function solveSudoku(matrix) {
  let result = matrix.slice();

  //функция заполнения пустых ячек(ячейки длиной в один ставятся конечно)
  function fillEmpty(){
    for(let row = 0; row < 9; row++){
      for(let column = 0; column < 9; column++){
        if(result[row][column] === 0 || typeof(result[row][column]) === 'object'){
          let candidates = [1,2,3,4,5,6,7,8,9];

          //проверка ряда
          for(let secCol = 0; secCol < 9; secCol++){
            let ind = candidates.indexOf(result[row][secCol]);
            if(ind != -1){candidates.splice(ind,1)}
          }

          //проверка колонки
          for(let secRow = 0; secRow < 9; secRow++){
            let ind = candidates.indexOf(result[secRow][column]);
            if(ind != -1){candidates.splice(ind,1)}
          }

          //проверка ячейки
          let startRow = 0;
          if(row >= 0 && row <= 2){startRow = 0}
          if(row >= 3 && row <= 5){startRow = 3}
          if(row >= 6 && row <= 8){startRow = 6}

          let startColumn = 0;
          if(column >= 0 && column <= 2){startColumn = 0}
          if(column >= 3 && column <= 5){startColumn = 3}
          if(column >= 6 && column <= 8){startColumn = 6}

          for(let i = startRow;i <= startRow + 2; i++){
            for(let j =startColumn; j <= startColumn + 2; j++){
              let ind = candidates.indexOf(result[i][j]);
              if(ind != -1){candidates.splice(ind,1)}
            }
          }
          
          if(candidates.length === 1){
            result[row][column] = candidates[0];
            return fillEmpty()
          }
          result[row][column] = candidates;          
        }
      }
    }
  }


  function checkCandidates(){    
    for(let row = 0; row < 9; row++){
      for(let column = 0; column < 9; column++){
        if(typeof(result[row][column]) === 'object'){
          for(let i = 0; i < result[row][column].length; i++){
            let candidate = result[row][column][i];            

            //проверка ряда
            for(let secCol = 0; secCol < 9; secCol++){
              if(typeof(result[row][secCol]) === 'object' && secCol != column){
                if(result[row][secCol].indexOf(candidate) != -1){break}
              }
              if(secCol === 8){
                result[row][column] = candidate;
                return fillEmpty()
              }
            }

            //проверка колонки
            for(let secRow = 0; secRow < 9; secRow++){
              if(typeof(result[secRow][column]) === 'object' && secRow != row){
                if(result[secRow][column].indexOf(candidate) != -1){break}
              }
              if(secRow === 8){
                result[row][column] = candidate;
                return fillEmpty()
              }
            }

            //проверка ячейки
            let startRow = 0;
            if(row >= 0 && row <= 2){startRow = 0}
            if(row >= 3 && row <= 5){startRow = 3}
            if(row >= 6 && row <= 8){startRow = 6}

            let startColumn = 0;
            if(column >= 0 && column <= 2){startColumn = 0}
            if(column >= 3 && column <= 5){startColumn = 3}
            if(column >= 6 && column <= 8){startColumn = 6}

            for(let i = startRow;i <= startRow + 2; i++){
              for(let j =startColumn; j <= startColumn + 2; j++){
                if(typeof(result[i][j]) === 'object' && !(i === row && j === column)){
                  if(result[i][j].indexOf(candidate) != -1){return result}                  
                }
                if(i === startRow +2 && j === startColumn + 2){
                  result[row][column] = candidate;
                  return fillEmpty()
                }
              }
            }            
          }         
        }
      }
    }
  }

  function findOpenPair(){
    for(let row = 0; row < 9; row++){
      for(let column = 0; column < 9; column++){
        if(result[row][column].length === 2){
          let first = result[row][column][0];
          let second = result[row][column][1];
          function arrayCheck(item){
            return item === first || item === second
          }

          //проверка ряда
          let rowCounter = 1;
          let rowCoordinate = 0;
          for(let secCol = 0; secCol < 9; secCol++){
            if(result[row][secCol].length === 2 && result[row][secCol].every(arrayCheck)&&secCol!=column){
              rowCounter++;              
              if(rowCounter > 2){break}
              rowCoordinate = secCol;
            }
            if(secCol === 8 && rowCounter === 2){
              for(let i = 0; i < 9; i++){
                if(i != column && i != rowCoordinate && typeof(result[row][i]) === 'object'){
                  let j = result[row][i].indexOf(first);
                  if(j!=-1){result[row][i].splice(j,1)}

                  let k = result[row][i].indexOf(second);                  
                  if(k!=-1){result[row][i].splice(k,1)}
                }
              }
            }
          }
          

          //проверка колонки
          let columnCounter = 1;
          let columnCoordinate = 0;
          for(let secRow = 0; secRow < 9; secRow++){
            if(result[secRow][column].length === 2 && result[secRow][column].every(arrayCheck)&&secRow!=row){
              columnCounter++;              
              if(columnCounter > 2){break}
              columnCoordinate = secRow;
            }
            if(secRow === 8 && columnCounter === 2){
              for(let i = 0; i < 9; i++){
                if(i != row && i != columnCoordinate && typeof(result[i][column]) === 'object'){
                  let j = result[i][column].indexOf(first);
                  if(j!=-1){result[i][column].splice(j,1)}

                  let k = result[i][column].indexOf(second);                  
                  if(k!=-1){result[i][column].splice(k,1)}
                }
              }
            }
          }
          
          //проверка ячейки
          let cellCounter = 1;
          let cellRowCoordinate = 0;
          let cellColumnCoordinate = 0;

          let startRow = 0;
          if(row >= 0 && row <= 2){startRow = 0}
          if(row >= 3 && row <= 5){startRow = 3}
          if(row >= 6 && row <= 8){startRow = 6}

          let startColumn = 0;
          if(column >= 0 && column <= 2){startColumn = 0}
          if(column >= 3 && column <= 5){startColumn = 3}
          if(column >= 6 && column <= 8){startColumn = 6}

          for(let i = startRow;i <= startRow + 2; i++){
            for(let j =startColumn; j <= startColumn + 2; j++){
              if(result[i][j].length === 2 && result[i][j].every(arrayCheck)&& !(i===row && j===column)){
                cellCounter++
                if(cellCounter > 2){i = 10}// скип верхнего цикла
                cellRowCoordinate = i;
                cellColumnCoordinate = j;
              }
              if(i === startRow + 2 && j === startColumn + 2 && cellCounter === 2){
                for(let k = startRow; k <= startRow+2; k++){
                  for(let n=startColumn; n <= startColumn+2; n++){
                    if( !(k === row && n===column) && !(k === cellRowCoordinate && n ===cellColumnCoordinate)&&typeof(result[k][n])==='object'){
                      let q = result[k][n].indexOf(first);
                      if(q!=-1){result[k][n].splice(q,1)}

                      q = result[k][n].indexOf(second);
                      if(q!=-1){result[k][n].splice(q,1)}
                    }
                  }
                }
              }
            }
          }
        }
      }
    } 
  }

  fillEmpty()
  checkCandidates()
  findOpenPair()

  return result
}

/*
///тест на голые пары

solveSudoku( [
  [4,0,0,0,0,0,9,3,8],
  [0,3,2,0,9,4,1,0,0],
  [0,9,5,3,0,0,2,4,0],
  [3,7,0,6,0,9,0,0,4],
  [5,2,9,0,0,1,6,7,3],
  [6,0,4,7,0,3,0,9,0],
  [9,5,7,0,0,8,3,0,0],
  [0,0,3,9,0,0,4,0,0],
  [2,4,0,0,3,0,7,0,9]
  ])


  solveSudoku( [
    [4, 0, 0, 3, 5, 6, 9, 0, 2],
    [0, 3, 9, 7, 2, 0, 5, 0, 4],
    [0, 2, 5, 0, 9, 4, 7, 3, 0],
    [0, 0, 3, 6, 0, 7, 0, 9, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 3],
    [0, 4, 0, 9, 1, 3, 8, 0, 0],
    [9, 1, 2, 0, 6, 0, 3, 4, 7],
    [3, 0, 4, 0, 7, 9, 0, 0, 0],
    [8, 0, 0, 4, 3, 0, 0, 0, 9]
  ])

  */