//Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../../Context/ThemeContext';
import { useHistory } from 'react-router-dom';

//Styling for card colors
import { category } from './category.js';

//Actions
import { setCurrentModal, showModal } from '../../../../store/modal';

//Components
import { DeliveryForm } from '../../../../Forms/Delivery';
import { FavoritesIcon } from '../../../../Assets/Logo/FavoritesIcon';
import { QuestionBtn, RequestBtn } from '../../../Styled/Buttons';
import { VectorBox } from '../../../Styled/Layout';
// import { LocationPin } from '../../../../Assets/Icons/Location';
import {
    Card,
    TitleBox,
    TitleTextContainer,
    CompanyLogo,
    CompanyName,
    // PinContainer,
    // CompanyAddress,
    ItemDateText,
    ItemImage,
    InfoBox,
    InfoContainer,
    ItemTitle,
    ItemQuantity,
    DescriptionBox,
    DescriptionText,
    ButtonBox,
    ButtonText,
    QuestionText
} from "../../../Styled/ItemCard";

//Helper function
import { daysAgo } from '../../../../utils/Dates';

export const PreviewCardContent = ({ props }) => {
    console.log(props)
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const organizations = useSelector(state => state.organizations);
    const [organization, setOrganization] = useState('');
    const [styleObj, setStyleObj] = useState(category[theme][6]);
    const businesses = organizations.businesses;
    const nonprofits = organizations.nonprofits;

    useEffect(() => {
        if(props.organiationId) {
            sessionUser.isNonprofit ? setOrganization(nonprofits[props.organizationId]) : setOrganization(businesses[props.organizationId]);
        }
    },[props.organizationId])

    useEffect(() => {
        if(props.categoryId) {
            setStyleObj(category[theme][props.categoryId]);
        }
    },[props.categoryId])


    const handleQuestion = () => {
        dispatch(setCurrentModal(() => <DeliveryForm props={props}/>));
        dispatch(showModal());
    };

    const handleRequest = () => {
        dispatch(setCurrentModal(() => <DeliveryForm props={props}/>));
        dispatch(showModal());
    };

    // const formatAddress = () => {
    //     const address = `${organization.street}, ${organization.city}, ${organization.state.slice(0, 2).toUpperCase()} ${organization.zip}`;
    //     return address;
    // };

    const handleClick = () => {
        return history.push(`/items/${props.id}`)
    };

    return (
        <Card color={styleObj} height={sessionUser ? '390px' : '350px'}>
            <TitleBox to={`/organizations/${organization.id}`}>
                <VectorBox square='30px' resize='32px'>
                    <CompanyLogo src={organization.logoUrl} alt='Business logo.' width='30px' height='30px' backgroundColor='#191919'/>
                </VectorBox>
                <TitleTextContainer>
                    <CompanyName>{organization.name}</CompanyName>
                    {/* <PinContainer width='15px' height='15px'>
                        <LocationPin color='black'/>
                    </PinContainer>
                    <CompanyAddress>{formatAddress()}</CompanyAddress> */}
                </TitleTextContainer>
                <ItemDateText theme={theme}>{daysAgo(props)}</ItemDateText>
            </TitleBox>
            <ItemImage src={props.imageUrl} alt='Food available for pick up.' onClick={handleClick}/>
            <InfoBox>
                <InfoContainer>
                    <ItemTitle theme={theme}>{props?.title}</ItemTitle>
                    <ItemQuantity theme={theme}>({props?.quantity})</ItemQuantity>
                </InfoContainer>
                <VectorBox square='30px' opacity='50%'>
                    {sessionUser && (
                        <FavoritesIcon props={props} />
                    )}
                </VectorBox>
            </InfoBox>
            <DescriptionBox>
                <DescriptionText theme={theme}>{props.description}</DescriptionText>
            </DescriptionBox>
            {sessionUser && (
                <ButtonBox>
                    <QuestionBtn theme={theme} onClick={handleQuestion}>
                        <QuestionText theme={theme}>Ask a question</QuestionText>
                    </QuestionBtn>
                    <RequestBtn onClick={handleRequest}>
                        <ButtonText>Send a request</ButtonText>
                    </RequestBtn>
                </ButtonBox>
            )}
        </Card>
    )
};
