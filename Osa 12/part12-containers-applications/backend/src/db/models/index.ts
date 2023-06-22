import Publication from "./publication";
import User from "./user";

export interface ModelInterface {
  User: typeof User
  Publication: typeof Publication
}