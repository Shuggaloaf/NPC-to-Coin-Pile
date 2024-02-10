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

   let userOption = 3; 
// Change the 3 to another option's number if you choose. 
   
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////




const npcs = canvas.tokens.controlled.filter(i => i.actor.type === "npc");
for(let npc of npcs){    
    let tokActor = npc.actor;
    const rand = new Roll("1d100").evaluate({async: false});
    console.log(">>>",npc.document.name," Random Roll: ",rand.total);

  ///////// Coins /////////
    async function rollCoins(PP, GP, SP, CP) {    
        let currency = tokActor.system.currency;
        let rollCP = await new Roll(CP).roll({async:true});
        let rollSP = await new Roll(SP).roll({async:true});
        let rollGP = await new Roll(GP).roll({async:true});
        let rollPP = await new Roll(PP).roll({async:true});
        await tokActor.update({"system.currency.cp": currency.cp + rollCP.total, "system.currency.sp": currency.sp + rollSP.total, "system.currency.gp": currency.gp + rollGP.total, "system.currency.pp": currency.pp + rollPP.total});       
        await console.log('>>>',npc.document.name,'Coins Added>>   CP:',rollCP.total,' // SP:',rollSP.total,' // GP:',rollGP.total,' // PP:',rollPP.total,' // ',);
    }
    
    if(rand.total<26){
        console.log(">>> No coins found")                 //Nothing
    } else if (rand.total>26 && rand.total<56){
        await rollCoins("0","0","0","1d10");              //6CP avg
    } else if (rand.total>55 && rand.total<80){
        await rollCoins("0","0","4d3","1d14+11");         //1GP avg
    } else if (rand.total>79 && rand.total<90){
        await rollCoins("0","2d3","2d10+10","1d21+39");   //5GP avg
    } else if (rand.total>89 && rand.total<95){
        await rollCoins("0","1d6+4","7d5","1d21+59");     //10GP avg
    } else if (rand.total>94 && rand.total<98){
        await rollCoins("0","1d10+5","15d6","50d3");      //20GP avg
    } else if (rand.total>97 && rand.total<100){
        await rollCoins("1d3","10d3+3","15d6","40d4");    //50GP avg
    } else {
        await rollCoins("3d3","24d2","10d6","25d6");      //100GP avg
    }
   
               
  ///////// Item Pile /////////
    if (hasItemPiles === 1){
        await ItemPiles.API.turnTokensIntoItemPiles(npc);
    }
  
  ///////// Remove Weapons, Items, Spells, etc. from Itemp Pile /////////
    const deleteIds = tokActor.items.filter(i => ["weapon","equipment","consumable"].includes(i.type)).map(i => i.id);
    await tokActor.deleteEmbeddedDocuments('Item', deleteIds);

  ///////// Image & Light Handling /////////     
    if (npc.actor.system.details.level > 0) {
       break;
    } else {          
        if (userOption === 0){
        }else if (userOption === 1){
            await npc.document.update({
                light:{
                    dim:.6,
                    bright:.3,
                    luminosity:0,
                    alpha:1,
                    color:'#ad7600',
                    coloration:9,
                    animation:{
                        type:"radialrainbow",
                        speed:3,
                        intensity:4
                    }
                }
            });
        } else if (userOption === 2){
            await npc.document.update({
                img: imgPath, 
                rotation : 0
            });
        } else if (userOption === 3){
            await npc.document.update({
                img: imgPath,
                rotation : 0,
                light:{
                    dim:1,
                    bright:1,
                    luminosity:0,
                    alpha:1,
                    color:'#ad7600',
                    coloration:9,
                    animation:{
                        type:"fairy",
                        speed:3,
                        intensity:10
                    }
                }
            });
        } else {
            ui.notifications.error(`Error with User Options. Choose a valid option.`);
        }
    }
}
