//@flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Event } from '../../../services/modelService.js';
import { UserService } from '../../../services/userService';
import DownloadFile from '../../DownloadFile/DownloadFile';
import { PublicService } from '../../../services/publicService';

type State = {
  event: Event,
  artists: [],
  riders: [],
  cancel: number,
  tickets: [],
  pers: [],
  types: [],
  expandNotes: boolean,
  expandStatus: boolean,
  expandDesc: boolean,
};

type Props = {
  match: { params: { id: number } },
};

/**Shows details about events - Available for artist*/
export default class EventDetailsArtist extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artists: [],
      riders: [],
      cancel: 0,
      tickets: [],
      pers: [],
      types: [],
      expandNotes: false,
      expandStatus: false,
      expandDesc: false,
    };
  }
  /**Gets artist, event, riders and tickets by event_id */
  componentDidMount() {
    //Gets artists on event by event_id
    UserService.getArtists(this.props.match.params.id)
      .then(res => {
        this.setState({ artists: res.data });
      })
      .catch(error => {
        alert(error);
      });

    //Gets event by id
    UserService.getEvent(this.props.match.params.id).then(res => {
      let event: any = res.data[0];
      this.setState({
        event: event,
        cancel: event.cancel,
      });
    });

    //Gets all riders by event_id
    UserService.getRiders(this.props.match.params.id).then(res => {
      this.setState({ riders: res.data });
    });

    //Gets all tickets by event_id
    PublicService.getPublicEventTickets(this.props.match.params.id).then(response => {
      this.setState({ tickets: response.data });
    });
  }
  render() {
    return (
      <div>
        <div className="card mb-4" id="carddetailsevent">
          <div id="loginBox">
            {/*Checks if events are cancelled or not*/}
            {this.state.cancel == 0 ? (
              //Checks if event has an event image
              this.state.event.image == null ? (
                ''
              ) : (
                <div className="imgdiv">
                  <img
                    id="EventPicLI"
                    src={'http://localhost:4000/public/file/' + this.state.event.image}
                    className="img-fluid"
                    alt="Eventbilde"
                  ></img>
                </div>
              )
            ) : this.state.event.image !== null ? (
              <div className="imgdiv">
                <img
                  id="EventPicLI"
                  src={'http://localhost:4000/public/file/' + this.state.event.image}
                  className="img-fluid canceling"
                  alt="Eventbilde"
                ></img>
                <div class="centered">AVLYST</div>
              </div>
            ) : (
              <div className="imgdiv">
                <img id="EventPicLI"></img>
                <div class="centered">AVLYST</div>
              </div>
            )}
            <div id="EventDetailsLITable">
              <p className="titleeventdetails display-4 text-uppercase text-center m-4">
                {this.state.event.name}
              </p>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-right" scope="row">
                      Start:
                    </th>
                    <td className="text-left">
                      {this.state.event.start_format ? (
                        this.state.event.start_format.slice(8, 10) +
                        '/' +
                        this.state.event.start_format.slice(5, 7) +
                        '/' +
                        this.state.event.start_format.slice(0, 4) +
                        ' - ' +
                        this.state.event.start_format.slice(11, 16)
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Slutt:
                    </th>
                    <td className="text-left">
                      {this.state.event.end_format ? (
                        this.state.event.end_format.slice(8, 10) +
                        '/' +
                        this.state.event.end_format.slice(5, 7) +
                        '/' +
                        this.state.event.end_format.slice(0, 4) +
                        ' - ' +
                        this.state.event.end_format.slice(11, 16)
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Beskrivelse:
                    </th>
                    {this.state.event.description !== null &&
                    this.state.event.description !== '' ? (
                      <div>
                        {this.state.event.description.length > 45 ? (
                          <div>
                            {this.state.expandDesc === true ? (
                              <td className="text-left">
                                {this.state.event.description}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandDesc: false });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Skjul
                                </a>
                              </td>
                            ) : (
                              <td className="text-left">
                                {this.state.event.description.substring(0, 50)}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandDesc: true });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Vis mer...
                                </a>
                              </td>
                            )}
                          </div>
                        ) : (
                          <td className="text-left">{this.state.event.description}</td>
                        )}
                      </div>
                    ) : (
                      <div>
                        <td className="text-left">-</td>
                      </div>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Lineup:
                    </th>
                    {this.state.artists.length === 0 ? (
                      <td className="text-left">-</td>
                    ) : (
                      this.state.artists.map(artist => (
                        <div>
                          {artist.artist_name === null ? (
                            <td className="text-left">Ukjent artist ({artist.email})</td>
                          ) : (
                            <td className="text-left">{artist.artist_name}</td>
                          )}
                        </div>
                      ))
                    )}
                  </tr>
                  {this.state.event.contract !== null ? (
                    <tr>
                      <th className="text-right" scope="row">
                        Kontrakt:
                      </th>
                      <td className="text-left">
                        <DownloadFile fileName={this.state.event.contract} />
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                  {this.state.riders.length > 0 ? (
                    <tr>
                      <th className="text-right" scope="row">
                        Riders:
                      </th>
                      <span>
                        {this.state.riders.map(rider => (
                          <div>
                            <td>
                              <DownloadFile fileName={rider.rider_file} />
                            </td>
                          </div>
                        ))}
                      </span>
                    </tr>
                  ) : (
                    ''
                  )}
                  {/*Checks if the event has notes in riders*/}
                  {this.state.event.notes !== undefined && this.state.event.notes != null ? (
                    <tr>
                      <th className="text-right" scope="row">
                        Notat:
                      </th>
                      <div>
                        {this.state.event.notes.length > 45 ? (
                          <div>
                            {this.state.expandNotes === true ? (
                              <td className="text-left">
                                {this.state.event.notes}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandNotes: false });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Skjul
                                </a>
                              </td>
                            ) : (
                              <td className="text-left">
                                {this.state.event.notes.substring(0, 50)}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandNotes: true });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Vis mer...
                                </a>
                              </td>
                            )}
                          </div>
                        ) : (
                          <td className="text-left">{this.state.event.notes}</td>
                        )}
                      </div>
                    </tr>
                  ) : (
                    <td className="text-left">-</td>
                  )}
                  <tr>
                    <th className="text-right" scope="row">
                      Status:
                    </th>
                    {this.state.event.status !== null ? (
                      <div>
                        {this.state.event.status.length > 45 ? (
                          <div>
                            {this.state.expandStatus === true ? (
                              <td className="text-left">
                                {this.state.event.status}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandStatus: false });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Skjul
                                </a>
                              </td>
                            ) : (
                              <td className="text-left">
                                {this.state.event.status.substring(0, 50)}{' '}
                                <a
                                  onClick={() => {
                                    this.setState({ expandStatus: true });
                                  }}
                                  style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                  Vis mer...
                                </a>
                              </td>
                            )}
                          </div>
                        ) : (
                          <td className="text-left">{this.state.event.status}</td>
                        )}
                      </div>
                    ) : (
                      <div>
                        <td className="text-left">-</td>
                      </div>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Billetter:
                    </th>
                    {this.state.tickets.length > 0 ? (
                      <div>
                        {this.state.tickets.map(ticket => (
                          <div>
                            <td className="text-left">
                              {ticket.amount} stk. {ticket.name} ({ticket.price} ,-)
                            </td>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <td className="text-left">-</td>
                    )}
                  </tr>

                  <tr>
                    <th className="text-right" scope="row">
                      Sted:
                    </th>
                    {this.state.event.location_name !== '' &&
                    this.state.event.location_name !== null ? (
                      <td className="text-left">{this.state.event.location_name}</td>
                    ) : (
                      <td className="text-left">-</td>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Scene:
                    </th>
                    {this.state.event.venue !== '' && this.state.event.venue !== null ? (
                      <td className="text-left">{this.state.event.venue}</td>
                    ) : (
                      <td className="text-left">-</td>
                    )}
                  </tr>
                  <tr>
                    <th className="text-right" scope="row">
                      Adresse:
                    </th>
                    {this.state.event.address !== null && this.state.event.address !== '' ? (
                      <td className="text-left">{this.state.event.address}</td>
                    ) : (
                      <td className="text-left">-</td>
                    )}
                  </tr>
                </tbody>
              </table>
              {this.state.event.address === null ? (
                <div></div>
              ) : (
                //Inserts adress to google maps
                <iframe
                  id="map"
                  width="100%"
                  height="300px"
                  frameborder="0"
                  src={
                    'https://www.google.com/maps/embed/v1/place?q=' +
                    this.state.event.address +
                    ',+' +
                    this.state.event.postcode +
                    '&key=AIzaSyC-75BBbNQpdG9lO2JararmVY5ps_xDAdk'
                  }
                  allowfullscreen
                ></iframe>
              )}
              <button
                className="btn btn-success mx-auto d-block m-2"
                id="editeventbtn"
                onClick={() => this.edit()}
              >
                Endre riders
              </button>
              <button
                className="btn btn-secondary mx-auto d-block m-2"
                id="editeventbtn"
                onClick={() => (window.location.href = '/events')}
              >
                Tilbake
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**Changes your location to edit event*/
  edit() {
    window.location.href = '/userevent/edit/' + this.props.match.params.id;
  }
}
