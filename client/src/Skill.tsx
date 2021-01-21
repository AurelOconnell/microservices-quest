import React from "react";
import { Badge } from "./styles/elements";

export type SkillProps = {
  skillId: string;
  title: string;
  count: number;
};

function Skill({ title, count }: SkillProps): JSX.Element {
  return (
    <li>
      {title}
      <Badge count={count}>{count}</Badge>
    </li>
  );
}

export default Skill;
