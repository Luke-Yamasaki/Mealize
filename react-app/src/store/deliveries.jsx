const GOT_ALL_DELIVERIES = '/deliveries/GOT_ALL_DELIVERIES';
const CREATED_REQUEST = '/deliveries/CREATED_REQUEST';
const UPDATED_DELIVERY = '/deliveries/UPDATED_DELIVERY';
const REQUEST_REVIEWED = '/deliveries/REQUEST_REVIEWED'
const DELIVERY_ACCEPTED = '/deliveries/DELIVERY_ACCEPTED'
const DELIVERY_PICKEDUP = '/deliveries/DELIVERY_PICKEDUP '
const DELIVERY_CANCELLED = '/deliveries/DELIVERY_CANCELLED'
const DELETED_DELIVERY = '/deliveries/DELETED_RESERVAITON';

const gotAllDeliveries = (payload) => {
    return {
        type: GOT_ALL_DELIVERIES,
        payload
    }
};

const createdRequest = (payload) => {
	return {
		type: CREATED_REQUEST,
		payload,
	};
};

const updatedDelivery = (payload) => {
	return {
		type: UPDATED_DELIVERY,
		payload,
	};
};

const requestReviewed = (payload) => {
	return {
		type: REQUEST_REVIEWED,
		payload,
	};
};

const deliveryAccepted = (payload) => {
	return {
		type: DELIVERY_ACCEPTED,
		payload,
	};
};

const deliveryPickedUp = (payload) => {
	return {
		type: DELIVERY_PICKEDUP,
		payload,
	};
};

const deliveryCancelled = (payload) => {
	return {
		type: DELIVERY_CANCELLED,
		payload,
	};
};

const deletedDelivery = (payload) => {
	return {
		type: DELETED_DELIVERY,
		payload,
	};
};

export const getAllDeliveries = () =>
async dispatch => {
  const res = await fetch('/api/deliveries/')
  if(res.ok) {
    const deliveries = await res.json();
    dispatch(gotAllDeliveries(deliveries));
    return deliveries
  }
};

export const createDelivery = data =>
async dispatch => {
  const res = await fetch('/api/deliveries/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if(res.ok) {
    const newRequest = await res.json()
    dispatch(createdRequest(newRequest))
    return newRequest
  } else if(res.status < 500) {
    const data = await res.json();
    if(data.errors){
        return data.errors;
    };
  } else {
    return 'Connection failed. Please check your internet connection.'
  };
};

export const updateDelivery = data =>
async dispatch => {
  const res = await fetch(`/api/deliveries/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if(res.ok) {
    const editedDelivery = await res.json();
    dispatch(updatedDelivery(editedDelivery))
    return editedDelivery
  } else if(res.status < 500) {
    const data = await res.json();
    if(data.errors){
        return data.errors;
    };
  } else {
    return 'Connection failed. Please check your internet connection.'
  };
};

export const reviewRequest = data =>
async dispatch => {
  const res = await fetch(`/api/deliveries/approval/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if(res.ok) {
    const review = await res.json();
    dispatch(requestReviewed(review))
    return review
  } else if(res.status < 500) {
    const data = await res.json();
    if(data.errors){
        return data.errors;
    };
  } else {
    return 'Connection failed. Please check your internet connection.'
  };
};

export const acceptDelivery = data =>
async dispatch => {
  const res = await fetch(`/api/deliveries/accept/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if(res.ok) {
    const acceptedDelivery = await res.json();
    dispatch(deliveryAccepted(acceptedDelivery))
    return acceptedDelivery
  } else if(res.status < 500) {
    const data = await res.json();
    if(data.errors){
        return data.errors;
    };
  } else {
    return 'Connection failed. Please check your internet connection.'
  };
};

export const pickupDelivery = data =>
async dispatch => {
  const res = await fetch(`/api/deliveries/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if(res.ok) {
    const pickedup = await res.json();
    dispatch(deliveryPickedUp(pickedup))
    return pickedup
  } else if(res.status < 500) {
    const data = await res.json();
    if(data.errors){
        return data.errors;
    };
  } else {
    return 'Connection failed. Please check your internet connection.'
  };
};

export const cancelDelivery = data =>
async dispatch => {
  const res = await fetch(`/api/deliveries/cancellation/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if(res.ok) {
    const cancelled = await res.json();
    dispatch(deliveryCancelled(cancelled))
    return cancelled
  } else if(res.status < 500) {
    const data = await res.json();
    if(data.errors){
        return data.errors;
    };
  } else {
    return 'Connection failed. Please check your internet connection.'
  };
};

export const deleteDelivery = deliveryId =>
async dispatch => {
  const res = await fetch(`/api/deliveries/${deliveryId}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(deliveryId)
  })

  if(res.ok) {
    const deleted = await res.json();
    dispatch(deletedDelivery(deleted))
    return deleted
  } else if(res.status < 500) {
    const data = await res.json();
    if(data.errors){
        return data.errors;
    };
  } else {
    return 'Connection failed. Please check your internet connection.'
  };
};


const deliveriesReducer = (state = {}, action) => {
    let newState = {...state};
    switch(action.type) {
        case GOT_ALL_DELIVERIES:
          newState = action.payload
          return newState;
        case CREATED_REQUEST:
          newState[action.payload.id] = action.payload
          return newState
        case UPDATED_DELIVERY:
          newState[action.payload.id] = action.payload
          return newState
        case REQUEST_REVIEWED:
          const approved = parseInt(action.payload);
          if(isNaN(approved)) {
            newState[action.payload.id] = action.payload
          } else {
            delete newState[action.payload]
          }
          return newState
        case DELIVERY_ACCEPTED:
          newState[action.payload.id] = action.payload
          return newState
        case DELIVERY_PICKEDUP:
          newState[action.payload.id] = action.payload
          return newState
        case DELIVERY_CANCELLED:
          newState[action.payload.id] = action.payload
          return newState
        case DELETED_DELIVERY:
          delete newState[action.payload]
          return newState
        default:
          return state;
    }
};

export default deliveriesReducer;
