//@flow
import React from 'react';
import { Component } from 'react';

import { string } from 'prop-types';
import { Event } from '../../../services/modelService';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { OrganiserService } from '../../../services/organiserService';
import { Location } from '../../../services/modelService';

type State = {
  event: Event,
  locations: [],
  location_name: string,
  location_addr: string,
};
type Props = {};

// TODO add postcode
class EventNew3 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.name = React.createRef();
    this.addr = React.createRef();
    this.state = {
      event: new Event(),
      locations: [],
      location_name: string,
      location_addr: string,
    };
  }
  componentDidMount(): * {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') !== null) {
      console.log('Bruker i arr. henter data. id: ' + localStorage.getItem('curr_event'));
      // TODO add token
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        console.log(this.state.event);
        this.formatTime();
        OrganiserService.getLocations().then(response => {
          console.log(response.data);
          this.setState({ locations: response.data });
          console.log(this.state.locations);
          if (data.location_id !== null) {
            let locData = new Location();
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].location_id === data.location_id) {
                locData = response.data[i];
              }
            }
            if (locData.name) {
              this.setState({ location_name: locData.name });
            }
            if (locData.address) {
              this.setState({ location_addr: locData.address });
            }
            if (locData.postcode) {
              document.getElementById('postcode').value = locData.postcode;
            }
            if (data.venue) {
              document.getElementById('venue').value = data.venue;
            }
          }
        });
      });
    }
  }

  render() {
    return (
      <div className="card" id="cardnewevent">
        <div className="createEvent">
          <h2 className="neweventtitle">Opprett arrangement</h2>
          {/*<form>*/}
          <div className="form-row">
            <p id="locationtitle">Velg sted</p>
            <Autocomplete
              id="search_name"
              style={{ width: '800px' }}
              freeSolo
              onChange={(event, value) => this.updateForm(0, value)}
              value={this.state.location_name}
              options={this.state.locations.map(option => option.name)}
              renderInput={params => (
                <TextField
                  {...params}
                  inputRef={this.name}
                  value={this.state.location_name}
                  label="Stedsnavn"
                  onChange={() => {
                    this.setState({ location_name: this.name.current.value });
                  }}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Autocomplete
              id="search_address"
              style={{ width: '800px' }}
              freeSolo
              onChange={(event, value) => this.updateForm(1, value)}
              options={this.state.locations.map(option => option.address)}
              value={this.state.location_addr}
              renderInput={params => (
                <TextField
                  {...params}
                  inputRef={this.addr}
                  value={this.state.location_addr}
                  onChange={() => {
                    {
                      this.setState({ location_addr: this.addr.current.value });
                    }
                  }}
                  label="Stedsaddresse"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <label htmlFor="postcode">Postkode:</label>
          <input id="postcode" type="text" />
          <label htmlFor="postcode">Scene:</label>
          <input id="venue" type="text" />
          <div>
            <button onClick={() => this.back()} className="btn btn-success" id="backbtn">
              Tilbake
            </button>
            <button onClick={() => this.next()} className="btn btn-success" id="nextbtn">
              Neste
            </button>
          </div>
          {/*</form>*/}
        </div>
      </div>
    );
  }
  updateForm(w: number, val) {
    if (w === 0 && val !== null && val !== '') {
      for (let i = 0; i < this.state.locations.length; i++) {
        if (this.state.locations[i].name === val) {
          let a = this.state.locations[i].address;
          this.setState({ location_addr: a });
          document.getElementById('postcode').value = this.state.locations[i].postcode;
        }
      }
    }
    if (w === 1 && val !== null && val !== '') {
      for (let i = 0; i < this.state.locations.length; i++) {
        if (this.state.locations[i].address === val) {
          let a = this.state.locations[i].name;
          this.setState({ location_name: a });
          document.getElementById('postcode').value = this.state.locations[i].postcode;
        }
      }
    }
  }
  formatTime() {
    if (this.state.event.start !== null) {
      let d = this.state.event.start.substring(0, 10);
      let h = this.state.event.start.substring(11, 16);
      this.state.event.start = d + ' ' + h + ':00';
    }
    if (this.state.event.end !== null) {
      let d = this.state.event.end.substring(0, 10);
      let h = this.state.event.end.substring(11, 16);
      this.state.event.end = d + ' ' + h + ':00';
    }
  }
  // todo ADD postcode
  back() {
    // I won't save the address here, it would create a lot of unfinished locations
    window.location = '/newevent2';
  }
  next() {
    console.log(this.name.current.value);
    console.log(this.addr.current.value);
    let name = this.name.current.value;
    let addr = this.addr.current.value;
    let postcode = document.getElementById('postcode').value;
    let venue = document.getElementById('venue').value;
    if (name.length < 1 || addr.length < 1) {
      window.location = 'newevent4';
      return;
    }
    //post location
    let l = new Location();
    l.name = name;
    l.address = addr;
    l.postcode = postcode;
    OrganiserService.postLocation(l).then(resp => {
      console.log(resp);
      if (resp.status === 200) {
        this.state.event.location_id = resp.data[0].location_id;
        this.state.event.venue = venue;
        OrganiserService.updateEvent(this.state.event).then(resp => {
          console.log(resp);
          window.location = '/newevent4';
        });
      } else {
        alert('Kunne ikke legge til addresse');
      }
    });
  }
}
export default EventNew3;
