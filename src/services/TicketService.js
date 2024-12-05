const TicketRepository = require('../repositories/TicketRepository');

class TicketService {
    constructor() {
        this.ticketRepository = new TicketRepository();
    }

    async createTicket(ticketData) {
        return await this.ticketRepository.createTicket(ticketData);
    }
}

module.exports = TicketService;
