///////////////////////////////////////////////////////
//////////////////// CREATED BY ///////////////////////
///////////////////////////////////////////////////////
// This macro was created by u/shuggaloaf.
// If you redistribute this, please just give me credit. 
// Better yet, give them the GitHub link so they're 
// always up to date: 
// https://github.com/Shuggaloaf/NPC-to-Coin-Pile
//
// Linked images created using game-icons.net and may 
// not be used for any commerical purposes. 
//
// Enjoy! 
///////////////////////////////////////////////////////


///////////////////////////////////////////////////////
//////////////////// MACRO SYNOPSIS ///////////////////
///////////////////////////////////////////////////////
//   
//  Checks to make sure each selected token is an NPC
//  and if so rolls separately for each token to:
//     - determine random coinage (if any), 
//     - adds that coin to the token,
//     - turns token into an Item Pile
//     - Adds a special effect to the token
//          (if you desire)
///////////////////////////////////////////////////////


/////////////////////////////////////////////////////
//////////////////// USER OPTIONS ///////////////////
/////////////////////////////////////////////////////
//
//   You can have a Light Effect, an Image Change
//   or Both or Neither.    
//   You may also use this with our without the module 
//   Item Piles. 
//
// ITEM PILES INTEGRATION
//   If you have the Item Piles module, this macro 
//   can automatically make all selected tokens 
//   player-lootable.  
//   
//  To TURN OFF integration change the option on the 
//  line below to 0

let hasItemPiles = 1;

// change the 1 above to a 0 if you do not have Item 
// Piles, or do not want to use integration. 


// IMAGE CHANGE                                           
//   Changes the token image. For example you could 
//   use a chest or a loot sack. 
//
//   I cannot provide the image I personally use as
//   it is commercial... 
//   However I made you a few free ones! Nothing fancy,
//   but they're available here if you want: 
//    https://github.com/Shuggaloaf/NPC-to-Item-Pile/tree/main/img
//
//   If you use your own image and the lighting effect
//   option keep in mind that image coloring can affect
//   the intensity of the light effect
//
//   Whichever image you choose to use, since I do not
//   know that path where you will store it,  
//
//   MAKE SURE to SET THE PATH on the next line:

let imgPath = "Images/Icons/Custom/LootBag1.svg";
//      Make this match your image path 

// LIGHT EFFECT
//   Creates a color-shifting light effect. 
//   WARNING: This will overwrite any existing lighting. 
//     However, since they'd likely be dead at this point,
//     this probably doesn't matter too much. 
//
//
// OPTION SELECTION
//   To change options, set the number after the
//   "userOption =" below to your choice. 
//
//   Coin roll and -if enabled- 
//   Item Pile Transformation PLUS:
//       0 = No Special Effect       
//       1 = Light Effect only
//       2 = Change Image Only
//       3 = Both Image Change and Light effect

let userOption = 1;
// Change the 1 to another option's number if you choose. 

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

for (let c of canvas.tokens.controlled) {
    if (c.actor.type !== 'npc') {
        console.log("XXXXX__//  ", c.actor.name, "is not an NPC   \\\\__XXXXX");
        continue;
    } else {
        let tokActor = c.actor;

        const rand = new Roll("1d100").evaluate({ async: false });

        console.log("_________________________________________________________")
        console.log("!!!", tokActor.name, " Random Roll: ", rand.total);

        ///////// Coins /////////
        async function rollCoins(PP, GP, SP, CP) {
            let currency = tokActor.system.currency;

            let rollCP = await new Roll(CP).roll({ async: true });
            let rollSP = await new Roll(SP).roll({ async: true });
            let rollGP = await new Roll(GP).roll({ async: true });
            let rollPP = await new Roll(PP).roll({ async: true });
            
            await tokActor.update({ "data.currency.cp": currency.cp + rollCP.total, "data.currency.sp": currency.sp + rollSP.total, "data.currency.gp": currency.gp + rollGP.total, "data.currency.pp": currency.pp + rollPP.total });
            await console.log('>>>', tokActor.name, 'Coins Added>>   CP:', rollCP.total, ' // SP:', rollSP.total, ' // GP:', rollGP.total, ' // PP:', rollPP.total, ' // ',);
        }

        // Params: rollCoins(PP, GP, SP, CP)
        const percent_chance_16 = () => rollCoins("0", "0", "0", "0");
        const percent_chance_39 = () => rollCoins("0", "0", "3d4", "0");
        const percent_chance_24 = () => rollCoins("0", "0", "4d4", "0");
        const percent_chance_10 = () => rollCoins("0", "0", "5d4", "0");
        const percent_chance_5 = () => rollCoins("0", "1", "0", "0");
        const percent_chance_3 = () => rollCoins("0", "1", "3d6", "0");
        const percent_chance_2 = () => rollCoins("0", "2", "2d6", "0");
        const percent_chance_1 = () => rollCoins("0", "3", "1d6", "0");

        if (rand.total < 16) {
            await percent_chance_16();
        } else if (rand.total > 16 && rand.total < 56) {
            await percent_chance_39();
        } else if (rand.total > 55 && rand.total < 80) {
            await percent_chance_24();
        } else if (rand.total > 79 && rand.total < 90) {
            await percent_chance_10();
        } else if (rand.total > 89 && rand.total < 95) {
            await percent_chance_5();
        } else if (rand.total > 94 && rand.total < 98) {
            await percent_chance_3();
        } else if (rand.total > 97 && rand.total < 100) {
            await percent_chance_2();
        } else {
            await percent_chance_1();
        }

        console.log("_________________________________________________________")

        if (hasItemPiles === 1) {
            await ItemPiles.API.turnTokensIntoItemPiles(c);
        }
        if (userOption === 0) {
        } else if (userOption === 1) {
            await c.document.update({
                light: {
                    dim: 0.5,
                    bright: 0.25,
                    luminosity: 0,
                    alpha: 1,
                    color: '#ad7600',
                    coloration: 9,
                    animation: {
                        type: "sunburst",
                        speed: 3,
                        intensity: 10
                    }
                }
            });
        } else if (userOption === 2) {
            await c.document.update({ img: imgPath, rotation: 0 });
        } else if (userOption === 3) {
            await c.document.update({
                img: imgPath,
                rotation: 0,
                light: {
                    dim: 0.5,
                    bright: 0.25,
                    luminosity: 0,
                    alpha: 1,
                    color: '#ad7600',
                    coloration: 9,
                    animation: {
                        type: "sunburst",
                        speed: 3,
                        intensity: 10
                    }
                }
            });
        } else {
            ui.notifications.error(`Error with User Options. Choose a valid option.`);
        }
    }
}
