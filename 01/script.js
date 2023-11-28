//! --------- PART 1 --------- !//
/*
The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, etc. that they've brought with them, one item per line.
Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line.

For example, suppose the Elves finish writing their items' Calories and end up with the following list:

1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
This list represents the Calories of the food carried by five Elves:

    - The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
    - The second Elf is carrying one food item with 4000 Calories.
    - The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
    - The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
    - The fifth Elf is carrying one food item with 10000 Calories.

In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories.
In the example above, this is 24000 (carried by the fourth Elf).

Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

*/
import { puzzleInput } from "./puzzles.js";


const sumReducer = (sum, num) => sum + num;

//? Diviser la liste en tableau de groupes (chaque groupe est séparé par deux retours à la ligne)
const numberGroups = puzzleInput.split("\n\n");

//? Calculer la somme de chaque groupe

const getSumOfGroup = (group) => {
    return group
            .split('\n') // Supprimer les retour à la ligne
            .map( (item) => Number(item)) // Convertir les nombre de string à number
            .reduce(sumReducer, 0); // Permet de boucler sur chaque valeur du tableu pour l'ajouter à la somme des valeurs précédentes (0, représénte à valeur initiale de la somme)
}

const groupsSum = numberGroups.map((group) => getSumOfGroup(group));

//? Trouver la plus grande somme

const maxSum = Math.max(...groupsSum);
console.log('Plus grande somme : ' + maxSum);


//! --------- PART 2 --------- !//

/*
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
*/

//? Classer le tableau groupSum par ordre décroissant

const sortedSums = groupsSum.sort((sum1,sum2) => sum2 - sum1); // Ici l'opération entre sum2 et sum 1, permet d'obtenir une résultat négatif (va changer l'ordre des deux sum) ou positif (va garder le même ordre)


//? Additionner les trois premieres sommes 
const top3Sums = sortedSums.splice(0,3);
const result = top3Sums.reduce(sumReducer, 0);
console.log("Cumul des 3 plus grandes sommes : " + result);