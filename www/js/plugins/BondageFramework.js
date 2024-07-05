/*:
 * @author 1d51
 * @version 0.0.8
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

    $.Helpers.isActing = function (actor) {
        if ($gameVariables.value(942) === 0) return false;
        return $gameVariables.value(942) === actor.actorId();
    };

    $.Helpers.isLockSmith = function () {
        if ($gameVariables.value(942) === 0) return false;
        const actor = $gameActors.actor($gameVariables.value(942));
        return actor.hasSkill(1218);
    };

    $.Helpers.shouldRemove = function (difficulty, stacks) {
        let base = $gameSwitches.value(2510) || $gameSwitches.value(2511) ? 0.5 : 0.25;
        if ($.Helpers.isLockSmith()) base = base + 0.15;

        return $gameSwitches.value(2509) || Math.random() < base * Math.exp(-difficulty * stacks);
    };

    $.Commands.removeLocked = function (args) {
        const target = $gameActors.actor($gameVariables.value(943));
        const stacks = $.Helpers.getStacks();

        if (target.isStateAffected(672)) {
            $gameSwitches.setValue(2508, false);
            if ($.Helpers.shouldRemove(null, stacks)) {
                $gameSwitches.setValue(2507, true);
                target.removeState(672);
                return;
            }
            if ($.Helpers.isActing(target)) {
                return;
            }
        }

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
            const difficulty = $.Helpers.getDifficulty(binding[i].note);
            if ($.Helpers.shouldRemove(difficulty, stacks)) {
                $gameSwitches.setValue(2507, true);
                target.changeEquip(i, null);
                break;
            }
            if ($.Helpers.isActing(target)) {
                return;
            }
        }

        if (!$gameSwitches.value(2507)) {
            for (let i = 0; i < other.length; i++) {
                if (other[i] == null) continue;
                const difficulty = $.Helpers.getDifficulty(other[i].note);
                if ($.Helpers.shouldRemove(difficulty, stacks)) {
                    $gameSwitches.setValue(2507, true);
                    target.changeEquip(i, null);
                    break;
                }
            }
        }
    };

    $.Holders.meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
    Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
        const locked = this.isStateAffected(666);
        const ensnared = this.isStateAffected(672);
        if ((locked || ensnared) && skill.id === 305) return true;
        return $.Holders.meetsSkillConditions.call(this, skill);
    }

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

    /**************** Prevent Bondage and Cursed equipment optimization ****************/

    Game_Actor.prototype.bestEquipItem = function(slotId) {
        var etypeId = this.equipSlots()[slotId];
        var items = $gameParty.equipItems().filter(function(item) {
            return item.etypeId === etypeId && this.canEquip(item);
        }, this);
        var bestItem = null;
        var bestPerformance = -1;
        for (var i = 0; i < items.length; i++) {
            if (items[i].atypeId === 60 || items[i].atypeId === 61) continue;
            var performance = this.calcEquipItemPerformance(items[i]);
            if (performance > bestPerformance) {
                bestPerformance = performance;
                bestItem = items[i];
            }
        }
        return bestItem;
    };

    /********************* Force action miss based on a switch *********************/

    Game_ActionResult.prototype.isHit = function() {
        return !$gameSwitches.value(2519) && this.used && !this.missed && !this.evaded;
    };

    /********************* Disable preemptive and surprise strikes *********************/

    BattleManager.onEncounter = function() {
        this._preemptive = 0;
        this._surprise = 0;
    };

    /********************* Support for skills doing null damage *********************/

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

    /********************* Rotate images when Ensnared *********************/

    $.Holders.battleDrawFace = Window_BattleStatus.prototype.drawFace;
    Window_BattleStatus.prototype.drawFace = function(fn, fi, x, y, width, height) {
        const actor = StateOverlay.findActor(fn);
        if (actor != null && actor.isStateAffected(672) && !actor.isStateAffected(46)) {
            this._faceContents.bitmap.rotate();
            $.Holders.battleDrawFace.call(this, fn, fi, x, y, width, height);
            this._faceContents.bitmap.rollback();
        } else {
            $.Holders.battleDrawFace.call(this, fn, fi, x, y, width, height);
        }
    }

    Bitmap.prototype.rotate = function() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this._context.translate(centerX, centerY);
        this._context.rotate(Math.PI);
        this._context.scale(-1, 1);
        this._context.translate(-centerX, -centerY);
        this._setDirty();
    };

    Bitmap.prototype.rollback = function() {
        this._context.setTransform(1, 0, 0, 1, 0, 0);
    };

    /********************* Custom effects for affliction skills *********************/

    $.Holders.executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target, value) {
        $.Holders.executeDamage.call(this, target, value);
        if (!$gameSwitches.value(2506)) return;
        if (!$gameParty.inBattle()) return;

        if (this.isSkill() && this.isHpEffect()) {
            // Sadist: Become Aroused when causing damage.
            if (this.subject().isActor() && this.subject().hasSkill(1227) && value > 0) {
                if (this.subject().isAlive()) {
                    if (Math.random() < 0.1) this.subject().addState(13);
                    if (Math.random() < 0.1) this.subject().addState(13);
                }
            }
            // Masochist: Become Aroused when taking damage.
            if (target.isActor() && target.hasSkill(1228) && value > 0) {
                if (target.isAlive()) {
                    if (Math.random() < 0.1) target.addState(13);
                    if (Math.random() < 0.1) target.addState(13);
                }
            }
        }

        if (this.isSkill() && this.item().stypeId === 2) {
            // Honey Trap: Being targeted by Naughty skills causes damage to the enemy.
            if (target.isActor() && target.hasSkill(1219) && this.subject().isEnemy()) {
                const damage = Math.ceil(target.luk / 3);
                this.subject().gainHp(-1 * damage);
                if (this.subject().isDead()) {
                    this.subject().performCollapse();
                }
            }

            // Servile: Become Aroused when targeting an Ally with a Naughty skill.
            if (target.isActor() && this.subject().isActor()) {
                if (this.subject().hasSkill(1229) && this.subject().isAlive()) {
                    if (Math.random() < 0.1) this.subject().addState(13);
                    if (Math.random() < 0.1) this.subject().addState(13);
                }
            }
            // Voyeur: Become Aroused when another party member is targeted by a Naughty skill.
            if (target.isActor()) {
                const members = $gameParty.aliveMembers();
                for (let i = 0; i < members.length; i++) {
                    if (members[i].actorId() !== target.actorId() && members[i].hasSkill(1230)) {
                        if (Math.random() < 0.1) members[i].addState(13);
                        if (Math.random() < 0.1) members[i].addState(13);
                    }
                }
            }
            // Cuckold: Become Aroused when someone else targets your wife with a Naughty skill.
            if ($gameSwitches.value(2579) && (target.isActor() || this.subject().isActor())) {
                if ($gameParty.aliveMembers().some(actor => actor.actorId() === 1)) {
                    if (target.isActor() && target.actorId() === 2 && $gameSwitches.value(1561)) {
                        if (!this.subject().isActor() || this.subject().actorId() !== 1) {
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                        }
                    } else if (target.isActor() && target.actorId() === 3 && $gameSwitches.value(1562)) {
                        if (!this.subject().isActor() || this.subject().actorId() !== 1) {
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                        }
                    } else if (target.isActor() && target.actorId() === 4 && $gameSwitches.value(1563)) {
                        if (!this.subject().isActor() || this.subject().actorId() !== 1) {
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                        }
                    } else if (target.isActor() && target.actorId() === 5 && $gameSwitches.value(1564)) {
                        if (!this.subject().isActor() || this.subject().actorId() !== 1) {
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                        }
                    } else if (target.isActor() && target.actorId() === 6 && $gameSwitches.value(1565)) {
                        if (!this.subject().isActor() || this.subject().actorId() !== 1) {
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                        }
                    } else if (target.isActor() && target.actorId() === 7 && $gameSwitches.value(1566)) {
                        if (!this.subject().isActor() || this.subject().actorId() !== 1) {
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                        }
                    } else if (target.isActor() && target.actorId() === 8 && $gameSwitches.value(1567)) {
                        if (!this.subject().isActor() || this.subject().actorId() !== 1) {
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                        }
                    } else if (target.isActor() && target.actorId() === 9 && $gameSwitches.value(1568)) {
                        if (!this.subject().isActor() || this.subject().actorId() !== 1) {
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                        }
                    } else if (target.isActor() && target.actorId() === 10 && $gameSwitches.value(1568)) {
                        if (!this.subject().isActor() || this.subject().actorId() !== 1) {
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                        }
                    } else if (target.isActor() && target.actorId() === 11 && $gameSwitches.value(1570)) {
                        if (!this.subject().isActor() || this.subject().actorId() !== 1) {
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                            if (Math.random() < 0.1) $gameActors.actor(1).addState(13);
                        }
                    } else if (target.isActor() && target.actorId() === 1) {
                        const members = $gameParty.aliveMembers();
                        for (let i = 0; i < members.length; i++) {
                            if (members[i].actorId() === 2 && $gameSwitches.value(1561)) {
                                if (!this.subject().isActor() || this.subject().actorId() !== 2) {
                                    if (Math.random() < 0.1) $gameActors.actor(2).addState(13);
                                    if (Math.random() < 0.1) $gameActors.actor(2).addState(13);
                                }
                            } else if (members[i].actorId() === 3 && $gameSwitches.value(1562)) {
                                if (!this.subject().isActor() || this.subject().actorId() !== 3) {
                                    if (Math.random() < 0.1) $gameActors.actor(3).addState(13);
                                    if (Math.random() < 0.1) $gameActors.actor(3).addState(13);
                                }
                            } else if (members[i].actorId() === 4 && $gameSwitches.value(1563)) {
                                if (!this.subject().isActor() || this.subject().actorId() !== 4) {
                                    if (Math.random() < 0.1) $gameActors.actor(4).addState(13);
                                    if (Math.random() < 0.1) $gameActors.actor(4).addState(13);
                                }
                            } else if (members[i].actorId() === 5 && $gameSwitches.value(1564)) {
                                if (!this.subject().isActor() || this.subject().actorId() !== 5) {
                                    if (Math.random() < 0.1) $gameActors.actor(5).addState(13);
                                    if (Math.random() < 0.1) $gameActors.actor(5).addState(13);
                                }
                            } else if (members[i].actorId() === 6 && $gameSwitches.value(1565)) {
                                if (!this.subject().isActor() || this.subject().actorId() !== 6) {
                                    if (Math.random() < 0.1) $gameActors.actor(6).addState(13);
                                    if (Math.random() < 0.1) $gameActors.actor(6).addState(13);
                                }
                            } else if (members[i].actorId() === 7 && $gameSwitches.value(1566)) {
                                if (!this.subject().isActor() || this.subject().actorId() !== 7) {
                                    if (Math.random() < 0.1) $gameActors.actor(7).addState(13);
                                    if (Math.random() < 0.1) $gameActors.actor(7).addState(13);
                                }
                            } else if (members[i].actorId() === 8 && $gameSwitches.value(1567)) {
                                if (!this.subject().isActor() || this.subject().actorId() !== 8) {
                                    if (Math.random() < 0.1) $gameActors.actor(8).addState(13);
                                    if (Math.random() < 0.1) $gameActors.actor(8).addState(13);
                                }
                            } else if (members[i].actorId() === 9 && $gameSwitches.value(1568)) {
                                if (!this.subject().isActor() || this.subject().actorId() !== 9) {
                                    if (Math.random() < 0.1) $gameActors.actor(9).addState(13);
                                    if (Math.random() < 0.1) $gameActors.actor(9).addState(13);
                                }
                            } else if (members[i].actorId() === 10 && $gameSwitches.value(1568)) {
                                if (!this.subject().isActor() || this.subject().actorId() !== 10) {
                                    if (Math.random() < 0.1) $gameActors.actor(10).addState(13);
                                    if (Math.random() < 0.1) $gameActors.actor(10).addState(13);
                                }
                            } else if (members[i].actorId() === 11 && $gameSwitches.value(1570)) {
                                if (!this.subject().isActor() || this.subject().actorId() !== 11) {
                                    if (Math.random() < 0.1) $gameActors.actor(11).addState(13);
                                    if (Math.random() < 0.1) $gameActors.actor(11).addState(13);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

})(BondageFramework);