# Bondage Framework
A collection of low-level changes for the game Odyssey of Gianna.

Most of them centered around a theme, but always optional.

## Features

1. Difficulty options: Most of the base games' difficulty changes (those that happen when selecting a difficulty other than Normal from the launcher) have been incorporated into the official Normal difficulty, as a new option in the settings menu. This means there should be no need to play anything other than Normal for most people, as the difficulty can now be changed much more easily in-game.

- When playing with the different base game's difficulties, saves may not be transferrable from one to another. Starting a game on one difficulty usually means you're stuck with it. With this reimplementation of the game's difficulty options, that is no longer the case. All saves "belong" to the official Normal difficulty, even when selecting a different one through the in-game settings. Players are now free to change the game's difficulty at any time during their run.

- Difficulties are customizable through a file named `Difficulties.json` inside the `data_Normal` folder. This allows modders to easily add new difficulties to the game. Also, while it's not exactly recommended that normal players mess with it too much, it should be fine to do small modifications, such as increasing or decreasing global experience or gold multipliers, or even enemy stats.

- The Hell difficulty has been added. It's based on Hard, but it adds an extra level of challenge to the game by, for example, forbidding fast travel except from Restoration Points, or making it so ambushes always get a free turn against the party. It also ties to the next feature, making things even harder.

2. Bondage: New system that locks equipment in place. Things such as the Denial Belt, Slave Collar, Cursed Necklace, and Orgasm Belt, are now pieces of bondage that enemies may attempt to lock onto party members. They can be removed by struggling, with the assistance of other party members, or using a Lockpick, or Holy Water, depending on the restraint.

- New states have been created so that these restraints have an actual effect, gameplay wise, other than locking the equipment slot. **Bound** will prevent one from using most skills, except magical ones. **Muted** will stop one from talking, and casting any spells. **Blinded** greatly reduces accuracy. **Disheartened** will lower your chances of struggling out of a locked piece of equipment. So on and so forth.

- New equipment has been added that applies the states mentioned above, and skills given to some enemies to decorate your party members with.

3. Afflictions: A skill type dedicated to long-lasting (maybe even permanent) negative status effects. Right now, there's nothing in it, but more and more passives will be added to the framework with time, so other mods can assign them based on their own criteria.

4. Miscellaneous: Several other minor changes have been made to the base game, to make it more flexible for future mods, or just better (in my personal opinion).

- Some class-specific skills are made inherent to the party member. So for example, Yterre can still manage her maids while being a Succubus.

- Mindbreak can now stack, and each stack requires a Mind Cleanser to be removed. This does not really have any effect on the base game, but it does allow modders to create more punishing consequences, using this state.

- The Cursed status effect adds a new Curse skill to the ones affected, so they can share their fate with others. A small thing that seemed appropriate to me, from a lore point of view.

- Modders can now have their skills do 0 damage without causing issues with the game. This is useful for when one wants to run some code on skill execution, but not have a 0 damage popup appear.

## Configuration
The framework comes with a file named `config.json` that players can edit to enable or disable certain aspects of the game. To enable one, change the "value" to **true**. To disable it, change it to **false**. Anything else may have unexpected consequences, so be careful! DO NOT modify fields other than "value". Here are the current options:

- Make some class-specific skills inherent to the party member.
- Toggle afflictions, a new type of skill passive for persistent negative effects.
- Adds the Assist skill, which allows one to attempt to remove a restraint from a party member.
- Toggle Disheartened, a new status effect that makes struggling out of restraints more difficult.
- Toggle enemies such as the Lewd Bandit or the Forest Witch having skills that bind party members.

Right now, all of them are disabled by default, to keep to the vanilla experience as much as possible. Feel free to enable whichever you feel like though.

## Install Instructions

1. Download the mod from this [link](https://github.com/giannan-mods/bondage-framework/archive/refs/heads/master.zip) for the latest changes.
2. Unzip and drop the folder into the `mods` folder.
3. Launch the game and activate the mod.

## Credits

Game Creator: [Vhiel](https://twitter.com/shvhiel)

Mod Author: 1d51

Disheartened images: exi1987
