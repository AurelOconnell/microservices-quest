import React from "react";
import blank_profile from "./icons/blank-profile-picture-female.png";
import Skill from "./Skill";
import { Card, List } from "./styles/elements";
import Wilder from "./types/Wilder";

function ViewWilder({ city, name, votes }: Wilder): JSX.Element {
  return (
    <Card>
      <img src={blank_profile} alt={`${name} Profile`} />
      <h3>{name}</h3>
      <h4>City</h4>
      <p>{city}</p>
      <h4>Wild Skills</h4>
      <List>
        {votes.map(({ count, skill: { id, title } }) => (
          <Skill key={id} skillId={id} title={title} count={count} />
        ))}
      </List>
    </Card>
  );
}

export default ViewWilder;
