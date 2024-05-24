/*:
 * @author 1d51
 * @version 0.0.1
 * @plugindesc Custom code for the Bondage Framework mod.
 */

var Imported = Imported || {};
Imported.BondageFramework = true;

var BondageFramework = BondageFramework || {};

BondageFramework.Helpers = BondageFramework.Helpers || {};
BondageFramework.Params = BondageFramework.Params || {};
BondageFramework.Holders = BondageFramework.Holders || {};
BondageFramework.Commands = BondageFramework.Commands || {};

(function ($) {
    $.Helpers.getDifficulty = function (notes) {
        const lockRegex = /<Lock Difficulty: *([0-9]+)>/;
        const match = notes.match(lockRegex);
        const difficulty = match ? parseInt(match[1], 10) : 50;
        return $.Helpers.normalizeDifficulty(difficulty);
    };

    $.Helpers.normalizeDifficulty = function (difficulty) {
        if (difficulty < 0) difficulty = 0;
        if (difficulty > 100) difficulty = 100;
        return difficulty / 100;
    };

    $.Helpers.getStacks = function () {
        if ($gameVariables.value(942) === 0) return 0;
        const actor = $gameActors.actor($gameVariables.value(942));
        return actor._stateTurns[658] || 0;
    };

    $.Helpers.shouldRemove = function (base, difficulty, stacks) {
        return $gameSwitches.value(2509) || Math.random() < base * Math.exp(-difficulty * stacks);
    };

    $.Commands.removeLocked = function (args) {
        const target = $gameActors.actor($gameVariables.value(943));
        const stacks = $.Helpers.getStacks();

        let equips = target.equips().map((equip) => {
            return equip != null && (equip.atypeId === 60 || equip.atypeId === 61) ? equip : null
        });

        if (!$gameSwitches.value(2510) &&
            $gameSwitches.value(2511)) {
            equips = target.equips().map((equip) => {
                return equip != null && equip.atypeId === 60 ? equip : null
            });
        }

        if ($gameSwitches.value(2510) &&
            !$gameSwitches.value(2511)) {
            equips = target.equips().map((equip) => {
                return equip != null && equip.atypeId === 61 ? equip : null
            });
        }

        const boundRegex = /<Passive State: 653>/;
        $gameSwitches.setValue(2508, equips.filter(equip => equip != null).length === 0);

        const binding = equips.map((equip) => {
            return equip != null && boundRegex.test(equip.note || "") ? equip : null;
        });

        const other = equips.map((equip) => {
            return equip != null && !boundRegex.test(equip.note || "") ? equip : null;
        });

        for (let i = 0; i < binding.length; i++) {
            if (binding[i] == null) continue;
            const base = $gameSwitches.value(2510) || $gameSwitches.value(2511) ? 0.5 : 0.25;
            const difficulty = $.Helpers.getDifficulty(binding[i].note);
            if ($.Helpers.shouldRemove(base, difficulty, stacks)) {
                $gameSwitches.setValue(2507, true);
                target.changeEquip(i, null);
                break;
            }
        }

        if (!$gameSwitches.value(2507)) {
            for (let i = 0; i < other.length; i++) {
                if (other[i] == null) continue;
                const base = $gameSwitches.value(2510) || $gameSwitches.value(2511) ? 0.5 : 0.25;
                const difficulty = $.Helpers.getDifficulty(other[i].note);
                if ($.Helpers.shouldRemove(base, difficulty, stacks)) {
                    $gameSwitches.setValue(2507, true);
                    target.changeEquip(i, null);
                    break;
                }
            }
        }
    };

    $.Holders.meetsSkillConditionsEval = Game_BattlerBase.prototype.meetsSkillConditionsEval;
    Game_BattlerBase.prototype.meetsSkillConditionsEval = function (skill) {
        const value = $.Holders.meetsSkillConditionsEval.call(this, skill);
        const bound = this.isStateAffected(653);
        const muted = this.isStateAffected(654);
        const blind = this.isStateAffected(655);

        if (skill.stypeId === 0) return value;
        if (muted && skill.stypeId === 1) return false;
        if (bound && skill.stypeId !== 1 && skill.stypeId !== 5 && skill.stypeId !== 10) return false;
        return value;
    };

    $.Holders.pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        $.Holders.pluginCommand.call(this, command, args)
        if (command === 'RemoveLocked') $.Commands.removeLocked(args);
    };

    Sprite_Damage.prototype.setup = function(target) {
        this._result = target.shiftDamagePopup();
        var result = this._result;
        if (result.missed || result.evaded) {
            this.createMiss();
        } else if (result.hpAffected && result.hpDamage != null) {
            this.createDigits(0, result.hpDamage);
        } else if (target.isAlive() && result.mpDamage != null && result.mpDamage !== 0) {
            this.createDigits(2, result.mpDamage);
        }
        if (result.critical) {
            this.setupCriticalEffect();
        }
    };

    $.Holders.setHp = Game_BattlerBase.prototype.setHp;
    Game_BattlerBase.prototype.setHp = function(hp) {
        if (hp == null || isNaN(hp)) return;
        $.Holders.setHp.call(this, hp);
    };

    $.Holders.setMp = Game_BattlerBase.prototype.setMp;
    Game_BattlerBase.prototype.setMp = function(mp) {
        if (mp == null || isNaN(mp)) return;
        $.Holders.setMp.call(this, mp);
    };

    $.Holders.setTp = Game_BattlerBase.prototype.setTp;
    Game_BattlerBase.prototype.setTp = function(tp) {
        if (tp == null || isNaN(tp)) return;
        $.Holders.setTp.call(this, tp);
    };

})(BondageFramework);