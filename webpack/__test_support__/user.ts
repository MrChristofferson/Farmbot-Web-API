import { User } from "../auth/interfaces";
import { TaggedUser } from "../resources/tagged_resources";

export let user: User = {
  created_at: "2016-10-05T03:02:58.000Z",
  device_id: 2,
  email: "farmbot1@farmbot.io",
  id: 2,
  name: "FarmBot 1",
  updated_at: "2017-08-04T19:53:29.724Z"
};

export let taggedUser: TaggedUser = {
  kind: "users",
  uuid: "1234-5678",
  specialStatus: undefined,
  body: {
    created_at: "2016-10-05T03:02:58.000Z",
    device_id: 2,
    email: "farmbot1@farmbot.io",
    id: 2,
    name: "FarmBot 1",
    updated_at: "2017-08-04T19:53:29.724Z"
  }
};
