/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { Application } from "@nativescript/core";

import sqlite from "nativescript-sqlite";
import {
  Entity,
  Column,
  PrimaryColumn,
  createConnection,
} from "../../dist/index";

@Entity()
export class Name {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}

async function testTypeORM() {
  const connection = await createConnection({
    database: "test.db",
    type: "nativescript",
    driver: sqlite,
    entities: [Name],
    logging: ["schema", "error"],
  });
  await connection.synchronize(false);

  const repository = connection.getRepository(Name);

  let allUsers = await repository.find();

  if (!allUsers.length) {
    const names = ["foo", "bar", "baz"];
    for (const name_ of names) {
      const name = new Name();
      name.name = name_;

      await repository.save(name);
    }
  }

  allUsers = await repository.find();

  console.log("ALL USERS", allUsers);
}

testTypeORM().catch((err) => {
  console.log(err);
});

Application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
