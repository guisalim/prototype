import styled from "styled-components";
import { Form, List } from "features";
import { Grid } from "components";

const Wrapper = styled(Grid)`
  & > div {
    width: 80%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  align-items: center;
  justify-content: center;
`;

const ApplicationComponent = () => (
  <Wrapper container>
    <div>
      <Form />
      <List />
    </div>
  </Wrapper>
);

export default ApplicationComponent;
