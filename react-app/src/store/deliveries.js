const CREATED_DELIVERY = '/deliveries/CREATED_DELIVERY';
const GOT_ALL_DELIVERIES = '/deliveries/GOT_ALL_DELIVERIES';
const UPDATED_DELIVERY = '/deliveries/UPDATED_DELIVERY';
const DELETED_DELIVERY = '/deliveries/DELETED_RESERVAITON';

const createdDelivery = (payload) => {
	return {
		type: CREATED_DELIVERY,
		payload,
	};
};

const gotAllDeliveries = (payload) => {
    return {
        type: GOT_ALL_DELIVERIES,
        payload
    }
}

const updatedDelivery = (payload) => {
	return {
		type: UPDATED_DELIVERY,
		payload,
	};
};

const deletedDelivery = (payload) => {
	return {
		type: DELETED_DELIVERY,
		payload,
	};
};

export const createDelivery = data =>
async dispatch => {
  const res = await fetch('/api/deliveries/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  const newDelivery = await res.json()
  dispatch(createdDelivery(newDelivery))
  return newDelivery
}

export const getAllDeliveries = () =>
async dispatch => {
  const res = await fetch('/api/deliveries/')
  if(res.ok) {
    const deliveries = await res.json();
    dispatch(gotAllDeliveries(deliveries));
    return deliveries
  }
}

export const updateDelivery = data =>
async dispatch => {
  const res = await fetch(`/api/deliveries/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const editedDelivery = await res.json();
  dispatch(updatedDelivery(editedDelivery))
  return editedDelivery
}

export const deleteDelivery = deliveryId =>
async dispatch => {
  const res = await fetch(`/api/deliveries/${deliveryId}`, {
    method: 'DELETE'
  })

  const deleted = await res.json();
  dispatch(deletedDelivery(deleted))
  return deleted
}


const deliveriesReducer = (state = {}, action) => {
    let newState = {...state};
    switch(action.type) {
        case CREATED_DELIVERY: {
          newState[action.payload.id] = action.payload
          return newState
        }
        case GOT_ALL_DELIVERIES: {
          newState = action.payload
          return newState;
        }
        case UPDATED_DELIVERY: {
          newState[action.payload.id] = action.payload
            return newState
        }
        case DELETED_DELIVERY: {
          delete newState[action.payload.id]
            return newState
        }
        default:
            return state;
    }
};

export default deliveriesReducer;
