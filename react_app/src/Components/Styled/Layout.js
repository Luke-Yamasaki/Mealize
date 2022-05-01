import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 52.5vw;
    max-width: 1600px;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: top;
    filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.2));
    padding-top: 50px;
    padding-left: 50px;
    gap: 100px;
    background-color: '#F5F5F5';
    border: '1px solid #E8E8E8';
`;

export const DarkWrapper = styled(Wrapper)`
    background-color: '#323232';
    border: '1px solid #616161';
`;

export const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    width: 200px;
    height: 750px;
    gap: 15px;
`;

export const PostField = styled.fieldset`
    width: 150px;
    height: 125px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    font-size: 1em;
`;

export const DarkPostField = styled(PostField)`
    border: 1px solid #616161;
    background-color: #191919;
`;

export const CategoryField = styled.fieldset`
    width: 150px;
    height: 285px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-end;
    font-size: 16px;
    gap: 5px;
`;

export const DarkCategoryField = styled(CategoryField)`
    border: 1px solid #616161;
    background-color: #191919;
`;

export const OrganizationField = styled.fieldset`
    width: 150px;
    height: 155px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    font-size: 16px;
    padding-bottom: 25px;
`;

export const DarkOrganizationField = styled(OrganizationField)`
    border: 1px solid #616161;
    background-color: #191919;
`;

export const EventField = styled.fieldset`
    width: 200px;
    height: 400px;
    border-radius: 5px;
    border: 1px solid #B2B2B2;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    font-size: 16px;
    padding: 0px;
    margin: 0px;
`;

export const EventLegend = styled.legend`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 20px;
    font-size: 14px;
    background-color: #9AF2C0;
    border: 1px solid rgba(40, 166, 144, 0.5);
    border-radius: 3px;
    color: black;
    margin-left: 5px;
`;

export const SideLegend = styled.legend`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 20px;
    font-size: 14px;
    background-color: #9AF2C0;
    border: 1px solid rgba(40, 166, 144, 0.5);
    border-radius: 3px;
    color: black;
`;

export const OrganizationLegend = styled.legend`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 20px;
    font-size: 14px;
    background-color: #9AF2C0;
    border: 1px solid rgba(40, 166, 144, 0.5);
    border-radius: 3px;
    color: black;
    margin-bottom: 5px
`;

export const SideBarInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
    width: 200px;
    height: 50px;
`;

export const SideBarInfoText = styled.div`
    font-size: 12px;
    color: black;
    font-weight: bold;
`;

export const SidebarInfoImage = styled.div`
    overflow: hidden;
`;

export const FeedContainer = styled.div`
    width: 870px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 25px;
`;
