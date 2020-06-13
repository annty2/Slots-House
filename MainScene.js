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
        this.slotContainer = this.add.image(500,100, 'slotContainer').setOrigin(0,0);
        this.slotContainer.setScale(1.2);
        
        
        //add title text 
        this.text= this.add.text(710, 65, "Slot House", {
                                font: "50px Arial",
                                color: "purple",
                                align: "center"});
        this.text.setAngle(-3);
        

        

        var potions = [];
       // var reels = this.add.group();
       this.reels = this.add.container(0,0);
       this.temp = [];
        
    
    for(let j=0 ; j<5 ; j++){ 
        var pot = [];
        for(let i=1; i<5; i++){
            var sprite= this.add.sprite(675+165*j, 145+165*i, "potion"+i);
            sprite.setScale(1.2);

            //limit the potions to show only inside the slot container
            //and apply the mask on every potion
            sprite.setMask(this.add.graphics()
                            .setVisible(false)
                            .fillStyle(0xFFFFFF)             //white
                            .fillRect(590, 225, 830, 497)   //(pos.x, pos.y, width, height)
                            .createGeometryMask());
            pot.push(sprite);
        }
        this.reels.add(pot);
        this.temp.push(this.reels);
    
    }

 /*   var timeline= this.tweens.timeline({
        targets: reels,
        ease: 'Linear',
        duration: 1000, 
        loop: 0,

        tweens: [
            {
            targets: reels.first,
            y: 1000,
            duration: 1000,
            repeat: 10,
            delay: 1000,
            }
        ]

    });*/

    this.spinButton = this.add.image(960,875, 'spinButton');
        this.spinButton.setScale(1.7);

        this.spinButton.setInteractive();
        
        this.spinButton.on('spinButtonClicked', this.onSpinClicked, this);

        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('spinButtonClicked', gameObject);
        }, this);




}  

    onSpinClicked() {
        this.spinButton.setAlpha(0.5);
        this.stop= false;
        window.setTimeout(() => { this.spinButton.setAlpha(1); } ,1000);

        this.reel();
        
        this.temp.forEach(con => {
            console.log(this);
            var tween = this.tweens.add({
                targets: con,
                y: 2000,
                duration: 250,
                repeat: 1,
                delay: 0,
            });
            console.log(tween);
            window.setTimeout(() => { 
                tween.stop();
                this.stop= true;
            } ,2000);
        });
        
        
        
    }

    createReel(){
        console.log("im in create");

        this.moo = [];
        for(let j=0 ; j<5 ; j++){ 
            var pot = [];
            for(let i=1; i<5; i++){
                var sprite= this.add.sprite(675+165*j, -515+165*i, "potion"+i);
                
                sprite.setScale(1.2);
    
                //limit the potions to show only inside the slot container
                //and apply the mask on every potion
                sprite.setMask(this.add.graphics()
                                .setVisible(false)
                                .fillStyle(0xFFFFFF)             //white
                                .fillRect(590, 225, 830, 497)   //(pos.x, pos.y, width, height)
                                .createGeometryMask());
                pot.push(sprite);
            }
            this.reels.add(pot);
            this.moo.push(this.reels);

            this.moo.forEach(con => {
               // console.log(this);
                var tween = this.tweens.add({
                    targets: con,
                    y: 2000,
                    duration: 300,
                    repeat: 1,
                    delay: 0,
                });
               // console.log(tween);
                window.setTimeout(() => { 
                    tween.stop();
                    this.stop= true;
                } ,2000);
            });
        
        }


// Math.floor(Math.random() * 4)
    }

    reel = () => {
        if (!this.stop) {
            console.log("im in the if!");
            this.createReel();
            window.setTimeout(() => {
                console.log("im in the loop!");
                this.reel();
            }, 500);
        }
        else{
        console.log("false!");
        }
    };



   

}
