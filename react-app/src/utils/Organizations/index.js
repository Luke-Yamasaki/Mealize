export const getOneOrganization = async (organizationId) => {
    const response = await fetch(`/api/organizations/${organizationId}`);

    if(response.ok) {
        const organization = await response.json();
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
