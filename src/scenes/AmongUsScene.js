import Phaser from "phaser";
export default class AmongUsScene extends Phaser.Scene {
    constructor() {
        super('among-us-scene')
    }

    preload() {

    }

    create() {
        this.load.image('maps', 'images/Maps.png')
        this.load.image('playerRed', 'images/Red.png')
    }
}