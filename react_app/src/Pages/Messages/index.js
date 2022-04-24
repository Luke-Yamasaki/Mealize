// packages
import styled from 'styled-compoenets';

const Wrapper = styled.div`
    width: 1550px;
    height: auto;
    min-height: 2000px;
    display: flex;
    flex-direction: row;
    align-items: top;
    justify-content: flex-start;
    gap: 50px;
    padding-left: 50px;
    padding-top: 50px;
`

const Header = styled.section`
    width: 300px;
    height: auto;
    min-height: 2000px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
    gap: 10px;
`

const MessageContent = styled.section`
    width: 1300px;
    height: auto;
    min-height: 2000px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
`;

export const Messages = () => {
    return (
        <Wrapper>
            <Header>

            </Header>
            <MessageContent>

            </MessageContent>
        </Wrapper>
    )
}
