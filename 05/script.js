//! --------- PART 1 --------- !//

/*
The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.

The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.

The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.

Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack.
In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:

[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 

In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:

        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3

Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:

        [Z]
        [N]
[M]     [D]
[C]     [P]
 1   2   3

Finally, one crate is moved from stack 1 to stack 2:

        [Z]
        [N]
        [D]
[C] [M] [P]
 1   2   3

The Elves just need to know which crate will end up on top of each stack; in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3, so you should combine these together and give the Elves the message CMZ.

After the rearrangement procedure completes, what crate ends up on top of each stack?
*/

import { puzzleInput } from "./puzzles.js";

//! Représenter les piles de caisses sous forme d'un tableau de string
const [stacksPart, instructionsPart] = puzzleInput.split('\n\n');
const stackRows = stacksPart.split('\n').slice(0, -1);
const stackRows2 = stackRows.map((row) => [...row].filter((char, index) => index%4 === 1));

const fillNewArray = (inputArray) =>  {

    //? Créer un tableau vide avec autant de string que de piles 
    const outputArray = new Array(inputArray[inputArray.length - 1].length).fill("");

    //? Remplir de tableau vide pour reconstituer les piles (colonnes) à partir des lignes
    inputArray.map((row, indexRow) => {
        row.map((char, indexChar) => char !== ' ' ? outputArray[indexChar] += inputArray[indexRow][indexChar] : '');
    });

    //? Retourner le nouveau tableau
    return outputArray;
}

//? Stocker toutes le contenu initial des piles de caisses dans une constante
const initialStacks = fillNewArray(stackRows2);

//! Réprésennter les instructions sous formes de tableaux [quantité, pile d'origine, pile d'arrivée]
const instructionsSplit = instructionsPart.split('\n');
const instructionsArray = instructionsSplit.map((instruction) => instruction
    .replace('move ','')
    .replace(' from ', ',')
    .replace(' to ', ',')
    .split(',')
);

//! Fonction pour bouger les caisses d'un pile à une autre
const moveCrates = ([quantity, startStack, endStack], stacks) => {

    //? Récupérer la liste des caisses à déplacer
    const [...cratesToMove] = stacks[startStack-1].slice(0, quantity);

    //? Pour chaque caisse, la déplacer dans le bon ordre dans la nouvelle pile
    cratesToMove.map((crate) => {
        stacks[endStack-1] = crate.concat(stacks[endStack-1]);
        stacks[startStack-1] = stacks[startStack-1].slice(1);
    });

    //? Retourner le nouvel agencement des piles de caisses
    return stacks;
}

//! Exécuter la liste des instructions

//? On exécute la méthode moveCrates pour toute les instructions données (la méthode réduce permet de converver la configuration des piles parès chaque instruction)
const stacksAfterMoves = instructionsArray.reduce((stacks, instruction) => moveCrates(instruction,stacks) , initialStacks);

//? On récupère la caisse en haut de chaque pile sous forme de string
const topStacks = stacksAfterMoves
    .map((stack) => stack[0])
    .join('');

console.log(`Résultat partie 1 : ${topStacks}`);


//! --------- PART 2 --------- !//

/*
As you watch the crane operator expertly rearrange the crates, you notice the process isn't following your prediction.

Some mud was covering the writing on the side of the crane, and you quickly wipe it away. The crane isn't a CrateMover 9000 - it's a CrateMover 9001.

The CrateMover 9001 is notable for many new and exciting features: air conditioning, leather seats, an extra cup holder, and the ability to pick up and move multiple crates at once.

Again considering the example above, the crates begin in the same configuration:

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
Moving a single crate from stack 2 to stack 1 behaves the same as before:

[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 
However, the action of moving three crates from stack 1 to stack 3 means that those three moved crates stay in the same order, resulting in this new configuration:

        [D]
        [N]
    [C] [Z]
    [M] [P]
 1   2   3
Next, as both crates are moved from stack 2 to stack 1, they retain their order as well:

        [D]
        [N]
[C]     [Z]
[M]     [P]
 1   2   3
Finally, a single crate is still moved from stack 1 to stack 2, but now it's crate C that gets moved:

        [D]
        [N]
        [Z]
[M] [C] [P]
 1   2   3
In this example, the CrateMover 9001 has put the crates in a totally different order: MCD.

Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the final supplies. After the rearrangement procedure completes, what crate ends up on top of each stack?
*/

//! Fonction pour bouger les caisses d'un pile à une autre avec la CrateMover 9001
const initialStacks9001 = fillNewArray(stackRows2);

const moveCrates9001 = ([quantity, startStack, endStack], stacks) => {

    //? Récupérer la liste des caisses à déplacer
    const cratesToMove = stacks[startStack-1].slice(0, quantity);

    //? Déplacer les caisses dans l'ordre dans lequel elles ont été attrapées par la grue 9001
    stacks[endStack-1] = cratesToMove + stacks[endStack-1];
    stacks[startStack-1] = stacks[startStack-1].slice(cratesToMove.length);
    return stacks;
}

//? On exécute la méthode moveCrates pour toute les instructions données (la méthode réduce permet de converver la configuration des piles parès chaque instruction)
const stacksAfterMoves9001 = instructionsArray.reduce((stacks, instruction) => moveCrates9001(instruction, stacks), initialStacks9001);

//? On récupère la caisse en haut de chaque pile sous forme de string
const topStacks9001 = stacksAfterMoves9001
    .map((stack) => stack[0])
    .join('')

console.log(`Résultat partie 2 : ${topStacks9001}`);