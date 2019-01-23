module.exports = function solveSudoku(matrix) {
  let finalResult = 'нерешаемо';//значение для вывода
  const sudokuLength = 9;//длина строки/столбца

  //функция копирования матрицы
  function getCopy(arr){
    let result =[];
    for(let i= 0; i < sudokuLength; i++){
      result.push(arr[i].slice())
    }
    return result
  }

  //функция заполнения ячек возможными вариантами(кандидатами)
  function countEmpty(matrix){
    let result = getCopy(matrix);
    let emptyCounter = 0;//счетчик незаполненых ячеек
    for(let row = 0; row < sudokuLength; row++){//перебор строк
      for(let column = 0; column < sudokuLength; column++){//перебор столбцов
        if(result[row][column] === 0 || result[row][column] instanceof Array){
          let candidates = [1,2,3,4,5,6,7,8,9];
          //далее проверкой ряда/столбца/блока ячейки удаляем невозможные значения

          //проверка ряда
          for(let secCol = 0; secCol < sudokuLength; secCol++){
            let ind = candidates.indexOf(result[row][secCol]);//поиск ЗАПОЛНЕННОГО значения в возможных
            if(ind != -1){candidates.splice(ind,1)}//если в возможных значение числится, удаляем
          }

          //проверка колонки
          for(let secRow = 0; secRow < sudokuLength; secRow++){
            let ind = candidates.indexOf(result[secRow][column]);//поиск ЗАПОЛНЕННОГО значения в возможных
            if(ind != -1){candidates.splice(ind,1)}//если в возможных значение числится, удаляем
          }

          //проверка блока
          //поиск левойверхней координаты блока
          let startRow = 0;
          if(row >= 0 && row <= 2){startRow = 0}
          if(row >= 3 && row <= 5){startRow = 3}
          if(row >= 6 && row <= 8){startRow = 6}

          let startColumn = 0;
          if(column >= 0 && column <= 2){startColumn = 0}
          if(column >= 3 && column <= 5){startColumn = 3}
          if(column >= 6 && column <= 8){startColumn = 6}

          for(let i = startRow;i <= startRow + 2; i++){//перебор строк блока
            for(let j =startColumn; j <= startColumn + 2; j++){//перебор столбцов блока
              let ind = candidates.indexOf(result[i][j]);//поиск ЗАПОЛНЕННОГО значения в возможных
              if(ind != -1){candidates.splice(ind,1)}//если в возможных значение числится, удаляем
            }
          }
          if(candidates.length === 0){return 1}//если в возможных значений нет, возвращаем тригер continue

          if(candidates.length === 1){//если возможный вариант 1, заполняем ячейку и перезапускаем функцию
            result[row][column] = candidates[0];
            return countEmpty(result)
          }
          result[row][column] = candidates;//заполняем ячейку массивом кандидатов          
          emptyCounter++//плюсуем счетчик
        }
      }
    }
    if(emptyCounter === 0){//если не заполнено(не найдено) пустых, возврат массива
      finalResult = result;
      return
    }
    return tryCandidate(result)//запуск функции подстановки
  }

  //функция подстановки
  function tryCandidate(arr){
    //поиск ячейки с кандидатом
    for(let row = 0; row < sudokuLength; row++){//перебор рядов
      for(let column = 0; column < sudokuLength; column++){//перебор колонок
        if(arr[row][column] instanceof Array){
          let candidate = arr[row][column];
          //перебор значений кандидата
          for(let i = 0, len = candidate.length; i < len; i++){//поочередная подстановка возможных значений
            let attempt = getCopy(arr);
            attempt[row][column] = candidate[i];
            //запускаем внутри if функцию заполнения ячеек.
            if(countEmpty(attempt) === 1){continue}
            //если сработал тригер, это значение не подходит. если тригера небыло, значит значение верное и функцию можно прекратить
            return
          }
          //если после перебора всех значений функция не прекратилась, возвращаем тригер continue
          return 1;
        }
      }
    }  
  }

  

  countEmpty(matrix);
  return finalResult;
}