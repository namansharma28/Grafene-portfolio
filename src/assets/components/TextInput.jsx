import styled from "styled-components";

const TextInput = () => {
  return (
    <StyledWrapper>
      <div className="input-element">
        <input type="text" className="text-input"></input>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .text-input {
    background: transparent;
    border: solid 3px white;
    color: white;
    height: 3rem;
    width: 30rem;
    font-size: 1.5rem;
    border-radius: 4rem;
    padding-left :2rem;
    padding-right :2rem;
  }
    .input-element {
    display: flex;
    flex-direction: column;
    margin: 0 3rem;
    margin-bottom: 1rem;
    }
    @media (max-width: 600px) {
    .text-input {
    height: 3rem;
    width: 20rem;
    }
    }
`;
export default TextInput;
