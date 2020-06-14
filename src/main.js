
var game;

window.addEventListener("load", () => {
var config = {
type: Phaser.AUTO,
width: window.innerWidth,
height: window.innerHeight,
physics: {
default: 'arcade',
arcade: {
gravity: { y: 100 }
}
},
scene: [ MainScene ]
};

game = new Phaser.Game(config);
});