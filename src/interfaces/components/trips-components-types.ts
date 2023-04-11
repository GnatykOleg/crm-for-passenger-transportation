import Select, { SingleValue } from "react-select";

export type TripSelectValue = SingleValue<{
  value: string;
  label: string;
}>;

export interface ITripCard {
  carModel: string;
  from: string;
  to: string;
  carNumber: string;
  passangersCount: string;
  driver: string;
  passangersForTrip: Array<string>;
  tripStatus: boolean;
  driverID: string;
  docID: string;
}

export interface ITripCardProps {
  tripData: ITripCard;
  handleOpenDelete?: (documentID: string) => void;
  handleOpenEdit?: (documentID: string) => void;
}
