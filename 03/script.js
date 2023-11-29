//! --------- PART 1 --------- !//

/*
One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.

Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.

The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).

The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items in the second compartment.

For example, suppose you have the following list of contents from six rucksacks:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw

    - The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its first compartment contains the items vJrwpWtwJgWr, while the second compartment contains the items hcsFMMfFFhFp. The only item type that appears in both compartments is lowercase p.
    - The second rucksack's compartments contain jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both compartments is uppercase L.
    - The third rucksack's compartments contain PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.
    - The fourth rucksack's compartments only share item type v.
    - The fifth rucksack's compartments only share item type t.
    - The sixth rucksack's compartments only share item type s.

To help prioritize item rearrangement, every item type can be converted to a priority:

    - Lowercase item types a through z have priorities 1 through 26.
    - Uppercase item types A through Z have priorities 27 through 52.
In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

*/

import { puzzleInput } from "./puzzles.js";
const sumReducer = (sum, num) => sum + num;

const rucksacks = puzzleInput.split('\n');

//! Trouver le type d'article en commun pour chauque compartiment (chaque ligne du puzzle)
const findCommonItem = (rucksack) => {
    //? Diviser la chaine de caratère du sac en deux moitiés
    const halfIndex = rucksack.length / 2;
    const [firstHalf, secondHalf] = [(rucksack.slice(0, halfIndex)), (rucksack.slice(halfIndex, rucksack.length))];

    //? Trouver le caractère en commun entre les deux moitiés
    const commonItem = [...secondHalf].find((item) => firstHalf.includes(item));
    /*
        Ici on déstructure la sting 'secondHalf' dans un tableau sur lequel on va appliquer la méthode find(), qui va vérifier une condition pour chaque item du tableau.
        Cette condition est que la chaine de caractère 'firsthalf' contienne l'item. On vérifie cette conditioon grâce à la méthode include(), qui renvoie "true" si l'item est trouvé.
        Ainsi, dès qu'un item du tableau déstruturé est trouvé, il est stocké dans la constante 'commonItem' et le traitement s'arrête là.
        Cela ne fonctionne donc que parce que nous savons qu'il n'y a qu'un seul caractère en commun. Sinon, il aurait fallu utiliser la méthode filter().
    */

    //? Retourner le caractère en commun
    return commonItem; 

}

//! Trouver la priorité de chaque type d'article trouvé
const getItemPriority = (item) => /[a-z]/.test(item) ? item.charCodeAt() - 96 : item.charCodeAt() - (64 - 26);
/*
    Ici, on teste si le paramètre 'item' est une minuscule => dans les deux cas, on utilise la méthode charCodeAt(), qui renvoie un un entier compris entre 0 et 65535 qui correspond au code UTF-16 d'un caractère.
    On remarque en utilisant cette méthode sur un 'a' qu'elle retourne 97, 98 pour un "b", 99 pour un "c"... => pour obtenir la bonne priorité, on soustrait donc 96.
    En utilisant cette méthode avec des lettres majuscules, on obtient 65 pour un "A", 66 pou un "B", "67" pour un "C" => on retire donc 64 pour que "A"=1, "B"=2.... sauf que "A" doit valoir 27, "B" doit valoi 28... on ajoute donc 26.
*/

//! Calculer la somme des priorités
// const commonItems = rucksacks.map((rucksack) => findCommonItem(rucksack));
// const prioritiesList = commonItems.map((item) => getItemPriority(item));
// const sumOfPrioryties = prioritiesList.reduce(sumReducer, 0);

const prioritySum = rucksacks
    .map(findCommonItem)
    .map(getItemPriority)
    .reduce(sumReducer, 0);

console.log(prioritySum);


//! --------- PART 2 --------- !//

/*
As you finish identifying the misplaced items, the Elves come to you with another issue.

For safety, the Elves are divided into groups of three. Every Elf carries a badge that identifies their group. For efficiency, within each group of three Elves, the badge is the only item type carried by all three Elves. That is, if a group's badge is item type B, then all three Elves will have item type B somewhere in their rucksack, and at most two of the Elves will be carrying any other item type.

The problem is that someone forgot to put this year's updated authenticity sticker on the badges. All of the badges need to be pulled out of the rucksacks so the new authenticity stickers can be attached.

Additionally, nobody wrote down which item type corresponds to each group's badges. The only way to tell which item type is the right one is by finding the one item type that is common between all three Elves in each group.

Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example, the first group's rucksacks are the first three lines:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg

And the second group's rucksacks are the next three lines:

wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw

In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.

Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z) for the second group. The sum of these is 70.

Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?

*/

//! Diviser le puzzle en groupe de 3
const getGroupsOf3 = (array) => array.length ? [array.slice(0,3), ...getGroupsOf3(array.slice(3))] : [];
/*
    Ici, on utilise un fonction récursive qui va, à chaque exécution, ajouter un tableau de 3 items au tableau de la précédente exécution, jusqu'à ce que array.length = 0.
*/

//! Trouver le type en commun entre les 3 sacs d'un groupe
const getGroupCommonCharacter = (group) => {
    
    //? Déstructurer array en  trois sacs
    const [sack1, sack2, sack3] = group;

    //? Trouver l'item en commun
    const groupCommonItem = [...sack3].find((item) => sack1.includes(item) && sack2.includes(item));

    //? Retourner l'item
    return groupCommonItem;
}

//! Faire la somme des prirités
const prioritySumOfGroup = getGroupsOf3(rucksacks)
    .map((group) => getGroupCommonCharacter(group))
    .map((character) => getItemPriority(character))
    .reduce(sumReducer, 0);

console.log(prioritySumOfGroup);