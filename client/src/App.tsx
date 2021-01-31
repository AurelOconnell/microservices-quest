import React, { useEffect, useReducer } from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";
import ViewWilder from "./ViewWilder";
import AddWilder from "./AddWilder";
import appReducer from "./reducers/appReducer";
import AppContext from "./context/AppContext";
import { Success } from "./styles/form-elements";
import {
  CardRow,
  Container,
  Footer,
  Header,
  ShowButton,
} from "./styles/elements";
import { ReactComponent as PlusCircle } from "./icons/add-circle.svg";
import { ReactComponent as MinusCircle } from "./icons/minus-circle.svg";
import Wilder from "./types/Wilder";

const initialState = {
  showAddForm: false,
  successMessage: "",
};

const WILDERS = gql`
  query GetWilders {
    wilders {
      id
      name
      city
      votes {
        count
        skill {
          id
          title
        }
      }
    }
  }
`;

const NEW_VOTE_SUBSCRIPTION = gql`
  subscription onNewVote {
    newVote {
      wilderId
      skillId
      count
    }
  }
`;

function App(): JSX.Element {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const { loading, error, data, subscribeToMore } = useQuery(WILDERS);

  useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore<{
        newVote: { wilderId: string; skillId: string; count: number };
      }>({
        document: NEW_VOTE_SUBSCRIPTION,
        updateQuery: (
          prev,
          {
            subscriptionData: {
              data: {
                newVote: { wilderId, skillId, count },
              },
            },
          }
        ) => {
          const { wilders } = prev;
          return {
            ...prev,
            wilders: wilders.map((wilder: Wilder) =>
              wilder.id === wilderId
                ? wilder.votes.map((vote) =>
                    vote.skill.id === skillId
                      ? {
                          ...vote,
                          count,
                        }
                      : vote
                  )
                : wilder
            ),
          };
        },
      });
    }
  }, [subscribeToMore]);

  return (
    <div>
      <Header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </Header>
      <Container>
        <AppContext.Provider value={dispatch}>
          <ShowButton
            onClick={() => dispatch({ type: "TOGGLE_SHOW_ADD_FORM" })}
          >
            {state.showAddForm ? <MinusCircle /> : <PlusCircle />}
          </ShowButton>
          {state.showAddForm ? (
            <AddWilder />
          ) : (
            state.successMessage !== "" && (
              <Success>{state.successMessage}</Success>
            )
          )}
        </AppContext.Provider>
      </Container>
      {loading && <p>Loading...</p>}
      {error && <p>Service broken :(</p>}
      {!loading && !error && (
        <Container>
          <h2>Wilders</h2>
          <CardRow>
            {data?.wilders.map(({ id, name, city, votes }: Wilder) => (
              <ViewWilder
                key={id}
                id={id}
                city={city}
                name={name}
                votes={votes}
              />
            ))}
          </CardRow>
        </Container>
      )}
      <Footer>
        <Container>
          <p>&copy; 2020 Wild Code School</p>
        </Container>
      </Footer>
    </div>
  );
}

export default App;
