/**
 * Функция возвращает окончание для множественного числа слова на основании числа и массива окончаний
 * param  iNumber Integer Число на основе которого нужно сформировать окончание
 * param  aEndings Array Массив слов или окончаний для чисел (1, 4, 5),
 *         например ['яблоко', 'яблока', 'яблок']
 * return String
 */
export const getNumEnding = (iNumber, aEndings) => {
    iNumber %= 100;
    if (iNumber > 10 && iNumber < 20)
        return aEndings[2];
    switch (iNumber % 10) {
        case 1:
            return aEndings[0];
        case 2:
        case 3:
        case 4:
            return aEndings[1];
        default:
            return aEndings[2];
    }
};