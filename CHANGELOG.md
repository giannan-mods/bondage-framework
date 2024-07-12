# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-07-12

### Added

- Denial Belt now has an overlay and will be shown when equipped.

- Toggle to make classes that have a body slot be nude, if said slot is empty.

- New Afflictions:
  - Orc Addict: Orcs will ravage you indefinitely, until they're defeated or combat ends.
  - Crescendo: Aroused and Horny stacks are no longer removed with time.
  - Horny Mommy: Gain Lust every turn when affected by Pregnant.
  - Edging Enjoyer: Gain additional Lust every turn when affected by Denial.
  - Tiny Tramp: Gain Lust every turn when affected by Mini.

### Fixed

- More thorough condition check for showing bondage overlays.

## [0.0.9] - 2024-07-07

### Added

- Laelaps will set up snares when they ambush the party (when enabled).

- Toggle to have the Draining Witch offer a service to remove Afflictions.

- New Afflictions:
  - Nurturer: Become Aroused when using milking skills.
  - Suckler: Become Aroused when targeted by milking skills.

## [0.0.8] - 2024-07-06

### Added

- Randomized the effect of traps in Alisha's house (when enabled).
- Gianna Forest is now filled with snares set up by Lewd Bandits (when enabled).
- Restraints may now appear as randomized loot from chests, when Random Treasure Mode is enabled.

### Fixed

- Blow Away and Jars of Wind can now properly target Defeated party members.
- Leashed will correctly prevent escaping combat, and moving back in the party order.
- Ensnared will apply Leashed on top of Bound, instead of mirroring its effects.
- Enemies may now attempt to tie up a party member using a Ball Gag (when enabled).
- Bondage and Cursed equipment will no longer be equipped when equipment is optimized.
- More aggressively prevent cockrings from being worn if one doesn't have a cock.

## [0.0.7] - 2024-07-04

### Added

- Restraining equipment now has a proper description, prices, and removal difficulty.
- The very first map in the Gianna Forest may have snares lying around, if enabled.
- Updated the design of the Harness Gag to use the same gag as the new Ball Gag.

- Toggle to enable or disable finding traps in the overworld, and randomizing existing ones.

- New status effects:
  - Ensnared: Start battle hanging from your feet, unable to move.

- New equipment:
  - Ball Gag: Mutes the wearer.

### Fixed

- Resolved some issues with how the Bondage Lover affliction was implemented.
- Equipment that applies Bound will properly have to be removed first when using Struggle.
- Bondage overlays will not be shown when a character is affected my Entangled.
- Update the Cursed Bandit intro image to show her with a Cursed Collar.

## [0.0.6] - 2024-06-30

### Added

- New Afflictions:
    - Humiliation Slut: Become Aroused when an enemy’s taunt is degrading. When affected by Ashamed, gain Lust every turn in combat.
    - Fantasia: Become Aroused when an enemy’s taunt is explicit.

### Fixed

- Fast travel is now re-enabled when changing difficulty from Hell to something else.
- Fast travel will not be blocked when inside a certain area in te City of Mist.
- Bondage overlays will not be shown when a character is affected my Mini.

## [0.0.5] - 2024-06-01

### Added

- Overlays: Certain pieces of equipment will be shown on top of the usual character images. For example, if a Horny Lilina is wearing a Slave Collar, she will be shown in her Horny pose, as well as wearing the collar.
- Bondage: New system that locks equipment in place. Things such as the Denial Belt, Slave Collar, Cursed Necklace, and Orgasm Belt, are now pieces of bondage that enemies may attempt to lock onto party members. They can be removed by struggling, with the assistance of other party members, or using a Lockpick, or Holy Water, depending on the restraint.
- Difficulty options: Most of the base games' difficulty changes (those that happen when selecting a difficulty other than Normal from the launcher) have been incorporated into the official Normal difficulty, as a new option in the settings menu. This means there should be no need to play anything other than Normal for most people, as the difficulty can now be changed much more easily in-game.
    - When playing with the different base game's difficulties, saves may not be transferable from one to another. Starting a game on one difficulty usually means you're stuck with it. With this reimplementation of the game's difficulty options, that is no longer the case. All saves "belong" to the official Normal difficulty, even when selecting a different one through the in-game settings. Players are now free to change the game's difficulty at any time during their run.
    - Difficulties are customizable through a file named Difficulties.json inside the data_Normal folder. This allows modders to easily add new difficulties to the game. Also, while it's not exactly recommended that normal players mess with it too much, it should be fine to do small modifications, such as increasing or decreasing global experience or gold multipliers, or even enemy stats.
    - The Hard difficulty is not an exact copy of the base game's, but it's close enough. For example, instead of adjusting some specific enemies' stats, it simply increases all enemies' health by 25%.

