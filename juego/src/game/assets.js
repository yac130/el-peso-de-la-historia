var gameStage = '';
var gameCharacter = '';

game.module(
        'game.assets'
    )
    .body(function () {

        var allowed = ['toledo-1', 'toledo-2', 'garcia-1', 'garcia-2', 'fujimori-1', 'fujimori-2', 'humala-1', 'humala-2', 'humala-3'];
        var pathArray = location.href.split('/');
        var protocol = pathArray[0];
        var host = pathArray[2];
        var baseUrl = protocol + '//' + host + '/especiales/el-peso-de-la-historia/juego';
        var currentUrl = window.location.href.replace(baseUrl, '');
        var start = currentUrl.substr(0, 7);

        if (start !== '/?game=') {
            window.location = "../";
        }

        gameStage = currentUrl.replace(start, '');
        gameCharacter = gameStage;

        if (allowed.indexOf(gameStage) === -1) {
            window.location = "../";
        }

        gameStage = 'toledo-1';

        game.addAsset(gameStage + '/FONDO.png');
        game.addAsset(gameStage + '/NUBES.png');
        game.addAsset(gameStage + '/EDIFICIO1.png');
        game.addAsset(gameStage + '/EDIFICIO2.png');
        game.addAsset(gameStage + '/CERRO.png');
        game.addAsset(gameStage + '/CRISTO.png');
        game.addAsset(gameStage + '/ARBOLES.png');
        game.addAsset(gameStage + '/PASTO.png');
        game.addAsset(gameStage + '/PISTA.png');
        game.addAsset('tires.png');
        game.addAsset(gameCharacter + '/player.json');
        game.addAsset('player2.json');
        game.addAsset('coin.json');
        game.addAsset('fbShare.png');
        game.addAsset('oneway.png');
        game.addAsset('logo.png');
        game.addAsset('good.png');
        game.addAsset('bad.png');
        game.addAsset('sound.png');
        game.addAsset('nosound.png');
        game.addAsset('backbutton.png');
        game.addAsset('againbutton.png');
        game.addAsset('registerbutton.png');
        game.addAsset('loading.gif');
        game.addAsset('modal.png');
        game.addAsset('last.png');
        game.addAudio('kill.mp3', 'kill');
        game.addAudio('theme2.mp3', 'theme');
        game.addAudio('score.mp3', 'score');
        game.addAudio('clear.mp3', 'clear');
        game.addAudio('jump.mp3', 'jump');
    });
