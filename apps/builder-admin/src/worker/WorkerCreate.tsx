import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const WorkerCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Assigned Tasks" source="assignedTasks" />
        <TextInput
          label="Contact Information"
          multiline
          source="contactInformation"
        />
        <TextInput label="Name" source="name" />
        <TextInput label="Role" source="role" />
      </SimpleForm>
    </Create>
  );
};
