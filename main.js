var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload (){
this.load.image('slotContainer', 'assets/slotContainer.png');
this.load.image('potion1', 'assets/potion1.png');
this.load.image('potion2', 'assets/potion2.png');
this.load.image('potion3', 'assets/potion3.png');
this.load.image('potion4', 'assets/potion4.png');
}

function create (){

//add container to display
container = this.add.image(250,-20, 'slotContainer').setOrigin(0,0);
container.setScale(1.7);


}
                 