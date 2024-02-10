## Updated for V11

# NPC to Coin Pile

A Macro to turn a NPC token into an Item Pile, add random coinage and add a special effect if desired. 

Checks all selected tokens. If the token is not a NPC, it does nothing. For each NPC token:
- A separate roll is made to determine random coinage; 
- That coin is added to the token (if any);
- It is turned into an Item Pile; *
- The Image is changed; *
- A Light Effect is added to the token *

  \* (these are all optional)  

&nbsp;

Note: As far as I know, this only works on the DnD5e system. 

&nbsp;

## Instructions

1. Just click on the `NPC_to_Item_Pile_Macro.js` file above.
2. Copy all of the code 
3. Create a new macro in Foundry
4. Set that macro type as `script`
5. Paste in the copied code

&nbsp;

## Easily Customizable!
As is, out of the box, this macro: (1) turns the token into an Item Pile, (2) Rolls and adds random coins and (3) adds a Light Effect. If that's good for you, then you don't need to change anything at all.

However, I have setup the macro in such a way that even novice users can change the different options. 

At the beggining of the macro there are instructions to walk you through each option. Here is a quick rundown:

### Don't have Item Piles? 

You do not need to have the module Item Piles installed to still use theis macro. Without IP it will still add coins and a visual effect (if desired)

However, the core idea of making this macro was for the item pile aspect to allow players to loot NPCs themselves. If you like the idea of turning an NPC into a player-lootable token, check out Item Piles: https://foundryvtt.com/packages/item-piles

If not, no problem, just go to line # 29 and you should see `let hasItemPiles = 1;`. Just change the `1` to a `0`.

### Want to set a custom image?

Go to line # 42 and you'll see `let imgPath = "Images/Icons/Custom/LootBag1.svg";` and just change it to whatever path you prefer.
- I cannot provide the image I personally use as it is commercial... But I made you a few free ones!
  Nothing fancy, but they're available here in the `img` folder above if you want them.
  (Don't forget to change the `userOption` field to 2 or 3 as well!)

### Want to Change the Token Image and/or add a Light Effect (or neither)?

Go to line # 58, where you'll see `let userOption = 1;`

You've got 4 options to choose from:
- 0 = No Special Effect, Coin roll and -if enabled- Item Pile Transformation Only 
- 1 = Light Effect only
- 2 = Change Image Only
- 3 = Both Image Change and Light effect


&nbsp;

# USER OPTION EXAMPLES

## No Visual Change, Roll Random Coin, Turn into Item Pile (Option 0)

<img src="https://github.com/Shuggaloaf/NPC-to-Item-Pile/blob/main/Examples/Capture-06.gif" width="50%"/>

&nbsp;

## Add Light Effect Only, Roll Random Coin, Turn into Item Pile (Option 1)

<img src="https://github.com/Shuggaloaf/NPC-to-Item-Pile/blob/main/Examples/Capture-07.gif" width="50%"/>
(no coins shown after executing macro was not a mistake, there is a percent chance to not receive any coins)

&nbsp;

## Change Token Image Only, Roll Random Coin, Turn into Item Pile (Option 2)

<img src="https://github.com/Shuggaloaf/NPC-to-Item-Pile/blob/main/Examples/Capture-08.gif" width="50%"/>

&nbsp;

## Change Token Image & Add Light Effect, Roll Random Coin, Turn into Item Pile (Option 3)

<img src="https://github.com/Shuggaloaf/NPC-to-Item-Pile/blob/main/Examples/Capture-09.gif" width="50%"/>

# Average Coin by Percentage Roll
Roll|Percent|Avg Coin Amt
---|---|---
<25|25%|Nothing
26-55|30%|6 CP
56-79|24%|1 GP
80-89|10%|5 GP
90-94|5%|10GP
95-97|3%|20GP
98-99|2%|50GP
100|1%|100GP

# Results of 100 rolls

I wanted to get an idea of the overall average, so I rolled this macro 100 times. It also showed that it's right on track with my percentage table. 

Here are a few highlights:

- Average of all rolls = 2.97 GP
- Total for all rolls = 296.68 GP
- 23/100 rolls = nothing (est. 25%)
- 43/100 rolls < 1GP (NOT incl. the 23 "0" rolls above)
- 1/100 result of 100 for ~ 61GP (est. 1%)

