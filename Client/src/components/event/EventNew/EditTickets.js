//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { string } from 'prop-types';
import { TicketType } from '../../../services/modelService';
import { OrganiserService } from '../../../services/organiserService';
import MoreInfo from '../../MoreInfo/MoreInfo';

type State = {
  org_tickets: [],
  new_ticket: string,
  new_ticket_desc: string,
};
type Props = {
  updateParent: any,
};

/**Component for editting tickets */
class EditTickets extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      org_tickets: [],
      new_ticket: string,
      new_ticket_desc: string,
    };
  }
  /** Gets tickets on the event*/
  componentDidMount() {
    // Check if the user is currently writing an event, if so load inputs with data
    OrganiserService.getMyTickets().then(response => {
      this.setState({ org_tickets: response.data });
      console.log(this.state.org_tickets);
    });
  }
  render() {
    return (
      <div>
        <div>
          <h4 className="text-center">Opprett billettype:</h4>
          <label className="my-3">Billettnavn</label>
          <input
            onChange={e => {
              this.setState({ new_ticket: e.target.value });
            }}
            className="form-control w-100"
            placeholder="Skriv billetnavn..."
            type="text"
          />
          <label className="my-3">Billettbeskrivelse</label>
          <input
            onChange={e => {
              this.setState({ new_ticket_desc: e.target.value });
            }}
            className="form-control w-100"
            placeholder="Skriv billettbeskrivelse..."
            type="text"
          />
          <div className="row justify-content-center">
            <button
              onClick={() => this.createTicket()}
              type="button"
              className="btn btn-success col-sm-3 m-2"
            >
              Opprett
            </button>
          </div>
          <div>
            <h4 className="text-center">Slett billettype:</h4>
            <select
              onChange={e => this.setState({ new_event_ticket: Number(e.target.value) })}
              className="form-control w-100 my-2"
            >
              {this.state.org_tickets.map(ticket => (
                <option value={ticket.ticket_type_id}>{ticket.name}</option>
              ))}
            </select>
            <div className="row justify-content-center">
              <button
                onClick={() => this.deleteTicket()}
                className="btn btn-secondary col-sm-3 m-2"
              >
                <i className="fa fa-trash m-0" placeholder="slett" aria-hidden="true"></i> Slett
              </button>
            </div>
          </div>
        </div>
        <div className="border-bottom border-dark border-5 m-5"></div>
      </div>
    );
  }

  /**Deletes tickets*/
  deleteTicket() {
    OrganiserService.deleteTicket(this.state.new_event_ticket).then(response => {
      // TODO bytt denne så det bare blir en melding på toppen
      alert('Billettype slettet');
      this.props.updateParent();
      this.componentDidMount();
    });
  }
  /**Creates tickets */
  createTicket() {
    let ticket = new TicketType();
    ticket.name = this.state.new_ticket;
    ticket.description = this.state.new_ticket_desc;
    OrganiserService.postTicket(ticket).then(response => {
      // TODO bytt denne så det bare blir en melding på toppen
      alert('Billettype lagt til');
      this.props.updateParent();
      this.componentDidMount();
    });
  }
}
export default EditTickets;