import { SingleValue } from "react-select";
import { IUserDoc } from "../redux-types";

export interface IEditUserData {
  displayName: string;
  role: string;
  phoneNumber?: string | undefined;
  email?: string | undefined;
}

export interface IUserCardProps {
  userData: IUserDoc;
  onClick: ({ displayName, role, phoneNumber, email }: IEditUserData) => void;
}

export type RolesToChange = "PASSANGER" | "DRIVER" | "DISPATCHER";

export type ChangeRoleSelectValues = SingleValue<{
  value: RolesToChange;
  label: RolesToChange;
}>;

export interface ISetUserRoleForm {
  show: boolean;
  handleShowModal: () => void;
  user: IEditUserData;
}