- Hell difficulty: Based on Hard, but it adds an extra level of challenge to the game.
    - Forbids fast travel except from Restoration Points.
    - Ambushes always get a free turn against the party.
    - Collar Slave orcs will not immediately let go.
    - Most enemy stats are increased by 50%.
    - Locked equipment is harder to remove.

- Toggle to make Yterre's Designate Maid and Fire Maid skills, and Samona's Master's Strings skill, not be tied to their base class.
- Toggle to enable or disable Afflictions, a new type of skill passive for persistent negative effects.
- Toggle to gain Afflictions passively, by meeting their activation condition while Aroused, Horny, or with high Lust.
- Toggle to add the Assist skill, which allows one to attempt to remove a restraint from a party member.
- Toggle for the Disheartened state, a new status effect that makes struggling out of restraints more difficult.
- Toggle for enemies, such as the Lewd Bandit or the Forest Witch, having skills that bind party members.
- Toggle for enemies, such as the Lewd Bandit or the Mountain Barbarian, having skills that hold onto party members.

- New Afflictions:
    - Sadist: Become Aroused when causing damage in combat. 
    - Masochist: Become Aroused when taking damage in combat. 
    - Servile: Become Aroused when targeting an Ally with a Naughty skill. 
    - Voyeur: Become Aroused when another party member is targeted by a Naughty skill. 
    - Cuckold: Become Aroused when someone else targets your wife with a Naughty skill. 
    - Bondage Lover: Become Aroused, if affected by one of the restraining status effects. 
    - Submissive: Additional and more frequent stacks of Disheartened, from using Struggle and Assist. Gain Lust when using Whimper. Increased vulnerability to all restraining skills. 
    - Choke Bitch: Become Aroused when affected by Suffocating. 
    - Thrill Seeker: Become Aroused when affected by Terrified. 
    - Good Girl: Become Aroused when affected by Leashed.

- New and modified skills:
    - Struggle: Attempt to forcefully remove one of the equipped locked items at random. Applies Disheartened to the user for a larger number of turns, if she fails to do so.
    - Assist: Attempt to forcefully remove an ally’s locked items. Has a chance to apply Disheartened to the user and target for a smaller number of turns, if she fails to do so.
    - Chokehold: Become immobilized. Immobilize an enemy and apply Suffocating.
    - Whimper: For when there’s nothing else you can do.

- New passives:
    - Unshackled: Higher resistance to restraining status effects. 
    - Locksmith: Has an easier time removing restraints, through whatever means. 
    - Honey Trap: Being targeted by Naughty skills causes damage to the enemy.

- New status effects:
    - Bound: Can't use skills that require physical movement. 
    - Muted: Can't use magic, nor use other skills that require speech. 
    - Blinded: Greatly reduced accuracy. 
    - Suffocating: Lose health each turn. Amount lost increases every turn in combat. 
    - Leashed: Attempts to flee, or otherwise leave combat, will fail. Will not be removed from combat if Defeated. Some enemies can use their action to apply Stunned for a turn. 
    - Disheartened: Lowered chance for Struggle and Assist, scaling with stacks. 
    - Terrified: Will randomly use Whimper in combat, instead of the desired skill. 
    - Ashamed: Increased vulnerability to mental states, and decreased stats.

- New equipment:
    - Denial Belt: Applies Denial to the wearer.
    - Slave Collar: Makes the wearer vulnerable to Collared. 
    - Jyla’s Collar: Makes the wearer vulnerable to Collared. 
    - Leather Collar: Makes the wearer vulnerable to Leashed. 
    - Steel Cuffs: Binds the wearer. 
    - Harness Gag: Mutes the wearer. 
    - Blindfold: Blinds the wearer.

- Cursed Bandits will be shown wearing a Cursed Collar.
- Jyla can now learn the Unshackled skill.

### Changed

- Collared will now require wearing a piece of equipment.
- The Cursed status effect adds a new Curse skill to the ones affected.
- Mindbreak can now stack, and each stack requires a Mind Cleanser to be removed.
- Denial will now be derived from wearing a piece of equipment, or from other sources.
- The logic behind removing incapacitated party members from battle has been reworked for Hard and Hell difficulties.
- Modders can now have their skills do 0 damage without causing issues with the game.
- The Struggle skill has been modified to work with the new Bondage system.
- The Orgasm Belt and Cursed Necklace are now locked equipment.
- The Denial Belt item has been replaced with the equipment.