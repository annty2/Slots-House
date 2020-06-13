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
        this.slotContainer = this.add.image(250,-20, 'slotContainer').setOrigin(0,0);
        this.slotContainer.setScale(1.7);
        
        
        //add title text 
        this.text= this.add.text(820, 83, "Slot House", {
                                font: "58px Arial",
                                color: "purple",
                                align: "center"});
        this.text.setAngle(-3);
        

        this.spinButton = this.add.image(960,875, 'spinButton');
        this.spinButton.setScale(1.7);

        this.spinButton.setInteractive();
        
        this.spinButton.on('spinButtonClicked', this.onSpinClicked, this);

        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('spinButtonClicked', gameObject);
        }, this);;

        var potions = [];
       // var reels = this.add.group();
       var reels = this.add.container(0,0);
        
     

        for(let i=1; i<5; i++){
            var sprite= this.add.sprite(495, 43+235*i, "potion"+i);
            sprite.setScale(1.7);
            potions.push(sprite);
        }
       

        //reels.addMultiple(potions, this);
        //limit the potions to show only inside the container
        //and apply the mask on every potion
        potions.forEach(potions => potions.setMask(this.add.graphics()
                                                .setVisible(false)
                                                .fillStyle(0xFFFFFF)             //white
                                                .fillRect(377, 160, 1175, 705)   //(pos.x, pos.y, width, height)
                                                .createGeometryMask()));

        console.log(potions);
        console.log(potions[0].x);
        console.log(potions[0].y);

        //reels.addMultiple(potions);
        reels.add(potions);



        this.tweens.add({
            targets: reels,
            y: 1000 ,
            duretion: 100,
            repeat: -1
        });

}

    

    onSpinClicked() {
        this.spinButton.setAlpha(0.5);
    }

   /* update(){
        for(let i=0; i<4; i++){
            potions[i].y +=2;

            if (potions[i].y > 950)
            {
                potions[i].y = -150;
            }
        }
    
    }*/

   

}
