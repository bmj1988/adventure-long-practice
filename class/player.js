const { Food } = require('./food');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // Picks up an item from the current room into the player's inventory
        let item = this.currentRoom.getItemByName(itemName)
        let index = this.currentRoom.items.indexOf(item)
        if (item) {
            this.items.push(item)
            this.currentRoom.items.splice(index, 1)
        }
        else {
            return console.log(`There is no ${itemName} in this room!`)
        }
        return console.log(`You pick up ${itemName}!`)
        // Your code here
    }

    dropItem(itemName) {
        // Drops an item the player is holding into their current room
        let item = this.getItemByName(itemName)
        let index = this.items.indexOf(item)
        if (item) {
            this.currentRoom.items.push(item)
            this.items.splice(index, 1)
        }
        else {
            return console.log(`${itemName} is not in your inventory!`)
        }
        return console.log(`${itemName} has been dropped!`)
        // Your code here
    }

    eatItem(itemName) {
        let food = this.getItemByName(itemName)
        let index = this.items.indexOf(food)
        if (food && food instanceof Food) {
            this.items.splice(index, 1)
            return console.log(`You ate ${itemName}. Delicious!`)
        }
        else {
            return console.log(`${itemName} is not in the inventory!`)
        }
    }

    getItemByName(name) {
        return this.items.find(item => item.name === name)
    }
}

module.exports = {
  Player,
};
