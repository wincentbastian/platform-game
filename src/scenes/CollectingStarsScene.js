import Phaser from "phaser";

export default class CollectingStarsScene extends Phaser.Scene {
    constructor() {
        super('collecting-stars-scene')
    }

    init() {
        this.platform = undefined
        this.player = undefined
        this.stars = undefined
        this.cursor = undefined
        this.scoreText = undefined

        this.score = 0
    }

    preload() {
        this.load.image('ground', 'images/platform.png')
        this.load.image('star', 'images/star.png')
        this.load.image('sky', 'images/sky.png')
        this.load.image('bomb', 'images/bomb.png')

        //character
        this.load.spritesheet('dude', 'images/dude.png', { frameWidth: 32, frameHeight: 48 }

        )
    }

    create() {
        this.add.image(400, 300, 'sky')
        this.platform = this.physics.add.staticGroup()
        this.player = this.physics.add.sprite(100, 450, 'dude')

        this.platform.create(600, 400, 'ground')
        this.platform.create(50, 250, 'ground')
        this.platform.create(750, 200, 'ground')

        this.platform.create(400, 568, 'ground').setScale(2).refreshBody()

        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platform)

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 10,
            setXY: { x: 50, y: 0, stepX: 70 }
        })
        this.physics.add.collider(this.stars, this.platform)
        this.cursor = this.input.keyboard.createCursorKeys()

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        this.player.setVelocity(200, 200)
        this.player.setVelocityX(200)
        this.player.setVelocityY(200)

        this.physics.add.overlap(
            this.player,
            this.stars,
            this.collectStar,
            null,
            this
        )

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px' })
    }

    update() {
        if (this.cursor.left.isDown) {
            this.player.setVelocity(-200, 200)
            this.player.anims.play('left', true)
        } else if (this.cursor.right.isDown) {
            this.player.setVelocity(200, 200)
            this.player.anims.play('right', true)
        } else {
            this.player.setVelocity(0, 0)
            this.player.anims.play('turn')
        }

        if (this.cursor.up.isDown) {
            this.player.setVelocity(0, -200)
            this.player.anims.play('turn')
        }
    }
    collectStar(player, star) {
        star.destroy()

        this.score += 100;
        this.scoreText.setText('Score: ' + this.score)

        if (this.score >= 500) {
            this.physics.pause()
            this.add.text(300, 300, 'You WIN!!!!!', { fontSize: '48px' })
        }
    }


}