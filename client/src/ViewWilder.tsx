import React from "react";
import blank_profile from "./icons/blank-profile-picture-female.png";
import Skill from "./Skill";
import { Card, List } from "./styles/elements";
import Wilder from "./types/Wilder";
import Vote from "./Vote";

function ViewWilder({ city, id, name, votes }: Wilder): JSX.Element {
  return (
    <Card>
      <img src={blank_profile} alt={`${name} Profile`} />
      <h3>{name}</h3>
      <h4>City</h4>
      <p>{city}</p>
      <h4>Wild Skills</h4>
      <List>
        {votes.map(({ count, skill: { id: skillId, title } }) => (
          <Skill key={id} skillId={skillId} title={title} count={count} />
        ))}
        <Vote wilderId={id} />
      </List>
    </Card>
  );
}

export default ViewWilder;
