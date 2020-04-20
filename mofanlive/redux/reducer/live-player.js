import ActionTypes from '../action-types'
import initState from '../state'
import _ from 'lodash'

export default function (livePlayer = initState.livePlayer, action) {
	switch (action.type) {
		case ActionTypes.LivePlayer.UpdateRoomInfo: {
			livePlayer.roomInfo = action.payload
			return livePlayer
		}
		case ActionTypes.LivePlayer.UpdateProducts: {
			if (!!action.payload) {
				livePlayer.products = _.uniqBy(action.payload.concat(livePlayer.shopProducts), 'id')
			} else {
				livePlayer.products = livePlayer.shopProducts
			}
			return livePlayer
		}
		case ActionTypes.LivePlayer.InitProducts: {
			livePlayer.shopProducts = action.payload
			return livePlayer
		}
		default: {
			return livePlayer
		}
	}
}