# Bondage Framework
A collection of low-level changes for the game Odyssey of Gianna.

Most of them centered around a theme, but always optional.

Only works on the base game's Normal difficulty!

## Features

1. Difficulty options: Switch difficulties on the fly from the in-game options' menu.

2. Hell difficulty: Based on Hard, but it adds an extra level of challenge to the game by, for example, forbidding fast travel except from Restoration Points, or making it so ambushes always get a free turn against the party. It also ties to the Bondage feature, making things even harder.

3. Bondage: New system that locks equipment in place. Things such as the Denial Belt, Slave Collar, Cursed Necklace, and Orgasm Belt, are now pieces of bondage that enemies may attempt to lock onto party members. They can be removed by struggling, with the assistance of other party members, or using a Lockpick, or Holy Water, depending on the restraint.

4. Dialogue Replacements: Some states will change the way your party members speak, and they will be reflected on the image that accompanies said dialogue.

5. Afflictions: A skill type dedicated to long-lasting (maybe even permanent) negative status effects. More and more passives will be added to the framework with time, so other mods can assign them based on their own criteria.

6. Miscellaneous: Several other minor changes have been made to the base game, to make it more flexible for future mods, or just better (in my personal opinion).

You can see a complete breakdown of all additions and changes to the game in the `CHANGELOG.md` file.

## Configuration
The framework comes with a file named `config.json` that players can edit to enable or disable certain aspects of the game. To enable one, change the "value" to **true**. To disable it, change it to **false**. Anything else may have unexpected consequences, so be careful! DO NOT modify fields other than "value". Here are the current options:

- Make some class-specific skills inherent to the party member.
- Toggle afflictions, a new type of skill passive for persistent negative effects.
- Make it so some afflictions can be obtained passively, just by being exposed to certain situations.
- Decide if you want a way out for Afflictions, in the shape of a new service by the Draining Witch.
- Adds the Assist skill, which allows one to attempt to remove a restraint from a party member.
- Toggle Disheartened, a new status effect that makes struggling out of restraints more difficult.
- Toggle enemies such as the Lewd Bandit or the Forest Witch having skills that bind party members.
- Toggle the Suffocating state, adding restraints and enemy skills that apply it to party members.
- Toggle random traps appearing in the overworld. Also makes existing base game traps random.
- Toggle party members being naked when they have no armor equipped.

Right now, all of them are disabled by default, to keep to the vanilla experience as much as possible. Feel free to enable whichever you feel like though.

## Install Instructions

1. Download the mod from this [link](https://github.com/giannan-mods/bondage-framework/archive/refs/heads/master.zip) for the latest changes.
2. Unzip and drop the folder into the `mods` folder.
3. Launch the game and activate the mod.

## Contributing
The mod can be made better with additional images. Any help would be appreciated!

- Status images for Ashamed: Covering herself, looking around.
- Status images for Bound: Simply both arms behind their back (Naked and clothed).
- Status images for Muted: Mouth closed, and an angry or annoyed expression, looking at their mouth.
- Status images for Blinded: Arms forward, trying to not trip and fall (Naked and clothed).
- Status images for Suffocating: Bluish face, eyes rolled up, etc. Nothing too extreme though.
- Status images for Disheartened: Revisit the images currently in use, as they might not be appropriate.
- Status images for Terrified: Simply a fearful face. Eyes wide open, mouth agape, etc.

## Credits

Game Creator: [Vhiel](https://twitter.com/shvhiel)

Mod Author: 1d51

Disheartened images: exi1987

Harness Gag images: borpie

Ball Hood images: [Veltrox101](https://www.deviantart.com/veltrox101/art/Inflatable-Ball-Hood-code-1063308220)

Gas Mask images: [cloudsonthehorizon](https://www.deviantart.com/cloudsonthehorizon/art/Kisekae-gasmask-export-822024972)
