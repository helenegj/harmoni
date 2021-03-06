/* DELETE SOON BICH BOCH
event.name = "Mcpearsons nye organfest";
event.image = "piano.img";
event.start = "2008-1-29 14:57:00";
event.end = "2008-1-29 16:00:00";
event.status = "ready to party";
event.is_public = 1;
event.venue = "Koselig plass";
event.location_id = 1;
event.event_id = 2;
*/
import mysql from 'mysql';
import { Event, User, Location, Organiser } from '../../dao/modelDao.js';
import { testDatabase } from '../config/dbCredentials';
//import {Artist} from "../../../Client/src/services/modelService";
const publicDao = require('../../dao/publicDao.js');
let dao = new publicDao(
  testDatabase.url,
  testDatabase.user,
  testDatabase.password,
  testDatabase.database,
);
const runsqlfile = require('./runsqlfile.js');

class State {
  constructor(organiser: boolean, name: string, email: string, salt: string, hash: string) {
    this.email = email;
    this.name = name;
    this.organiser = organiser;
    this.hash = hash;
    this.salt = salt;
  }
  organiser: boolean;
  name: string;
  email: string;
  hash: string;
  hash: string;
  email: string;
  name: string;
  url: string;
  organiser: true;
  address: string;
  imageUrl: string;
  tlf: string;
  description: string;
}

beforeAll(done => {
  runsqlfile('src/tests/testTables.sql', dao.getPool(), () => {
    runsqlfile('src/tests/testData.sql', dao.getPool(), done);
  });
});

describe('Testing methods in public dao', () => {
  it('1 equals 1', done => {
    expect(1).toEqual(1);
    done();
  });

  it('get public events', done => {
    function callback(status, data) {
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.getPublicEvents(callback);
  });

  it('gets all artists in event with id 1', done => {
    function callback(status, data) {
      expect(data.length).toBeGreaterThanOrEqual(1);
      done();
    }
    dao.getArtistEvent(1, callback);
  });

  it('gets one public event by id', done => {
    function callback(status, data) {
      expect(data.length).toBe(1);
      done();
    }
    dao.getPublicEvent(1, callback);
  });

  it('tries to get a not public event, not ok', done => {
    function callback(status, data) {
      expect(data.length).toBe(0);
      done();
    }
    dao.getPublicEvent(4, callback);
  });

  it('tries to register a new organiser', done => {
    function callback(status, data) {
      expect(data[0].affectedRows).toBe(1);
      done();
    }
    let state = new State(
      true,
      'orgaanisername',
      'newtestorganiser@email.test',
      'goofysalt',
      'goofyhash',
    );
    dao.insertNewUser(state, callback);
  });

  it('checks to see if an organiser email exists', done => {
    function callback(status, data) {
      expect(data.length).toBe(1);
      done();
    }
    let email: string = 'newtestorganiser@email.test';
    dao.emailExists(email, callback);
  });

  it('checks to see if a user email exists', done => {
    function callback(status, data) {
      expect(data.length).toBe(1);
      done();
    }
    let email: string = 'test@test.com';
    dao.emailExists(email, callback);
  });

  it("checks to see if data is returned when an email that doesn't exist is checked", done => {
    function callback(status, data) {
      expect(data.length).toBe(0);
      done();
    }
    let email: string = 'yasoyaso@email.test';
    dao.emailExists(email, callback);
  });

  it('Trying to get info from organiser by email:', done => {
    function callback(status, data) {
      expect(data.length).toBe(1);
      done();
    }
    let email: string = 'email@organisation.com';
    dao.getOrganiserLoginInfo(email, callback);
  });
  it("Trying to login as organiser which doesn't exist:", done => {
    function callback(status, data) {
      expect(data.length).toBe(0);
      done();
    }
    let email: string = 'notorganiser';
    dao.getOrganiserLoginInfo(email, callback);
  });

  it('Trying to get info from user by email:', done => {
    function callback(status, data) {
      expect(data.length).toBe(1);
      done();
    }
    let email: string = 'test@test.com';
    dao.getUserLoginInfo(email, callback);
  });
  it("Trying to login as user which doesn't exist:", done => {
    function callback(status, data) {
      expect(data.length).toBe(0);
      done();
    }
    let email: string = 'notuser';
    dao.getUserLoginInfo(email, callback);
  });

  it('Trying to get info from admin by email:', done => {
    function callback(status, data) {
      expect(data.length).toBe(1);
      done();
    }
    let email: string = 'admin@harmoni.com';
    dao.getAdminLoginInfo(email, callback);
  });
  it("Trying to login as admin which doesn't exist:", done => {
    function callback(status, data) {
      expect(data.length).toBe(0);
      done();
    }
    let email: string = 'notadmin';
    dao.getAdminLoginInfo(email, callback);
  });
});
