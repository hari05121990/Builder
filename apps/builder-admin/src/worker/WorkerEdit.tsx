import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const WorkerEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
