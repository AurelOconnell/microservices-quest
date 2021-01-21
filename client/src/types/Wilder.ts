type Wilder = {
  id: string;
  name: string;
  city: string;
  votes: {
    count: number;
    skill: {
      id: string;
      title: string;
    };
  }[];
};

export default Wilder;
