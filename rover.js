class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let results = [];
      message.commands.forEach(command => {
         let result = {};
         switch (command.commandType) {
            case 'MODE_CHANGE':
               this.mode = command.value;
               result.completed = true;
               results.push(result);
               break;
            case 'MOVE':
               if (this.mode === 'NORMAL') {
                  this.position = command.value;
                  result.completed = true;
                  results.push(result);
               } else if (this.mode === 'LOW_POWER') {
                  result.completed = false;
                  results.push(result);
               }
               break;
            case 'STATUS_CHECK':   
               result.completed = true;
               result.roverStatus = {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position 
               };
               results.push(result);
               break;
            default:
               break;
         }
      });
      
      return {
         message: message.name,
         results: results
      }
   }

}

module.exports = Rover;