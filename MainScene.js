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
        

        var spinButton = this.add.image(960,875, 'spinButton');
        spinButton.setScale(1.7);

        spinButton.setInteractive();
        
        spinButton.on('spinButtonClicked', this.onSpinClicked, this);

        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('spinButtonClicked', gameObject);
        }, this);;

        var potions = [];
        
        var container = this.add.container(400, 300);

        for(let i=1; i<5; i++){
            var sprite= this.add.sprite(95, -255+233*i, "potion"+i);
            sprite.setScale(1.7);
            potions.push(sprite);
            container.add(sprite);
        }


        //limit the potions to show only inside the container
        var mask = this.add.graphics()
	                    .setVisible(false)
	                    .fillStyle(0xFFFFFF)             //white
	                    .fillRect(377, 160, 1175, 705)   //(pos.x, pos.y, width, height)
                        .createGeometryMask();
        
        //apply the mask on every object
        potions.forEach(obj => obj.setMask(mask));

        console.log(potions);

    }

    

    onSpinClicked(spinButton) {
        spinButton.setAlpha(0.5);
    }

   

}