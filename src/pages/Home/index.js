import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AGENT_COLORS, USER_COLOR, DEFAULT_ARRAY_STATE_MODEL } from 'config';
import { userService } from '_services';
import Map from './map';
import Profile from './profile';
import { auth } from '_helpers';

const HomePage = () => {
  const [agents, setAgents] = useState(DEFAULT_ARRAY_STATE_MODEL);
  const [contacts, setContacts] = useState(DEFAULT_ARRAY_STATE_MODEL);
  const [user, setUser] = useState(null);
  const [drawRect, setDrawRect] = useState({
    maxX: 360,
    minX: 0,
    maxY: 360,
    minY: 0,
  });

  useEffect(() => {
    setAgents({ ...DEFAULT_ARRAY_STATE_MODEL, loading: true });
    setContacts({ ...DEFAULT_ARRAY_STATE_MODEL, loading: true });

    userService
      .getCurrentUser()
      .then((resData) => {
        setUser(resData);
      })
      .catch((error) => {});
    userService
      .getAllAgent()
      .then((resData) => {
        setAgents({
          loading: false,
          data: resData.map((agent, index) => ({
            ...agent,
            position: {
              x: agent.location.lat + 180,
              y: agent.location.lon + 180,
            },
            color: AGENT_COLORS[index],
          })),
          error: null,
        });
      })
      .catch((error) => {
        setAgents({ loading: false, error });
      });
    userService
      .getAllContacts()
      .then((resData) => {
        setContacts({
          loading: false,
          data: resData.map((contact) => ({
            ...contact,
            position: {
              x: contact.location.lat + 180,
              y: contact.location.lon + 180,
            },
            color: USER_COLOR,
          })),
          error: null,
        });
      })
      .catch((error) => {
        setContacts({ loading: false, error });
      });
  }, []);

  useEffect(() => {
    if (agents.data.length && contacts.data.length) {
      const rect = [...agents.data, ...contacts.data].reduce((acc, cur) => {
        const nextAcc = { ...acc };
        if (acc.maxX === undefined || acc.maxX < cur.position.x) {
          nextAcc.maxX = cur.position.x;
        }
        if (acc.minX === undefined || acc.minX > cur.position.x) {
          nextAcc.minX = cur.position.x;
        }
        if (acc.maxY === undefined || acc.maxY < cur.position.y) {
          nextAcc.maxY = cur.position.y;
        }
        if (acc.minY === undefined || acc.minY > cur.position.y) {
          nextAcc.minY = cur.position.y;
        }
        return nextAcc;
      }, {});

      setDrawRect({
        maxX: rect.maxX + 10,
        minX: rect.minX - 10,
        maxY: rect.maxY + 10,
        minY: rect.minY - 10,
      });
    }
  }, [agents, contacts]);

  return (
    <div>
      <p>
        <Link to="/login">Logout</Link>
      </p>
      <div className="row">
        <div className="col-md-4">{user && <Profile user={user} />}</div>
        <div className="col-md-4">
          <h5>All Agents</h5>
          <p>{agents.loading && <em>Loading agents...</em>}</p>
          {!!agents.data.length && (
            <ul>
              {agents.data.map((agent, index) => (
                <li key={index}>{agent.firstname + ' ' + agent.lastname}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-4">
          <h5>All contacts</h5>
          <p>{contacts.loading && <em>Loading contacts...</em>}</p>
          {!!contacts.data.length && (
            <ul>
              {contacts.data.map((contact, index) => (
                <li key={index}>{contact.firstname + ' ' + contact.lastname}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="row">
        <div
          className="offset-md-2 col-md-8"
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <h5>Map</h5>
          <h6>Click Agent for getting users nearby agent</h6>
          <Map
            curUser={auth.get().data}
            contacts={contacts.data}
            agents={agents.data}
            rect={drawRect}
            isLoading={contacts.isLoading || agents.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
