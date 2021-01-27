import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import axios from "axios";
import { Button } from "./styles/form-elements";

type VoteProps = {
  wilderId: string;
};

const SKILLS = gql`
  query GetSkills {
    skills {
      id
      title
    }
  }
`;

// eslint-disable-next-line react/no-unused-prop-types
type Skill = { id: string; title: string };

function Vote({ wilderId }: VoteProps): JSX.Element {
  const { loading, error, data } = useQuery(SKILLS);
  const [selectedSkillId, setSelectedSkillId] = useState("no-selection");
  if (error) {
    return <p>Error loading skills</p>;
  }
  return (
    <>
      {data?.skills && (
        <select
          onChange={(e) => setSelectedSkillId(e.target.value)}
          value={selectedSkillId}
        >
          <option value="no-selection">Select a skill</option>
          {data.skills.map(({ id, title }: Skill) => {
            return (
              <option key={id} value={id}>
                {title}
              </option>
            );
          })}
        </select>
      )}
      <Button
        showLoading={loading}
        disabled={loading || selectedSkillId === "no-selection"}
        onClick={() =>
          axios.post("https://localhost/api/votes", {
            skillId: selectedSkillId,
            wilderId,
          })
        }
      >
        Vote
      </Button>
    </>
  );
}

export default Vote;
