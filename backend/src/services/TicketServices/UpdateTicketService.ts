import AppError from "../../errors/AppError";
import Contact from "../../models/Contact";
import Ticket from "../../models/Ticket";

interface TicketData {
  status?: string;
  userId?: number;
}

interface Request {
  ticketData: TicketData;
  ticketId: string;
}

const UpdateTicketService = async ({
  ticketData,
  ticketId
}: Request): Promise<Ticket> => {
  const { status, userId } = ticketData;

  const ticket = await Ticket.findOne({
    where: { id: ticketId },
    include: [
      {
        model: Contact,
        as: "contact",
        attributes: ["id", "name", "number", "profilePicUrl"]
      }
    ]
  });

  if (!ticket) {
    throw new AppError("No ticket found with this ID.", 404);
  }

  await ticket.update({
    status,
    userId
  });

  return ticket;
};

export default UpdateTicketService;
