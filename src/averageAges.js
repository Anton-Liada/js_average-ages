'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filterMen = people.filter(({ sex, died }) => (century)
    ? sex === 'm'
    && Math.ceil(died / 100) === century
    : sex === 'm'
  );

  const menAge = filterMen.map(({ died, born }) => died - born);

  const menAverageAge = menAge.reduce((ageA, ageB) =>
    ageA + ageB, 0) / menAge.length;

  return menAverageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filterWomen = people.filter(({ name, sex }) => (withChildren)
    ? sex === 'f'
    && people.find(({ mother }) => name === mother)
    : sex === 'f'
  );

  const womenAge = filterWomen.map(({ died, born }) => died - born);

  const womenAvarageAge = womenAge.reduce((ageA, ageB) =>
    ageA + ageB, 0) / womenAge.length;

  return womenAvarageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const findChild = people.filter(({ mother, sex }) => (onlyWithSon)
    ? people.find(({ name }) => name === mother && sex === 'm')
    : people.find(({ name }) => name === mother)
  );

  const womenAgeDiff = findChild.reduce((years, child) =>
    years + (child.born - people.find(mother =>
      child.mother === mother.name).born), 0) / findChild.length;

  return womenAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
