module.exports = function solveSudoku(matrix) {
  let finalResult;
  //функция заполнения пустых ячек(ячейки длиной в один ставятся конечно)
  function countEmpty(matrix){
    let result = getCopy(matrix);
    let emptyCounter = 0;
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
          if(candidates.length === 0){return 1}

          if(candidates.length === 1){
            result[row][column] = candidates[0];
            return countEmpty(result)
          }
          result[row][column] = candidates;
          emptyCounter++
        }
      }
    }
    if(emptyCounter === 0){
      finalResult = result;
      return
    }
    return tryCandidate(result)
  }

  function tryCandidate(arr){    
    for(let row = 0; row < 9; row++){
      for(let column = 0; column < 9; column++){
        if(typeof(arr[row][column]) === 'object'){
          let candidate = arr[row][column];          
          //перебор значений кандидата
          for(let i = 0, len = candidate.length; i < len; i++){
            let attempt = getCopy(arr);
            attempt[row][column] = candidate[i];
            if(countEmpty(attempt) === 1){continue}
            return
          }
          return 1;
        }
      }
    }  
  }

  function getCopy(arr){
    let result =[];
    for(let i= 0; i < 9; i++){
      result.push(arr[i].slice())
    }
    return result
  }

  countEmpty(matrix);
  return finalResult;
}