var gameData = {};
var gameScore = 0;
var gameCoins = 0;

Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/12oAzF7oWuKprMqF2Y9z4ftbLPzi6rec1GRm26g2Kkg4/pubhtml',
    callback: function (data) {
        game.module(
                'game.main'
            )
            .require(
                'game.assets',
                'game.objects'
            )
            .body(function () {
                game.createScene('Main', {
                    backgroundColor: 0xb9bec7,
                    init: function () {
                        var elements = 0;
                        for (var i = 0; i < data.length; i++) {
                            var o = data[i];
                            if (o.nombre === gameCharacter) {
                                elements++;
                                gameData[o.orden] = {
                                    title: o.titulo,
                                    text: o.texto
                                };
                            }
                        }

                        $('#username').on('input', function (e) {
                            this.value = this.value.replace(/[^a-z0-9ñáéíóúü ]/gi, '');
                        });

                        this.theme = game.audio.playMusic('theme');

                        this.world = new game.World(0, 2000);
                        var floorBody = new game.Body({
                            position: {
                                x: game.system.width / 2,
                                y: game.system.height - 40
                            },
                            collisionGroup: 1
                        });

                        var floorShape = new game.Rectangle(game.system.width, 150);
                        floorBody.addShape(floorShape);
                        this.world.addBody(floorBody);

                        this.parallaxItems = [];
                        this.gameItems = [];
                        this.finished = false;

                        var bgCenter = gameStage === 'toledo-1' ? -150 : 0;

                        var bg = new game.Sprite(gameStage + '/FONDO.png', bgCenter, bgCenter).addTo(this.stage);
                        var image = new game.Sprite(gameStage + '/CERRO.png').center().addTo(this.stage);
                        this.addParallax(gameStage + '/CRISTO.png', 0, -50);
                        this.addParallax(gameStage + '/NUBES.png', 0, -150);
                        this.addParallax(gameStage + '/EDIFICIO2.png', 0, -100);
                        this.addParallax(gameStage + '/EDIFICIO1.png', -10, -300);
                        this.addParallax(gameStage + '/ARBOLES.png', 0, -400);
                        this.addParallax(gameStage + '/PASTO.png', 100, -500);
                        this.addParallax(gameStage + '/PISTA.png', 0, -600);


                        var fbShare = new game.Sprite('fbShare.png', 1100, 35).addTo(this.stage);
                        var logo = new game.Sprite('logo.png', 50, 50).addTo(this.stage);
                        var good = new game.Sprite('good.png', game.system.width - 380, 30).addTo(this.stage);
                        var bad = new game.Sprite('bad.png', game.system.width - 590, 30).addTo(this.stage);
                        var sound = new game.Sprite('sound.png', game.system.width - 140, 30).addTo(this.stage);
                        var nosound = new game.Sprite('nosound.png', game.system.width - 140, 30).addTo(this.stage);
                        sound.visible = !game.audio.soundMuted;
                        nosound.visible = game.audio.soundMuted;

                        sound.interactive = true;
                        sound.buttonMode = true;
                        sound.mousedown = function (event) {
                            sound.visible = false;
                            nosound.visible = true;
                            game.audio.muteMusic();
                            game.audio.muteSound();
                        }
                        sound.tap = function (event) {
                            sound.visible = false;
                            nosound.visible = true;
                            game.audio.muteMusic();
                            game.audio.muteSound();
                        }

                        nosound.interactive = true;
                        nosound.buttonMode = true;
                        nosound.mousedown = function (event) {
                            sound.visible = true;
                            nosound.visible = false;
                            game.audio.unmuteMusic();
                            game.audio.unmuteSound();
                        }
                        nosound.tap = function (event) {
                            sound.visible = true;
                            nosound.visible = false;
                            game.audio.unmuteMusic();
                            game.audio.unmuteSound();
                        }

                        


                        this.modal = new game.Sprite('modal.png').center().addTo(this.stage);
                        this.modal.alpha = 0;

                        this.score = gameScore;
                        this.maxScore = elements;
                        this.coinsCount = gameCoins;

                        var coinsText = new game.PIXI.Text('', {
                            font: '50px Arial',
                            fill: '#FFFFFF',
                        });

                        coinsText.position.x = (game.system.width - 500);
                        coinsText.position.y = 30;
                        this.stage.addChild(coinsText);
                        this.coinsText = coinsText;

                        this.updateCoins(false);

                        var scoreText = new game.PIXI.Text(this.score + "/" + this.maxScore, {
                            font: '50px Arial',
                            fill: '#FFFFFF',
                        });

                        scoreText.position.x = (game.system.width - 300);
                        scoreText.position.y = 30;
                        this.stage.addChild(scoreText);
                        this.scoreText = scoreText;


                        var last = new game.Sprite('last.png').addTo(this.stage);
                        last.alpha = 0;
                        this.last = last;


                        var lastText = new game.PIXI.Text('Lorem Ipsum', {
                            font: '50px Arial',
                            fill: '#FFFFFF',
                            align: 'center'
                        });

                        lastText.position.x = (game.system.width / 2);
                        lastText.position.y = 400;
                        lastText.anchor.set(0.5, 0.5);
                        lastText.alpha = 0;
                        this.stage.addChild(lastText);
                        this.lastText = lastText;

                        var register = new game.Sprite('registerbutton.png', ((game.system.width / 2) - 120), 850).addTo(this.stage);
                        register.interactive = true;
                        register.buttonMode = true;
                        register.visible = false;
                        register.mousedown = function (event) {
                            game.scene.sendData();
                        }
                        register.tap = function (event) {
                            game.scene.sendData();
                        }
                        this.register = register;

                        var back = new game.Sprite('backbutton.png', 50, game.system.height - 70).addTo(this.stage);
                        back.interactive = true;
                        back.buttonMode = true;
                        back.mousedown = function (event) {
                            window.location = "../";
                        }
                        back.tap = function (event) {
                            window.location = "../";
                        }
                        this.back = back;

                        var again = new game.Sprite('againbutton.png', game.system.width - 280, game.system.height - 70).addTo(this.stage);
                        again.interactive = true;
                        again.buttonMode = true;
                        again.mousedown = function (event) {
                            location.reload();
                        }
                        again.tap = function (event) {
                            location.reload();
                        }
                        this.again = again;

                        var textTitle = new game.PIXI.Text("", {
                            font: '60px Arial',
                            fill: '#FFFFFF',
                            align: 'left',
                            wordWrap: true,
                            wordWrapWidth: 700,
                            width: 700
                        });

                        textTitle.position.x = (game.system.width / 2);
                        textTitle.position.y = 300;
                        textTitle.anchor.set(0.5, 0.5);
                        this.stage.addChild(textTitle);
                        this.textTitle = textTitle;

                        var textContent = new game.PIXI.Text("", {
                            font: '50px Arial',
                            fill: '#c2c2c2',
                            align: 'left',
                            wordWrap: true,
                            wordWrapWidth: 705
                        });

                        textContent.position.x = (game.system.width / 2);
                        textContent.position.y = 335;
                        textContent.anchor.set(0.5, 0);
                        this.stage.addChild(textContent);
                        this.textContent = textContent;

                        this.objectContainer = new game.Container().addTo(this.stage);
                        this.playerContainer = new game.Container().addTo(this.stage);

                        this.player = new game.Player(400, game.system.height - 210);
                        this.player.sprite.addTo(this.playerContainer);

                        this.gameTimer = this.addTimer(1500, this.spawnRandomObject.bind(this), true);

                        this.showingData = false;

                        this.lastScore = function () {
                            gameScore = game.scene.score;
                            gameCoins = game.scene.coinsCount;
                        }

                        this.showModal = function (id) {
                            this.modal.alpha = 1;
                            var coinData = gameData[id];
                            this.textTitle.setText(coinData.title);
                            this.textContent.setText(coinData.text);

                        }

                        this.toggleMovement = function (id) {
                            this.showingData = !this.showingData;

                            if (!this.player.killed) {

                                if (this.showingData) {
                                    this.gameTimer.pause();
                                    this.player.sprite.stop();
                                    this.player.body.velocity.y = 0;
                                    this.player.body.mass = 0;
                                    this.modal.alpha = 1;
                                    var coinData = gameData[id];
                                    this.textTitle.setText(coinData.title);
                                    this.textContent.setText(coinData.text);
                                } else {
                                    this.gameTimer.resume();
                                    this.player.sprite.play();
                                    this.player.body.mass = 1;
                                    this.modal.alpha = 0;
                                    this.textTitle.setText('');
                                    this.textContent.setText('');

                                    if (this.score === this.maxScore) {
                                        this.finished = true;
                                        game.audio.stopMusic(game.scene.theme);
                                        var clear = game.audio.playSound('clear');
                                        game.scene.removeTimer(game.scene.gameTimer);
                                        for (var i = 0; i < game.scene.gameItems.length; i++) {
                                            var item = game.scene.gameItems[i];
                                            item.remove();
                                        }

                                        game.scene.player.body.velocity.x = 1000;

                                        var tween = new game.Tween(this.player.sprite);
                                        tween.to({
                                            alpha: 0
                                        }, 1500);
                                        var that = this;
                                        tween.onComplete(function () {
                                            game.scene.last.alpha = 1;
                                            $('#username').css('display', 'block');
                                            $('#username').focus();

                                            var diff = game.scene.coinsCount;
                                            var message = 'Felicitaciones, llegaste al final de la historia. \n';
                                            if (diff === 0) {
                                                message += 'Terminaste el juego sin puntos en contra.';
                                            } else {
                                                var tmp = diff === 1 ? 'punto' : 'puntos';
                                                message += 'Terminaste el juego con ' + diff + ' ' + tmp + ' en contra.';
                                            }
                                            message += '\n Ingresa tu nombre para registrarte en el ranking:';
                                            game.scene.lastText.setText(message);
                                            game.scene.lastText.alpha = 1;
                                            game.scene.register.visible = true;
                                            for (var i = 0; i < that.parallaxItems.length; i++) {
                                                var item = that.parallaxItems[i];
                                                item.sprite.speed.x = 0;
                                            }
                                        });
                                        tween.start();

                                    }
                                }
                            } else {
                                this.gameTimer.pause();
                            }

                            for (var i = 0; i < this.parallaxItems.length; i++) {
                                var item = this.parallaxItems[i];
                                item.sprite.speed.x = this.showingData ? 0 : item.speed;
                            }

                            for (var i = 0; i < this.gameItems.length; i++) {
                                var item = this.gameItems[i];
                                if (item)
                                    item.body.velocity.x = this.showingData ? 0 : -600;
                            }
                        }

                        if (this.score !== 0) {
                            this.toggleMovement(this.score);
                        }

                        this.locked = false;

                    },

                    sendData: function () {
                        if (!$('#username').val().trim()) {
                            $('#username').focus();
                            return;
                        }

                        var fkey = '1FAIpQLSekDVo3kiLnyhlC11-t-c8z6KHjOmrEDhO_f5fdA03mQ8fxPg';
                        var data = {
                            'entry.492979353': $('#username').val().trim(),
                            'entry.639836936': gameCharacter,
                            'entry.1414471343': game.scene.coinsCount
                        };

                        this.register.visible = false;
                        var loading = new game.Sprite('loading.gif', ((game.system.width / 2) - 8), 850).addTo(this.stage);

                        $.ajax({
                            url: "https://docs.google.com/forms/d/e/" + fkey + "/formResponse",
                            data: data,
                            type: "POST",
                            dataType: "xml",
                            statusCode: {
                                0: function () {
                                    window.location = '../'
                                },
                                200: function () {
                                    window.location = '../'
                                },
                            }
                        });
                    },

                    addCoin: function (x, y, move) {
                        var c = new game.Coin(x, y);
                        this.gameItems.push(c);

                        if (move) {
                            setInterval(function () {
                                c.body.moving = !c.body.moving;
                                var value = c.body.moving ? 1 : -1;
                                c.body.velocity.y = 600 * value;
                            }, 1000);
                        }

                    },

                    updateCoins: function (add) {
                        if (add)
                            this.coinsCount++;

                        game.scene.coinsText.setText("" +
                            this.coinsCount);
                    },

                    addPlattform: function (x, y) {
                        this.gameItems.push(new game.Oneway(x, y));
                    },

                    addObstacle: function (x, y) {
                        this.gameItems.push(new game.Tires(x, y));
                    },

                    addPlattformObstacle: function () {
                        this.addObstacle(game.system.width - 20, 930);
                        this.addPlattform(game.system.width + 50, 780);
                        this.addObstacle(game.system.width + 490, 630);
                        this.addCoin(game.system.width + 840, 270);
                        game.scene.locked = true;
                    },

                    addDoubleObstacle: function () {
                        this.addObstacle(game.system.width + 20, 930);
                        this.addCoin(game.system.width + 370, 760);
                        this.addObstacle(game.system.width + 870, 930);
                        game.scene.locked = true;
                    },

                    spawnRandomObject: function () {
                        if (game.scene.locked) {
                            game.scene.locked = false;
                            return;
                        }

                        var rand = Math.random();
                        if (rand < 0.5) {
                            if (rand < 0.3) {
                                this.addCoin(game.system.width, 760);
                            } else {
                                this.addPlattformObstacle();
                            }
                        } else {
                            if (rand < 0.8) {
                                if (rand < 0.7) {
                                    this.addObstacle(game.system.width, 930);
                                } else {
                                    this.addDoubleObstacle();
                                }
                            } else {
                                this.addCoin(game.system.width, 400, true);
                            }
                        }
                    },

                    addParallax: function (texture, pos, speed) {
                        var sprite = new game.TilingSprite(texture, game.system.width);
                        this.parallaxItems.push({
                            sprite: sprite,
                            speed: speed
                        });
                        sprite.speed.x = speed;
                        sprite.position.y = game.system.height - sprite.height - pos;
                        this.addObject(sprite);
                        this.stage.addChild(sprite);
                    },

                    mousedown: function () {
                        if (!this.showingData) {
                            if (this.score === this.maxScore)
                                return;

                            this.player.jump();
                        } else {
                            if (this.player.killed)
                                return;

                            this.toggleMovement();
                        }
                    },

                    keydown: function (key) {
                        if (key === 'SPACE') {
                            if (!this.showingData) {
                                if (this.score === this.maxScore || this.player.killed)
                                    return;

                                this.player.jump();
                            } else {
                                if (this.player.killed)
                                    return;

                                this.toggleMovement();
                            }
                        }
                    },
                });

            });

    },
    simpleSheet: true
});
