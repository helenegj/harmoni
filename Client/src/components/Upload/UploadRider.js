//@flow
import React, { Component } from 'react';
import { OrganiserService } from '../../services/organiserService';
import { Artist } from '../../services/modelService';

let path = require('path');

type Props = {
  accept: string,
  message: string,
  artist_id: number,
  event_id: number,
};
type State = {
  value: any,
};
class UploadRider extends Component<Props, State> {
  file = '';
  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
    };
  }
  render() {
    return (
      <div>
        <label className="custom-file-upload" style={{ cursor: 'pointer' }}>
          <input
            style={{ display: 'none' }}
            accept={this.props.accept}
            type="file"
            id="upload"
            value={this.state.value}
            name="recfile"
            onChange={e => {
              this.upload(e.target);
            }}
          />
          <i className="fa fa-cloud-upload"></i> {this.props.message}
        </label>
      </div>
    );
  }
  upload(element) {
    let value = element.value;
    console.log(element.value);
    //Checking the file extension, if it is anything other than .pdf, .png, .jpg or .jpeg return an alert
    let ext = path.extname(value);
    if (ext !== '.pdf') {
      alert('Ikke gyldig filtype (.pdf)');
      return;
    }
    const file = element.files[0];
    const reader = new FileReader();
    let artist_id = this.props.artist_id;
    let ev_id = this.props.event_id;
    reader.addEventListener(
      'load',
      function() {
        // send here
        OrganiserService.postRider(reader.result, ev_id, artist_id)
          .then(resp => {
            console.log(resp);
            if (resp.status === 200) {
              console.log('Rider lastet opp.');
              element.files = null;
              window.location.reload();
            } else {
              alert('Kunne ikke laste opp rider.');
            }
          })
          .catch(error => console.log(error));
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}

export default UploadRider;