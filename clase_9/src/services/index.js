import { UserService as memoryUserService } from "./memoryDB/user.service.js";
import { ToyService as memoryToyService } from "./memoryDB/toy.service.js";
import { UserService as mongoUserService } from "./mongoDB/user.service.js";
import { ToyService as mongoToyService } from "./mongoDB/toy.service.js";
import { config } from "../config/config.js";

// Patrón Factory
function getServices() {
  switch (config.PERSISTANCE) {
    case "memory": {
      return {
        userService: new memoryUserService(),
        toyService: new memoryToyService(),
      };
    }
    case "mongodb": {
      return {
        userService: new mongoUserService(),
        toyService: new mongoToyService(),
      };
    }
    default:
      return {
        userService: new memoryUserService(),
        toyService: new memoryToyService(),
      };
  }
}

export const { userService, toyService } = getServices();
