import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, RegularPolygon, Circle } from 'react-konva';
import { userService } from '_services';
import { DEFAULT_ARRAY_STATE_MODEL } from 'config';

const Map = ({ contacts, agents, isLoading, rect, curUser }) => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [nearbyContacts, setNearByContacts] = useState(DEFAULT_ARRAY_STATE_MODEL);

  useEffect(() => {
    let agent = selectedAgent;
    if (!agent && agents.length > 0) {
      agent = agents.find(
        (a) => curUser && a.firstname === curUser.firstname && a.lastname === curUser.lastname
      );
    }
    if (agent) {
      setNearByContacts({ ...DEFAULT_ARRAY_STATE_MODEL, loading: true });
      userService
        .getNearByContacts(agent)
        .then((resData) => {
          setNearByContacts({
            loading: false,
            data: resData.map((contact) => ({
              firstname: contact.firstname,
              lastname: contact.lastname,
              color: agent.color,
            })),
            error: null,
          });
        })
        .catch((error) => {
          setNearByContacts({ loading: false, error });
        });
    }
  }, [selectedAgent, agents, curUser]);

  return (
    <>
      {isLoading ||
        (nearbyContacts.loading && (
          <span>
            <em>Loading...</em>
          </span>
        ))}
      <Stage width={360} height={360}>
        <Layer>
          <Circle x={180} y={180} radius={180 - 1} strokeWidth={1} stroke="black" />
        </Layer>
        <Layer>
          {agents.map((agent, index) => (
            <RegularPolygon
              key={index}
              sides={3}
              x={((agent.position.x - rect.minX) / (rect.maxX - rect.minX)) * 360}
              y={((agent.position.y - rect.minY) / (rect.maxY - rect.minY)) * 360}
              width={14}
              height={14}
              fill={agent.color}
              shadowBlur={1}
              onMouseEnter={(e) => {
                // style stage container:
                const container = e.target.getStage().container();
                container.style.cursor = 'pointer';
              }}
              onMouseLeave={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = 'default';
              }}
              onClick={() => {
                setSelectedAgent(agent);
              }}
            />
          ))}
          {contacts.map((contact, index) => (
            <Rect
              key={index}
              x={((contact.position.x - rect.minX) / (rect.maxX - rect.minX)) * 360}
              y={((contact.position.y - rect.minY) / (rect.maxY - rect.minY)) * 360}
              width={8}
              height={8}
              fill={
                (
                  nearbyContacts.data.find(
                    (nc) => nc.firstname === contact.firstname && nc.lastname === contact.lastname
                  ) || contact
                ).color
              }
              shadowBlur={1}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default Map;
