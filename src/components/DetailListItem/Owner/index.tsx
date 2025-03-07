"use client";
import { Reservation, ReservationStatus } from "@/types/Reservation";
import Image from "next/image";
import DetailRow from "../DetailRow";
import { getFormattedPrice } from "@/helpers/format/money";
import Button from "@/components/Button";
import { getFormattedDetailedDate } from "@/helpers/format/date";

type ReservationOwnerListItemProps = {
  reservation: Reservation;
};

const ReservationOwnerListItem = ({
  reservation,
}: ReservationOwnerListItemProps) => {
  return (
    <>
      <div className="flex w-full mt-5 md:mt-0">
        <div className="max-w-32 h-32">
          <Image
            src={reservation.user.avatar ?? "/default-profile.jpg"}
            alt={`Foto do usuário ${reservation.user.name}`}
            width={500}
            height={500}
            className="rounded-lg h-full object-cover"
          />
        </div>
        <div className="w-full flex flex-col justify-between ml-4">
          <DetailRow title="Solicitante" description={reservation.user.name} />
          <DetailRow
            title="Valor"
            description={getFormattedPrice(Math.abs(reservation.total))}
          />
          <div className="my-1">
            <span>{`${getFormattedDetailedDate(
              reservation.checkIn
            )} - ${getFormattedDetailedDate(reservation.checkOut)}`}</span>
          </div>
          {reservation.status === "PENDING" && (
            <div className="flex">
              <Button>Aprovar</Button>
              <Button appearance="secondary">Negar</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationOwnerListItem;
