class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        
    }

    preload() {
        this.load.image('slotContainer', 'assets/slotContainer.png');
        this.load.image('potion1', 'assets/potion1.png');
        this.load.image('potion2', 'assets/potion2.png');
        this.load.image('potion3', 'assets/potion3.png');
        this.load.image('potion4', 'assets/potion4.png');
        this.load.image('spinButton', 'assets/button_spin.png');
    }

    create() {
        
        //add container to display
        var container = this.add.image(250,-20, 'slotContainer').setOrigin(0,0);
        container.setScale(1.7);
        
        
        //add title text 
        var text= this.add.text(820, 83, "Slot House", {
            font: "58px Arial",
            color: "purple",
            align: "center"
        });
        text.setAngle(-3);
        
        //add spin button
        var spinButton = this.add.image(960,875, 'spinButton');
        spinButton.setScale(1.7);
        
        //allow button to be clicked on
        spinButton.setInteractive();
        spinButton.on('spinButtonClicked', this.onSpinClicked, this);

        //allow any object to be clicked on
        this.input.on('gameObjectClicked', function (pointer, gameObject) {
            gameObject.emit('spinButtonClicked', gameObject); 
        }, this);;
    }

    onSpinClicked(spinButton) {
        spinButton.setAlpha(0.5);
    }

   

}