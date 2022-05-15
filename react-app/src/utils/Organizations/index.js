export const getOneOrganization = (organizationId) => async dispatch => {
    const response = await fetch(`/api/organizations/${organizationId}`);

    if(response.ok) {
        const organization = await response.json();
        console.log(organization)
        return organization
    } else if(response.status < 500) {
        const data = await response.json();
        if(data.errors){
            return data.errors;
        };
    } else {
        return 'Connection failed. Please check your internet connection.'
    };
};
