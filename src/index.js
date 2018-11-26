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


  fillEmpty()
  checkCandidates()

  return result
}
